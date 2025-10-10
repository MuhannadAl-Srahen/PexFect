import { Brain, Swords, BookOpen, BookKey } from 'lucide-react'
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/animate-on-scroll'
import { motion } from 'motion/react'

const features = [
  {
    name: 'Interactive Challenges',
    description:
      'Practice with real-world coding problems across different difficulty levels and programming languages',
    icon: Swords,
  },
  {
    name: 'Structured Roadmaps',
    description:
      'Follow a clear learning path from HTML/CSS basics to advanced full-stack development',
    icon: BookOpen,
  },
  {
    name: 'AI-Powered Feedback',
    description:
      'Get instant, personalized feedback on your code with actionable suggestions for improvement',
    icon: Brain,
  },
  {
    name: 'Curated Resources',
    description:
      'Access hand-picked tutorials, documentation, and videos to accelerate your learning journey',
    icon: BookKey,
  },
]

export function FeatureSection() {
  return (
    <section className='relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-primary/5'>
      {/* Background Pattern - matching Hero section */}
      <div className='absolute inset-0 opacity-10 dark:opacity-5'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(var(--primary)/0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content */}
      <div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8'>
        <StaggerContainer>
          {/* Section Header */}
          <StaggerItem>
            <div className='text-center mb-16'>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6'>
                Everything you need to{' '}
                <span className='text-primary'>succeed</span>
              </h2>
              <p className='text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
                PexFect combines real-world challenges, structured learning
                paths, and AI-powered feedback so you can become a confident
                developer.
              </p>
            </div>
          </StaggerItem>

          {/* Features Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
            {features.map((feature) => (
              <StaggerItem key={feature.name}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className='h-full group'
                >
                  <div className='bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 h-full flex flex-col'>
                    {/* Icon Container */}
                    <div className='flex items-center justify-center mb-6'>
                      <div className='relative'>
                        <div className='w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300'>
                          <feature.icon className='w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300' />
                        </div>
                        <div className='absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg'>
                          <div className='w-2 h-2 bg-primary-foreground rounded-full' />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className='text-center flex-grow flex flex-col'>
                      <h3 className='text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300'>
                        {feature.name}
                      </h3>
                      <p className='text-muted-foreground leading-relaxed text-sm flex-grow'>
                        {feature.description}
                      </p>
                    </div>

                    {/* Bottom accent */}
                    <div className='mt-6 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
