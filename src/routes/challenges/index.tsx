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
  const [savingChallengeId, setSavingChallengeId] = useState<string | null>(null)

  // DEBUG: Log every render to verify React is updating
  console.log('[Component Render] 🎨 Rendering with savedChallenges:', savedChallenges)
  console.log('[Component Render] 📊 Total challenges:', allChallenges.length)
  console.log('[Component Render] 🔒 Currently saving:', savingChallengeId)

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
    // Prevent clicking the SAME challenge multiple times while it's saving
    if (savingChallengeId === challengeId) {
      console.log('[handleToggleSave] ⏳ This challenge is already being saved, please wait...')
      return
    }

    try {
      setSavingChallengeId(challengeId)
      console.log('[handleToggleSave] 🔄 Starting toggle for:', challengeId)
      console.log('[handleToggleSave] 📌 savedChallenges array BEFORE:', savedChallenges)
      
      // Get current state from the savedChallenges array
      const currentSavedState = savedChallenges.includes(challengeId)
      console.log('[handleToggleSave] 📌 Is currently saved?', currentSavedState ? 'YES (will UNSAVE)' : 'NO (will SAVE)')
      
      // Call database directly - no optimistic update to avoid state conflicts
      console.log('[handleToggleSave] 💾 Calling database function...')
      const freshSavedIds = await toggleChallengeSave(challengeId, currentSavedState)
      console.log('[handleToggleSave] 📦 Database response:', freshSavedIds)
      
      if (freshSavedIds === null) {
        // Database update failed
        console.error('[handleToggleSave] ❌ Database update FAILED')
      } else {
        // Database update succeeded - use the returned array directly
        console.log('[handleToggleSave] ✅ Database update SUCCESS')
        console.log('[handleToggleSave] 📥 Fresh data received:', freshSavedIds.length, 'challenges')
        console.log('[handleToggleSave] 📥 Fresh IDs:', freshSavedIds)
        
        // Update state with the fresh data from database (single source of truth)
        setSavedChallenges(freshSavedIds)
        
        // Also update allChallenges to keep everything in sync
        setAllChallenges((prev) =>
          prev.map((c) => ({
            ...c,
            isSaved: freshSavedIds.includes(c.id)
          }))
        )
        console.log('[handleToggleSave] ✅ All state synchronized!')
        console.log('[handleToggleSave] 📌 savedChallenges array AFTER:', freshSavedIds)
      }
    } catch (error) {
      console.error('[handleToggleSave] ❌ EXCEPTION:', error)
      console.error('[handleToggleSave] Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      })
    } finally {
      // Clear the saving state only for THIS challenge
      setSavingChallengeId((prev) => prev === challengeId ? null : prev)
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
          savingChallengeId={savingChallengeId}
          onToggleSave={handleToggleSave}
          viewMode={viewMode}
          isAuthenticated={isAuthenticated}
        />
      )}
    </PageLayout>
  )
}
