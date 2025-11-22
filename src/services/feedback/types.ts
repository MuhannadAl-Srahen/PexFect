// Database types (Supabase schema)
export interface Feedback {
  id: string
  submission_id: string
  overall_score: number
  overall_rating: string
  overall_analysis_description: string
  best_practices: string[]
  code_formatting: string[]
  functionality: string[]
  accessibility: string[]
  overall_good_practices: string[]
  improvement_advices: string[]
  recommended_next_challenge?: string
  live_preview?: string
  view_code?: string
  created_at: string
  updated_at?: string
}

export interface ChallengeSubmission {
  id: string
  challenge_title: string
  submitted_at: string
  user_id: string
  challenge_id: string
}

// Request/Response types
export interface CreateFeedbackRequest {
  submission_id: string
  overall_score: number
  overall_rating: string
  overall_analysis_description: string
  best_practices: string[]
  code_formatting: string[]
  functionality: string[]
  accessibility: string[]
  overall_good_practices: string[]
  improvement_advices: string[]
  recommended_next_challenge?: string
  live_preview?: string
  view_code?: string
}

// Frontend data structures (UI-focused)
export interface FeedbackData {
  submissionId: string
  challengeTitle: string
  submissionDate: string
  overallScore: number
  scoreLevel: 'Poor' | 'Fair' | 'Good' | 'Excellent'
  overallAnalysis: string
  
  // Submission URLs for user's work
  submissionUrls?: {
    livePreview?: string
    viewCode?: string
  }
  
  // Design Comparison
  designComparison: {
    originalDesign?: string // Made optional for when no image provided
    userResult?: string // Made optional for when user doesn't upload solution image
    keyDifferences: string[]
  }
  
  // Expandable Sections
  bestPractices: FeedbackSection
  codeFormatting: FeedbackSection
  functionality: FeedbackSection
  accessibility: FeedbackSection
  
  // Learning Resources - Updated to match resource structure
  recommendedResources: ResourceItem[]
  
  // Next Challenge Recommendation - Updated to match roadmap structure
  nextChallenge?: NextChallenge
}

export interface FeedbackSection {
  score: number
  title: string
  description: string
  whatYouDidWell: string[]
  areasForImprovement: string[]
  specificFeedback: string[]
  criticalIssues?: string[] // Added for ExpandableSection compatibility
  isExpanded?: boolean
}

export interface ResourceItem {
  id: string
  title: string
  category: string
  description: string
  url?: string
  thumbnail?: string
  author?: string
  difficulty?: string
}

export interface NextChallenge {
  id: string
  title: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  technologies: string[]
  description: string
  estimatedTime?: string
  roadmapPath?: 'beginner' | 'intermediate' | 'advanced'
  challengeCount?: number
  progressPercentage?: number
}

export interface FeedbackProps {
  submissionId: string
}

export interface ExpandableSectionProps {
  section: FeedbackSection
  isExpanded: boolean
  onToggle: () => void
}
