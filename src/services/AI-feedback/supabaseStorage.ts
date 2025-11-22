import { supabase } from '../../lib/supabaseClient'
import type { FeedbackTemplate } from './types'

/**
 * Save AI-generated feedback to Supabase
 */
export async function saveFeedbackToSupabase(
  feedback: FeedbackTemplate,
  submissionId: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const feedbackData = {
      submission_id: submissionId,
      overall_score: feedback.overallScore,
      overall_rating: getScoreRating(feedback.overallScore),
      overall_analysis_description: JSON.stringify(feedback.overallAnalysis),
      overall_good_practices: feedback.overallAnalysis.whatYouDidWell,
      improvment_advices: feedback.overallAnalysis.areasForImprovement,
      best_practices: feedback.techAnalysis.bestPractices.success.concat(
        feedback.techAnalysis.bestPractices.info
      ),
      code_formatting: feedback.techAnalysis.codeFormatting.success.concat(
        feedback.techAnalysis.codeFormatting.info
      ),
      functionality: feedback.techAnalysis.functionality.success.concat(
        feedback.techAnalysis.functionality.info
      ),
      accessibility: feedback.techAnalysis.accessibility.success.concat(
        feedback.techAnalysis.accessibility.info
      ),
      recommended_resources: feedback.recommendedResources,
      recommended_next_challenge: feedback.recommendedNextChallenge,
      live_preview: feedback.livePreviewUrl,
      view_code: feedback.codeViewUrl,
    }

    type InsertResponse = {
      data: { id: string } | null
      error: { message: string } | null
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = (await (supabase as any)
      .from('challenge_feedback')
      .insert(feedbackData)
      .select('id')
      .single()) as InsertResponse

    if (response.error) {
      console.error('Error saving feedback to Supabase:', response.error)
      return {
        success: false,
        error: response.error.message,
      }
    }

    console.log('Feedback saved successfully with ID:', response.data?.id)
    return {
      success: true,
      id: response.data?.id,
    }
  } catch (error) {
    console.error('Error in saveFeedbackToSupabase:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Fetch AI feedback from Supabase by submission ID
 */
export async function fetchFeedbackFromSupabase(
  submissionId: string
): Promise<{ success: boolean; feedback?: FeedbackTemplate; error?: string }> {
  try {
    type FeedbackResponse = {
      data: Array<{
        overall_score?: number
        overall_rating?: string
        overall_analysis_description?: string
        overall_good_practices?: string[]
        improvment_advices?: string[]
        best_practices?: string[]
        code_formatting?: string[]
        functionality?: string[]
        accessibility?: string[]
        recommended_resources?: Array<{
          type: string
          title: string
          url: string
        }>
        recommended_next_challenge?: string
        live_preview?: string
        view_code?: string
      }> | null
      error: { message: string } | null
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = (await (supabase as any)
      .from('challenge_feedback')
      .select('*')
      .eq('submission_id', submissionId)) as FeedbackResponse

    if (response.error) {
      console.error('Error fetching feedback from Supabase:', response.error)
      return {
        success: false,
        error: response.error.message,
      }
    }

    // Check if any feedback was found
    if (!response.data || response.data.length === 0) {
      return {
        success: false,
        error: 'No feedback found for this submission',
      }
    }

    // Reconstruct FeedbackTemplate from database columns
    if (response.data && response.data.length > 0) {
      const data = response.data[0] // Get first result from array

      // Get submission details for metadata
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const submissionResponse = await (supabase as any)
        .from('challenge_submissions')
        .select('challenge_title, submitted_at')
        .eq('id', submissionId)
        .limit(1)
        .maybeSingle()

      // Handle submission response errors
      if (submissionResponse.error) {
        console.warn(
          'Could not fetch submission details:',
          submissionResponse.error
        )
      }

      const reconstructedFeedback: FeedbackTemplate = {
        challengeTitle: submissionResponse.data?.challenge_title || 'Challenge',
        submissionDate: submissionResponse.data?.submitted_at
          ? new Date(submissionResponse.data.submitted_at).toLocaleDateString()
          : new Date().toLocaleDateString(),
        livePreviewUrl: data.live_preview || '',
        codeViewUrl: data.view_code || '',
        overallScore: data.overall_score || 75,
        overallAnalysis: data.overall_analysis_description
          ? typeof data.overall_analysis_description === 'string'
            ? JSON.parse(data.overall_analysis_description)
            : data.overall_analysis_description
          : {
              whatYouDidWell: data.overall_good_practices || [],
              areasForImprovement: data.improvment_advices || [],
            },
        techAnalysis: {
          bestPractices: {
            success: data.best_practices || [],
            warning: [],
            error: [],
            info: [],
          },
          codeFormatting: {
            success: data.code_formatting || [],
            warning: [],
            error: [],
            info: [],
          },
          functionality: {
            success: data.functionality || [],
            warning: [],
            error: [],
            info: [],
          },
          accessibility: {
            success: data.accessibility || [],
            warning: [],
            error: [],
            info: [],
          },
        },
        recommendedNextChallenge:
          data.recommended_next_challenge || 'Continue with similar challenges',
        recommendedResources: (data.recommended_resources || []).map(
          (r: { type: string; title: string; url: string }) => ({
            type: (r.type === 'video' || r.type === 'documentation'
              ? r.type
              : 'documentation') as 'video' | 'documentation',
            title: r.title,
            url: r.url,
          })
        ),
      }

      return {
        success: true,
        feedback: reconstructedFeedback,
      }
    }

    return {
      success: false,
      error: 'No feedback found for this submission',
    }
  } catch (error) {
    console.error('Error in fetchFeedbackFromSupabase:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Check if feedback already exists for a submission
 */
export async function checkIfFeedbackExists(
  submissionId: string
): Promise<boolean> {
  try {
    type ExistsResponse = {
      data: Array<{ id: string }> | null
      error: { message: string } | null
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = (await (supabase as any)
      .from('challenge_feedback')
      .select('id')
      .eq('submission_id', submissionId)) as ExistsResponse

    if (response.error) {
      console.error('Error checking feedback existence:', response.error)
      return false
    }

    return Array.isArray(response.data) && response.data.length > 0
  } catch (error) {
    console.error('Error in checkIfFeedbackExists:', error)
    return false
  }
}

/**
 * Helper function to get rating based on score
 */
function getScoreRating(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Great'
  if (score >= 70) return 'Good'
  if (score >= 60) return 'Fair'
  return 'Needs Improvement'
}
