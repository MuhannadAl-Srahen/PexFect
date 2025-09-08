import { Brain, Swords, BookOpen, BookKey } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'

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
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl'>
            Everything you need to succeed
          </h2>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            PexFect combines real-world challenges, structured learning paths,
            and AI-powered feedback so you can become a confident developer.
          </p>
        </div>
        <div className='mx-auto mt-16 sm:mt-20 lg:mt-24 max-w-none'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {features.map((feature) => (
              <div key={feature.name} className='group'>
                <Link to={feature.link} className='block h-full'>
                  <Card className='flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.06] '>
                    <CardHeader className='pb-3 text-center'>
                      <div className='mx-auto mb-4 flex size-16 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20'>
                        <feature.icon
                          aria-hidden='true'
                          className='size-8 text-primary transition-transform group-hover:scale-110'
                        />
                      </div>
                      <h3 className='text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors'>
                        {feature.name}
                      </h3>
                    </CardHeader>
                    <CardContent className='flex-1 text-center'>
                      <p className='text-sm text-muted-foreground leading-relaxed'>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
