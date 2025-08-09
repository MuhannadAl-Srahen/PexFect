import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resources/videos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/resources/videos"!</div>
}
