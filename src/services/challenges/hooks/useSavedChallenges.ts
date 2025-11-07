import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getSavedChallenges,
  toggleChallengeSave,
} from '../lib/toggleChallengeSave'

// Helper to get cached saved challenges from localStorage
const getCachedSavedChallenges = (): string[] | undefined => {
  try {
    const cached = localStorage.getItem('saved-challenges-cache')
    if (cached) {
      const parsed = JSON.parse(cached)
      // Check if cache is still valid (less than 5 minutes old)
      const cacheAge = Date.now() - (parsed.timestamp || 0)
      if (cacheAge < 5 * 60 * 1000) {
        return parsed.data
      }
    }
  } catch (e) {
    console.error('Error reading saved challenges cache:', e)
  }
  return undefined
}

// Helper to save cached challenges to localStorage
const setCachedSavedChallenges = (data: string[]) => {
  try {
    localStorage.setItem(
      'saved-challenges-cache',
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    )
  } catch (e) {
    console.error('Error saving challenges cache:', e)
  }
}

export const useSavedChallenges = (isAuthenticated: boolean) => {
  return useQuery<string[], Error>({
    queryKey: ['savedChallenges'],
    queryFn: async () => {
      const data = await getSavedChallenges()
      // Cache the result
      setCachedSavedChallenges(data)
      return data
    },
    enabled: isAuthenticated, // Only run if user is authenticated
    staleTime: 1000 * 60, // 1 minute
    retry: 2,
    // Use cached data as initial data to prevent flash
    initialData: () => getCachedSavedChallenges(),
  })
}

export const useToggleSave = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      challengeId,
      isSaved,
    }: {
      challengeId: string
      isSaved: boolean
    }) => {
      return toggleChallengeSave(challengeId, isSaved)
    },
    onMutate: async ({ challengeId, isSaved }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['savedChallenges'] })

      // Snapshot the previous value
      const previousSaved = queryClient.getQueryData<string[]>([
        'savedChallenges',
      ])

      // Optimistically update
      queryClient.setQueryData<string[]>(['savedChallenges'], (old = []) => {
        return isSaved
          ? old.filter((id) => id !== challengeId)
          : [...old, challengeId]
      })

      // Return context with the previous value
      return { previousSaved }
    },
    onError: (_err, _variables, context) => {
      // Rollback to previous value on error
      if (context?.previousSaved) {
        queryClient.setQueryData(['savedChallenges'], context.previousSaved)
      }
    },
    onSuccess: (freshSavedIds) => {
      // Update with server data and cache
      if (freshSavedIds !== null) {
        queryClient.setQueryData(['savedChallenges'], freshSavedIds)
        setCachedSavedChallenges(freshSavedIds)
      }
    },
  })
}
