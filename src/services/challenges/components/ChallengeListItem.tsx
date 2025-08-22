import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Heart, Users } from 'lucide-react'
import { DIFFICULTY_COLORS, type DifficultyLevel } from '../constants'
import type { ChallengeItemProps } from '../types'

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
      <Card className='overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm hover:shadow-md transition-transform duration-300 relative hover:scale-[102%]'>
        {/* Like button */}

        <div className='flex flex-col md:flex-row '>
          {/* Image Section */}
          <div className='relative w-full md:w-64 h-48 md:h-40 flex-shrink-0 overflow-hidden'>
            <img
              src='/src/assets/images/hollow.jpg'
              alt={challenge.title}
              className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
              loading='lazy'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent' />

            {/* Difficulty Badge */}
            <div className='absolute top-1 left-2'>
              <Badge
                className={`${DIFFICULTY_COLORS[challenge.difficulty as DifficultyLevel]} px-2 py-0.5 text-[11px] font-semibold border-0 shadow-sm`}
              >
                {challenge.difficulty}
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <CardContent className='flex flex-1 flex-col !p-4 md:!px-7'>
            <div className='flex items-center gap-2 justify-between'>
              <h3 className='mb-2 line-clamp-1 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors'>
                {challenge.title}
              </h3>
              <Button
                variant='ghost'
                size='sm'
                className='h-9 w-9 rounded-full bg-background/70 backdrop-blur-sm transition-all'
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onToggleSave(challenge.id)
                }}
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${
                    isSaved
                      ? 'fill-destructive text-destructive'
                      : 'text-muted-foreground group-hover:text-destructive'
                  }`}
                />
              </Button>
            </div>

            <p className='mb-3 line-clamp-2 text-sm md:text-base text-muted-foreground'>
              {challenge.description}
            </p>

            {/* Tags + Stats */}
            <div className='mt-auto flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/40'>
              {/* Tags */}
              <div className='flex flex-wrap gap-1.5'>
                {challenge.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant='outline'
                    className='rounded-full px-2 py-0.5 text-[11px] font-medium border-border bg-muted/50 text-muted-foreground hover:bg-primary/10 transition-colors'
                  >
                    {tag}
                  </Badge>
                ))}
                {challenge.tags.length > 3 && (
                  <Badge
                    variant='outline'
                    className='rounded-full px-2 py-0.5 text-[11px] font-medium border-border bg-muted/50 text-muted-foreground'
                  >
                    +{challenge.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className='flex items-center gap-6 text-xs md:text-sm text-muted-foreground'>
                <div className='flex items-center gap-1'>
                  <Users className='h-3.5 w-3.5 text-green-400/80' />
                  <span>{challenge.submissions.toLocaleString()}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Clock className='h-3.5 w-3.5 text-primary/80' />
                  <span>{challenge.estimatedTime}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </a>
  )
}
