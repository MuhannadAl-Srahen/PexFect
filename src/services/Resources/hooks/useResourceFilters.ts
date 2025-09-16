import { useState, useMemo } from 'react'
import type { Resource } from '@/types'

export function useResourceFilters(resources: Resource[]) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDifficulty =
        selectedDifficulty === 'all' ||
        resource.difficulty === selectedDifficulty
      const matchesLanguage =
        selectedLanguage === 'all' ||
        resource.tags.some((tag) =>
          tag.toLowerCase().includes(selectedLanguage.toLowerCase())
        )

      return matchesSearch && matchesDifficulty && matchesLanguage
    })
  }, [resources, searchTerm, selectedDifficulty, selectedLanguage])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedDifficulty('all')
    setSelectedLanguage('all')
  }

  return {
    searchTerm,
    selectedDifficulty,
    selectedLanguage,
    filteredResources,
    setSearchTerm,
    setSelectedDifficulty,
    setSelectedLanguage,
    clearFilters,
  }
}
