export type Challenge = {
  id: number
  title: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  description: string
  technologies: string[]
  participants: number
  estimatedTime?: string | null
  thumbnail_url: string
  created_at: string
  isSaved: boolean
}
