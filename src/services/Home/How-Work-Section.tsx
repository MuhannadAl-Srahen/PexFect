import { motion } from 'motion/react'
import { Search, Code, MessageSquare, Globe, Github, Heart } from 'lucide-react'

const steps = [
  {
    step: '01',
    title: 'Choose a Challenge',
    description:
      'Browse through our curated collection of real-world frontend challenges designed to match your skill level and career goals.',
    icon: Search,
    bgColor: 'bg-gradient-to-br from-primary/10 to-primary/5',
  },
  {
    step: '02',
    title: 'Build & Submit',
    description:
      'Create your solution using modern tools and frameworks. Submit your GitHub repository and live demo for comprehensive review.',
    icon: Code,
    bgColor: 'bg-gradient-to-br from-primary/15 to-primary/8',
  },
  {
    step: '03',
    title: 'Get Feedback',
    description:
      'Receive detailed insights on code quality, design patterns, performance, and accessibility from our AI-powered review system.',
    icon: MessageSquare,
    bgColor: 'bg-gradient-to-br from-primary/12 to-primary/6',
  },
]

export function HowWorkSection() {
  return (
    <section className='relative py-20 lg:py-32 bg-background overflow-hidden'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-24'
        >
          <h2 className='text-4xl lg:text-6xl font-bold text-foreground mb-6'>
            How It <span className='text-primary'>Works</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
            Three simple steps to transform your frontend development skills and
            build an impressive portfolio
          </p>
        </motion.div>

        {/* Steps */}
        <div className='max-w-7xl mx-auto space-y-32'>
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Mockup/Visual Side */}
              <div className='flex-1 relative'>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className='relative'
                >
                  {/* Card/Mockup Container */}
                  <div
                    className={`relative ${step.bgColor} rounded-3xl p-8 lg:p-12 shadow-2xl border border-primary/10`}
                  >
                    {/* Mockup Content based on step */}
                    {index === 0 && (
                      <div className='bg-card rounded-2xl p-6 shadow-xl border border-border/20'>
                        <div className='flex items-center justify-between mb-4'>
                          <h4 className='text-lg font-bold text-foreground'>
                            Choose a Challenge
                          </h4>
                          <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                            <Globe className='w-4 h-4 text-primary-foreground' />
                          </div>
                        </div>
                        <div className='space-y-3'>
                          <div className='h-3 bg-muted rounded-full w-full' />
                          <div className='h-3 bg-muted rounded-full w-3/4' />
                          <div className='h-3 bg-muted rounded-full w-1/2' />
                        </div>
                        <div className='mt-6 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-center font-semibold'>
                          Start Challenge
                        </div>
                      </div>
                    )}

                    {index === 1 && (
                      <div className='bg-card rounded-2xl p-6 shadow-xl border border-border/20'>
                        <div className='flex items-center gap-3 mb-4'>
                          <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                            <Github className='w-4 h-4 text-primary-foreground' />
                          </div>
                          <h4 className='text-lg font-bold text-foreground'>
                            Build & Submit
                          </h4>
                        </div>
                        <div className='bg-muted rounded-lg p-4 font-mono text-sm'>
                          <div className='text-primary'>const</div>
                          <div className='text-primary/80 ml-2'>
                            solution = () =&gt; {'{'}...
                          </div>
                        </div>
                        <div className='flex gap-2 mt-4'>
                          <div className='bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground'>
                            GitHub
                          </div>
                          <div className='bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground'>
                            Live Demo
                          </div>
                        </div>
                      </div>
                    )}

                    {index === 2 && (
                      <div className='bg-card rounded-2xl p-6 shadow-xl border border-border/20'>
                        <div className='flex items-center gap-3 mb-4'>
                          <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                            <Heart className='w-4 h-4 text-primary-foreground' />
                          </div>
                          <h4 className='text-lg font-bold text-foreground'>
                            Get Feedback
                          </h4>
                        </div>
                        <div className='space-y-3'>
                          <div className='flex gap-2'>
                            <div className='text-2xl'>😱</div>
                            <div className='text-2xl'>😍</div>
                            <div className='text-2xl'>❤️</div>
                          </div>
                          <div className='h-2 bg-muted rounded-full w-full' />
                          <div className='h-2 bg-muted rounded-full w-4/5' />
                        </div>
                        <div className='mt-4 text-sm text-muted-foreground'>
                          Detailed feedback on your solution...
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Content Side */}
              <div className='flex-1 text-center lg:text-left space-y-6'>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className='inline-flex items-center gap-3 mb-6'>
                    <div className='w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg'>
                      <step.icon className='w-6 h-6 text-primary-foreground' />
                    </div>
                    <span className='text-5xl font-black text-primary/20'>
                      {step.step}
                    </span>
                  </div>

                  <h3 className='text-3xl lg:text-4xl font-bold text-foreground mb-6'>
                    {step.title}
                  </h3>

                  <p className='text-lg text-muted-foreground leading-relaxed max-w-lg'>
                    {step.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
