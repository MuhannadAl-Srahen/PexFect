import { Badge } from '@/components/ui/badge'

interface FeedbackHeaderProps {
  challengeTitle: string
  submissionDate: string
  overallScore: number
  scoreLevel: string
}

export function FeedbackHeader({
  challengeTitle,
  submissionDate,
  overallScore,
  scoreLevel
}: FeedbackHeaderProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 80) return 'text-blue-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

    return (
    <div className=' bg-card border border-border rounded-2xl p-6 mb-6'>
    

      {/* Challenge Info */}
      <div className='flex items-start justify-between mb-6'>
        <div>
          <h2 className='text-2xl font-bold text-foreground mb-2'>{challengeTitle}</h2>
          <p className='text-muted-foreground'>
            Submitted on {submissionDate}
          </p>
        </div>

        {/* Score Section */}
        <div className='text-right'>
          <div className={`text-4xl font-bold ${getScoreColor(overallScore)} mb-1`}>
            {overallScore}
          </div>
          <div className='text-sm text-muted-foreground mb-1'>Overall Score</div>
          <Badge variant='secondary' className='bg-green-100 text-green-800 hover:bg-green-100'>
            {scoreLevel}
          </Badge>
        </div>
      </div>
    </div>
  )
}