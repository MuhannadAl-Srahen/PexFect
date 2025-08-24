import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '@/layouts/PageLayout'

export const Route = createFileRoute('/roadmap/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLayout>
      <h3 className='text-2xl font-semibold text-foreground'>
        Hello "/roadmap/"!
      </h3>
    </PageLayout>
  )
}
