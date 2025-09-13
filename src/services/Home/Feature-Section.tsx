import { Brain, Swords, BookOpen, BookKey } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/animate-on-scroll'

const features = [
  {
    name: 'Interactive Challenges',
    description:
      'Practice with real-world coding problems across different difficulty levels and programming languages',
    icon: Swords,
    link: '/challenges',
  },
  {
    name: 'Structured Roadmaps',
    description:
      'Follow a clear learning path from HTML/CSS basics to advanced full-stack development',
    icon: BookOpen,
    link: '/roadmap',
  },
  {
    name: 'AI-Powered Feedback',
    description:
      'Get instant, personalized feedback on your code with actionable suggestions for improvement',
    icon: Brain,
    link: '/feedback',
  },
  {
    name: 'Curated Resources',
    description:
      'Access hand-picked tutorials, documentation, and videos to accelerate your learning journey',
    icon: BookKey,
    link: '/resources',
  },
]

export function FeatureSection() {
  return (
    <section className='bg-background py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <AnimateOnScroll animation='slideUp'>
          <div className='mx-auto max-w-7xl text-center'>
            <h2 className='text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-6xl'>
              Everything you need to succeed
            </h2>
            <p className='mt-6 text-xl leading-8 text-muted-foreground'>
              PexFect combines real-world challenges, structured learning paths,
              and AI-powered feedback so you can become a confident developer.
            </p>
          </div>
        </AnimateOnScroll>
        <div className='mx-auto mt-16 sm:mt-20 lg:mt-24 max-w-7xl'>
          <StaggerContainer>
            <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-2'>
              {features.map((feature) => (
                <StaggerItem key={feature.name}>
                  <div className='group h-full'>
                    <Link to={feature.link} className='block h-full'>
                      <Card className='flex h-full flex-col overflow-hidden rounded-xl border border-foreground bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:scale-[1.06] p-2'>
                        <CardHeader className='pb-2 text-center pt-2'>
                          <div className='mx-auto mb-3 flex size-20 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20'>
                            <feature.icon
                              aria-hidden='true'
                              className='size-10 text-primary transition-transform group-hover:scale-110'
                            />
                          </div>
                          <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold text-card-foreground group-hover:text-primary transition-colors leading-tight'>
                            {feature.name}
                          </h3>
                        </CardHeader>
                        <CardContent className='flex-1 text-center px-2 pb-3'>
                          <p className='text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed'>
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
