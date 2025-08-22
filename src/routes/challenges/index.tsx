import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  challenges,
  useChallengeFilters,
  ChallengePageHeader,
  ChallengeControls,
  ViewModeToggle,
  ChallengeCount,
} from '@/services/challenges'

export const Route = createFileRoute('/challenges/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const {
    searchTerm,
    selectedDifficulty,
    selectedLanguage,
    filteredChallenges,
    setSearchTerm,
    setSelectedDifficulty,
    setSelectedLanguage,
  } = useChallengeFilters(challenges)

  return (
    <div className='bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-7xl mx-auto'>
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
        </div>
      </div>
    </div>
  )
}
