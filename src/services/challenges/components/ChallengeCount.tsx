import type { ChallengeCountProps } from '../types'

export function ChallengeCount({
  filteredCount,
  totalCount,
}: ChallengeCountProps) {
  return (
    <p className='text-muted-foreground mb-4'>
      Showing {filteredCount} of {totalCount} challenges
    </p>
  )
}
