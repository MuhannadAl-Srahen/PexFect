interface ChallengeCountProps {
  filteredCount: number
  totalCount: number
}

export function ChallengeCount({
  filteredCount,
  totalCount,
}: ChallengeCountProps) {
  return (
    <p className='text-muted-foreground'>
      Showing {filteredCount} of {totalCount} challenges
    </p>
  )
}
