import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/challenges/id/resources')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/challenges/[id]/resources"!</div>
}
