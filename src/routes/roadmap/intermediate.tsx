import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/roadmap/intermediate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/roadmap/intermediate"!</div>
}
