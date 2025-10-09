import type { Challenge } from '@/types'
import { getChallengeDetails } from '@/lib/getChallengeDetails'

export const getChallengeById = async (
  id: string
): Promise<Challenge | null> => {
  // Small delay kept for parity with previous behavior
  await new Promise((resolve) => setTimeout(resolve, 200))
  try {
    const result = await getChallengeDetails(id)
    if (!result) console.warn('[getChallengeById] no challenge found for id', id)
    return result
  } catch (err) {
    console.error('[getChallengeById] unexpected error', err)
    return null
  }
}

export const submitChallengeSolution = async (
  _challengeId: string,
  _submission: {
    title: string
    githubUrl: string
    liveUrl: string
    screenshot: File | null
    description: string
  }
) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // avoid unused parameter linting in this mock implementation
  void _challengeId
  void _submission

  // Simulate successful submission
  return {
    success: true,
    submissionId: Math.random().toString(36).slice(2, 11),
    message: 'Solution submitted successfully',
  } as const
}
