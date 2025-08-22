import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  challenges,
  useChallengeFilters,
  ChallengePageHeader,
  ChallengeControls,
  ViewModeToggle,
  ChallengeCount,
  ChallengeView,
  EmptyState,
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
    <div className='bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <ChallengePageHeader />

          <ChallengeControls
            searchTerm={searchTerm}
            selectedDifficulty={selectedDifficulty}
            selectedLanguage={selectedLanguage}
            onSearchChange={setSearchTerm}
            onDifficultyChange={setSelectedDifficulty}
            onLanguageChange={setSelectedLanguage}
          />

          <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          <ChallengeCount
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
        </div>
      </div>
    </div>
  )
}
