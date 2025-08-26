import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Users, Clock } from 'lucide-react'
import { DIFFICULTY_COLORS, type DifficultyLevel } from '../constants'
import type { ChallengeItemProps } from '../types'

export function ChallengeListItem({ challenge, isSaved, onToggleSave }: ChallengeItemProps) {
  return (
    <a href={`/challenges/${challenge.id}`} className="block group rounded-xl">
      <Card className="flex flex-col md:flex-row border border-border/50 shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-[102%]">
        <div className="relative w-full md:w-64 h-48 md:h-40 flex-shrink-0 overflow-hidden">
          <img src={challenge.thumbnail_url} alt={challenge.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute top-1 left-2">
            <Badge className={`${DIFFICULTY_COLORS[challenge.difficulty as DifficultyLevel]} px-2 py-0.5 text-[11px] font-semibold border-0 shadow-sm`}>
              {challenge.difficulty}
            </Badge>
          </div>
        </div>

        <CardContent className="flex-1 flex flex-col p-4 md:p-6">
          <div className="flex justify-between items-start">
            <h3 className="mb-2 text-lg font-semibold">{challenge.title}</h3>
            <Button
              variant='ghost'
              size='sm'
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleSave(challenge.id) }}
            >
              <Heart className={`h-5 w-5 ${isSaved ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
            </Button>
          </div>

          <p className="mb-4 text-sm">{challenge.description}</p>

          <div className="flex justify-between items-center mt-auto text-sm text-muted-foreground">
            <div className="flex gap-1">
              <Users className="h-4 w-4 text-green-400/80" /> {challenge.participants}
            </div>
            <div className="flex gap-1">
              <Clock className="h-4 w-4 text-primary/80" /> {challenge.estimatedTime}
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
