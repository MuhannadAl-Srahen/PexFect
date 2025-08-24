import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '@/layouts/PageLayout'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLayout>
      <h3 className='text-2xl font-semibold text-foreground'>
        Hello "/profile"!
      </h3>
    </PageLayout>
  )
}
