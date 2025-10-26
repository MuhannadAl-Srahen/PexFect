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
import { motion } from 'motion/react'

export function ChallengeSection() {
  const { data: challenges = [], isLoading } = useChallenges()
  const { data: authData } = useAuth()
  const { data: savedChallengeIds = [] } = useSavedChallenges(
    authData?.isAuthenticated ?? false
  )
  const toggleSaveMutation = useToggleSave()

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl lg:text-6xl font-bold text-foreground mb-6'>
            Featured <span className='text-primary'>Challenges</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            Dive into real-world projects and sharpen your skills with our
            hand-picked challenges
          </p>
        </motion.div>

        {/* Main Content */}
        <div className='max-w-7xl mx-auto'>
          {/* Hero Section with Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='bg-card/60 backdrop-blur-lg rounded-2xl p-8 lg:p-12 mb-16 border border-border/30 hover:border-primary/30 transition-all duration-300'
          >
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
              {/* Left Side - Content */}
              <div className='space-y-6'>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className='inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 border border-primary/20'
                >
                  <Sparkles className='w-4 h-4 text-primary' />
                  <span className='text-sm font-semibold text-primary'>
                    Hand-picked Challenges
                  </span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className='text-3xl lg:text-4xl font-bold text-foreground leading-tight'
                >
                  Master Frontend Development with{' '}
                  <span className='text-primary'>Real Projects</span>
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className='text-muted-foreground text-lg leading-relaxed'
                >
                  Join thousands of developers building portfolio-worthy
                  projects and getting AI-powered feedback.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Button
                    asChild
                    size='lg'
                    className='bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group'
                  >
                    <Link to='/roadmap'>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className='flex items-center gap-2'
                      >
                        Start Learning Path
                        <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
                      </motion.div>
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Right Side - Stats Grid */}
              <div className='grid grid-cols-2 gap-4'>
                {[
                  { label: 'Challenges', value: '12+', icon: Target },
                  { label: 'Skill Levels', value: '3', icon: Users },
                  { label: 'Technologies', value: '8+', icon: CheckCircle },
                  { label: 'Resources', value: '25+', icon: TrendingUp },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className='bg-background/50 border border-border/50 rounded-xl p-4 text-center hover:border-primary/30 hover:shadow-md transition-all duration-150 group'
                  >
                    <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors duration-150'>
                      <stat.icon className='w-5 h-5 text-primary' />
                    </div>
                    <div className='text-2xl font-bold text-foreground mb-1'>
                      {stat.value}
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Featured Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className='mb-16'
          >
            <div className='flex items-center justify-between mb-8'>
              <div>
                <h3 className='text-2xl font-bold text-foreground mb-2'>
                  Featured Challenges
                </h3>
                <p className='text-muted-foreground'>
                  Carefully curated projects to build your portfolio
                </p>
              </div>
              <Button
                asChild
                variant='outline'
                className='hidden sm:flex border-primary/30 text-primary hover:bg-primary/10'
              >
                <Link to='/challenges'>
                  Browse All Challenges
                  <MoveRight className='w-4 h-4 ml-2' />
                </Link>
              </Button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true, margin: '-50px' }}
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
export default ChallengeSection
