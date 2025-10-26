import { useQuery } from '@tanstack/react-query'
import { getChallenges } from '../lib/getChallenges'
import type { ChallengeListItem } from '@/types'

export const useChallenges = () => {
  return useQuery<ChallengeListItem[], Error>({
    queryKey: ['challenges'],
    queryFn: getChallenges,
    staleTime: 1000 * 60 * 5, // 5 minutes - challenges don't change often
    gcTime: 1000 * 60 * 10, // 10 minutes cache
    retry: 3, // Retry 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000), // Exponential backoff up to 10s
  })
}
