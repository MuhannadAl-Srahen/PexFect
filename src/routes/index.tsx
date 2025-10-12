import { createFileRoute } from '@tanstack/react-router'
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
    <div className='relative'>
      {/* Hero Section - Full Screen */}
      <HeroSection />

      {/* Other Sections with Proper Spacing */}
      <div className='relative z-10 bg-background'>
        <FeatureSection />
        <HowWorkSection />
        <ChallengeSection />
        <CIASection />
      </div>
    </div>
  )
}
