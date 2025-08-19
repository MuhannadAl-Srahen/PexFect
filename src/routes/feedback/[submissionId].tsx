import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/feedback/submissionId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/feedback/[submissionId]"!</div>
}
