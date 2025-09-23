import { TracingBeam } from '@/components/ui/tracing-beam'
import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function HowWorkSection() {
  return (
    <>
      {/* How It Works Section */}
      <section className='py-20 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-7'>
          <div className='text-center mb-16'>
            <h2 className='text-5xl md:text-5xl font-bold text-primary mb-5'>
              How It Works
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto text-pretty'>
              Simple steps to elevate your frontend skills and build an
              impressive portfolio{' '}
            </p>
          </div>

          <TracingBeam className='px-2 sm:px-4'>
            <div className='max-w-2xl mx-auto antialiased pt-5 relative'>
              {/* Step 1  */}
              <motion.div
              className='mt-8 md:mt-16'
                initial={{ opacity: 0, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <div className='flex justify-center md:justify-start'>
                  <div className='w-full max-w-sm lg:w-75 lg:h-75'>
                    <Link to='/challenges' className='block group'>
                      <Card className='hover:shadow-md transition-shadow hover:scale-[1.02] hover:border-primary/50 border-2 cursor-pointer'>
                        <CardHeader className='text-center px-4 md:px-6'>
                          <div className='flex items-center justify-center mb-4 md:mb-5'>
                            <div className='h-10 w-10 md:h-14 md:w-14 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform'>
                              <span className='text-base md:text-lg font-bold text-primary-foreground'>
                                1
                              </span>
                            </div>
                          </div>
                          <h3 className='text-lg md:text-2xl font-semibold text-card-foreground group-hover:text-primary transition-colors'>
                            Choose a Challenge{' '}
                          </h3>
                        </CardHeader>
                        <CardContent className='text-center px-4 md:px-6'>
                          <p className='text-sm md:text-base text-muted-foreground leading-relaxed'>
                            Select from a variety of real-world frontend
                            projects tailored to your skill level
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Step 2  */}
              <motion.div
              className='mt-8 md:mt-16'
                initial={{ opacity: 0, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <div className='flex justify-center md:justify-end'>
                  <div className='w-full max-w-sm lg:w-75 lg:h-75'>
                    <Link to='/profile' className='block group'>
                      <Card className='hover:shadow-md transition-shadow hover:scale-[1.02] hover:border-primary/50 border-2 cursor-pointer'>
                        <CardHeader className='text-center px-4 md:px-6'>
                          <div className='flex items-center justify-center mb-4 md:mb-5'>
                            <div className='h-10 w-10 md:h-14 md:w-14 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform'>
                              <span className='text-base md:text-lg font-bold text-primary-foreground'>
                                2
                              </span>
                            </div>
                          </div>
                          <h3 className='text-lg md:text-2xl font-semibold text-card-foreground group-hover:text-primary transition-colors'>
                            Build & Submit
                          </h3>
                        </CardHeader>
                        <CardContent className='text-center px-4 md:px-6'>
                          <p className='text-sm md:text-base text-muted-foreground leading-relaxed'>
                            Develop your solution using your preferred tools and
                            submit your GitHub repo and live site
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Step 3  */}
              <motion.div
              className='mt-8 md:mt-10'
                initial={{ opacity: 0, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <div className='flex justify-center md:justify-start'>
                  <div className='w-full max-w-sm lg:w-75 lg:h-75 '>
                    <Link to='/profile' className='block group'>
                      <Card className='hover:shadow-md transition-shadow hover:scale-[1.02] hover:border-primary/50 border-2 cursor-pointer'>
                        <CardHeader className='text-center px-4 md:px-6'>
                          <div className='flex items-center justify-center mb-4 md:mb-5'>
                            <div className='h-10 w-10 md:h-14 md:w-14 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform'>
                              <span className='text-base md:text-lg font-bold text-primary-foreground'>
                                3
                              </span>
                            </div>
                          </div>
                          <h3 className='text-lg md:text-2xl font-semibold text-card-foreground group-hover:text-primary transition-colors'>
                            Get Feedback
                          </h3>
                        </CardHeader>
                        <CardContent className='text-center px-4 md:px-6'>
                          <p className='text-sm md:text-base text-muted-foreground leading-relaxed'>
                            Receive instant insights on code quality, design,
                            accessibility and more
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
