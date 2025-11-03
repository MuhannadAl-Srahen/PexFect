import { ArrowRight, Target, Clock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'

interface NextChallengeProps {
  nextChallenge?: {
    id: string
    title: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    technologies: string[]
    description: string
    estimatedTime?: string
    roadmapPath?: 'beginner' | 'intermediate' | 'advanced'
    challengeCount?: number
    progressPercentage?: number
  }
}

export function NextChallenge({ nextChallenge }: NextChallengeProps) {
  if (!nextChallenge) return null

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 hover:bg-green-100'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
      case 'advanced':
        return 'bg-red-100 text-red-800 hover:bg-red-100'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return '🌱'
      case 'intermediate':
        return '⚡'
      case 'advanced':
        return '🚀'
      default:
        return '📝'
    }
  }

  return (
    <Card className='p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <Target className='w-5 h-5 text-blue-500 mr-2' />
          <h3 className='text-xl font-bold text-foreground'>Recommended Next</h3>
        </div>
        <Button variant='outline' size='sm' asChild>
          <Link to='/roadmap'>
            View Full Roadmap
            <ArrowRight className='w-4 h-4 ml-2' />
          </Link>
        </Button>
      </div>
      
      <p className='text-sm text-muted-foreground mb-4'>Based on your current skills</p>

      <Card className='bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700'>
        <CardContent className='p-4'>
          {/* Challenge Header */}
          <div className='flex items-start justify-between mb-3'>
            <div className='flex-1'>
              <div className='flex items-center space-x-2 mb-2'>
                <span className='text-lg'>{getDifficultyIcon(nextChallenge.difficulty)}</span>
                <h4 className='text-lg font-bold text-foreground'>{nextChallenge.title}</h4>
              </div>
              
              <div className='flex items-center space-x-2 mb-3'>
                <Badge variant='secondary' className={getDifficultyColor(nextChallenge.difficulty)}>
                  {nextChallenge.difficulty}
                </Badge>
                {nextChallenge.estimatedTime && (
                  <Badge variant='outline' className='text-xs'>
                    <Clock className='w-3 h-3 mr-1' />
                    {nextChallenge.estimatedTime}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Technologies */}
          <div className='flex flex-wrap gap-1 mb-3'>
            {nextChallenge.technologies.map((tech: string, index: number) => (
              <Badge key={index} variant='outline' className='text-xs bg-blue-50 text-blue-700 border-blue-200'>
                {tech}
              </Badge>
            ))}
          </div>
          
          {/* Description */}
          <p className='text-sm text-muted-foreground mb-4'>{nextChallenge.description}</p>
          
          {/* Roadmap Path Info */}
          {nextChallenge.roadmapPath && (
            <div className='bg-muted/50 rounded-lg p-3 mb-4 border border-border/50'>
              <div className='flex items-center space-x-2 mb-1'>
                <Zap className='w-4 h-4 text-blue-500' />
                <span className='text-sm font-medium text-foreground'>
                  Part of {nextChallenge.roadmapPath} Learning Path
                </span>
              </div>
              {nextChallenge.challengeCount && (
                <p className='text-xs text-muted-foreground'>
                  {nextChallenge.challengeCount} challenges • {nextChallenge.progressPercentage || 0}% completed
                </p>
              )}
            </div>
          )}
          
          {/* Action Buttons */}
          <div className='flex space-x-2'>
            <Button className='flex-1 bg-blue-600 hover:bg-blue-700 text-white' asChild>
              <Link to='/challenges' search={{ filter: nextChallenge.id }}>
                Start Challenge
                <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
            {nextChallenge.roadmapPath && (
              <Button variant='outline' size='sm' asChild>
                <Link to='/roadmap'>
                  View Path
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Card>
  )
}