import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, AlertTriangle, BookOpen, FileText } from 'lucide-react'
import type { Challenge } from '@/types/challenge'

interface ChallengeOverviewProps {
  challenge: Challenge
}

export function ChallengeOverview({ challenge }: ChallengeOverviewProps) {
  return (
    <div className='space-y-4 md:space-y-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6'>
        <div className='lg:col-span-2 space-y-4 md:space-y-6'>
          <Card className='transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
            <CardHeader className='pb-3 md:pb-6'>
              <div className='flex items-center'>
                <div className='p-1.5 md:p-2 bg-primary/10 rounded-lg mr-2 md:mr-3'>
                  <BookOpen className='h-4 w-4 md:h-6 md:w-6 text-primary' />
                </div>
                <div>
                  <CardTitle className='text-sm md:text-xl font-bold text-foreground'>
                    Challenge Description
                  </CardTitle>
                  <p className='text-xs md:text-sm text-muted-foreground'>
                    What you'll be building
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className='pt-0'>
              <p className='text-sm md:text-base text-muted-foreground leading-relaxed mb-3 md:mb-4'>
                {challenge.description}
              </p>
              <div className='flex flex-wrap gap-1.5 md:gap-2'>
                {challenge.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant='outline'
                    className='text-xs transition-all duration-300 hover:scale-105 hover:bg-primary/10'
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className='transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
            <CardHeader className='pb-3 md:pb-6'>
              <div className='flex items-center'>
                <div className='p-1.5 md:p-2 bg-primary/10 rounded-lg mr-2 md:mr-3'>
                  <FileText className='h-4 w-4 md:h-6 md:w-6 text-primary' />
                </div>
                <div>
                  <CardTitle className='text-sm md:text-xl font-bold text-foreground'>
                    Requirements
                  </CardTitle>
                  <p className='text-xs md:text-sm text-muted-foreground'>
                    What you need to build
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className='pt-0'>
              <ul className='space-y-2 md:space-y-3'>
                {challenge.requirements.map((req, index) => (
                  <li key={index} className='flex items-start group'>
                    <div className='w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0 transition-all duration-300 group-hover:scale-125' />
                    <span className='text-xs md:text-base text-muted-foreground'>
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-4 md:space-y-6'>
          <Card className='transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
            <CardHeader className='pb-3 md:pb-6'>
              <div className='flex items-center'>
                <div className='p-1.5 md:p-2 bg-primary/10 rounded-lg mr-2 md:mr-3'>
                  <Lightbulb className='h-4 w-4 md:h-6 md:w-6 text-primary' />
                </div>
                <div>
                  <CardTitle className='text-sm md:text-xl font-bold text-foreground'>
                    Helpful Tips
                  </CardTitle>
                  <p className='text-xs md:text-sm text-muted-foreground'>
                    Expert recommendations
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className='pt-0'>
              <ul className='space-y-2 md:space-y-3'>
                {challenge.tips.map((tip, index) => (
                  <li
                    key={index}
                    className='text-xs md:text-sm text-muted-foreground flex items-start group'
                  >
                    <div className='w-1 h-1 md:w-1.5 md:h-1.5 bg-primary rounded-full mt-1.5 md:mt-2 mr-1.5 md:mr-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125' />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className='transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
            <CardHeader className='pb-3 md:pb-6'>
              <div className='flex items-center'>
                <div className='p-1.5 md:p-2 bg-destructive/10 rounded-lg mr-2 md:mr-3'>
                  <AlertTriangle className='h-4 w-4 md:h-6 md:w-6 text-destructive' />
                </div>
                <div>
                  <CardTitle className='text-sm md:text-xl font-bold text-foreground'>
                    Common Pitfalls
                  </CardTitle>
                  <p className='text-xs md:text-sm text-muted-foreground'>
                    Mistakes to avoid
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className='pt-0'>
              <ul className='space-y-2 md:space-y-3'>
                {challenge.pitfalls.map((pitfall, index) => (
                  <li
                    key={index}
                    className='text-xs md:text-sm text-muted-foreground flex items-start group'
                  >
                    <div className='w-1 h-1 md:w-1.5 md:h-1.5 bg-destructive rounded-full mt-1.5 md:mt-2 mr-1.5 md:mr-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125' />
                    {pitfall}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
