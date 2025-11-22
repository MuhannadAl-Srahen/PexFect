import type { FC } from 'react'

interface FeedbackHeaderProps {
  challengeTitle: string
  submissionDate: string
}

export const FeedbackHeader: FC<FeedbackHeaderProps> = ({
  challengeTitle,
  submissionDate
}) => {
  return (
    <div className='bg-card border border-border rounded-2xl p-6 mb-6'>
      {/* Challenge Info */}
      <div>
        <h2 className='text-2xl font-bold text-foreground mb-2'>
          {challengeTitle}
        </h2>
        <p className='text-muted-foreground'>
          Submitted on {submissionDate}
        </p>
      </div>
    </div>
  )
}
