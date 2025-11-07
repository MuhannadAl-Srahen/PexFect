import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ProfileService } from '../api'
import type { UserProfile } from '@/types'

// Helper to get cached profile from localStorage
const getCachedProfile = (userId?: string): UserProfile | null | undefined => {
  try {
    const key = userId || 'current-user'
    const cached = localStorage.getItem(`profile-cache-${key}`)
    if (cached) {
      const parsed = JSON.parse(cached)
      // Check if cache is still valid (less than 5 minutes old)
      const cacheAge = Date.now() - (parsed.timestamp || 0)
      if (cacheAge < 5 * 60 * 1000) {
        return parsed.data
      }
    }
  } catch (e) {
    console.error('Error reading profile cache:', e)
  }
  return undefined
}

// Helper to save profile to localStorage
const setCachedProfile = (data: UserProfile | null, userId?: string) => {
  try {
    const key = userId || 'current-user'
    localStorage.setItem(
      `profile-cache-${key}`,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    )
  } catch (e) {
    console.error('Error saving profile cache:', e)
  }
}

export const useProfile = (userId?: string) => {
  return useQuery<UserProfile | null, Error>({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const data = await ProfileService.getProfile(userId)
      // Cache the result
      setCachedProfile(data, userId)
      return data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    enabled: !!userId || userId === undefined, // Allow fetching current user's profile
    // Use cached data as initial data to prevent flash
    initialData: () => getCachedProfile(userId),
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userId,
      updates,
    }: {
      userId: string
      updates: Partial<UserProfile>
    }) => {
      return ProfileService.updateProfile(userId, updates)
    },
    onSuccess: (data, variables) => {
      // Update the cache with the new profile data
      if (data) {
        queryClient.setQueryData(['profile', variables.userId], data)
        queryClient.setQueryData(['profile', undefined], data) // Also update current user query
      }
    },
    onError: (error) => {
      console.error('[useUpdateProfile] Mutation error:', error)
    },
  })
}
