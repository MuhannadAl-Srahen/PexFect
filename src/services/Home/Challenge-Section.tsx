import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { ChallengeGridItem } from '@/services/challenges/components/ChallengeGridItem'
import type { Challenge } from '@/services/challenges/types'
import { useState } from 'react'
import { MoveRight } from 'lucide-react'
import { motion } from 'motion/react'

const featuredChallenges: Challenge[] = [
  {
    id: 1,
    title: 'Responsive Navigation Bar',
    description:
      'Create a mobile-friendly navigation component with dropdown menus',
    difficulty: 'Beginner',
    tags: ['React', 'JavaScript'],
    estimatedTime: '30 min',
    submissions: 1234,
  },
  {
    id: 2,
    title: 'Todo App with Local Storage',
    description: 'Build a fully functional todo application with persistence',
    difficulty: 'Intermediate',
    tags: ['DOM', 'localStorage', 'events'],
    estimatedTime: '2 hours',
    submissions: 890,
  },
  {
    id: 3,
    title: 'React Component Library',
    description: 'Design and implement reusable React components',
    difficulty: 'Advanced',
    tags: ['components', 'props', 'typescript'],
    estimatedTime: '4 hours',
    submissions: 456,
  },
]

export function ChallengeSection() {
  const [savedChallenges, setSavedChallenges] = useState<Set<number>>(new Set())

  const handleToggleSave = (challengeId: number) => {
    setSavedChallenges((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(challengeId)) {
        newSet.delete(challengeId)
      } else {
        newSet.add(challengeId)
      }
      return newSet
    })
  }
  return (
    <section className='bg-background py-16 sm:py-24 lg:py-34'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-7xl'>
              Featured Challenges
            </h2>
            <p className='mt-6 text-xl leading-8 text-muted-foreground'>
              Dive into real-world projects and sharp your skills
            </p>
          </div>
        </motion.div>

        {/* Challenge Grid */}
        <div className='mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-none'>
          {/* Mobile Layout - Single Column */}
          <div className='block md:hidden space-y-6 max-w-md mx-auto'>
            {featuredChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <div className='challenge-grid-item'>
                  <ChallengeGridItem
                    challenge={challenge}
                    isSaved={savedChallenges.has(challenge.id)}
                    onToggleSave={handleToggleSave}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Layout - 3 Columns with Center Highlight */}
          <div className='hidden md:block'>
            <div className='flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-8 xl:gap-12'>
              {/* Left Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className='w-full max-w-sm lg:max-w-xs xl:max-w-sm lg:mt-9 '
              >
                <ChallengeGridItem
                  challenge={featuredChallenges[0]}
                  isSaved={savedChallenges.has(featuredChallenges[0].id)}
                  onToggleSave={handleToggleSave}
                />
              </motion.div>

              {/* Center Card - Highlighted */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
                className='w-full max-w-sm lg:max-w-xs xl:max-w-sm transform lg:scale-110 lg:shadow-2xl lg:z-10 relative rounded-3xl'
              >
                <ChallengeGridItem
                  challenge={featuredChallenges[1]}
                  isSaved={savedChallenges.has(featuredChallenges[1].id)}
                  onToggleSave={handleToggleSave}
                />
              </motion.div>

              {/* Right Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, margin: '-100px' }}
                className='w-full max-w-sm lg:max-w-xs xl:max-w-sm lg:mt-14 '
              >
                <ChallengeGridItem
                  challenge={featuredChallenges[2]}
                  isSaved={savedChallenges.has(featuredChallenges[2].id)}
                  onToggleSave={handleToggleSave}
                />
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className='flex justify-center mt-24 sm:mt-32'>
            <Button
              asChild
              size='lg'
              className='bg-primary hover:bg-primary/80 text-primary-foreground px-10 py-7 text-xl font-semibold rounded-3xl shadow-xl hover:shadow-xl hover:scale-[1.04] transition-all duration-300'
            >
              <Link to='/challenges'>
                View All Challenges
                <MoveRight className='inline-block ml-1 !w-7 !h-7' />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
export default ChallengeSection
