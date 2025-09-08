import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { ChallengeGridItem } from '@/services/challenges/components/ChallengeGridItem'
import type { Challenge } from '@/services/challenges/types'
import { useState } from 'react'
import { MoveRight } from 'lucide-react';



const featuredChallenges: Challenge[] = [
  {
    id: 1,
    title: 'Responsive Navigation Bar',
    description: 'Create a mobile-friendly navigation component with dropdown menus',
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
    setSavedChallenges(prev => {
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
    <section className="bg-background py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Featured Challenges
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Dive into real-world projects and sharp your skills
          </p>
        </div>

        {/* Challenge Grid */}
        <div className="mx-auto mt-12 sm:mt-20 lg:mt-20 max-w-none">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredChallenges.map((challenge) => (
              <div key={challenge.id} className="challenge-grid-item">
                <ChallengeGridItem
                  challenge={challenge}
                  isSaved={savedChallenges.has(challenge.id)}
                  onToggleSave={handleToggleSave}
                />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-24 sm:mt-32">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.04] transition-all duration-300"
          >
            <Link to="/challenges">
              View All Challenges
              <MoveRight className="inline-block ml-1" /> 
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ChallengeSection
