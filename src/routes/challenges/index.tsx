import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '@/layouts'
import {
  ChallengePageHeader,
  ChallengeControls,
  ChallengeView,
  EmptyState,
  challenges,
  useChallengeFilters,
} from '@/services/challenges'

export const Route = createFileRoute('/challenges/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [savedChallenges, setSavedChallenges] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const {
    searchTerm,
    selectedDifficulty,
    selectedLanguage,
    filteredChallenges,
    setSearchTerm,
    setSelectedDifficulty,
    setSelectedLanguage,
    clearFilters,
  } = useChallengeFilters(challenges)

  const toggleSaveChallenge = (challengeId: number) => {
    setSavedChallenges((prev) =>
      prev.includes(challengeId)
        ? prev.filter((id) => id !== challengeId)
        : [...prev, challengeId]
    )
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
        totalCount={challenges.length}
      />

      {filteredChallenges.length === 0 ? (
        <EmptyState onClearFilters={clearFilters} />
      ) : (
        <ChallengeView
          challenges={filteredChallenges}
          savedChallenges={savedChallenges}
          onToggleSave={toggleSaveChallenge}
          viewMode={viewMode}
        />
      )}
    </PageLayout>
  )
}
