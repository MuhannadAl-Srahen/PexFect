import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/challenges/id/specification')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/challenges/[id]/specification"!</div>
}
