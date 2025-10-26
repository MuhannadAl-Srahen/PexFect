import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ProfileService } from '../api'
import type { UserProfile } from '@/types'

export const useProfile = (userId?: string) => {
  return useQuery<UserProfile | null, Error>({
    queryKey: ['profile', userId],
    queryFn: () => ProfileService.getProfile(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    enabled: !!userId || userId === undefined, // Allow fetching current user's profile
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
