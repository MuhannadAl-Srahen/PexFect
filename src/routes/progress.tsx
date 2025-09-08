import { PageLayout } from '@/layouts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/progress')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLayout>
      <h3 className='text-2xl font-semibold text-foreground'>
        Hello "/progress"!
      </h3>
    </PageLayout>
  )
}
