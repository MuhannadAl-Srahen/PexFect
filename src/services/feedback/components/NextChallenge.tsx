import { Target, Clock, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { useChallenges } from '@/services/challenges/hooks/useChallenges'
import { getBadgeColors } from '@/services/Resources/utils/badgeColors'
import type { ChallengeListItem } from '@/types'

const DIFFICULTY_COLORS = {
  Beginner:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
  Intermediate:
    'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
  Advanced: 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400',
} as const

type DifficultyLevel = keyof typeof DIFFICULTY_COLORS

interface NextChallengeProps {
  nextChallenge?: {
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
}

export function NextChallenge({ nextChallenge }: NextChallengeProps) {
  // Fetch real challenges data
  const { data: challenges = [] } = useChallenges()
  
  // Use real challenge data or fallback to passed props
  const challenge: ChallengeListItem | null = challenges[0] || null

  if (!challenge && !nextChallenge) return null

  const displayChallenge = challenge || {
    id: nextChallenge!.id,
    title: nextChallenge!.title,
    difficulty: nextChallenge!.difficulty.charAt(0).toUpperCase() + nextChallenge!.difficulty.slice(1) as 'Beginner' | 'Intermediate' | 'Advanced',
    tags: nextChallenge!.technologies,
    description: nextChallenge!.description,
    estimatedTime: nextChallenge!.estimatedTime || '2-3 hours',
    submissions: 0,
    image: undefined,
  }

  const getDifficultyColor = (difficulty: string) => {
    const normalizedDifficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()
    return DIFFICULTY_COLORS[normalizedDifficulty as DifficultyLevel] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }

  return (
    <Card className='p-4 md:p-6 bg-gradient-to-b from-primary/5 to-background border-primary/20'>
      <div className='flex items-center mb-4'>
        <Target className='w-5 h-5 text-primary mr-2' />
        <h3 className='text-lg md:text-xl font-bold text-foreground'>Recommended Next</h3>
      </div>
      
      <p className='text-sm text-muted-foreground mb-4'>Based on your current skills</p>

      {/* Challenge Card with same style as challenges page */}
      <Link to='/challenges/$id' params={{ id: displayChallenge.id }} className='block group'>
        <Card className='flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.02] py-0 gap-0'>
          {/* Image Section */}
          <div className='relative aspect-[16/9] overflow-hidden rounded-t-xl'>
            <img
              src={displayChallenge.image || '/src/assets/images/girl.jpg'}
              alt={displayChallenge.title}
              className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
            />

            {/* Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent' />

            {/* Difficulty Badge */}
            <div className='absolute top-4 left-4'>
              <Badge
                className={`${getDifficultyColor(displayChallenge.difficulty)} px-2.5 py-0.5 text-xs border-0 font-semibold shadow-sm`}
              >
                {displayChallenge.difficulty}
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <CardContent className='flex flex-col flex-1 px-6 py-5'>
            <h4 className='mb-3 line-clamp-1 text-lg font-semibold tracking-tight text-card-foreground group-hover:text-primary transition-colors'>
              {displayChallenge.title}
            </h4>

            <p className='mb-4 line-clamp-2 text-sm text-muted-foreground'>
              {displayChallenge.description}
            </p>

            {/* Tags */}
            <div className='mb-4 flex flex-wrap gap-2'>
              {displayChallenge.tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  variant='outline'
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${getBadgeColors(tag)}`}
                >
                  {tag}
                </Badge>
              ))}
              {displayChallenge.tags.length > 3 && (
                <Badge
                  variant='outline'
                  className='rounded-full px-2.5 py-0.5 text-xs font-medium border-border bg-muted/50 text-muted-foreground'
                >
                  +{displayChallenge.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Stats */}
            <div className='mt-auto flex items-center justify-between border-t border-border/50 pt-4 text-sm text-muted-foreground'>
              <div className='flex items-center gap-1.5'>
                <Users className='h-4 w-4 text-green-400/80' />
                <span className='font-medium'>
                  {displayChallenge.submissions?.toLocaleString() || '0'}
                </span>
              </div>
              <div className='flex items-center gap-1.5'>
                <Clock className='h-4 w-4 text-primary/80' />
                <span className='font-medium'>{displayChallenge.estimatedTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Card>
  )
}