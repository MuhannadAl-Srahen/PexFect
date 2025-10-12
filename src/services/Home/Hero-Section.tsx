import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import {
  Sparkles,
  Play,
  ArrowRight,
  Target,
  TrendingUp,
  CheckCircle,
  Zap,
  Monitor,
  Star,
} from 'lucide-react'
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/animate-on-scroll'
import { motion } from 'motion/react'

export function HeroSection() {
  return (
    <section className='relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5'>
      {/* Background Grid */}
      <div className='absolute inset-0 opacity-20 dark:opacity-10'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(var(--primary)/0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Gradient Effects */}
      <div className='absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl'></div>

      {/* Main Content */}
      <div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20'>
          {/* Left Content */}
          <div className='text-left'>
            <StaggerContainer>
              {/* Badge */}
              <StaggerItem>
                <Badge className='bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 px-4 py-2 rounded-full text-sm font-medium mb-8 inline-flex items-center gap-2'>
                  <Sparkles className='w-4 h-4' />
                  AI-Powered Learning Journey
                  <Zap className='w-4 h-4' />
                </Badge>
              </StaggerItem>

              {/* Main Headline */}
              <StaggerItem>
                <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight'>
                  Master
                  <br />
                  <span className='bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent'>
                    Frontend
                  </span>
                  <br />
                  Development
                </h1>
              </StaggerItem>

              {/* Enhanced Subtitle */}
              <StaggerItem>
                <p className='text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg'>
                  Transform your coding skills with{' '}
                  <span className='text-primary font-semibold'>
                    AI-powered challenges
                  </span>
                  ,
                  <span className='text-primary font-semibold'>
                    {' '}
                    structured roadmaps
                  </span>
                  , and{' '}
                  <span className='text-foreground font-semibold'>
                    instant feedback
                  </span>{' '}
                  that guides every step of your journey
                </p>
              </StaggerItem>

              {/* Feature Tags */}
              <StaggerItem>
                <div className='flex flex-wrap gap-3 mb-10'>
                  {[
                    { icon: CheckCircle, text: 'Real-world Projects' },
                    { icon: Target, text: 'AI Feedback' },
                    { icon: TrendingUp, text: 'Progress Tracking' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-2 bg-card/50 backdrop-blur-sm px-3 py-2 rounded-full border border-border/20 text-sm'
                    >
                      <item.icon className='w-4 h-4 text-primary' />
                      <span className='text-foreground font-medium'>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </StaggerItem>

              {/* CTA Buttons */}
              <StaggerItem>
                <div className='flex flex-col sm:flex-row gap-4 mb-12'>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      asChild
                      size='lg'
                      className='bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group'
                    >
                      <Link to='/signup'>
                        Get Started Free
                        <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
                      </Link>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      asChild
                      size='lg'
                      variant='outline'
                      className='bg-background/50 backdrop-blur-sm hover:bg-background/80 border-border/50 hover:border-primary/50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 group'
                    >
                      <Link to='/roadmap'>
                        <Play className='w-5 h-5 mr-2' />
                        View Roadmap
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Right Visual Section */}
          <div className='relative lg:ml-8'>
            <StaggerContainer>
              <StaggerItem>
                <div className='relative max-w-lg mx-auto'>
                  {/* Main Dashboard Container */}
                  <motion.div
                    className='relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-xl'
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {/* Header */}
                    <div className='flex items-center justify-between mb-6'>
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                          <Monitor className='w-4 h-4 text-primary-foreground' />
                        </div>
                        <div>
                          <span className='font-semibold text-foreground'>
                            Live Editor
                          </span>
                          <div className='text-xs text-muted-foreground'>
                            Real-time feedback
                          </div>
                        </div>
                      </div>
                      <Badge className='bg-green-500/10 text-green-500 border-green-500/20 px-3 py-1'>
                        <div className='w-2 h-2 bg-green-400 rounded-full mr-2'></div>
                        All Tests Pass
                      </Badge>
                    </div>

                    {/* Enhanced Code Editor with Syntax Highlighting */}
                    <motion.div
                      className='bg-muted/70 dark:bg-muted/40 backdrop-blur-sm rounded-2xl p-6 mb-6 font-mono text-sm border border-border/30 shadow-inner relative overflow-hidden'
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {/* Code Editor Header */}
                      <div className='flex items-center gap-2 mb-4 pb-3 border-b border-border/20'>
                        <div className='flex gap-2'>
                          <div className='w-3 h-3 bg-red-400 rounded-full'></div>
                          <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
                          <div className='w-3 h-3 bg-green-400 rounded-full'></div>
                        </div>
                        <span className='text-muted-foreground text-xs ml-2'>
                          challenge.jsx
                        </span>
                      </div>

                      {/* Animated Code */}
                      <motion.div
                        className='space-y-2'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, staggerChildren: 0.1 }}
                      >
                        <motion.div
                          className='text-blue-400'
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                        >
                          <span className='text-purple-400'>const</span>{' '}
                          <span className='text-yellow-300'>
                            HeroComponent
                          </span>{' '}
                        </motion.div>
                        <motion.div
                          className='text-green-400 ml-4'
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <span className='text-purple-400'>return</span> (
                        </motion.div>
                        <motion.div
                          className='text-blue-300 ml-8'
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          &lt;<span className='text-red-400'>div</span>{' '}
                          <span className='text-green-300'>className</span>=
                          <span className='text-yellow-300'>
                            "hero-section"
                          </span>
                          &gt;
                        </motion.div>
                        <motion.div
                          className='text-blue-300 ml-12'
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          &lt;<span className='text-red-400'>h1</span>
                          &gt;Welcome to PexFect&lt;/
                          <span className='text-red-400'>h1</span>&gt;
                        </motion.div>
                        <motion.div
                          className='text-blue-300 ml-12'
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          &lt;<span className='text-red-400'>button</span>{' '}
                          <span className='text-green-300'>onClick</span>=
                          {'{handleClick}'}&gt;Start Learning&lt;/
                          <span className='text-red-400'>button</span>&gt;
                        </motion.div>
                        <motion.div
                          className='text-blue-300 ml-8'
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          &lt;/<span className='text-red-400'>div</span>&gt;
                        </motion.div>
                        <motion.div
                          className='text-green-400 ml-4'
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          );
                        </motion.div>
                        <motion.div
                          className='text-blue-400'
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          {'};'}
                        </motion.div>
                      </motion.div>

                      {/* Typing Indicator */}
                      <motion.div
                        className='flex items-center gap-2 mt-4 text-primary/60'
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <div className='w-1 h-4 bg-primary animate-pulse'></div>
                        <span className='text-xs'>
                          AI is analyzing your code...
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className='grid grid-cols-2 gap-4'>
                      <motion.div
                        className='bg-primary/10 rounded-xl p-4 border border-primary/20'
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className='flex items-center justify-between mb-2'>
                          <div className='text-2xl font-bold text-primary'>
                            98%
                          </div>
                          <TrendingUp className='w-5 h-5 text-primary' />
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          Success Rate
                        </div>
                        <div className='text-xs text-primary/70 mt-1'>
                          ↗ +5% this week
                        </div>
                      </motion.div>

                      <motion.div
                        className='bg-secondary/50 rounded-xl p-4 border border-border/20'
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className='flex items-center justify-between mb-2'>
                          <div className='text-2xl font-bold text-foreground'>
                            12min
                          </div>
                          <Zap className='w-5 h-5 text-yellow-500' />
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          Avg. Time
                        </div>
                        <div className='text-xs text-yellow-600/70 mt-1'>
                          Lightning fast
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Gently Flying Floating Stats Cards */}
                  <motion.div
                    className='absolute -top-10 -left-13 bg-primary text-primary-foreground rounded-xl p-4 shadow-lg z-10 hidden lg:block -rotate-9 hover:rotate-0 transition-all duration-300'
                    animate={{ y: [-4, 4, -4] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <div className='text-sm'>Challenges</div>
                    <div className='flex gap-1 mt-1'>
                      {[...Array(6)].map((_, i) => (
                        <Star
                          key={i}
                          className='w-2 h-2 text-yellow-300 fill-current'
                        />
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className='absolute -bottom-10 -right-20 bg-card border border-border/50 rounded-xl p-4 shadow-lg backdrop-blur-sm z-10 hidden lg:block -rotate-12 hover:rotate-0 transition-all duration-300'
                    animate={{ y: [4, -4, 4] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 3,
                    }}
                  >
                    <div className='flex items-center gap-2 mb-2'>
                      <CheckCircle className='w-4 h-4 text-green-500' />
                      <span className='font-semibold text-foreground text-sm'>
                        Challenge Complete!
                      </span>
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      Great job! 🎉
                    </div>
                    <Badge className='bg-primary/10 text-primary border-primary/20 text-xs mt-2'>
                      New Achievement
                    </Badge>
                  </motion.div>

                  {/* Clean Floating Code Elements - Using Website Colors */}
                  <motion.div
                    className='absolute top-8 -left-24 text-primary font-mono text-3xl pointer-events-none hidden xl:block font-bold'
                    animate={{
                      rotate: [0, 5, -5, 0],
                      y: [-5, 5, -5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    &lt;/&gt;
                  </motion.div>

                  <motion.div
                    className='absolute bottom-16 -right-24 text-primary font-mono text-3xl pointer-events-none hidden xl:block font-bold'
                    animate={{
                      rotate: [0, -5, 5, 0],
                      y: [5, -5, 5],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  >
                    {'{ }'}
                  </motion.div>

                  <motion.div
                    className='absolute top-1/2 -left-28 text-primary/70 font-mono text-xl pointer-events-none hidden xl:block font-semibold'
                    animate={{
                      rotate: [0, 3, -3, 0],
                      x: [-3, 3, -3],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    const
                  </motion.div>

                  <motion.div
                    className='absolute top-1/4 -right-28 text-primary/70 font-mono text-xl pointer-events-none hidden xl:block font-semibold'
                    animate={{
                      rotate: [0, -3, 3, 0],
                      x: [3, -3, 3],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  >
                    =&gt;
                  </motion.div>

                  <motion.div
                    className='absolute bottom-1/3 -left-26 text-primary/50 font-mono text-lg pointer-events-none hidden xl:block font-medium'
                    animate={{
                      rotate: [0, 4, -4, 0],
                      y: [-4, 4, -4],
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
                  >
                    [ ]
                  </motion.div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
