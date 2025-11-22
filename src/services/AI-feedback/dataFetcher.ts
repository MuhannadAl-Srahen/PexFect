import { supabase } from '../../lib/supabaseClient'
import type { SubmissionData, ChallengeData, PreviousFeedback } from './types'

/**
 * Fetch submission data from Supabase
 */
export async function fetchSubmissionData(submissionId: string): Promise<SubmissionData | null> {
  try {
    const { data, error } = await supabase
      .from('challenge_submissions')
      .select('*')
      .eq('id', submissionId)
      .single()

    if (error) {
      console.error('Error fetching submission:', error)
      return null
    }

    return data as SubmissionData
  } catch (error) {
    console.error('Exception in fetchSubmissionData:', error)
    return null
  }
}

/**
 * Fetch challenge data from Supabase
 * Also fetches challenge_overview for additional context
 */
export async function fetchChallengeData(challengeId: string): Promise<ChallengeData | null> {
  try {
    // Fetch challenge data
    const { data: challengeData, error: challengeError } = await supabase
      .from('challenges')
      .select('*')
      .eq('id', challengeId)
      .single()

    if (challengeError) {
      console.error('Error fetching challenge:', challengeError)
      return null
    }

    const result = challengeData as ChallengeData

    // Try to fetch challenge_overview for additional context
    try {
      const { data: overviewData, error: overviewError } = await supabase
        .from('challenge_overview')
        .select('*')
        .eq('challenge_id', challengeId)
        .single()

      if (!overviewError && overviewData) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const overview = overviewData as any
        // Add overview data to challenge data for richer AI context
        result.requirements = overview.requirements || result.requirements || []
        result.tips = overview.tips || []
        result.pitfalls = overview.pitfalls || []
        result.overview_description = overview.description || result.description
        result.design_images = overview.images || overview.design_images || []
        
        console.log('Enhanced challenge data with overview information and design images')
      }
    } catch {
      // Overview is optional, continue without it
      console.log('Challenge overview not available, using basic challenge data')
    }

    return result
  } catch (error) {
    console.error('Exception in fetchChallengeData:', error)
    return null
  }
}

/**
 * Get previous feedback for the same challenge by the same user
 */
export async function getPreviousChallengeSubmissions(
  challengeId: string,
  profileId: string,
  currentSubmissionId: string
): Promise<PreviousFeedback[]> {
  try {
    const { data, error } = await supabase
      .from('challenge_submissions')
      .select(`
        id,
        challenge_feedback (
          overall_score,
          overall_analysis_description
        )
      `)
      .eq('challenge_id', challengeId)
      .eq('profile_id', profileId)
      .neq('id', currentSubmissionId)
      .order('created_at', { ascending: false })
      .limit(3)

    if (error) {
      console.error('Error fetching previous submissions:', error)
      return []
    }

    return (data || []).map((item: { id: string; challenge_feedback?: Array<{ overall_score: number; overall_analysis_description: string }> }) => ({
      submission_id: item.id,
      overall_score: item.challenge_feedback?.[0]?.overall_score || 0,
      feedback_summary: item.challenge_feedback?.[0]?.overall_analysis_description || ''
    }))
  } catch (error) {
    console.error('Exception in getPreviousChallengeSubmissions:', error)
    return []
  }
}
