import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/challenges/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>This is a simple test for the challenges page</div>
}
