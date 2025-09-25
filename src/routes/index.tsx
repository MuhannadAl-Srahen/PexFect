import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '@/layouts/PageLayout'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <PageLayout>
      <h3 className='text-2xl font-semibold text-foreground'>This is a change on the landing page</h3>
    </PageLayout>
  )
}
