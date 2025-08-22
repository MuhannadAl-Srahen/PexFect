import type { ChallengeGridProps } from '../types'
import { ChallengeListItem } from './ChallengeListItem'
import { ChallengeGridItem } from './ChallengeGridItem'

export function ChallengeGrid({
  challenges,
  savedChallenges,
  onToggleSave,
  viewMode,
}: ChallengeGridProps) {
  if (viewMode === 'grid') {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
        {challenges.map((challenge) => (
          <ChallengeGridItem
            key={challenge.id}
            challenge={challenge}
            isSaved={savedChallenges.includes(challenge.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>
    )
  }

  // List view
  return (
    <div className='space-y-6'>
      {challenges.map((challenge) => (
        <ChallengeListItem
          key={challenge.id}
          challenge={challenge}
          isSaved={savedChallenges.includes(challenge.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  )
}
