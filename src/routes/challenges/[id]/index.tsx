import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/challenges/id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/challenges/[id]/"!</div>
}
