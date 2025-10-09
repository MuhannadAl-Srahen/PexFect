import { ChallengeGridItem } from './ChallengeGridItem'
import { ChallengeListItem } from './ChallengeListItem'
import type { ChallengeViewProps } from '@/types'

export function ChallengeView({
  challenges,
  savedChallenges,
  onToggleSave,
  viewMode,
}: ChallengeViewProps) {
  if (viewMode === 'grid') {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
        {challenges.map((challenge) => (
          <ChallengeGridItem
            key={challenge.id}
            challenge={challenge}
            isSaved={challenge.isSaved ?? savedChallenges.includes(challenge.id)}
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
          isSaved={challenge.isSaved ?? savedChallenges.includes(challenge.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  )
}
