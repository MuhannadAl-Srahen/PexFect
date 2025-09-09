import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '@/layouts/PageLayout'
import { HeroSection } from '@/services/Home/Hero-Section'
import { FeatureSection } from '@/services/Home/Feature-Section'
import { HowWorkSection } from '@/services/Home/How-Work-Section'
import { ChallengeSection } from '@/services/Home/Challenge-Section'
import { CIASection } from '@/services/Home/CIA-Section'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <PageLayout>
      <div>
        <HeroSection />
      </div>
      <div>
        <FeatureSection />
      </div>
      <div>
        <HowWorkSection />
      </div>
      <div>
        <ChallengeSection />
      </div>
      <div>
        <CIASection />
      </div>
    </PageLayout>
  )
}
