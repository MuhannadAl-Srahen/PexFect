import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '@/layouts/PageLayout'
import RoadmapOverview from '@/services/roadmap/components/RoadmapOverview'

export const Route = createFileRoute('/roadmap/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLayout maxWidth='7xl'>
      <RoadmapOverview />
    </PageLayout>
  )
}
