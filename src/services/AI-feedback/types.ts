/**
 * AI Feedback Type Definitions
 * Matches the exact structure required by the UI
 */

export interface FeedbackTemplate {
  challengeTitle: string
  submissionDate: string
  livePreviewUrl: string
  codeViewUrl: string
  overallScore: number
  overallRating?: string
  overallAnalysis: {
    whatYouDidWell: string[]
    areasForImprovement: string[]
  }
  techAnalysis: {
    bestPractices: TechAnalysisSection
    codeFormatting: TechAnalysisSection
    functionality: TechAnalysisSection
    accessibility: TechAnalysisSection
  }
  recommendedNextChallenge: string
  recommendedResources: Array<{
    type: 'video' | 'documentation'
    title: string
    url: string
  }>
  designImages?: string[]
  userScreenshots?: string[]
}

export interface TechAnalysisSection {
  success: string[]
  warning: string[]
  error: string[]
  info: string[]
}

/**
 * Database Types
 */
export interface SubmissionData {
  id: string
  challenge_id: string
  profile_id: string
  challenge_title: string
  github_url: string
  live_site_url: string
  submitted_at: string
  created_at: string
  screenshots?: string[] | null
}

export interface ChallengeData {
  id: string
  title: string
  description: string
  difficulty: string
  category: string
  requirements: string[]
  expected_features: string[]
  // Optional fields from challenge_overview table
  tips?: string[]
  pitfalls?: string[]
  overview_description?: string
  design_images?: string[] | null
}

export interface PreviousFeedback {
  submission_id: string
  overall_score: number
  feedback_summary: string
}

/**
 * AI Context for generating feedback
 */
export interface AIFeedbackContext {
  submission: SubmissionData
  challenge: ChallengeData
  previousFeedback: PreviousFeedback[]
}
