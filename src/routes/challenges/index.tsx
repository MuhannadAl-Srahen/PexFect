import { useEffect, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { PageLayout } from '@/layouts'
import {
  ChallengePageHeader,
  ChallengeControls,
  ChallengeView,
  useChallengeFilters,
} from '@/services/challenges'
import { getChallenges } from '@/lib/getChallenges'
import { toggleChallengeSave } from '@/lib/toggleChallengeSave'
import { supabase } from '@/lib/supabaseClient'
import type { ChallengeListItem } from '@/types'
import { EmptyState } from '@/layouts'
import { AuthPromptDialog } from '@/components/ui/auth-prompt-dialog'

export const Route = createFileRoute('/challenges/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [savedChallenges, setSavedChallenges] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [allChallenges, setAllChallenges] = useState<ChallengeListItem[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)

  useEffect(() => {
    let mounted = true
    
    // Check authentication status
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setIsAuthenticated(!!session)
      }
    })
    
    // Load challenges
    getChallenges().then((list) => {
      if (!mounted) return
      setAllChallenges(list)
      // Extract saved challenges from the list
      const saved = list.filter((c) => c.isSaved).map((c) => c.id)
      setSavedChallenges(saved)
    })
    
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
      console.log('[handleToggleSave] Starting toggle for:', challengeId)
      
      // Check if user is authenticated
      if (!isAuthenticated) {
        console.warn('[handleToggleSave] ⚠️ User not authenticated - showing auth dialog')
        setShowAuthDialog(true)
        return
      }
      
      // Optimistic update
      const currentSavedState = savedChallenges.includes(challengeId)
      console.log('[handleToggleSave] Current saved state:', currentSavedState)
      
      const newSavedChallenges = currentSavedState
        ? savedChallenges.filter((id) => id !== challengeId)
        : [...savedChallenges, challengeId]
      
      setSavedChallenges(newSavedChallenges)
      console.log('[handleToggleSave] Optimistically updated UI to:', !currentSavedState)

      // Update in database
      console.log('[handleToggleSave] Calling toggleChallengeSave...')
      const newState = await toggleChallengeSave(challengeId, currentSavedState)
      console.log('[handleToggleSave] Database returned:', newState)
      
      // If database update failed, revert optimistic update
      if (newState === null) {
        console.error('[handleToggleSave] ❌ Failed to update saved state in database - reverting')
        setSavedChallenges(savedChallenges) // Revert
      } else {
        // Also update the challenge in allChallenges
        console.log('[handleToggleSave] ✅ Success! Updating allChallenges array')
        setAllChallenges((prev) =>
          prev.map((c) =>
            c.id === challengeId ? { ...c, isSaved: newState } : c
          )
        )
      }
    } catch (error) {
      console.error('[handleToggleSave] ❌❌❌ CAUGHT ERROR:', error)
      console.error('[handleToggleSave] Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        error
      })
      // Revert optimistic update
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

      {filteredChallenges.length === 0 ? (
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
        />
      )}
    </PageLayout>
  )
}
