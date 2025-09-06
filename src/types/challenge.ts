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
  rating: number
  requirements: string[]
  tips: string[]
  pitfalls: string[]
  designSpecs: DesignSpecs
  resources: ChallengeResources
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
