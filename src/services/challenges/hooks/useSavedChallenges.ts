import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getSavedChallenges,
  toggleChallengeSave,
} from '../lib/toggleChallengeSave'

export const useSavedChallenges = (isAuthenticated: boolean) => {
  return useQuery<string[], Error>({
    queryKey: ['savedChallenges'],
    queryFn: getSavedChallenges,
    enabled: isAuthenticated, // Only run if user is authenticated
    staleTime: 1000 * 60, // 1 minute
    retry: 2,
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
      // Update with server data
      if (freshSavedIds !== null) {
        queryClient.setQueryData(['savedChallenges'], freshSavedIds)
      }
    },
  })
}
