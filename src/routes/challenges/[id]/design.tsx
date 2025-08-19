import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/challenges/id/design')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/challenges/[id]/design"!</div>
}
