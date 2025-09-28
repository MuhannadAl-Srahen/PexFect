import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { ChallengeGridItem } from '@/services/challenges/components/ChallengeGridItem'
import { challenges } from '@/services/challenges/data'
import { useState } from 'react'
import { MoveRight } from 'lucide-react'
import { motion } from 'motion/react'

// Use the first 3 challenges from the actual challenges data
const featuredChallenges = challenges.slice(0, 3)

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
      <div className='mx-auto max-w-7xl px-6 lg:px-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl'>
              Featured Challenges
            </h2>
            <p className='mt-6 text-xl leading-8 text-muted-foreground'>
              Dive into real-world projects and sharp your skills
            </p>
          </div>
        </motion.div>

        {/* Challenge Grid */}
        <div className='mx-auto mt-12 sm:mt-16 lg:mt-35 max-w-none'>
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
            <div className='flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-6 xl:gap-8'>
              {/* Left Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className='w-w-[320px] h-[420px] max-w-xs lg:max-w-xs xl:max-w-sm lg:mt-24 flex flex-col '
              >
                <ChallengeGridItem
                  challenge={featuredChallenges[0]}
                  isSaved={savedChallenges.has(featuredChallenges[0].id)}
                  onToggleSave={handleToggleSave}
                />
              </motion.div>

              {/* Center Card  */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
                className='w-w-[320px] h-[420px] max-w-xs lg:max-w-xs xl:max-w-sm transform lg:mt-2 lg:shadow-2xl lg:z-10 relative rounded-3xl flex flex-col'
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
                className='w-w-[320px] h-[420px] max-w-xs lg:max-w-xs xl:max-w-sm lg:mt-24 flex flex-col '
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
          <div className='flex justify-center mt-24 sm:mt-24'>
            <Button
              asChild
              size='lg'
              className='bg-primary hover:bg-primary/80 text-primary-foreground px-10 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-xl hover:scale-[1.04] transition-all duration-300'
            >
              <Link to='/challenges'>
                View All Challenges
                <MoveRight className='inline-block ml-1 !w-6 !h-6' />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
export default ChallengeSection