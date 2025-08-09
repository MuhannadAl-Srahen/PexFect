import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resources/tools')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/resources/tools"!</div>
}
