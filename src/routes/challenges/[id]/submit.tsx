import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/challenges/[id]/submit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/challenges/[id]/submit"!</div>
}
