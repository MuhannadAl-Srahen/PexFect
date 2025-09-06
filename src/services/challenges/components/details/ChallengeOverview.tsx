import { Badge } from '@/components/ui/badge'
import { Lightbulb, AlertTriangle, BookOpen, FileText } from 'lucide-react'
import type { Challenge } from '@/types/challenge'

interface ChallengeOverviewProps {
  challenge: Challenge
}

export function ChallengeOverview({ challenge }: ChallengeOverviewProps) {
  return (
    <div className='space-y-6 md:space-y-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-6'>
          {/* Description */}
          <div className='bg-card text-card-foreground flex flex-col gap-4 md:gap-6 rounded-xl border py-4 md:py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
            <div className='flex items-center px-4 md:px-6'>
              <div className='p-2 bg-primary/10 rounded-lg mr-3'>
                <BookOpen className='h-4 w-4 md:h-6 md:w-6 text-primary' />
              </div>
              <div>
                <h3 className='text-base md:text-xl font-bold text-foreground'>
                  Challenge Description
                </h3>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  What you'll be building
                </p>
              </div>
            </div>
            <div className='px-4 md:px-6'>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                {challenge.description}
              </p>
              <div className='flex flex-wrap gap-2'>
                {challenge.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant='outline'
                    className='transition-all duration-300 hover:scale-105 hover:bg-primary/10'
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className='bg-card text-card-foreground flex flex-col gap-4 md:gap-6 rounded-xl border py-4 md:py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
            <div className='flex items-center px-4 md:px-6'>
              <div className='p-2 bg-primary/10 rounded-lg mr-3'>
                <FileText className='h-4 w-4 md:h-6 md:w-6 text-primary' />
              </div>
              <div>
                <h3 className='text-base md:text-xl font-bold text-foreground'>
                  Requirements
                </h3>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  What you need to build
                </p>
              </div>
            </div>
            <div className='px-4 md:px-6'>
              <ul className='space-y-3'>
                {challenge.requirements.map((req, index) => (
                  <li key={index} className='flex items-start group'>
                    <div className='w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0 transition-all duration-300 group-hover:scale-125' />
                    <span className='text-muted-foreground'>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='space-y-6'>
          {/* Tips */}
          <div className='bg-card text-card-foreground flex flex-col gap-4 md:gap-6 rounded-xl border py-4 md:py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
            <div className='flex items-center px-4 md:px-6'>
              <div className='p-2 bg-primary/10 rounded-lg mr-3'>
                <Lightbulb className='h-4 w-4 md:h-6 md:w-6 text-primary' />
              </div>
              <div>
                <h3 className='text-base md:text-xl font-bold text-foreground'>
                  Helpful Tips
                </h3>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  Expert recommendations
                </p>
              </div>
            </div>
            <div className='px-4 md:px-6'>
              <ul className='space-y-3'>
                {challenge.tips.map((tip, index) => (
                  <li
                    key={index}
                    className='text-sm text-muted-foreground flex items-start group'
                  >
                    <div className='w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125' />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Common Pitfalls */}
          <div className='bg-card text-card-foreground flex flex-col gap-4 md:gap-6 rounded-xl border py-4 md:py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
            <div className='flex items-center px-4 md:px-6'>
              <div className='p-2 bg-destructive/10 rounded-lg mr-3'>
                <AlertTriangle className='h-4 w-4 md:h-6 md:w-6 text-destructive' />
              </div>
              <div>
                <h3 className='text-base md:text-xl font-bold text-foreground'>
                  Common Pitfalls
                </h3>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  Mistakes to avoid
                </p>
              </div>
            </div>
            <div className='px-4 md:px-6'>
              <ul className='space-y-3'>
                {challenge.pitfalls.map((pitfall, index) => (
                  <li
                    key={index}
                    className='text-sm text-muted-foreground flex items-start group'
                  >
                    <div className='w-1.5 h-1.5 bg-destructive rounded-full mt-2 mr-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125' />
                    {pitfall}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
