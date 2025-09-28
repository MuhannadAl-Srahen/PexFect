import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ChallengeGridItem } from '@/services/challenges/components/ChallengeGridItem'
import { Heart, ArrowRight } from 'lucide-react'

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
  estimatedTime: string
  submissions: number
  image?: string
}

interface SavedChallengesProps {
  challenges?: Challenge[]
}

const mockSavedChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    description: 'Master advanced React patterns including render props, compound components, and custom hooks to build more flexible and reusable components.',
    difficulty: 'Advanced',
    tags: ['React', 'TypeScript', 'Patterns', 'Hooks'],
    estimatedTime: '8-10 hours',
    submissions: 156,
    image: '/src/assets/images/girl.jpg',
  },
  {
    id: '2',
    title: 'CSS Grid Mastery',
    description: 'Build complex layouts using CSS Grid with responsive design principles and modern layout techniques.',
    difficulty: 'Intermediate',
    tags: ['CSS', 'Grid', 'Layout', 'Responsive'],
    estimatedTime: '4-5 hours',
    submissions: 892,
    image: '/src/assets/images/girl.jpg',
  },
  {
    id: '3',
    title: 'Node.js REST API',
    description: 'Create a full-featured REST API with authentication, validation, and database integration using modern Node.js practices.',
    difficulty: 'Advanced',
    tags: ['Node.js', 'API', 'Express', 'MongoDB'],
    estimatedTime: '10-12 hours',
    submissions: 234,
    image: '/src/assets/images/girl.jpg',
  },
  {
    id: '4',
    title: 'Vue.js Component Library',
    description: 'Build a reusable component library with proper documentation, testing, and TypeScript support.',
    difficulty: 'Intermediate',
    tags: ['Vue.js', 'Components', 'TypeScript', 'Testing'],
    estimatedTime: '6-8 hours',
    submissions: 445,
    image: 'src/assets/images/girl.jpg',
  },
  {
    id: '5',
    title: 'MongoDB Database Design',
    description: 'Learn how to design efficient MongoDB schemas and optimize queries for better performance in production applications.',
    difficulty: 'Intermediate',
    tags: ['MongoDB', 'Database', 'NoSQL', 'Performance'],
    estimatedTime: '5-7 hours',
    submissions: 312,
    image: '/src/assets/images/girl.jpg',
  },
  {
    id: '6',
    title: 'GraphQL API Development',
    description: 'Build modern APIs using GraphQL with resolvers, mutations, subscriptions, and proper error handling.',
    difficulty: 'Advanced',
    tags: ['GraphQL', 'API', 'Apollo', 'Subscriptions'],
    estimatedTime: '12-15 hours',
    submissions: 189,
    image: '/src/assets/images/girl.jpg',
  },
]

export function SavedChallenges({ challenges = mockSavedChallenges }: SavedChallengesProps) {
  const navigate = useNavigate()
  const [savedChallenges, setSavedChallenges] = useState(challenges)
  
  
  const [savedIds, setSavedIds] = useState<Set<string>>(
    new Set(savedChallenges.map(c => c.id))
  )

  const handleToggleSave = (challengeId: string) => {
    setSavedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(challengeId)) {
        newSet.delete(challengeId)
       
        setTimeout(() => {
          setSavedChallenges(current => 
            current.filter(challenge => challenge.id !== challengeId)
          )
        }, 300)
      } else {
        newSet.add(challengeId)
      }
      return newSet
    })
  }

  if (savedChallenges.length === 0) {
    return (
      <div className="text-center py-16 lg:py-20 relative overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 p-4 rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
        <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-red-500 group-hover:fill-red-500 relative z-10" />
        <h3 className="text-xl font-semibold text-foreground mb-2 transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-sm relative z-10">
          No Saved Challenges
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6 transition-all duration-300 group-hover:opacity-90 relative z-10">
          Start exploring challenges and save the ones you want to tackle later.
        </p>
        <Button 
          onClick={() => navigate({ to: '/challenges' })} 
          className="gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 group/btn relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10">Explore Challenges</span>
          <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover/btn:rotate-12 group-hover/btn:scale-110 relative z-10" />
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative overflow-hidden cursor-pointer group/header transition-all duration-300 hover:scale-[1.02] p-3 rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/header:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500 transition-all duration-300 group-hover/header:scale-110 group-hover/header:rotate-12 group-hover/header:drop-shadow-sm" />
            <h3 className="text-lg font-semibold text-foreground transition-all duration-300 group-hover/header:text-primary group-hover/header:drop-shadow-sm">
              Saved Challenges
            </h3>
          </div>
          <p className="text-sm text-muted-foreground transition-all duration-300 group-hover/header:opacity-80 group-hover/header:text-primary/60">
            {savedChallenges.length} challenge{savedChallenges.length !== 1 ? 's' : ''} saved for later
          </p>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate({ to: '/challenges' })}
          className="gap-2 w-fit transition-all duration-300 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 group/browse relative z-10"
        >
          <span className="transition-all duration-300 group-hover/browse:drop-shadow-sm">Browse More</span>
          <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover/browse:rotate-12 group-hover/browse:scale-110" />
        </Button>
      </div>

      {/* Challenges Grid */}
     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 md:gap-5 lg:gap-6 xl:gap-7">
        {savedChallenges.map((challenge, index) => (
          <div
            key={challenge.id}
            className="relative overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl rounded-xl"
            style={{
              animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl z-10" />
            
          <ChallengeGridItem
              challenge={challenge}
              isSaved={savedIds.has(challenge.id)}
              onToggleSave={handleToggleSave}
              className="h-full w-full min-h-[400px] sm:min-h-[420px] md:min-h-[440px] lg:min-h-[460px] xl:min-h-[480px] transition-all duration-300 group-hover:shadow-2xl"
              imageClassName="h-[250px] sm:h-[260px] md:h-[270px] lg:h-[280px] xl:h-[290px] w-full object-cover transition-all duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}