import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Clock, Users, Star, Grid, List } from 'lucide-react'


interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  thumbnailUrl: string
  tags: string[]
  submissionCount: number
  estimatedTime: string
  rating: number
  isNew?: boolean
  isPremium?: boolean
}

export const Route = createFileRoute('/challenges/')({
  component: ChallengesPage,
})


const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Product Preview Card Component',
    description: 'Build a responsive product card with image and details',
    difficulty: 'Beginner',
    category: 'HTML/CSS',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['flexbox', 'responsive'],
    submissionCount: 89,
    estimatedTime: '1-2 hours',
    rating: 4.8,
    isNew: true,
  },
  {
    id: '2',
    title: 'Interactive Rating Component',
    description: 'Interactive rating component with JavaScript functionality',
    difficulty: 'Intermediate',
    category: 'JavaScript',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['javascript', 'events'],
    submissionCount: 156,
    estimatedTime: '2-3 hours',
    rating: 4.6,
  },
  {
    id: '3',
    title: 'E-commerce Dashboard',
    description: 'Advanced e-commerce dashboard with charts and analytics',
    difficulty: 'Advanced',
    category: 'React',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['react', 'charts', 'responsive'],
    submissionCount: 234,
    estimatedTime: '5-8 hours',
    rating: 4.9,
    isPremium: true,
  },
  {
    id: '4',
    title: 'News Homepage',
    description: 'Build a responsive news homepage with CSS Grid',
    difficulty: 'Beginner',
    category: 'HTML/CSS',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['CSS Grid', 'responsive'],
    submissionCount: 124,
    estimatedTime: '2-3 hours',
    rating: 4.5,
  },
  {
    id: '5',
    title: 'Todo App',
    description: 'Create a todo app with CRUD operations',
    difficulty: 'Intermediate',
    category: 'JavaScript',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['javascript', 'localStorage'],
    submissionCount: 198,
    estimatedTime: '3-4 hours',
    rating: 4.7,
  },
  {
    id: '6',
    title: 'Weather App',
    description: 'Build a weather app with API integration',
    difficulty: 'Advanced',
    category: 'React',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['react', 'API', 'async'],
    submissionCount: 112,
    estimatedTime: '4-6 hours',
    rating: 4.6,
    isNew: true,
  },
]


function ChallengeCard({
  challenge,
  viewMode,
}: {
  challenge: Challenge
  viewMode: 'grid' | 'list'
}) {
  if (viewMode === 'list') {
    return (
      <Card className='hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 overflow-hidden group'>
        <div className='md:w-1/3 relative overflow-hidden'>
          <img
            src={challenge.thumbnailUrl}
            alt={challenge.title}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
          <div className='absolute top-2 left-2 flex flex-col gap-2'>
            {challenge.isNew && (
              <Badge className='bg-green-500 hover:bg-green-600 transition-colors text-xs'>
                NEW
              </Badge>
            )}
            {challenge.isPremium && (
              <Badge className='bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all text-xs'>
                PREMIUM
              </Badge>
            )}
          </div>
        </div>
        <div className='p-6 flex-1 flex flex-col justify-between'>
          <div>
            <div className='flex justify-between items-start mb-2'>
              <Badge
                variant={
                  challenge.difficulty === 'Beginner'
                    ? 'secondary'
                    : challenge.difficulty === 'Intermediate'
                      ? 'default'
                      : 'destructive'
                }
                className='transition-colors text-xs'
              >
                {challenge.difficulty}
              </Badge>
              <span className='text-sm text-gray-500 dark:text-gray-400'>
                {challenge.category}
              </span>
            </div>
            <CardTitle className='text-xl mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer'>
              {challenge.title}
            </CardTitle>
            <CardDescription className='mb-4 dark:text-gray-300'>
              {challenge.description}
            </CardDescription>
            <div className='flex flex-wrap gap-2 mb-4'>
              {challenge.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant='outline'
                  className='text-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:border-gray-600'
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div className='flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 flex-wrap'>
              <div className='flex items-center gap-1'>
                <Clock className='h-4 w-4' />
                <span>{challenge.estimatedTime}</span>
              </div>
              <div className='flex items-center gap-1'>
                <Users className='h-4 w-4' />
                <span>{challenge.submissionCount} submissions</span>
              </div>
              <div className='flex items-center gap-1'>
                <Star className='h-4 w-4 text-yellow-500 fill-current' />
                <span>{challenge.rating}</span>
              </div>
            </div>
            <Button
              asChild
              className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md px-6 py-2 h-auto text-sm'
            >
              <Link to={`/challenges/${challenge.id}`}>Start Challenge</Link>
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className='h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 overflow-hidden group'>
      <div className='relative h-48 overflow-hidden'>
        <img
          src={challenge.thumbnailUrl}
          alt={challenge.title}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
        <div className='absolute top-2 left-2 flex flex-col gap-2'>
          {challenge.isNew && (
            <Badge className='bg-green-500 hover:bg-green-600 transition-colors text-xs'>
              NEW
            </Badge>
          )}
          {challenge.isPremium && (
            <Badge className='bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all text-xs'>
              PREMIUM
            </Badge>
          )}
        </div>
      </div>
      <CardHeader className='pb-3'>
        <div className='flex justify-between items-start mb-2'>
          <Badge
            variant={
              challenge.difficulty === 'Beginner'
                ? 'secondary'
                : challenge.difficulty === 'Intermediate'
                  ? 'default'
                  : 'destructive'
            }
            className='transition-colors text-xs'
          >
            {challenge.difficulty}
          </Badge>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            {challenge.category}
          </span>
        </div>
        <CardTitle className='text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer'>
          {challenge.title}
        </CardTitle>
        <CardDescription className='line-clamp-2 dark:text-gray-300'>
          {challenge.description}
        </CardDescription>
      </CardHeader>

      <CardContent className='pt-0'>
        <div className='flex flex-wrap gap-2 mb-4'>
          {challenge.tags.map((tag, index) => (
            <Badge
              key={index}
              variant='outline'
              className='text-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:border-gray-600'
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className='flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4'>
          <div className='flex items-center gap-1'>
            <Clock className='h-4 w-4' />
            {challenge.estimatedTime}
          </div>
          <div className='flex items-center gap-1'>
            <Users className='h-4 w-4' />
            {challenge.submissionCount}
          </div>
          <div className='flex items-center gap-1'>
            <Star className='h-4 w-4 text-yellow-500 fill-current' />
            {challenge.rating}
          </div>
        </div>

        <Button
          asChild
          className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md py-2 text-sm'
        >
          <Link to={`/challenges/${challenge.id}`}>Start Challenge</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function ChallengesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

 
  const categories = useMemo(() => {
    return ['All', ...new Set(mockChallenges.map((c) => c.category))]
  }, [])

  
  const difficulties = useMemo(() => {
    return ['All', 'Beginner', 'Intermediate', 'Advanced']
  }, [])

 
  const filteredChallenges = useMemo(() => {
    return mockChallenges.filter((challenge) => {
      const matchesSearch =
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        challenge.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      const matchesDifficulty =
        selectedDifficulty === 'All' ||
        challenge.difficulty === selectedDifficulty
      const matchesCategory =
        selectedCategory === 'All' || challenge.category === selectedCategory

      return matchesSearch && matchesDifficulty && matchesCategory
    })
  }, [searchTerm, selectedDifficulty, selectedCategory])

  return (
    <div className='container mx-auto px-4 sm:px-6 py-8 dark:bg-gray-900 min-h-screen'>
      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-bold mb-4 text-gray-800 dark:text-white'>
          Frontend Challenges
        </h1>
        <p className='text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
          Improve your frontend skills by building real projects. Solve
          real-world HTML, CSS and JavaScript challenges whilst working to
          professional designs.
        </p>
      </div>

      
      <div className='mb-8 space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
         
          <div className='flex flex-col sm:flex-row gap-4 flex-wrap'>
            <div className='flex items-center gap-3 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md'>
              <Filter className='h-4 w-4 text-gray-600 dark:text-gray-300' />
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                Filter by:
              </span>
            </div>

            <select
              className='border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm'
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'All' ? 'All Difficulty Levels' : difficulty}
                </option>
              ))}
            </select>

            <select
              className='border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'All' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

        
          <div className='relative max-w-md ml-auto'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search className='h-5 w-5 text-gray-400' />
            </div>
            <Input
              placeholder='Search challenges...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 focus:border-blue-500 transition-colors rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            />
          </div>

         
          <div className='flex items-center gap-6'>
            <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
              {filteredChallenges.length}{' '}
              {filteredChallenges.length === 1 ? 'challenge' : 'challenges'}{' '}
              available
            </span>
            <div className='flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 p-1'>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size='sm'
                className='rounded-sm transition-all h-8 w-8 p-0'
                onClick={() => setViewMode('grid')}
              >
                <Grid className='h-4 w-4' />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size='sm'
                className='rounded-sm transition-all h-8 w-8 p-0'
                onClick={() => setViewMode('list')}
              >
                <List className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>

     
      {filteredChallenges.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-6'
          }
        >
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className='text-center py-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
          <div className='text-gray-400 mb-4'>
            <Search className='h-12 w-12 mx-auto' />
          </div>
          <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2'>
            No challenges found
          </h3>
          <p className='text-gray-500 dark:text-gray-400 max-w-md mx-auto'>
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
        </div>
      )}
    </div>
  )
}
