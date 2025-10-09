import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '@/layouts'
import {
  ChallengePageHeader,
  ChallengeControls,
  ChallengeView,
  useChallengeFilters,
} from '@/services/challenges'
import { getChallenges } from '@/lib/getChallenges'
import { toggleChallengeSave } from '@/lib/toggleChallengeSave'
import type { ChallengeListItem } from '@/types'
import { EmptyState } from '@/layouts'

export const Route = createFileRoute('/challenges/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [savedChallenges, setSavedChallenges] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const [allChallenges, setAllChallenges] = useState<ChallengeListItem[]>([])

  useEffect(() => {
    let mounted = true
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
    console.log('[handleToggleSave] Starting toggle for:', challengeId)
    
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
