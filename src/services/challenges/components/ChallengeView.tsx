import { ChallengeGridItem } from './ChallengeGridItem'
import { ChallengeListItem } from './ChallengeListItem'
import type { ChallengeViewProps } from '../types'

export function ChallengeView({ challenges, savedChallenges, onToggleSave, viewMode }: ChallengeViewProps) {
  if (viewMode === 'grid') {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
        {challenges.map(ch => (
          <ChallengeGridItem
            key={ch.id}
            challenge={ch}
            isSaved={savedChallenges.includes(ch.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {challenges.map(ch => (
        <ChallengeListItem
          key={ch.id}
          challenge={ch}
          isSaved={savedChallenges.includes(ch.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  )
}
