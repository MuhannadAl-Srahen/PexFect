import { useState, useMemo } from 'react'

interface Challenge {
  id: number
  title: string
  difficulty: string
  technologies: string[]
  description: string
  estimatedTime: string
  submissions: number
}

export function useChallengeFilters(challenges: Challenge[]) {
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
        challenge.technologies.some((tag) =>
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
