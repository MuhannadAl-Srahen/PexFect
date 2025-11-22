import { createFileRoute } from '@tanstack/react-router'
import { AlertTriangle } from 'lucide-react'
import { PageLayout } from '@/layouts'
import { Card } from '@/components/ui/card'

export const Route = createFileRoute('/feedback/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLayout maxWidth='6xl'>
      <div className='min-h-[60vh] flex items-center justify-center'>
        <Card className='p-8 text-center max-w-md mx-auto'>
          <div className='mb-6'>
            <div className='w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center'>
              <AlertTriangle className='w-8 h-8 text-muted-foreground' />
            </div>
            <h1 className='text-2xl font-bold text-foreground mb-2'>No Feedback Available</h1>
            <p className='text-muted-foreground'>
              To view feedback, you need a specific submission ID. Please navigate to a specific feedback URL.
            </p>
          </div>
          <div className='space-y-2 text-sm text-muted-foreground'>
            <p>Expected URL format:</p>
            <code className='bg-muted px-2 py-1 rounded text-xs'>/feedback/[submissionId]</code>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
