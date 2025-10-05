import React from 'react'
import { Link } from '@tanstack/react-router'
import type { ChallengeListItem } from '@/types'
import { learningPaths } from '../data'
import { challenges } from '../../challenges/data'
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
// import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const LEVEL_TAG_STYLES: Record<string, string> = {
  Beginner:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
  Intermediate:
    'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
  Advanced:
    'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400',
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
      <div className="relative w-full md:w-48 h-44 md:h-auto md:aspect-auto -my-6 flex-shrink-0 overflow-hidden">
        <img
          src={challenge.image || '/src/assets/images/girl.jpg'}
          alt={challenge.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${LEVEL_TAG_STYLES[challenge.difficulty]} px-2.5 py-0.5 text-xs border-0 font-semibold shadow-sm`}>
            {challenge.difficulty}
          </Badge>
        </div>
        {/* Lock icon (mobile only, top-right) */}
        {!unlocked && (
          <div className="absolute top-3 right-3 md:hidden bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow">
              <Lock size={18} className="text-gray-400" />
            </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="flex flex-1  flex-col px-4 justify-between">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg md:text-xl font-semibold text-card-foreground line-clamp-1 hover:text-primary transition-colors mt-3 md:mt-0">
            {challenge.title}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{challenge.description}</p>

        {/* Mobile: Techs above line, stats below line split corners. Desktop: Techs left, stats right */}
        <div className="block md:hidden">
          <div className="flex flex-wrap gap-2 mb-2">
            {challenge.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-full px-2.5 py-0.5 text-xs font-medium border-border bg-muted/50 text-muted-foreground hover:bg-primary/10 transition-colors">
                {tag}
              </Badge>
            ))}
            {challenge.tags && challenge.tags.length > 3 && (
              <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-xs font-medium border-border bg-muted/50 text-muted-foreground">+{challenge.tags.length - 3}</Badge>
            )}
          </div>

          <div className="border-t border-border/50 pt-2 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary/80" />
              <span className="font-medium">{challenge.estimatedTime ?? '—'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-green-400/80" />
              <span className="font-medium">{(challenge.submissions ?? 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col md:flex-row md:items-center md:justify-between mt-auto border-t border-border/50 pt-3 gap-3 text-sm text-muted-foreground">
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {challenge.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-full px-2.5 py-0.5 text-xs font-medium border-border bg-muted/50 text-muted-foreground hover:bg-primary/10 transition-colors">
                {tag}
              </Badge>
            ))}
            {challenge.tags && challenge.tags.length > 3 && (
              <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-xs font-medium border-border bg-muted/50 text-muted-foreground">+{challenge.tags.length - 3}</Badge>
            )}
          </div>

          <div className="flex items-center gap-6 order-1 md:order-2 justify-end md:justify-end w-full md:w-auto">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-green-400/80" />
              <span className="font-medium">{(challenge.submissions ?? 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary/80" />
              <span className="font-medium">{challenge.estimatedTime ?? '—'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )

  return (
    <div className="relative flex w-full">
      {/* Timeline column (hidden on mobile) */}
      <div className="hidden md:flex flex-col items-center mr-4 min-w-[44px]">
        <div className={`w-1 h-5 bg-gray-200 dark:bg-gray-700 ${index === 0 ? 'invisible' : ''}`} />
        <div className={`rounded-full bg-white dark:bg-gray-800 border-2 ${unlocked ? 'border-emerald-400' : 'border-gray-300 dark:border-gray-600'} flex items-center justify-center w-9 h-9 z-10`}>
          {unlocked ? <PlayCircle size={20} className="text-emerald-400" /> : <Lock size={16} className="text-gray-400" />}
        </div>
        <div className={`w-1 flex-1 bg-gray-200 dark:bg-gray-700 ${isLast ? 'invisible' : ''}`} />
      </div>

      {unlocked ? (
        <Link to="/challenges/$id" params={{ id: `${challenge.id}` }} className="flex-1">
          <Card className={`flex-1 flex flex-col md:flex-row overflow-hidden mb-6 border border-border/50 shadow-md hover:shadow-xl hover:scale-[1.01] transition-transform duration-300`}>
            {inner}
          </Card>
        </Link>
      ) : (
        <div className="w-full" aria-disabled="true">
          <Card className={`flex-1 flex flex-col md:flex-row overflow-hidden mb-6 border border-border/50 shadow-md opacity-60 cursor-not-allowed`} role="button" aria-disabled="true">
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
  beginner: <BookOpen className="w-7 h-7 text-white" />,
  intermediate: <Zap className="w-7 h-7 text-white" />,
  advanced: <Trophy className="w-7 h-7 text-white" />,
}

const SOLID_BG = {
  beginner: 'bg-green-500',
  intermediate: 'bg-yellow-500',
  advanced: 'bg-red-500',
}

const GRADIENT_BG = {
  beginner: 'bg-gradient-to-br from-green-50 via-green-100 to-white dark:from-emerald-900/20 dark:via-emerald-900/12 dark:to-emerald-900/6',
  intermediate: 'bg-gradient-to-br from-yellow-50 via-yellow-100 to-white dark:from-amber-900/20 dark:via-amber-900/12 dark:to-amber-900/6',
  advanced: 'bg-gradient-to-br from-red-50 via-red-100 to-white dark:from-rose-900/20 dark:via-rose-900/12 dark:to-rose-900/6',
}

const DARK_LEVEL_TINT = {
  beginner: 'dark:bg-emerald-900/6',
  intermediate: 'dark:bg-amber-900/6',
  advanced: 'dark:bg-rose-900/6',
}

const TITLE_COLORS = {
  beginner: 'text-gray-900',
  intermediate: 'text-gray-900',
  advanced: 'text-gray-900',
}

const SUBTITLE_COLORS = {
  beginner: 'text-green-700',
  intermediate: 'text-yellow-700',
  advanced: 'text-red-700',
}

const PROGRESS_COLORS = {
  beginner: 'text-green-600',
  intermediate: 'text-yellow-600',
  advanced: 'text-red-600',
}

const PathDetails: React.FC<PathDetailsProps> = ({ pathId }) => {
  const path = learningPaths.find((p) => p.id === pathId)
  const challengeMap = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }
  const pathChallenges = challenges.filter(
    (c) => c.difficulty === challengeMap[pathId]
  )
  const totalChallenges = pathChallenges.length
  const completedChallenges = 0
  const progress =
    totalChallenges > 0
      ? Math.round((completedChallenges / totalChallenges) * 100)
      : 0

  if (!path) return null

  return (
    <div className="w-full flex flex-col items-center px-2">
      <div className="w-full max-w-5xl mx-auto mb-4 mt-2">
        <Link
          to="/roadmap"
          className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium text-md px-3 py-2 rounded-md transition-colors bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
          aria-label="Back to Roadmap"
        >
          <ArrowLeft size={18} />
          Back to Roadmap
        </Link>
      </div>

      {/* Header */}
      <div
        className={`w-full max-w-5xl rounded-3xl shadow-md px-6 md:px-14 pt-8 pb-10 mb-10 border border-transparent relative ${GRADIENT_BG[pathId]} ${DARK_LEVEL_TINT[pathId]} dark:shadow-none`}
        style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)' }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:gap-5 mb-6 text-center md:text-left">
          <div className="flex justify-center md:block mb-4 md:mb-0">
            <div
              className={`rounded-xl p-4 md:p-3 ${SOLID_BG[pathId]} flex items-center justify-center shadow-sm mx-auto md:mx-0`}
            >
              {ICONS[pathId]}
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h1
              className={`text-3xl font-extrabold mb-1 tracking-tight ${TITLE_COLORS[pathId]} dark:text-gray-100`}
            >
              {path.title}
            </h1>
            <div className={`text-base font-semibold ${SUBTITLE_COLORS[pathId]} dark:text-gray-300`}>
              {pathId === 'beginner' && <span>Start from Zero</span>}
              {pathId === 'intermediate' && <span>Level Up Your Skills</span>}
              {pathId === 'advanced' && <span>Master Professional Development</span>}
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-snug mb-7 max-w-2xl md:text-left text-center mx-auto break-words whitespace-pre-line">
          {path.description}
        </p>

        {/* Stats */}
        <div className="mt-6">
            <div className="hidden md:grid grid-cols-4 gap-6 w-full max-w-3xl mx-auto">
            <div className="bg-card dark:bg-card rounded-2xl py-4 px-4 flex flex-col justify-center items-center text-center border border-border/50 shadow-sm">
              <span className="text-xl font-extrabold text-card-foreground leading-none mb-1">
                {totalChallenges}
              </span>
              <span className="text-sm text-muted-foreground font-medium">
                Total Challenges
              </span>
            </div>
            <div className="bg-card dark:bg-card rounded-2xl py-4 px-4 flex flex-col justify-center items-center text-center border border-border/50 shadow-sm">
              <span className="text-xl font-extrabold text-card-foreground leading-none mb-1">
                {completedChallenges}
              </span>
              <span className="text-sm text-muted-foreground font-medium">Completed</span>
            </div>
            <div className="bg-card dark:bg-card rounded-2xl py-4 px-4 flex flex-col justify-center items-center text-center border border-border/50 shadow-sm">
              <span
                className={`text-xl font-extrabold leading-none mb-1 ${PROGRESS_COLORS[pathId]} text-card-foreground`}
              >
                {progress}%
              </span>
              <span className="text-sm text-muted-foreground font-medium">Progress</span>
            </div>
            <div className="bg-card dark:bg-card rounded-2xl py-4 px-4 flex flex-col justify-center items-center text-center border border-border/50 shadow-sm">
              <span className="text-xl font-extrabold text-card-foreground leading-none mb-1">
                {path.duration}
              </span>
              <span className="text-sm text-muted-foreground font-medium">Duration</span>
            </div>
          </div>

          {/* Mobile Stats - compact 2-up grid */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs mx-auto md:hidden">
            <div className="bg-card dark:bg-card rounded-2xl py-3 px-3 flex flex-col items-center border border-border/50 shadow-sm">
              <span className="text-lg font-bold text-card-foreground leading-none mb-0.5">
                {totalChallenges}
              </span>
              <span className="text-[11px] text-muted-foreground font-medium">Total Challenges</span>
            </div>
            <div className="bg-card dark:bg-card rounded-2xl py-3 px-3 flex flex-col items-center border border-border/50 shadow-sm">
              <span className="text-lg font-bold text-card-foreground leading-none mb-0.5">
                {completedChallenges}
              </span>
              <span className="text-[11px] text-muted-foreground font-medium">Completed</span>
            </div>
            <div className="bg-card dark:bg-card rounded-2xl py-3 px-3 flex flex-col items-center border border-border/50 shadow-sm">
              <span className={`text-lg font-bold leading-none mb-0.5 ${PROGRESS_COLORS[pathId]} text-card-foreground`}>
                {progress}%
              </span>
              <span className="text-[11px] text-muted-foreground font-medium">Progress</span>
            </div>
            <div className="bg-card dark:bg-card rounded-2xl py-3 px-3 flex flex-col items-center border border-border/50 shadow-sm">
              <span className="text-lg font-bold text-card-foreground leading-none mb-0.5">
                {path.duration}
              </span>
              <span className="text-[11px] text-muted-foreground font-medium">Duration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge list */}
      <div className="w-full flex flex-col items-center mt-2">
        {pathChallenges.length === 0 ? (
          <div className="text-gray-400 text-center py-10">
            No challenges found for this path.
          </div>
        ) : (
          <div className="flex flex-col gap-0 w-full max-w-5xl mx-auto">
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
