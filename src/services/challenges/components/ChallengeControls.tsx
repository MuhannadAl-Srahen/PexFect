import { ChallengeSearch } from './ChallengeSearch'
import { ChallengeFilters } from './ChallengeFilters'
import type { ChallengeControlsProps } from '../types'

export function ChallengeControls({
  searchTerm,
  selectedDifficulty,
  selectedLanguage,
  onSearchChange,
  onDifficultyChange,
  onLanguageChange,
}: ChallengeControlsProps) {
  return (
    <div className='flex items-center justify-between flex-wrap lg:flex-row gap-4 mb-4'>
      <ChallengeSearch
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />
      <ChallengeFilters
        selectedDifficulty={selectedDifficulty}
        selectedLanguage={selectedLanguage}
        onDifficultyChange={onDifficultyChange}
        onLanguageChange={onLanguageChange}
      />
    </div>
  )
}
