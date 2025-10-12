import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ChallengeGridItem } from '@/services/challenges/components/ChallengeGridItem'
import { savedChallengesData } from '@/services/profile/data'
import { Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const ITEMS_PER_PAGE = 4

export function SavedChallenges() {
  const navigate = useNavigate()
  const [savedChallenges] = useState(savedChallengesData)
  const [currentPage, setCurrentPage] = useState(1)

  const [savedIds, setSavedIds] = useState<Set<string>>(
    new Set(savedChallenges.map((c) => c.id))
  )

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentChallenges = savedChallenges.slice(startIndex, endIndex)
  const totalPages = Math.ceil(savedChallenges.length / ITEMS_PER_PAGE)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleToggleSave = (challengeId: string) => {
    setSavedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(challengeId)) {
        newSet.delete(challengeId)
      } else {
        newSet.add(challengeId)
      }
      return newSet
    })
  }

  if (savedChallenges.length === 0) {
    return (
      <div className='bg-card border border-border rounded-xl p-12 text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
        <div className='p-4 bg-red-50 dark:bg-red-950/20 rounded-full w-fit mx-auto mb-6'>
          <Heart className='w-12 h-12 text-red-500' />
        </div>
        <h3 className='text-xl font-semibold text-foreground mb-3'>
          No Saved Challenges
        </h3>
        <p className='text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed'>
          Start exploring challenges and save the ones you want to tackle later.
          Build your personal collection of interesting projects.
        </p>
        <Button
          onClick={() => navigate({ to: '/challenges' })}
          className='gap-2 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]'
        >
          <span>Explore Challenges</span>
          <ArrowRight className='w-4 h-4' />
        </Button>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <div className='p-2 bg-red-50 dark:bg-red-950/20 rounded-lg'>
                <Heart className='w-5 h-5 text-red-500 fill-red-500' />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-foreground'>
                  Saved Challenges
                </h3>
                <p className='text-sm text-muted-foreground'>
                  {savedChallenges.length} challenge
                  {savedChallenges.length !== 1 ? 's' : ''} saved for later
                </p>
              </div>
            </div>
          </div>

          <Button
            variant='outline'
            size='sm'
            onClick={() => navigate({ to: '/challenges' })}
            className='gap-2 w-fit transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:border-primary hover:scale-[1.02]'
          >
            <span>Browse More</span>
            <ArrowRight className='w-4 h-4' />
          </Button>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {currentChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className='transition-all duration-300 hover:scale-[1.02]'
          >
            <ChallengeGridItem
              challenge={challenge}
              isSaved={savedIds.has(challenge.id)}
              onToggleSave={handleToggleSave}
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className='bg-card border border-border rounded-xl p-4'>
          <div className='flex items-center justify-between'>
            <div className='text-sm text-muted-foreground'>
              Showing {startIndex + 1}-
              {Math.min(endIndex, savedChallenges.length)} of{' '}
              {savedChallenges.length} challenges
            </div>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className='flex items-center gap-1'
              >
                <ChevronLeft className='w-4 h-4' />
                Previous
              </Button>
              <div className='flex items-center gap-1 mx-2'>
                <span className='text-sm font-medium'>{currentPage}</span>
                <span className='text-sm text-muted-foreground'>of</span>
                <span className='text-sm font-medium'>{totalPages}</span>
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className='flex items-center gap-1'
              >
                Next
                <ChevronRight className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
