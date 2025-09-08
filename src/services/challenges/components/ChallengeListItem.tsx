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

export function ChallengeListItem({
  challenge,
  isSaved,
  onToggleSave,
}: ChallengeItemProps) {
  return (
    <a
      href={`/challenges/${challenge.id}`}
      className='block group focus:outline-none focus-visible:ring focus-visible:ring-primary/50 rounded-xl'
    >
      <Card className='overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm hover:shadow-xl transition-transform duration-300 relative hover:scale-[1.02] py-0'>
        {/* Like button */}

        <div className='flex flex-col md:flex-row '>
          {/* Image Section */}
          <div className='relative w-full h-40 md:w-48 md:h-42 flex-shrink-0 overflow-hidden'>
            <img
              src={challenge.image || '/src/assets/images/girl.jpg'}
              alt={challenge.title}
              className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
              loading='lazy'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent' />
          </div>

          {/* Difficulty Badge */}
          <div className='absolute top-2 left-2'>
            <Badge
              className={`${DIFFICULTY_COLORS[challenge.difficulty as DifficultyLevel]} px-2.5 py-0.5 text-xs font-semibold border-0 shadow-sm`}
            >
              {challenge.difficulty}
            </Badge>
          </div>

          {/* Content Section */}
          <CardContent className='flex flex-1 flex-col !p-4'>
            <div className='flex flex-1 flex-col gap-3.5'>
              <div className='flex items-start gap-3 justify-between'>
                <h3 className='mb-2 line-clamp-1 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors'>
                  {challenge.title}
                </h3>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm transition-all duration-300 flex-shrink-0'
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

              <p className='mb-3 line-clamp-2 text-sm text-muted-foreground'>
                {challenge.description}
              </p>

              {/* Tags + Stats */}
              <div className=' flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40'>
                {/* Tags */}
                <div className='flex flex-wrap gap-1.5'>
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
                <div className='flex items-center gap-6 text-sm text-muted-foreground'>
                  <div className='flex items-center gap-1'>
                    <Users className='h-4 w-4 text-green-400/80' />
                    <span>{challenge.submissions.toLocaleString()}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Clock className='h-4 w-4 text-primary/80' />
                    <span>{challenge.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </a>
  )
}
