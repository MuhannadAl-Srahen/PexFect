import { useEffect, useState, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '@/layouts'
import {
  ChallengePageHeader,
  ChallengeControls,
  ChallengeView,
  useChallengeFilters,
} from '@/services/challenges'
import { getChallenges } from '@/services/challenges/lib/getChallenges'
import {
  toggleChallengeSave,
  getSavedChallenges,
} from '@/services/challenges/lib/toggleChallengeSave'
import { supabase } from '@/lib/supabaseClient'
import type { ChallengeListItem } from '@/types'
import { EmptyState } from '@/layouts'
import {
  ChallengeCardSkeleton,
  ChallengeListSkeleton,
} from '@/components/ui/challenge-skeleton'

export const Route = createFileRoute('/challenges/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [savedChallenges, setSavedChallenges] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [allChallenges, setAllChallenges] = useState<ChallengeListItem[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [savingChallengeId, setSavingChallengeId] = useState<string | null>(
    null
  )

  // Load challenges and auth state on mount
  useEffect(() => {
    let mounted = true
    let timeoutId: NodeJS.Timeout

    const loadData = async () => {
      try {
        console.log('[RouteComponent] 🚀 Starting data load...')
        setIsLoading(true)
        setLoadError(null)

        // Set a timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          if (mounted) {
            console.warn(
              '[RouteComponent] ⏰ Data loading timeout, forcing completion'
            )
            setIsLoading(false)
            setLoadError('Loading took too long. Please refresh the page.')
          }
        }, 15000) // 15 second timeout

        // Check authentication
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()
        if (sessionError) {
          console.error('[RouteComponent] Auth error:', sessionError)
          throw sessionError
        }
        if (!mounted) return

        const isAuth = !!session
        setIsAuthenticated(isAuth)
        console.log('[RouteComponent] 👤 Authentication status:', isAuth)

        // Load challenges first
        console.log('[RouteComponent] 📚 Loading challenges...')
        const challengesList = await getChallenges()
        if (!mounted) return

        console.log(
          '[RouteComponent] ✅ Challenges loaded:',
          challengesList.length
        )
        setAllChallenges(challengesList)

        // Load saved challenges if authenticated
        if (isAuth) {
          console.log('[RouteComponent] 💾 Loading saved challenges...')
          const savedIds = await getSavedChallenges()
          if (mounted) {
            console.log(
              '[RouteComponent] ✅ Saved challenges loaded:',
              savedIds.length
            )
            setSavedChallenges(savedIds)
          }
        } else {
          setSavedChallenges([])
        }
      } catch (error) {
        console.error('[RouteComponent] ❌ Error loading data:', error)
        if (mounted) {
          setLoadError(
            error instanceof Error ? error.message : 'Failed to load challenges'
          )
        }
      } finally {
        if (timeoutId) clearTimeout(timeoutId)
        if (mounted) {
          console.log('[RouteComponent] ✅ Data loading completed')
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      mounted = false
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  // Add effect to refresh data when the route becomes active again
  useEffect(() => {
    let refreshTimeout: NodeJS.Timeout

    const handleFocus = () => {
      if (!isLoading && allChallenges.length > 0) {
        console.log(
          '[RouteComponent] � Page focused, refreshing saved challenges...'
        )
        // Small delay to ensure navigation is complete
        refreshTimeout = setTimeout(async () => {
          if (isAuthenticated) {
            try {
              const savedIds = await getSavedChallenges()
              setSavedChallenges(savedIds)
              console.log(
                '[RouteComponent] ✅ Saved challenges refreshed on focus'
              )
            } catch (error) {
              console.error(
                '[RouteComponent] Error refreshing saved challenges:',
                error
              )
            }
          }
        }, 300)
      }
    }

    // Listen to window focus events (more reliable than visibility change for navigation)
    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('focus', handleFocus)
      if (refreshTimeout) clearTimeout(refreshTimeout)
    }
  }, [isLoading, allChallenges.length, isAuthenticated])

  // Add effect to handle route navigation - refresh data when component re-mounts from navigation
  const hasInitialLoad = useRef(false)

  useEffect(() => {
    // This runs when the user navigates back to this route
    // If we already have challenges but no loading state, refresh saved challenges
    if (
      !isLoading &&
      allChallenges.length > 0 &&
      isAuthenticated &&
      !hasInitialLoad.current
    ) {
      hasInitialLoad.current = true
      const refreshOnNavigation = async () => {
        try {
          console.log('[RouteComponent] 🔄 Refreshing on navigation...')
          const savedIds = await getSavedChallenges()
          setSavedChallenges(savedIds)
        } catch (error) {
          console.error(
            '[RouteComponent] Error refreshing on navigation:',
            error
          )
        }
      }

      // Small delay to avoid conflicts with initial load
      const timeout = setTimeout(refreshOnNavigation, 100)
      return () => clearTimeout(timeout)
    }
  }, [isLoading, allChallenges.length, isAuthenticated])

  const {
    searchTerm,
    selectedDifficulty,
    selectedLanguage,
    filteredChallenges,
    setSearchTerm,
    setSelectedDifficulty,
    setSelectedLanguage,
    clearFilters,
  } = useChallengeFilters(allChallenges)

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
      const currentSavedState = savedChallenges.includes(challengeId)
      const optimisticSavedChallenges = currentSavedState
        ? savedChallenges.filter((id) => id !== challengeId)
        : [...savedChallenges, challengeId]

      console.log(
        `[handleToggleSave] � ${currentSavedState ? 'Unsaving' : 'Saving'} challenge:`,
        challengeId
      )

      // Optimistic update - update UI immediately
      setSavedChallenges(optimisticSavedChallenges)

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
        setSavedChallenges(savedChallenges) // Revert to original state
        // TODO: Show error toast to user
      } else {
        // Database succeeded - use fresh data from server as source of truth
        console.log('[handleToggleSave] ✅ Database update successful')
        setSavedChallenges(freshSavedIds)
      }
    } catch (error) {
      console.error('[handleToggleSave] ❌ Exception:', error)
      // Rollback on error
      setSavedChallenges(savedChallenges)
      // TODO: Show error toast to user
    } finally {
      setSavingChallengeId(null)
    }
  }

  return (
    <PageLayout maxWidth='6xl'>
      <ChallengePageHeader />

      <ChallengeControls
        searchTerm={searchTerm}
        selectedDifficulty={selectedDifficulty}
        selectedLanguage={selectedLanguage}
        onSearchChange={setSearchTerm}
        onDifficultyChange={setSelectedDifficulty}
        onLanguageChange={setSelectedLanguage}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filteredCount={filteredChallenges.length}
        totalCount={allChallenges.length}
      />

      {loadError ? (
        // Show error state
        <EmptyState
          title='Failed to load challenges'
          message={loadError}
          buttonText='Retry'
          onAction={() => window.location.reload()}
        />
      ) : isLoading ? (
        // Show skeleton loading state
        viewMode === 'grid' ? (
          <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, index) => (
              <ChallengeCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <ChallengeListSkeleton key={index} />
            ))}
          </div>
        )
      ) : filteredChallenges.length === 0 ? (
        <EmptyState
          title='No challenges found'
          message='Try adjusting your filters to see more challenges.'
          buttonText='Clear Filters'
          onAction={clearFilters}
        />
      ) : (
        <ChallengeView
          challenges={filteredChallenges}
          savedChallenges={savedChallenges}
          savingChallengeId={savingChallengeId}
          onToggleSave={handleToggleSave}
          viewMode={viewMode}
          isAuthenticated={isAuthenticated}
        />
      )}
    </PageLayout>
  )
}
