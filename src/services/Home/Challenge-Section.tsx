import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { ChallengeGridItem } from '@/services/challenges/components/ChallengeGridItem'
import { useChallenges } from '@/services/challenges/hooks/useChallenges'
import {
  useSavedChallenges,
  useToggleSave,
} from '@/services/challenges/hooks/useSavedChallenges'
import { useAuth } from '@/services/challenges/hooks/useAuth'
import {
  MoveRight,
  Target,
  Users,
  CheckCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { motion, useInView } from 'motion/react'
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/animate-on-scroll'
import { useRef } from 'react'

export function ChallengeSection() {
  const { data: challenges = [], isLoading } = useChallenges()
  const { data: authData } = useAuth()
  const { data: savedChallengeIds = [] } = useSavedChallenges(
    authData?.isAuthenticated ?? false
  )
  const toggleSaveMutation = useToggleSave()
  const statsRef = useRef(null)
  const isInView = useInView(statsRef, { once: true, amount: 0.3 })

  // Use the first 3 challenges as featured
  const featuredChallenges = challenges.slice(0, 3)

  const handleToggleSave = (challengeId: string) => {
    if (!authData?.isAuthenticated) {
      console.warn('[handleToggleSave] User not authenticated')
      return
    }

    if (toggleSaveMutation.isPending) {
      return
    }

    const isSaved = savedChallengeIds.includes(challengeId)
    toggleSaveMutation.mutate({ challengeId, isSaved })
  }
  return (
    <section className='relative py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-background overflow-hidden'>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl' />
        <div className='absolute bottom-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl' />
      </div>

      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10 dark:opacity-5'>
        <div
          className='w-full h-full'
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(var(--primary)/0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8'>
        <StaggerContainer>
          {/* Section Header */}
          <StaggerItem>
            <div className='text-center mb-12 lg:mb-16'>
              <h2 className='text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4 lg:mb-6'>
                Featured <span className='text-primary'>Challenges</span>
              </h2>
              <p className='text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4'>
                Dive into real-world projects and sharpen your skills with our
                hand-picked challenges
              </p>
            </div>
          </StaggerItem>

          {/* Main Content */}
          <div className='max-w-7xl mx-auto'>
            {/* Hero Section with Stats */}
            <StaggerItem>
              <div className='bg-card/60 backdrop-blur-lg rounded-2xl p-6 sm:p-8 lg:p-12 mb-12 lg:mb-16 border border-border/30 hover:border-primary/30 transition-all duration-300'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center'>
                  {/* Left Side - Content */}
                  <div className='space-y-4 sm:space-y-6'>
                    <div className='inline-flex items-center gap-2 bg-primary/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-primary/20'>
                      <Sparkles className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary' />
                      <span className='text-xs sm:text-sm font-semibold text-primary'>
                        Hand-picked Challenges
                      </span>
                    </div>

                    <h3 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight'>
                      Master Frontend Development with{' '}
                      <span className='text-primary'>Real Projects</span>
                    </h3>

                    <p className='text-muted-foreground text-base sm:text-lg leading-relaxed'>
                      Join thousands of developers building portfolio-worthy
                      projects and getting AI-powered feedback.
                    </p>

                    <Button
                      asChild
                      size='lg'
                      className='bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto'
                    >
                      <Link to='/roadmap'>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className='flex items-center gap-2'
                        >
                          Start Learning Path
                          <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300' />
                        </motion.div>
                      </Link>
                    </Button>
                  </div>

                  {/* Right Side - Stats Grid */}
                  <div
                    ref={statsRef}
                    className='grid grid-cols-2 gap-3 sm:gap-4'
                  >
                    {[
                      { label: 'Challenges', value: '12+', icon: Target },
                      { label: 'Skill Levels', value: '3', icon: Users },
                      {
                        label: 'Technologies',
                        value: '8+',
                        icon: CheckCircle,
                      },
                      { label: 'Resources', value: '25+', icon: TrendingUp },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                        }
                        transition={{
                          duration: 0.6,
                          delay: index * 0.1,
                          ease: 'easeOut',
                        }}
                        className='bg-background/50 border border-border/50 rounded-xl p-3 sm:p-4 text-center hover:border-primary/30 hover:shadow-md transition-all duration-300 group hover:-translate-y-1 hover:scale-[1.02]'
                      >
                        <div className='w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-primary/20 transition-colors duration-150'>
                          <stat.icon className='w-4 h-4 sm:w-5 sm:h-5 text-primary' />
                        </div>
                        <div className='text-xl sm:text-2xl font-bold text-foreground mb-1'>
                          {stat.value}
                        </div>
                        <div className='text-xs sm:text-sm text-muted-foreground'>
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Featured Challenges */}
            <StaggerItem>
              <div className='mb-12 lg:mb-16'>
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4'>
                  <div>
                    <h3 className='text-xl sm:text-2xl font-bold text-foreground mb-2'>
                      Featured Challenges
                    </h3>
                    <p className='text-sm sm:text-base text-muted-foreground'>
                      Carefully curated projects to build your portfolio
                    </p>
                  </div>
                  <Button
                    asChild
                    variant='outline'
                    className='hidden sm:flex border-primary/30 text-primary hover:bg-primary/10 whitespace-nowrap'
                  >
                    <Link to='/challenges'>
                      Browse All Challenges
                      <MoveRight className='w-4 h-4 ml-2' />
                    </Link>
                  </Button>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                  {isLoading
                    ? // Loading skeleton
                      Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={index}
                          className='bg-card/60 rounded-xl p-6 animate-pulse'
                        >
                          <div className='h-48 bg-muted rounded-lg mb-4' />
                          <div className='h-4 bg-muted rounded mb-2' />
                          <div className='h-4 bg-muted rounded w-2/3 mb-4' />
                          <div className='flex gap-2'>
                            <div className='h-6 bg-muted rounded-full px-3 py-1 text-xs' />
                            <div className='h-6 bg-muted rounded-full px-3 py-1 text-xs' />
                          </div>
                        </div>
                      ))
                    : featuredChallenges.map((challenge, index: number) => (
                        <motion.div
                          key={challenge.id}
                          initial={{ opacity: 0, y: 30, scale: 0.95 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.15,
                            ease: 'easeOut',
                          }}
                          viewport={{ once: true, amount: 0.3 }}
                          className='group'
                        >
                          <motion.div
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className='h-full relative'
                          >
                            {index === 1 && (
                              <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10'>
                                Most Popular
                              </div>
                            )}
                            <ChallengeGridItem
                              challenge={challenge}
                              isSaved={savedChallengeIds.includes(challenge.id)}
                              onToggleSave={handleToggleSave}
                            />
                          </motion.div>
                        </motion.div>
                      ))}
                </div>

                {/* Mobile Browse All Button */}
                <div className='mt-6 sm:hidden'>
                  <Button
                    asChild
                    variant='outline'
                    className='w-full border-primary/30 text-primary hover:bg-primary/10'
                  >
                    <Link to='/challenges'>
                      Browse All Challenges
                      <MoveRight className='w-4 h-4 ml-2' />
                    </Link>
                  </Button>
                </div>
              </div>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
export default ChallengeSection
