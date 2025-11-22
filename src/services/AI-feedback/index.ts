import { 
  fetchSubmissionData,
  fetchChallengeData,
  getPreviousChallengeSubmissions
} from './dataFetcher'
import { generateAIFeedbackWithGemini } from './geminiAI'
import { 
  saveFeedbackToSupabase,
  fetchFeedbackFromSupabase
} from './supabaseStorage'
import type { AIFeedbackContext, FeedbackTemplate } from './types'

/**
 * Main function to generate AI feedback for a submission
 * This handles the complete flow: fetch data → generate AI feedback → save to database
 */
export async function generateAIFeedback(submissionId: string): Promise<{
  success: boolean
  feedback?: FeedbackTemplate
  error?: string
  isNewFeedback?: boolean
}> {
  try {
    console.log('Starting AI feedback generation for submission:', submissionId)

    // Step 1: Check if feedback already exists
    console.log('Checking for existing feedback...')
    const existingFeedbackResult = await fetchFeedbackFromSupabase(submissionId)
    if (existingFeedbackResult.success && existingFeedbackResult.feedback) {
      console.log('Found existing feedback, returning cached result')
      return {
        success: true,
        feedback: existingFeedbackResult.feedback,
        isNewFeedback: false
      }
    }

    // Step 2: Fetch submission data
    console.log('Fetching submission data...')
    const submission = await fetchSubmissionData(submissionId)
    if (!submission) {
      return {
        success: false,
        error: 'Submission not found'
      }
    }

    // Step 3: Fetch challenge data
    console.log('Fetching challenge data...')
    const challenge = await fetchChallengeData(submission.challenge_id)
    if (!challenge) {
      return {
        success: false,
        error: 'Challenge not found'
      }
    }

    // Step 4: Get previous feedback for context
    console.log('Fetching previous feedback...')
    const previousFeedback = await getPreviousChallengeSubmissions(
      submission.challenge_id,
      submission.profile_id,
      submissionId
    )

    // Step 5: Create context for AI
    const context: AIFeedbackContext = {
      submission,
      challenge,
      previousFeedback
    }

    // Step 6: Generate AI feedback
    console.log('Generating AI feedback...')
    const aiResult = await generateAIFeedbackWithGemini(context)
    
    if (!aiResult.success) {
      console.warn('AI generation had issues, but using fallback feedback')
    }

    // Add design images and user screenshots to the feedback
    const feedbackWithImages = {
      ...aiResult.feedback,
      designImages: challenge.design_images || [],
      userScreenshots: submission.screenshots || []
    }

    // Step 7: Save to database
    console.log('Saving feedback to database...')
    const saveResult = await saveFeedbackToSupabase(feedbackWithImages, submissionId)
    
    if (!saveResult.success) {
      console.error('Failed to save feedback to database:', saveResult.error)
      return {
        success: false,
        error: saveResult.error || 'Failed to save feedback'
      }
    }

    console.log('AI feedback generation completed successfully')
    return {
      success: true,
      feedback: feedbackWithImages,
      isNewFeedback: true
    }

  } catch (error) {
    console.error('Error in generateAIFeedback:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * Force regenerate feedback (ignoring existing feedback)
 */
export async function regenerateAIFeedback(submissionId: string): Promise<{
  success: boolean
  feedback?: FeedbackTemplate
  error?: string
}> {
  try {
    console.log('Force regenerating AI feedback for submission:', submissionId)

    // Fetch submission data
    const submission = await fetchSubmissionData(submissionId)
    if (!submission) {
      return {
        success: false,
        error: 'Submission not found'
      }
    }

    // Fetch challenge data
    const challenge = await fetchChallengeData(submission.challenge_id)
    if (!challenge) {
      return {
        success: false,
        error: 'Challenge not found'
      }
    }

    // Get previous feedback for context
    const previousFeedback = await getPreviousChallengeSubmissions(
      submission.challenge_id,
      submission.profile_id,
      submissionId
    )

    // Create context for AI
    const context: AIFeedbackContext = {
      submission,
      challenge,
      previousFeedback
    }

    // Generate new AI feedback
    const aiResult = await generateAIFeedbackWithGemini(context)

    // Save to database (this will create a new record)
    const saveResult = await saveFeedbackToSupabase(aiResult.feedback, submissionId)
    
    if (!saveResult.success) {
      console.error('Failed to save regenerated feedback:', saveResult.error)
      return {
        success: false,
        error: saveResult.error || 'Failed to save feedback'
      }
    }

    return {
      success: true,
      feedback: aiResult.feedback
    }

  } catch (error) {
    console.error('Error in regenerateAIFeedback:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * Get feedback for UI display
 */
export async function getFeedbackForUI(submissionId: string): Promise<{
  success: boolean
  feedback?: FeedbackTemplate
  error?: string
}> {
  try {
    const result = await fetchFeedbackFromSupabase(submissionId)
    
    if (!result.success) {
      return {
        success: false,
        error: result.error || 'No feedback found for this submission'
      }
    }

    return {
      success: true,
      feedback: result.feedback
    }
  } catch (error) {
    console.error('Error in getFeedbackForUI:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Re-export functions that other parts of the app need
export { fetchFeedbackFromSupabase as getFeedbackBySubmission } from './supabaseStorage'

// Helper function to check if AI is configured
export function isAIConfigured(): boolean {
  return !!import.meta.env.VITE_GEMINI_API_KEY
}

// Export types
export type { FeedbackTemplate, TechAnalysisSection } from './types'
