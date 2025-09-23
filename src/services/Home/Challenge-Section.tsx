import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { MoveRight } from 'lucide-react'
import { motion } from 'motion/react'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-Cards'
import { challenges } from '@/services/challenges/data'

export function ChallengeSection() {
  return (
    <section className='bg-background py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-4xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl'>
              Featured Challenges
            </h2>
            <p className='mt-6 text-xl leading-8 text-muted-foreground'>
              Dive into real-world projects and sharpen your skills
            </p>
          </div>
        </motion.div>

        {/* Infinite Moving Cards Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 sm:mt-24"
        >
          <InfiniteMovingCards 
            challenges={challenges} 
            speed="slow"
            pauseOnHover={true}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className='flex justify-center mt-28 sm:mt-36'>
            <Button
              asChild
              size='lg'
              className='bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-xl hover:scale-[1.04] transition-all duration-300'
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
