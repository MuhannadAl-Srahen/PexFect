import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ChallengeGridItem } from '@/services/challenges/components/ChallengeGridItem'
import {
  getSavedChallenges,
  toggleChallengeSave,
} from '@/services/challenges/lib/toggleChallengeSave'
import { getChallenges } from '@/services/challenges/lib/getChallenges'
import { supabase } from '@/lib/supabaseClient'
import { Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ChallengeListItem } from '@/types'

const ITEMS_PER_PAGE = 4

export function SavedChallenges() {
  const navigate = useNavigate()
  const [savedChallenges, setSavedChallenges] = useState<ChallengeListItem[]>(
    []
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [savingChallengeId, setSavingChallengeId] = useState<string | null>(
    null
  )
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

  // Load saved challenges from database on mount
  useEffect(() => {
    let mounted = true

    const loadSavedChallenges = async () => {
      try {
        setIsLoading(true)

        // Check authentication
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()
        if (sessionError) throw sessionError
        if (!mounted) return

        const isAuth = !!session
        setIsAuthenticated(isAuth)

        if (!isAuth) {
          setSavedChallenges([])
          setSavedIds(new Set())
          setIsLoading(false)
          return
        }

        // Get saved challenge IDs from profile
        const savedChallengeIds = await getSavedChallenges()
        if (!mounted) return

        // Get all challenges to match with saved ones
        const allChallenges = await getChallenges()
        if (!mounted) return

        // Filter challenges that are saved
        const savedChallengesList = allChallenges.filter((challenge) =>
          savedChallengeIds.includes(challenge.id)
        )

        setSavedChallenges(savedChallengesList)
        setSavedIds(new Set(savedChallengeIds))
      } catch (error) {
        console.error(
          '[SavedChallenges] Error loading saved challenges:',
          error
        )
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadSavedChallenges()

    return () => {
      mounted = false
    }
  }, [])

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
    // Prevent double-clicking the same challenge
    if (savingChallengeId === challengeId) {
      console.log('[handleToggleSave] ⏳ Already processing this challenge')
      return
    }

    // Must be authenticated to save
    if (!isAuthenticated) {
      console.warn('[handleToggleSave] ⚠️ User not authenticated')
      return
    }

    try {
      setSavingChallengeId(challengeId)

      // Get current state for optimistic update and rollback
      const currentSavedState = savedIds.has(challengeId)
      const optimisticSavedIds = new Set(savedIds)
      const optimisticSavedChallenges = [...savedChallenges]

      if (currentSavedState) {
        // Removing from saved (unsaving)
        optimisticSavedIds.delete(challengeId)
        const updatedChallenges = optimisticSavedChallenges.filter(
          (challenge) => challenge.id !== challengeId
        )

        console.log(`[handleToggleSave] 💔 Unsaving challenge:`, challengeId)

        // Optimistic update - update UI immediately
        setSavedIds(optimisticSavedIds)
        setSavedChallenges(updatedChallenges)

        // Adjust pagination if current page becomes empty
        const newTotalPages = Math.ceil(
          updatedChallenges.length / ITEMS_PER_PAGE
        )
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages)
        } else if (updatedChallenges.length === 0) {
          setCurrentPage(1)
        }
      } else {
        // This shouldn't happen in profile page (we only display saved challenges)
        console.warn(
          '[handleToggleSave] ⚠️ Trying to save challenge that should already be saved'
        )
        return
      }

      // Call database function
      const freshSavedIds = await toggleChallengeSave(
        challengeId,
        currentSavedState
      )

      if (freshSavedIds === null) {
        // Database update failed - rollback optimistic update
        console.error(
          '[handleToggleSave] ❌ Database update failed, rolling back'
        )
        setSavedIds(savedIds) // Revert to original state
        setSavedChallenges(savedChallenges) // Revert to original state
        // TODO: Show error toast to user
      } else {
        console.log('[handleToggleSave] ✅ Database update successful')
        // For profile page, we need to reload the challenges to get updated list
        // since the user might have saved new challenges from other pages
        if (currentSavedState) {
          // Just removed a challenge - the optimistic update should be correct
          // But let's get fresh data to be sure
          try {
            const allChallenges = await getChallenges()
            const savedChallengesList = allChallenges.filter((challenge) =>
              freshSavedIds.includes(challenge.id)
            )
            setSavedChallenges(savedChallengesList)
            setSavedIds(new Set(freshSavedIds))
          } catch (error) {
            console.error(
              '[handleToggleSave] Error reloading challenges:',
              error
            )
          }
        }
      }
    } catch (error) {
      console.error('[handleToggleSave] ❌ Exception:', error)
      // Rollback on error
      setSavedIds(savedIds)
      setSavedChallenges(savedChallenges)
      // TODO: Show error toast to user
    } finally {
      setSavingChallengeId(null)
    }
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
              options: { redirectTo: window.location.origin + '/profile?tab=saved' },
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
            isSaved={savedIds.has(challenge.id)}
            isSaving={savingChallengeId === challenge.id}
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
