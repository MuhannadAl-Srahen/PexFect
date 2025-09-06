import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/feedback/$submissionId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { submissionId } = Route.useParams()

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-foreground mb-4'>
            Feedback Analysis
          </h1>
          <p className='text-muted-foreground mb-6'>
            Submission ID: {submissionId}
          </p>
          <p className='text-muted-foreground'>
            Your feedback will be displayed here once the analysis is complete.
          </p>
        </div>
      </div>
    </>
  )
}
