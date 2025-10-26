import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ChallengeGridItem } from '@/services/challenges/components/ChallengeGridItem'
import { useChallenges } from '@/services/challenges/hooks/useChallenges'
import {
  useSavedChallenges,
  useToggleSave,
} from '@/services/challenges/hooks/useSavedChallenges'
import { useAuth } from '@/services/challenges/hooks/useAuth'
import { supabase } from '@/lib/supabaseClient'
import { Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ChallengeListItem } from '@/types'

const ITEMS_PER_PAGE = 4

export function SavedChallenges() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)

  // Use React Query hooks
  const { data: authData, isLoading: isAuthLoading } = useAuth()
  const { data: allChallenges = [], isLoading: isChallengesLoading } =
    useChallenges()
  const { data: savedChallengeIds = [], isLoading: isSavedLoading } =
    useSavedChallenges(authData?.isAuthenticated ?? false)
  const toggleSaveMutation = useToggleSave()

  const isAuthenticated = authData?.isAuthenticated ?? false
  const isLoading =
    isAuthLoading || isChallengesLoading || (isAuthenticated && isSavedLoading)

  // Filter challenges that are saved
  const savedChallenges: ChallengeListItem[] = allChallenges.filter(
    (challenge) => savedChallengeIds.includes(challenge.id)
  )

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentChallenges = savedChallenges.slice(startIndex, endIndex)
  const totalPages = Math.ceil(savedChallenges.length / ITEMS_PER_PAGE)

  // Safety check: if current page is empty but there are challenges, go to last page
  useEffect(() => {
    if (
      savedChallenges.length > 0 &&
      currentChallenges.length === 0 &&
      currentPage > 1
    ) {
      setCurrentPage(Math.max(1, totalPages))
    }
  }, [
    savedChallenges.length,
    currentChallenges.length,
    currentPage,
    totalPages,
  ])

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

  const handleToggleSave = async (challengeId: string) => {
    // Must be authenticated to save
    if (!isAuthenticated) {
      console.warn('[handleToggleSave] ⚠️ User not authenticated')
      return
    }

    // Prevent double-clicking while mutation is in progress
    if (toggleSaveMutation.isPending) {
      console.log('[handleToggleSave] ⏳ Already processing a save request')
      return
    }

    const isSaved = savedChallengeIds.includes(challengeId)
    console.log(
      `[handleToggleSave] ${isSaved ? 'Unsaving' : 'Saving'} challenge:`,
      challengeId
    )

    // Trigger the mutation
    toggleSaveMutation.mutate(
      { challengeId, isSaved },
      {
        onSuccess: () => {
          // Adjust pagination if current page becomes empty after unsaving
          const newTotalPages = Math.ceil(
            (savedChallenges.length - 1) / ITEMS_PER_PAGE
          )
          if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages)
          } else if (savedChallenges.length === 1) {
            setCurrentPage(1)
          }
        },
      }
    )
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='bg-card border border-border rounded-xl p-6'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-9 h-9 bg-muted rounded-lg animate-pulse' />
            <div>
              <div className='h-5 w-32 bg-muted rounded animate-pulse mb-2' />
              <div className='h-4 w-24 bg-muted rounded animate-pulse' />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className='bg-card border border-border rounded-xl p-6 animate-pulse'
            >
              <div className='h-48 bg-muted rounded-lg mb-4' />
              <div className='h-4 bg-muted rounded mb-2' />
              <div className='h-4 bg-muted rounded w-2/3 mb-4' />
              <div className='flex gap-2'>
                <div className='h-6 bg-muted rounded-full w-16' />
                <div className='h-6 bg-muted rounded-full w-20' />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className='bg-card border border-border rounded-xl p-12 text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
        <div className='p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-full w-fit mx-auto mb-6'>
          <Heart className='w-12 h-12 text-yellow-500' />
        </div>
        <h3 className='text-xl font-semibold text-foreground mb-3'>
          Sign In Required
        </h3>
        <p className='text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed'>
          Please sign in to view your saved challenges.
        </p>
        <Button
          onClick={async () => {
            await supabase.auth.signInWithOAuth({
              provider: 'github',
              options: {
                redirectTo: window.location.origin + '/profile?tab=saved',
              },
            })
          }}
          className='gap-2 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]'
        >
          <span>Sign In with GitHub</span>
          <ArrowRight className='w-4 h-4' />
        </Button>
      </div>
    )
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
          <ChallengeGridItem
            key={challenge.id}
            challenge={challenge}
            isSaved={savedChallengeIds.includes(challenge.id)}
            isSaving={
              toggleSaveMutation.isPending &&
              toggleSaveMutation.variables?.challengeId === challenge.id
            }
            isAuthenticated={isAuthenticated}
            onToggleSave={handleToggleSave}
          />
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
