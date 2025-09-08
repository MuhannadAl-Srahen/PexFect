import { TracingBeam } from '@/components/ui/tracing-beam'
import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function HowWorkSection() {
  return (
    <>
      {/* How It Works Section */}
      <section className='py-20 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-5xl md:text-5xl font-bold text-primary mb-4'>
              How It Works
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto text-pretty'>
              Simple steps to elevate your frontend skills and build an
              impressive portfolio{' '}
            </p>
          </div>

          <TracingBeam className='px-6'>
            <div className='max-w-4xl mx-auto antialiased pt-4 relative'>
              {/* Step 1 - Animate from left */}
              <motion.div
                className='mb-20'
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <div className='flex justify-start'>
                  <div className='w-80 mr-16'>
                    <Link to='/challenges' className='block group'>
                      <Card className='hover:shadow-md transition-shadow hover:scale-[1.02] hover:border-primary/30 cursor-pointer'>
                        <CardHeader className='text-center'>
                          <div className='flex items-center justify-center mb-6'>
                            <div className='h-16 w-16 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform'>
                              <span className='text-2xl font-bold text-primary-foreground'>
                                1
                              </span>
                            </div>
                          </div>
                          <h3 className='text-2xl font-semibold text-card-foreground group-hover:text-primary transition-colors'>
                            Choose a Challenge{' '}
                          </h3>
                        </CardHeader>
                        <CardContent className='text-center'>
                          <p className='text-muted-foreground leading-relaxed'>
                            Select from a variety of real-world frontend
                            projects tailored to your skill level
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Step 2 - Animate from right */}
              <motion.div
                className='mb-20'
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <div className='flex justify-end'>
                  <div className='w-80 ml-16'>
                    <Link to='/profile' className='block group'>
                      <Card className='hover:shadow-md transition-shadow hover:scale-[1.02] hover:border-primary/30 cursor-pointer'>
                        <CardHeader className='text-center'>
                          <div className='flex items-center justify-center mb-6'>
                            <div className='h-16 w-16 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform'>
                              <span className='text-2xl font-bold text-primary-foreground'>
                                2
                              </span>
                            </div>
                          </div>
                          <h3 className='text-2xl font-semibold text-card-foreground group-hover:text-primary transition-colors'>
                            Build & Submit
                          </h3>
                        </CardHeader>
                        <CardContent className='text-center'>
                          <p className='text-muted-foreground leading-relaxed'>
                            Develop your solution using your preferred tools and
                            submit your GitHub repo and live site
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Step 3 - Animate from left */}
              <motion.div
                className='mb-10'
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <div className='flex justify-start'>
                  <div className='w-80 mr-16'>
                    <Link to='/profile' className='block group'>
                      <Card className='hover:shadow-md transition-shadow hover:scale-[1.02] hover:border-primary/30 cursor-pointer'>
                        <CardHeader className='text-center'>
                          <div className='flex items-center justify-center mb-6'>
                            <div className='h-16 w-16 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform'>
                              <span className='text-2xl font-bold text-primary-foreground'>
                                3
                              </span>
                            </div>
                          </div>
                          <h3 className='text-2xl font-semibold text-card-foreground group-hover:text-primary transition-colors'>
                            Get AI Feedback{' '}
                          </h3>
                        </CardHeader>
                        <CardContent className='text-center'>
                          <p className='text-muted-foreground leading-relaxed'>
                            Receive instant insights on code quality, design,
                            accessibility, and more
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </TracingBeam>
        </div>
      </section>
    </>
  )
}
