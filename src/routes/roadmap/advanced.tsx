import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/roadmap/advanced')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/roadmap/advanced"!</div>
}
