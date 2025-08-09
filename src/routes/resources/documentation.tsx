import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resources/documentation')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/resources/documentation"!</div>
}
