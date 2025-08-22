import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Heart, Users } from 'lucide-react'
import { DIFFICULTY_COLORS, type DifficultyLevel } from '../constants'
import type { ChallengeItemProps } from '../types'

export function ChallengeGridItem({
  challenge,
  isSaved,
  onToggleSave,
}: ChallengeItemProps) {
  return (
    <a href={`/challenges/${challenge.id}`} className='block h-full group'>
      <Card className='flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.02]'>
        {/* Image Section */}
        <div className='relative aspect-[16/9] overflow-hidden rounded-t-xl'>
          <img
            src='/src/assets/images/girl.jpg'
            alt={challenge.title}
            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
          />

          {/* Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent' />

          {/* Difficulty Badge */}
          <div className='absolute top-3 left-3'>
            <Badge
              className={`${DIFFICULTY_COLORS[challenge.difficulty as DifficultyLevel]} px-3 py-1 text-xs border-0 font-semibold shadow-sm`}
            >
              {challenge.difficulty}
            </Badge>
          </div>

          {/* Like Button */}
          <Button
            variant='ghost'
            size='sm'
            className='absolute top-3 right-3 h-9 w-9 rounded-full bg-background/70 backdrop-blur-sm transition-colors'
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
        <CardContent className='flex flex-col flex-1 px-4 py-5'>
          <h3 className='mb-2 line-clamp-1 text-lg font-semibold tracking-tight text-card-foreground group-hover:text-primary transition-colors'>
            {challenge.title}
          </h3>

          <p className='mb-3 line-clamp-2 text-sm text-muted-foreground'>
            {challenge.description}
          </p>

          {/* Tags */}
          <div className='mb-6 flex flex-wrap gap-2'>
            {challenge.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant='outline'
                className='rounded-full px-3 py-1 text-xs font-medium border-border bg-muted/50 text-muted-foreground hover:bg-primary/10 transition-colors'
              >
                {tag}
              </Badge>
            ))}
            {challenge.tags.length > 3 && (
              <Badge
                variant='outline'
                className='rounded-full px-3 py-1 text-xs font-medium border-border bg-muted/50 text-muted-foreground'
              >
                +{challenge.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className='mt-auto flex items-center justify-between border-t border-border/50 pt-4 px-3 text-sm text-muted-foreground'>
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
