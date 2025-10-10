import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { PageLayout } from '@/layouts/PageLayout'
import PathDetails from '@/services/roadmap/components/PathDetails'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/roadmap/$pathId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { pathId } = Route.useParams()
  const navigate = useNavigate()

  // Validate pathId
  const validPaths = ['beginner', 'intermediate', 'advanced'] as const

  if (
    !validPaths.includes(pathId as 'beginner' | 'intermediate' | 'advanced')
  ) {
    return (
      <PageLayout>
        <div className='flex items-center justify-center min-h-[50vh]'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-foreground mb-4'>
              Path Not Found
            </h1>
            <p className='text-muted-foreground mb-6'>
              The learning path you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate({ to: '/roadmap' })}>
              Back to Roadmap
            </Button>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout maxWidth='6xl'>
      <PathDetails
        pathId={pathId as 'beginner' | 'intermediate' | 'advanced'}
      />
    </PageLayout>
  )
}
