import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Heart, Users } from 'lucide-react'
import type { ChallengeItemProps } from '@/types'

const DIFFICULTY_COLORS = {
  Beginner:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
  Intermediate:
    'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
  Advanced: 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400',
} as const

type DifficultyLevel = keyof typeof DIFFICULTY_COLORS

export function ChallengeGridItem({
  challenge,
  isSaved,
  onToggleSave,
}: ChallengeItemProps) {
  return (
    <a href={`/challenges/${challenge.id}`} className='block h-full group'>
      <Card className='flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.02] py-0 gap-0'>
        {/* Image Section */}
        <div className='relative aspect-[16/9] overflow-hidden rounded-t-xl'>
          <img
            src={challenge.image || '/src/assets/images/girl.jpg'}
            alt={challenge.title}
            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
          />

          {/* Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent' />

          {/* Difficulty Badge */}
          <div className='absolute top-4 left-4'>
            <Badge
              className={`${DIFFICULTY_COLORS[challenge.difficulty as DifficultyLevel]} px-2.5 py-0.5 text-xs border-0 font-semibold shadow-sm`}
            >
              {challenge.difficulty}
            </Badge>
          </div>

          {/* Like Button */}
          <Button
            variant='ghost'
            size='sm'
            className='absolute top-4 right-4 h-10 w-10 rounded-full bg-background/70 backdrop-blur-sm transition-colors'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onToggleSave(challenge.id)
            }}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isSaved
                  ? 'fill-destructive text-destructive'
                  : 'text-muted-foreground group-hover:text-destructive'
              }`}
            />
          </Button>
        </div>

        {/* Content Section */}
        <CardContent className='flex flex-col flex-1 px-6 py-5'>
          <h3 className='mb-3 line-clamp-1 text-lg font-semibold tracking-tight text-card-foreground group-hover:text-primary transition-colors'>
            {challenge.title}
          </h3>

          <p className='mb-4 line-clamp-2 text-sm text-muted-foreground'>
            {challenge.description}
          </p>

          {/* Tags */}
          <div className='mb-4 flex flex-wrap gap-2'>
            {challenge.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant='outline'
                className='rounded-full px-2.5 py-0.5 text-xs font-medium border-border bg-muted/50 text-muted-foreground hover:bg-primary/10 transition-colors'
              >
                {tag}
              </Badge>
            ))}
            {challenge.tags.length > 3 && (
              <Badge
                variant='outline'
                className='rounded-full px-2.5 py-0.5 text-xs font-medium border-border bg-muted/50 text-muted-foreground'
              >
                +{challenge.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className='mt-auto flex items-center justify-between border-t border-border/50 pt-4 text-sm text-muted-foreground'>
            <div className='flex items-center gap-1.5'>
              <Users className='h-4 w-4 text-green-400/80' />
              <span className='font-medium'>
                {challenge.submissions.toLocaleString()}
              </span>
            </div>
            <div className='flex items-center gap-1.5'>
              <Clock className='h-4 w-4 text-primary/80' />
              <span className='font-medium'>{challenge.estimatedTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
