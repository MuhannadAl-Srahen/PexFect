import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/animate-on-scroll'

export function CIASection() {
  return (
    <section className='relative py-20 lg:py-32 bg-background'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <StaggerContainer staggerDelay={0.2}>
          <div className='max-w-5xl mx-auto'>
            {/* Split Layout */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center'>
              {/* Left Side - Content */}
              <StaggerItem animation='slideUp'>
                <div className='space-y-6 sm:space-y-8'>
                  <div>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 sm:mb-6'>
                      Ready to Level Up Your{' '}
                      <span className='text-primary'>Frontend Skills?</span>
                    </h2>
                    <p className='text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8'>
                      Join PexFect and tackle real-world challenges that
                      transform you from a beginner to a confident frontend
                      developer. Get instant AI feedback and build an impressive
                      portfolio.
                    </p>
                  </div>

                  {/* Features List */}
                  <div className='space-y-4'>
                    {[
                      'Take on progressive frontend challenges',
                      'Get instant AI-powered code reviews',
                      'Build portfolio projects that impress',
                      'Track your growth with detailed analytics',
                    ].map((feature, index) => (
                      <div key={index} className='flex items-center gap-3'>
                        <div className='w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0'>
                          <div className='w-2 h-2 bg-primary rounded-full' />
                        </div>
                        <span className='text-foreground font-medium'>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className='flex items-center gap-4 sm:gap-6 py-4 border-t border-border/20'>
                    <div className='text-center'>
                      <div className='text-xl sm:text-2xl font-bold text-primary'>
                        Soon
                      </div>
                      <div className='text-xs sm:text-sm text-muted-foreground'>
                        Challenges
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-xl sm:text-2xl font-bold text-primary'>
                        AI
                      </div>
                      <div className='text-xs sm:text-sm text-muted-foreground'>
                        Feedback
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-xl sm:text-2xl font-bold text-primary'>
                        Free
                      </div>
                      <div className='text-xs sm:text-sm text-muted-foreground'>
                        To Start
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                    <Button
                      asChild
                      size='lg'
                      className='bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'
                    >
                      <Link to='/signup'>Start Your First Challenge</Link>
                    </Button>

                    <Button
                      asChild
                      variant='outline'
                      size='lg'
                      className='border-primary/30 text-primary hover:bg-primary/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300'
                    >
                      <Link to='/resources'>View Resources</Link>
                    </Button>
                  </div>
                </div>
              </StaggerItem>

              {/* Right Side - PexFect Platform Preview */}
              <StaggerItem animation='scale'>
                <div className='relative mt-8 lg:mt-0'>
                  {/* Main PexFect Challenge Interface */}
                  <div className='bg-card border border-border/20 rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300'>
                    {/* Browser Header */}
                    <div className='bg-muted/30 px-3 sm:px-4 py-2 sm:py-3 border-b border-border/20 flex items-center gap-2'>
                      <div className='w-2 h-2 sm:w-3 sm:h-3 bg-red-500/70 rounded-full'></div>
                      <div className='w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500/70 rounded-full'></div>
                      <div className='w-2 h-2 sm:w-3 sm:h-3 bg-green-500/70 rounded-full'></div>
                      <div className='ml-2 sm:ml-4 text-[10px] sm:text-xs text-muted-foreground hidden sm:block'>
                        pexfect.com/challenges/react-portfolio
                      </div>
                    </div>

                    {/* Challenge Interface */}
                    <div className='p-4 sm:p-6 space-y-3 sm:space-y-4'>
                      {/* Challenge Header */}
                      <div className='flex items-start justify-between gap-2'>
                        <div className='flex-1 min-w-0'>
                          <h3 className='font-bold text-foreground text-sm sm:text-base'>
                            React Portfolio Challenge
                          </h3>
                          <p className='text-xs sm:text-sm text-muted-foreground'>
                            Build a modern portfolio with React & Tailwind
                          </p>
                        </div>
                        <div className='px-2 sm:px-3 py-1 bg-primary/10 text-primary text-[10px] sm:text-xs rounded-full border border-primary/20 whitespace-nowrap'>
                          In Progress
                        </div>
                      </div>

                      {/* Progress Section */}
                      <div className='bg-muted/20 rounded-lg p-3 sm:p-4'>
                        <div className='flex items-center justify-between mb-2'>
                          <span className='text-xs sm:text-sm font-medium text-foreground'>
                            Challenge Progress
                          </span>
                          <span className='text-xs sm:text-sm text-primary font-semibold'>
                            3/5 Tasks
                          </span>
                        </div>
                        <div className='w-full bg-muted/40 rounded-full h-1.5 sm:h-2 mb-2 sm:mb-3'>
                          <div
                            className='bg-primary h-1.5 sm:h-2 rounded-full'
                            style={{ width: '60%' }}
                          ></div>
                        </div>

                        {/* Task List */}
                        <div className='space-y-1.5 sm:space-y-2'>
                          <div className='flex items-center gap-2 text-[10px] sm:text-xs'>
                            <div className='w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0'>
                              <span className='text-white text-[8px] sm:text-[10px]'>
                                ✓
                              </span>
                            </div>
                            <span className='text-muted-foreground line-through'>
                              Setup React project
                            </span>
                          </div>
                          <div className='flex items-center gap-2 text-[10px] sm:text-xs'>
                            <div className='w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0'>
                              <span className='text-white text-[8px] sm:text-[10px]'>
                                ✓
                              </span>
                            </div>
                            <span className='text-muted-foreground line-through'>
                              Build header component
                            </span>
                          </div>
                          <div className='flex items-center gap-2 text-[10px] sm:text-xs'>
                            <div className='w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0'>
                              <span className='text-white text-[8px] sm:text-[10px]'>
                                3
                              </span>
                            </div>
                            <span className='text-foreground font-medium'>
                              Add portfolio projects
                            </span>
                          </div>
                          <div className='flex items-center gap-2 text-[10px] sm:text-xs'>
                            <div className='w-3 h-3 sm:w-4 sm:h-4 bg-muted/50 border border-muted rounded-full flex-shrink-0'></div>
                            <span className='text-muted-foreground'>
                              Implement contact form
                            </span>
                          </div>
                          <div className='flex items-center gap-2 text-[10px] sm:text-xs'>
                            <div className='w-3 h-3 sm:w-4 sm:h-4 bg-muted/50 border border-muted rounded-full flex-shrink-0'></div>
                            <span className='text-muted-foreground'>
                              Deploy to Vercel
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* AI Feedback Section */}
                      <div className='bg-primary/5 border border-primary/20 rounded-lg p-3 sm:p-4'>
                        <div className='flex items-center gap-2 mb-2'>
                          <div className='w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0'>
                            <span className='text-primary text-[10px] sm:text-xs'>
                              🤖
                            </span>
                          </div>
                          <span className='text-xs sm:text-sm font-semibold text-foreground'>
                            AI Feedback
                          </span>
                        </div>
                        <p className='text-[10px] sm:text-xs text-muted-foreground leading-relaxed'>
                          "Great component structure! Consider adding PropTypes
                          for better type safety. Your CSS Grid implementation
                          is perfect."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Next Challenge Preview */}
                  {/* Floating Success Badge */}
                  <div className='absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-green-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow-xl transform rotate-3 hover:rotate-0 transition-all duration-300 z-10'>
                    <div className='flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-semibold'>
                      <span>✓</span>
                      <span className='hidden sm:inline'>Task Complete</span>
                      <span className='sm:hidden'>Done</span>
                    </div>
                  </div>

                  {/* Floating Next Challenge Preview */}
                  <div className='absolute -bottom-5 sm:-bottom-5 -right-3 sm:-right-13 bg-card border border-border/20 rounded-xl p-2 sm:p-3 shadow-lg transform -rotate-6 hover:rotate-0 transition-all duration-300 z-10'>
                    <div className='text-[10px] sm:text-xs'>
                      <div className='font-semibold text-foreground mb-1'>
                        Next Challenge
                      </div>
                      <div className='text-muted-foreground'>
                        E-commerce Dashboard
                      </div>
                      <div className='flex items-center gap-0.5 sm:gap-1 mt-1'>
                        <span className='text-yellow-500 text-[8px] sm:text-xs'>
                          ⭐
                        </span>
                        <span className='text-yellow-500 text-[8px] sm:text-xs'>
                          ⭐
                        </span>
                        <span className='text-yellow-500 text-[8px] sm:text-xs'>
                          ⭐
                        </span>
                        <span className='text-muted-foreground text-[8px] sm:text-[10px] ml-1'>
                          Advanced
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </div>
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

export default CIASection
