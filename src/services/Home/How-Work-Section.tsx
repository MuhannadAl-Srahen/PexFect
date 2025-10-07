import { TracingBeam } from '@/components/ui/tracing-beam'
import { motion } from 'motion/react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function HowWorkSection() {
  return (
    <>
      {/* How It Works Section */}
      <section className='relative py-28 overflow-hidden'>
        <div className='absolute inset-0 bg-background'></div>
        <div className='absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-primary/10 opacity-20'></div>
        <div className='absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-primary/10 opacity-20'></div>

        <div className='relative z-10 container mx-auto px-6 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-primary mb-5'>
              How It Works
            </h2>
            <p className='text-md md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty'>
              Simple steps to elevate your frontend skills and build an
              impressive portfolio{' '}
            </p>
          </div>

          <TracingBeam className='px-2 sm:px-4'>
            <div className='max-w-2xl mx-auto antialiased pt-5 relative'>
              {/* Step 1  */}
              <motion.div
                className='mt-8 md:mt-16'
                initial={{ opacity: 0, x: -50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <div className='flex justify-center md:justify-start'>
                  <div className='w-full max-w-sm lg:w-75 lg:h-75'>
                    <Card className='hover:shadow-2xl transition-all duration-300 hover:scale-[1.05] hover:border-primary/50 border-2 cursor-pointer'>
                      <CardHeader className='text-center px-4 md:px-6'>
                        <div className='flex items-center justify-center mb-4 md:mb-5'>
                          <div className='h-10 w-10 md:h-14 md:w-14 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500'>
                            <span className='text-base md:text-lg font-bold text-primary-foreground'>
                              1
                            </span>
                          </div>
                        </div>
                        <h3 className='text-lg md:text-2xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300'>
                          Choose a Challenge{' '}
                        </h3>
                      </CardHeader>
                      <CardContent className='text-center px-4 md:px-6'>
                        <p className='text-sm md:text-base text-muted-foreground leading-relaxed'>
                          Select from a variety of real-world frontend projects
                          tailored to your skill level
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>

              {/* Step 2  */}
              <motion.div
                className='mt-8 md:mt-16'
                initial={{ opacity: 0, x: 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <div className='flex justify-center md:justify-end'>
                  <div className='w-full max-w-sm lg:w-75 lg:h-75'>
                    <Card className='hover:shadow-2xl transition-all duration-300 hover:scale-[1.05] hover:border-primary/50 border-2 cursor-pointer'>
                      <CardHeader className='text-center px-4 md:px-6'>
                        <div className='flex items-center justify-center mb-4 md:mb-5'>
                          <div className='h-10 w-10 md:h-14 md:w-14 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500'>
                            <span className='text-base md:text-lg font-bold text-primary-foreground'>
                              2
                            </span>
                          </div>
                        </div>
                        <h3 className='text-lg md:text-2xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300'>
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
                  </div>
                </div>
              </motion.div>

              {/* Step 3  */}
              <motion.div
                className='mt-8 md:mt-10'
                initial={{ opacity: 0, x: -50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <div className='flex justify-center md:justify-start'>
                  <div className='w-full max-w-sm lg:w-75 lg:h-75 '>
                    <Card className='hover:shadow-2xl transition-all duration-300 hover:scale-[1.05] hover:border-primary/50 border-2 cursor-pointer'>
                      <CardHeader className='text-center px-4 md:px-6'>
                        <div className='flex items-center justify-center mb-4 md:mb-5'>
                          <div className='h-10 w-10 md:h-14 md:w-14 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500'>
                            <span className='text-base md:text-lg font-bold text-primary-foreground'>
                              3
                            </span>
                          </div>
                        </div>
                        <h3 className='text-lg md:text-2xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300'>
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
