import { ChallengeSearch } from './ChallengeSearch'
import { ChallengeFilters } from './ChallengeFilters'

type ChallengeControlsProps = {
  searchTerm: string
  selectedDifficulty: string
  selectedLanguage: string
  onSearchChange: (value: string) => void
  onDifficultyChange: (value: string) => void
  onLanguageChange: (value: string) => void
}

export function ChallengeControls({
  searchTerm,
  selectedDifficulty,
  selectedLanguage,
  onSearchChange,
  onDifficultyChange,
  onLanguageChange,
}: ChallengeControlsProps) {
  return (
    <div className='flex items-center justify-between flex-wrap lg:flex-row gap-4 mb-8'>
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
