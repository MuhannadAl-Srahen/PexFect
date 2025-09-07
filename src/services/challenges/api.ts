import type { Challenge } from '@/types'
import { challengeDetailData } from './data'

export const getChallengeById = async (
  id: number
): Promise<Challenge | null> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return challengeDetailData[id] || null
}

export const submitChallengeSolution = async (
  _challengeId: number,
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

  // Simulate successful submission
  return {
    success: true,
    submissionId: Math.random().toString(36).slice(2, 11),
    message: 'Solution submitted successfully',
  }
}
