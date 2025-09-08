import { useState, useMemo } from 'react'
import type { ChallengeListItem } from '@/types'

export function useChallengeFilters(challenges: ChallengeListItem[]) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')

  const filteredChallenges = useMemo(() => {
    return challenges.filter((challenge) => {
      const matchesSearch =
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDifficulty =
        selectedDifficulty === 'all' ||
        challenge.difficulty === selectedDifficulty
      const matchesLanguage =
        selectedLanguage === 'all' ||
        challenge.tags.some((tag) =>
          tag.toLowerCase().includes(selectedLanguage.toLowerCase())
        )

      return matchesSearch && matchesDifficulty && matchesLanguage
    })
  }, [challenges, searchTerm, selectedDifficulty, selectedLanguage])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedDifficulty('all')
    setSelectedLanguage('all')
  }

  return {
    searchTerm,
    selectedDifficulty,
    selectedLanguage,
    filteredChallenges,
    setSearchTerm,
    setSelectedDifficulty,
    setSelectedLanguage,
    clearFilters,
  }
}
