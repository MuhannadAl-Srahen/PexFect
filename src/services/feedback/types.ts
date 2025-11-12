export interface FeedbackData {
  submissionId: string
  challengeTitle: string
  submissionDate: string
  overallScore: number
  scoreLevel: 'Poor' | 'Fair' | 'Good' | 'Excellent'
  overallAnalysis: string
  
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
