import { createFileRoute } from '@tanstack/react-router'
import { ChallengePageHeader } from '@/services/challenges'

export const Route = createFileRoute('/challenges/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-8xl mx-auto'>
          <ChallengePageHeader />
        </div>
      </div>
    </div>
  )
}
