import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/roadmap/beginner')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/roadmap/beginner"!</div>
}
