import { createFileRoute } from '@tanstack/react-router'
import HeroSection from '@/services/Landing/Hero-Section'
import FeaturesSection from '@/services/Landing/Features-Section'
import CuratedSection from '@/services/Landing/Curated-Section'
import ActionSection from '@/services/Landing/Action-Section'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className='min-h-screen'>
      <HeroSection />
      <FeaturesSection />
      <CuratedSection />
      <ActionSection />
    </div>
  )
}
