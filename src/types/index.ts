// ============================================================================
// CHALLENGE TYPES
// ============================================================================

export interface Challenge {
  id: number
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
  description: string
  images: ChallengeImage[]
  livePreviewUrl: string
  estimatedTime: string
  completions: number
  submissions?: number // For compatibility with components
  rating: number
  requirements: string[]
  tips: string[]
  pitfalls: string[]
  designSpecs: DesignSpecs
  resources: ChallengeResources
}

// Simplified challenge for list views
export interface ChallengeListItem {
  id: number
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
  description: string
  image?: string
  estimatedTime: string
  submissions: number
}

export interface ChallengeImage {
  url: string
  alt: string
  label: string
}

export interface DesignSpecs {
  typography: Typography
  breakpoints: Record<string, string>
  colorPalette: Record<string, string>
  spacing: Record<string, string>
}

export interface Typography {
  primaryFont: string
  fallbackFonts: string
  fontSizes: Record<string, string>
  fontWeights: Record<string, string>
}

export interface ChallengeResources {
  videos: VideoResource[]
  documents: DocumentResource[]
  guides: GuideResource[]
  tools: ToolResource[]
}

export interface VideoResource {
  title: string
  duration: string
  url: string
  description: string
  thumbnail?: string
}

export interface DocumentResource {
  title: string
  type: string
  url: string
  description: string
}

export interface GuideResource {
  title: string
  url: string
  description: string
}

export interface ToolResource {
  title: string
  description: string
  url: string
  category: string
}

export interface ChallengeSubmission {
  title: string
  githubUrl: string
  liveUrl: string
  screenshot: File | null
  description: string
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export interface ChallengeItemProps {
  challenge: ChallengeListItem
  isSaved: boolean
  onToggleSave: (challengeId: number) => void
}

export interface ChallengeControlsProps {
  searchTerm: string
  selectedDifficulty: string
  selectedLanguage: string
  onSearchChange: (value: string) => void
  onDifficultyChange: (value: string) => void
  onLanguageChange: (value: string) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  filteredCount: number
  totalCount: number
}

export interface ChallengeViewProps {
  challenges: ChallengeListItem[]
  savedChallenges: number[]
  onToggleSave: (challengeId: number) => void
  viewMode: 'grid' | 'list'
}

export interface ChallengeFiltersProps {
  selectedDifficulty: string
  selectedLanguage: string
  onDifficultyChange: (value: string) => void
  onLanguageChange: (value: string) => void
}

// ============================================================================
// AUTH TYPES
// ============================================================================

export interface User {
  id: string
  email: string
  username: string
  fullName: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  username: string
  fullName: string
}

// ============================================================================
// PROFILE TYPES
// ============================================================================

export interface UserProfile {
  id: string
  username: string
  fullName: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  githubUrl?: string
  linkedinUrl?: string
  twitterUrl?: string
  skills: string[]
  experience: ExperienceLevel
  joinedAt: string
  stats: ProfileStats
}

export interface ProfileStats {
  challengesCompleted: number
  totalSubmissions: number
  averageRating: number
  currentStreak: number
  longestStreak: number
  totalPoints: number
}

export type ExperienceLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'Expert'

// ============================================================================
// RESOURCE TYPES
// ============================================================================

export interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  category: string
  url: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
  thumbnail?: string
  duration?: string
  author: string
  publishedAt: string
  rating: number
  views: number
}

export type ResourceType =
  | 'article'
  | 'video'
  | 'course'
  | 'documentation'
  | 'tool'
  | 'template'

// ============================================================================
// ROADMAP TYPES
// ============================================================================

export interface RoadmapNode {
  id: string
  title: string
  description: string
  type: NodeType
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  prerequisites: string[]
  resources: string[]
  status: NodeStatus
  position: { x: number; y: number }
  connections: string[]
}

export type NodeType = 'concept' | 'skill' | 'project' | 'milestone'
export type NodeStatus = 'locked' | 'available' | 'in-progress' | 'completed'

export interface Roadmap {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  nodes: RoadmapNode[]
  tags: string[]
}

// ============================================================================
// FEEDBACK TYPES
// ============================================================================

export interface Feedback {
  id: string
  submissionId: string
  challengeId: string
  userId: string
  reviewerId?: string
  content: string
  rating: number
  suggestions: string[]
  createdAt: string
  updatedAt: string
  status: FeedbackStatus
}

export type FeedbackStatus = 'pending' | 'reviewed' | 'addressed'

export interface SubmissionFeedback {
  overall: number
  codeQuality: number
  design: number
  functionality: number
  responsiveness: number
  comments: FeedbackComment[]
}

export interface FeedbackComment {
  id: string
  line?: number
  file?: string
  comment: string
  type: 'suggestion' | 'issue' | 'praise'
  resolved: boolean
}

// ============================================================================
// USER DATA TYPES
// ============================================================================

export interface UserData {
  fullName: string
  username: string
  initials: string
  avatarUrl?: string
}
