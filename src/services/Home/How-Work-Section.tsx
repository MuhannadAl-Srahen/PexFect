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
                      <div className='bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/40'>
                        <div className='flex items-center justify-between mb-6'>
                          <h4 className='text-lg font-bold text-foreground'>
                            Choose a Challenge
                          </h4>
                          <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center'>
                            <Globe className='w-5 h-5 text-primary-foreground' />
                          </div>
                        </div>
                        <div className='space-y-4 mb-6'>
                          <div className='bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-3'>
                            <div className='h-2.5 bg-primary/40 rounded-full w-full mb-2' />
                            <div className='h-2 bg-primary/30 rounded-full w-3/4' />
                          </div>
                          <div className='bg-muted/40 rounded-lg p-3'>
                            <div className='h-2.5 bg-muted-foreground/20 rounded-full w-4/5 mb-2' />
                            <div className='h-2 bg-muted-foreground/15 rounded-full w-2/3' />
                          </div>
                          <div className='bg-muted/40 rounded-lg p-3'>
                            <div className='h-2.5 bg-muted-foreground/20 rounded-full w-full mb-2' />
                            <div className='h-2 bg-muted-foreground/15 rounded-full w-1/2' />
                          </div>
                        </div>
                        <div className='mt-6 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl text-center font-semibold shadow-lg transition-all duration-300'>
                          Start Challenge
                        </div>
                      </div>
                    )}

                    {index === 1 && (
                      <div className='bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/40'>
                        <div className='flex items-center gap-3 mb-6'>
                          <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center'>
                            <Github className='w-5 h-5 text-primary-foreground' />
                          </div>
                          <h4 className='text-lg font-bold text-foreground'>
                            Build & Submit
                          </h4>
                        </div>
                        <div className='bg-muted/50 rounded-xl p-5 font-mono text-sm mb-4 border border-border/30'>
                          <div className='text-primary font-semibold mb-2'>
                            const solution = () =&gt; {'{'}
                          </div>
                          <div className='text-foreground/70 ml-4 mb-1'>
                            // Your code here
                          </div>
                          <div className='text-foreground/70 ml-4 mb-1'>
                            return &lt;Component /&gt;
                          </div>
                          <div className='text-primary font-semibold'>
                            {'}'}
                          </div>
                        </div>
                        <div className='flex gap-3 mt-4'>
                          <div className='bg-primary/20 border border-primary/30 px-4 py-2 rounded-lg text-sm font-medium text-primary flex items-center gap-2'>
                            <Github className='w-3.5 h-3.5' />
                            GitHub Repo
                          </div>
                          <div className='bg-muted/40 border border-border/30 px-4 py-2 rounded-lg text-sm font-medium text-foreground flex items-center gap-2'>
                            <Globe className='w-3.5 h-3.5' />
                            Live Demo
                          </div>
                        </div>
                      </div>
                    )}

                    {index === 2 && (
                      <div className='bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/40'>
                        <div className='flex items-center gap-3 mb-6'>
                          <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center'>
                            <Heart className='w-5 h-5 text-primary-foreground' />
                          </div>
                          <h4 className='text-lg font-bold text-foreground'>
                            Get Feedback
                          </h4>
                        </div>
                        <div className='space-y-4 mb-5'>
                          <div className='flex gap-3'>
                            <div className='text-3xl'>😱</div>
                            <div className='text-3xl'>😍</div>
                            <div className='text-3xl'>❤️</div>
                          </div>
                          <div className='space-y-2'>
                            <div className='h-2.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full w-full' />
                            <div className='h-2.5 bg-gradient-to-r from-green-500/30 to-green-500/10 rounded-full w-4/5' />
                            <div className='h-2.5 bg-gradient-to-r from-blue-500/30 to-blue-500/10 rounded-full w-3/4' />
                          </div>
                        </div>
                        <div className='bg-primary/10 border border-primary/20 rounded-lg p-4 mt-4'>
                          <p className='text-sm text-foreground/80 leading-relaxed'>
                            Detailed feedback on your solution...
                          </p>
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
