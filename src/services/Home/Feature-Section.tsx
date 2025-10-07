import { Brain, Swords, BookOpen, BookKey } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/animate-on-scroll'

const features = [
  {
    name: 'Interactive Challenges',
    description:
      'Practice with real-world coding problems across different difficulty levels and programming languages',
    icon: Swords,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100',
    hoverBgColor: 'group-hover:bg-orange-200',
    hoverTextColor: 'group-hover:text-orange-500',
    hoverBorderColor: 'group-hover:border-orange-500',
  },
  {
    name: 'Structured Roadmaps',
    description:
      'Follow a clear learning path from HTML/CSS basics to advanced full-stack development',
    icon: BookOpen,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    hoverBgColor: 'group-hover:bg-blue-200',
    hoverTextColor: 'group-hover:text-blue-500',
    hoverBorderColor: 'group-hover:border-blue-500',
  },
  {
    name: 'AI-Powered Feedback',
    description:
      'Get instant, personalized feedback on your code with actionable suggestions for improvement',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
    hoverBgColor: 'group-hover:bg-purple-200',
    hoverTextColor: 'group-hover:text-purple-500',
    hoverBorderColor: 'group-hover:border-purple-500',
  },
  {
    name: 'Curated Resources',
    description:
      'Access hand-picked tutorials, documentation, and videos to accelerate your learning journey',
    icon: BookKey,
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    hoverBgColor: 'group-hover:bg-green-200',
    hoverTextColor: 'group-hover:text-green-500',
    hoverBorderColor: 'group-hover:border-green-500',
  },
]

export function FeatureSection() {
  return (
    <>
      <section className='relative py-20 sm:py-24 lg:py-32 pt-10 sm:pt-16 lg:pt-24 overflow-hidden'>
        {/* Background Layers */}
        <div className='absolute inset-0 bg-background'></div>
        <div className='absolute inset-0 bg-gradient-to-r from-gray-400/5 via-gray-400/10 to-background opacity-50'></div>
        <div className='absolute inset-0 bg-gradient-to-b from-gray-400/2 via-gray-400/5 to-background'></div>
        <div className='absolute inset-0 bg-gradient-to-t from-gray-400/5 via-gray-400/10 to-background opacity-50'></div>

        {/* Content */}
        <div className='relative z-10 mx-auto max-w-7xl px-6 lg:px-10'>
          <StaggerContainer staggerDelay={0.2}>
            <StaggerItem animation='slideUp'>
              <div className='mx-auto max-w-7xl text-center'>
                <h2 className='text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl'>
                  Everything you need to succeed
                </h2>
                <p className='mt-6 text-base leading-8 text-muted-foreground'>
                  PexFect combines real-world challenges, structured learning
                  paths, and AI-powered feedback so you can become a confident
                  developer.
                </p>
              </div>
            </StaggerItem>
            <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
              <div className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4'>
                {features.map((feature) => (
                  <StaggerItem key={feature.name} animation='scale'>
                    <div className='group'>
                      <Card
                        className={`w-full max-w-[16rem] sm:max-w-sm md:max-w-md  h-60 sm:h-64 md:h-72 mx-auto border cursor-pointer
                             hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${feature.hoverBorderColor}`}
                      >
                        <CardHeader className='text-center pb-2 sm:pb-4'>
                          <div className='flex items-center justify-center mb-3 sm:mb-4'>
                            <div
                              className={`h-10 w-10 sm:h-14 sm:w-14 ${feature.bgColor} ${feature.hoverBgColor} rounded-full flex items-center justify-center transition-colors`}
                            >
                              <feature.icon
                                className={`!h-6 !w-6 sm:!h-7 sm:!w-7 ${feature.color}`}
                                aria-hidden='true'
                              />
                            </div>
                          </div>
                          <h3
                            className={`text-lg sm:text-xl font-semibold text-foreground ${feature.hoverTextColor} transition-colors`}
                          >
                            {feature.name}
                          </h3>
                        </CardHeader>
                        <CardContent className='text-center pt-0'>
                          <p className='text-sm sm:text-base text-muted-foreground leading-relaxed'>
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </div>
          </StaggerContainer>
        </div>
      </section>
    </>
  )
}
