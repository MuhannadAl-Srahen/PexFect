import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '@/layouts'
import {
  ChallengePageHeader,
  ChallengeControls,
  ChallengeView,
  useChallengeFilters,
} from '@/services/challenges'
import { getChallenges } from '@/services/challenges/lib/getChallenges'
import { toggleChallengeSave, getSavedChallenges } from '@/services/challenges/lib/toggleChallengeSave'
import { supabase } from '@/lib/supabaseClient'
import type { ChallengeListItem } from '@/types'
import { EmptyState } from '@/layouts'
import { ChallengeCardSkeleton, ChallengeListSkeleton } from '@/components/ui/challenge-skeleton'

export const Route = createFileRoute('/challenges/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [savedChallenges, setSavedChallenges] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [allChallenges, setAllChallenges] = useState<ChallengeListItem[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    
    setIsLoading(true)
    
    // Check authentication status and load data
    const loadData = async () => {
      try {
        // Check authentication
        const { data: { session } } = await supabase.auth.getSession()
        if (!mounted) return
        
        const isAuth = !!session
        setIsAuthenticated(isAuth)
        
        // Load challenges
        const list = await getChallenges()
        if (!mounted) return
        
        setAllChallenges(list)
        
        // Load saved challenges from user's profile (not from challenges table)
        if (isAuth) {
          console.log('[RouteComponent] 📥 Loading saved challenges from profile...')
          const savedIds = await getSavedChallenges()
          console.log('[RouteComponent] 📊 Loaded saved challenges:', savedIds)
          if (mounted) {
            setSavedChallenges(savedIds)
          }
        } else {
          console.log('[RouteComponent] ⚠️ Not authenticated - no saved challenges')
          setSavedChallenges([])
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error('[RouteComponent] ❌ Error loading data:', error)
        if (mounted) {
          setIsLoading(false)
        }
      }
    }
    
    loadData()
    
    return () => {
      mounted = false
    }
  }, [])

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
    try {
      console.log('[handleToggleSave] 🔄 Starting toggle for:', challengeId)
      
      // Get current state
      const currentSavedState = savedChallenges.includes(challengeId)
      console.log('[handleToggleSave] 📌 Current saved state:', currentSavedState)
      
      // Optimistic UI update (instant feedback)
      const optimisticUpdate = currentSavedState
        ? savedChallenges.filter((id) => id !== challengeId)
        : [...savedChallenges, challengeId]
      
      setSavedChallenges(optimisticUpdate)
      console.log('[handleToggleSave] ⚡ Optimistic UI update applied')

      // Update in database
      console.log('[handleToggleSave] 💾 Calling database function...')
      const newState = await toggleChallengeSave(challengeId, currentSavedState)
      console.log('[handleToggleSave] 📦 Database response:', newState)
      
      if (newState === null) {
        // Database update failed - revert optimistic update
        console.error('[handleToggleSave] ❌ Database update FAILED - reverting UI')
        setSavedChallenges(savedChallenges)
      } else {
        // Database update succeeded - reload from database to ensure sync
        console.log('[handleToggleSave] ✅ Database update SUCCESS')
        console.log('[handleToggleSave] 🔄 Reloading saved challenges from database...')
        
        try {
          const freshSavedIds = await getSavedChallenges()
          console.log('[handleToggleSave] 📥 Fresh data loaded:', freshSavedIds.length, 'challenges')
          setSavedChallenges(freshSavedIds)
          
          // Also update allChallenges to keep everything in sync
          setAllChallenges((prev) =>
            prev.map((c) => ({
              ...c,
              isSaved: freshSavedIds.includes(c.id)
            }))
          )
          console.log('[handleToggleSave] ✅ All state synchronized!')
        } catch (reloadError) {
          console.error('[handleToggleSave] ❌ Failed to reload saved challenges:', reloadError)
          // Keep optimistic update since database operation succeeded
        }
      }
    } catch (error) {
      console.error('[handleToggleSave] ❌ EXCEPTION:', error)
      console.error('[handleToggleSave] Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      })
      // Revert optimistic update on any error
      setSavedChallenges(savedChallenges)
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

      {isLoading ? (
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
          onToggleSave={handleToggleSave}
          viewMode={viewMode}
          isAuthenticated={isAuthenticated}
        />
      )}
    </PageLayout>
  )
}
