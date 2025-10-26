import React from 'react'
import { Link } from '@tanstack/react-router'
import type { ChallengeListItem } from '@/types'
import { learningPaths } from '../data'
import { useMemo } from 'react'
import { useChallenges } from '@/services/challenges/hooks/useChallenges'
import {
  ArrowLeft,
  BookOpen,
  Zap,
  Trophy,
  PlayCircle,
  Lock,
  Clock,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const LEVEL_TAG_STYLES: Record<string, string> = {
  Beginner: 'bg-primary/10 text-primary border-primary/20',
  Intermediate: 'bg-primary/10 text-primary border-primary/20',
  Advanced: 'bg-primary/10 text-primary border-primary/20',
}

const CHALLENGE_MAP: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

/* ---------- TimelineChallengeCard (UI updated) ---------- */
const TimelineChallengeCard: React.FC<{
  challenge: ChallengeListItem
  index: number
  unlocked: boolean
  isLast: boolean
}> = ({ challenge, index, unlocked, isLast }) => {
  // shared inner content (image + card content)
  const inner = (
    <>
      {/* Image Section */}
      {/* mobile: fixed height so image fills the top of the card; md: let it size by content */}
      <div className='relative w-full md:w-48 h-44 md:h-auto md:aspect-auto -my-6 flex-shrink-0 overflow-hidden'>
        <img
          src={challenge.image || '/src/assets/images/girl.jpg'}
          alt={challenge.title}
          className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent' />
        {/* Difficulty Badge */}
        <div className='absolute top-3 left-3'>
          <Badge
            className={`${LEVEL_TAG_STYLES[challenge.difficulty]} px-2.5 py-0.5 text-xs border-0 font-semibold shadow-sm`}
          >
            {challenge.difficulty}
          </Badge>
        </div>
        {/* Lock icon (mobile only, top-right) */}
        {!unlocked && (
          <div className='absolute top-3 right-3 md:hidden bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow'>
            <Lock size={18} className='text-gray-400' />
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className='flex flex-1  flex-col px-4 justify-between'>
        <div className='flex items-start justify-between mb-2'>
          <h3 className='text-lg md:text-xl font-semibold text-card-foreground line-clamp-1 hover:text-primary transition-colors mt-3 md:mt-0'>
            {challenge.title}
          </h3>
        </div>
        <p className='text-sm text-muted-foreground mb-3 line-clamp-2'>
          {challenge.description}
        </p>

        {/* Mobile: Techs above line, stats below line split corners. Desktop: Techs left, stats right */}
        <div className='block md:hidden'>
          <div className='flex flex-wrap gap-2 mb-2'>
            {challenge.tags?.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant='outline'
                className='rounded-full px-2.5 py-0.5 text-xs font-medium border-border bg-muted/50 text-muted-foreground hover:bg-primary/10 transition-colors'
              >
                {tag}
              </Badge>
            ))}
            {challenge.tags && challenge.tags.length > 3 && (
              <Badge
                variant='outline'
                className='rounded-full px-2.5 py-0.5 text-xs font-medium border-border bg-muted/50 text-muted-foreground'
              >
                +{challenge.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className='border-t border-border/50 pt-2 flex items-center justify-between text-sm text-muted-foreground'>
            <div className='flex items-center gap-1.5'>
              <Clock className='h-4 w-4 text-primary/80' />
              <span className='font-medium'>
                {challenge.estimatedTime ?? '—'}
              </span>
            </div>
            <div className='flex items-center gap-1.5'>
              <Users className='h-4 w-4 text-green-400/80' />
              <span className='font-medium'>
                {(challenge.submissions ?? 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className='hidden md:flex flex-col md:flex-row md:items-center md:justify-between mt-auto border-t border-border/50 pt-3 gap-3 text-sm text-muted-foreground'>
          <div className='flex flex-wrap gap-2 order-2 md:order-1'>
            {challenge.tags?.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant='outline'
                className='rounded-full px-2.5 py-0.5 text-xs font-medium border-border bg-muted/50 text-muted-foreground hover:bg-primary/10 transition-colors'
              >
                {tag}
              </Badge>
            ))}
            {challenge.tags && challenge.tags.length > 3 && (
              <Badge
                variant='outline'
                className='rounded-full px-2.5 py-0.5 text-xs font-medium border-border bg-muted/50 text-muted-foreground'
              >
                +{challenge.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className='flex items-center gap-6 order-1 md:order-2 justify-end md:justify-end w-full md:w-auto'>
            <div className='flex items-center gap-1.5'>
              <Users className='h-4 w-4 text-green-400/80' />
              <span className='font-medium'>
                {(challenge.submissions ?? 0).toLocaleString()}
              </span>
            </div>
            <div className='flex items-center gap-1.5'>
              <Clock className='h-4 w-4 text-primary/80' />
              <span className='font-medium'>
                {challenge.estimatedTime ?? '—'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )

  return (
    <div className='relative flex w-full'>
      {/* Timeline column (hidden on mobile) */}
      <div className='hidden md:flex flex-col items-center mr-6 min-w-[48px]'>
        <div
          className={`w-0.5 h-6 bg-gradient-to-b from-primary/20 to-primary/40 ${index === 0 ? 'invisible' : ''}`}
        />
        <div
          className={`rounded-full ${unlocked ? 'bg-primary shadow-lg shadow-primary/25' : 'bg-muted border-2 border-muted-foreground/20'} flex items-center justify-center w-10 h-10 z-10 transition-all duration-300`}
        >
          {unlocked ? (
            <PlayCircle size={20} className='text-white' />
          ) : (
            <Lock size={16} className='text-muted-foreground' />
          )}
        </div>
        <div
          className={`w-0.5 flex-1 bg-gradient-to-b from-primary/40 to-primary/20 ${isLast ? 'invisible' : ''}`}
        />
      </div>

      {unlocked ? (
        <Link
          to='/challenges/$id'
          params={{ id: `${challenge.id}` }}
          className='flex-1'
        >
          <Card
            className={`flex-1 flex flex-col md:flex-row overflow-hidden mb-6 border border-primary/10 shadow-lg hover:shadow-2xl hover:scale-[1.01] hover:border-primary/20 transition-all duration-300 bg-gradient-to-r from-card to-card/95`}
          >
            {inner}
          </Card>
        </Link>
      ) : (
        <div className='w-full' aria-disabled='true'>
          <Card
            className={`flex-1 flex flex-col md:flex-row overflow-hidden mb-6 border border-border/30 shadow-md opacity-50 cursor-not-allowed transition-all duration-300 bg-muted/30`}
            role='button'
            aria-disabled='true'
          >
            {inner}
          </Card>
        </div>
      )}
    </div>
  )
}

/* ---------- PathDetails (default export) ---------- */
interface PathDetailsProps {
  pathId: 'beginner' | 'intermediate' | 'advanced'
}

const ICONS = {
  beginner: <BookOpen className='w-7 h-7 text-white' />,
  intermediate: <Zap className='w-7 h-7 text-white' />,
  advanced: <Trophy className='w-7 h-7 text-white' />,
}

const SOLID_BG = {
  beginner: 'bg-primary',
  intermediate: 'bg-primary',
  advanced: 'bg-primary',
}

const PathDetails: React.FC<PathDetailsProps> = ({ pathId }) => {
  const path = learningPaths.find((p) => p.id === pathId)

  // Use React Query hook to fetch challenges
  const { data: allChallenges = [], isLoading } = useChallenges()

  // Filter challenges by difficulty level
  const pathChallenges: ChallengeListItem[] = useMemo(() => {
    return allChallenges.filter((c) => c.difficulty === CHALLENGE_MAP[pathId])
  }, [allChallenges, pathId])

  const totalChallenges = pathChallenges.length
  const completedChallenges = 0
  const progress =
    totalChallenges > 0
      ? Math.round((completedChallenges / totalChallenges) * 100)
      : 0

  if (!path) return null

  return (
    <div className='max-w-6xl flex flex-col items-center px-2'>
      {/* Back Button */}
      <div className='w-full max-w-5xl mx-auto mb-6 mt-2'>
        <Link
          to='/roadmap'
          className='inline-flex items-center gap-2 text-muted-foreground font-medium text-md px-3 py-2 rounded-md transition-all duration-300 bg-transparent hover:bg-muted hover:text-foreground cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary'
          aria-label='Back to Roadmap'
        >
          <ArrowLeft size={18} />
          Back to Roadmap
        </Link>
      </div>

      {/* Hero Section */}
      <div className='w-full max-w-5xl mx-auto mb-10 md:mb-12'>
        <div className='bg-gradient-to-br from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent rounded-3xl border border-primary/10 p-8 md:p-12 relative overflow-hidden'>
          {/* Background decoration */}
          <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -translate-y-32 translate-x-32'></div>

          <div className='relative z-10'>
            <div className='flex items-center gap-6 mb-5'>
              {/* Icon */}
              <div
                className={`rounded-2xl p-4 md:p-5 ${SOLID_BG[pathId]} shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex-shrink-0`}
              >
                {ICONS[pathId]}
              </div>

              {/* Title and Description */}
              <div className='text-left flex-1'>
                <h1 className='text-3xl md:text-4xl font-bold text-primary tracking-tight mb-2 '>
                  {path.title}
                </h1>
                <p className='text-base md:text-lg text-muted-foreground leading-relaxed'>
                  {path.description}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto'>
              <Card className='bg-card/50 backdrop-blur-sm border-primary/10 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:bg-card/80'>
                <CardContent className='p-3 md:p-4 text-center'>
                  <div className='text-xl md:text-2xl font-bold text-primary mb-1'>
                    {totalChallenges}
                  </div>
                  <div className='text-xs text-muted-foreground font-medium'>
                    Challenges
                  </div>
                </CardContent>
              </Card>

              <Card className='bg-card/50 backdrop-blur-sm border-primary/10 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:bg-card/80'>
                <CardContent className='p-3 md:p-4 text-center'>
                  <div className='text-xl md:text-2xl font-bold text-foreground mb-1'>
                    {completedChallenges}
                  </div>
                  <div className='text-xs text-muted-foreground font-medium'>
                    Completed
                  </div>
                </CardContent>
              </Card>

              <Card className='bg-card/50 backdrop-blur-sm border-primary/10 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:bg-card/80'>
                <CardContent className='p-3 md:p-4 text-center'>
                  <div className='text-xl md:text-2xl font-bold text-primary mb-1'>
                    {progress}%
                  </div>
                  <div className='text-xs text-muted-foreground font-medium'>
                    Progress
                  </div>
                </CardContent>
              </Card>

              <Card className='bg-card/50 backdrop-blur-sm border-primary/10 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:bg-card/80'>
                <CardContent className='p-3 md:p-4 text-center'>
                  <div className='text-xl md:text-2xl font-bold text-foreground mb-1'>
                    {path.duration}
                  </div>
                  <div className='text-xs text-muted-foreground font-medium'>
                    Duration
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge list */}
      <div className='w-full flex flex-col items-center mt-2'>
        {isLoading ? (
          <div className='text-muted-foreground text-center py-10'>
            <div className='animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4'></div>
            Loading challenges...
          </div>
        ) : pathChallenges.length === 0 ? (
          <div className='text-muted-foreground text-center py-10'>
            No challenges found for this path.
          </div>
        ) : (
          <div className='flex flex-col gap-0 w-full max-w-5xl mx-auto'>
            {pathChallenges.map((challenge, idx) => (
              <TimelineChallengeCard
                key={challenge.id}
                challenge={challenge}
                index={idx}
                unlocked={idx === 0}
                isLast={idx === pathChallenges.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PathDetails
