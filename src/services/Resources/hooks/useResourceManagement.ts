import { useState, useMemo, useEffect } from 'react'
import { useResources } from './useResources'
import type { ResourceItem } from '@/types'

export function useResourceManagement(externalSearchTerm?: string) {
  // Load saved tab from sessionStorage, default to 'documentation'
  const [activeTab, setActiveTab] = useState<
    'documentation' | 'video' | 'tools'
  >(() => {
    const saved = sessionStorage.getItem('resources-active-tab')
    return (saved as 'documentation' | 'video' | 'tools') || 'documentation'
  })

  const [searchTerm, setSearchTerm] = useState('')

  // Save active tab to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('resources-active-tab', activeTab)
  }, [activeTab])

  // Use external search term if provided, otherwise use internal search term
  const effectiveSearchTerm =
    externalSearchTerm !== undefined ? externalSearchTerm : searchTerm

  // Use React Query to fetch resources for the active tab
  const {
    data: tabData = [],
    isLoading: loading,
    refetch,
  } = useResources(activeTab)

  const filterResources = (
    data: ResourceItem[],
    query: string
  ): ResourceItem[] => {
    if (!query.trim()) {
      return data
    }

    const lowercaseQuery = query.toLowerCase()

    return data.filter((item) => {
      // Basic field searches
      const titleMatch = item.title.toLowerCase().includes(lowercaseQuery)
      const descriptionMatch = item.description
        .toLowerCase()
        .includes(lowercaseQuery)
      const categoryMatch = item.category.toLowerCase().includes(lowercaseQuery)

      // Author/channel searches with support for partial matches
      const authorMatch =
        item.by?.toLowerCase().includes(lowercaseQuery) ||
        item.channel?.toLowerCase().includes(lowercaseQuery)

      // Enhanced partial name matching
      // Split the query into words and check if all words are found in author names
      const queryWords = lowercaseQuery
        .split(/\s+/)
        .filter((word) => word.length > 0)
      const authorText = [item.by, item.channel]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const partialAuthorMatch =
        queryWords.length > 0 &&
        queryWords.every((word) => authorText.includes(word))

      return (
        titleMatch ||
        descriptionMatch ||
        categoryMatch ||
        authorMatch ||
        partialAuthorMatch
      )
    })
  }

  const filteredData = useMemo(() => {
    return filterResources(tabData, effectiveSearchTerm)
  }, [effectiveSearchTerm, tabData])

  // manual reload exposed to UI
  const reload = async () => {
    refetch()
  }

  return {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    filteredData,
    loading,
    reload,
  }
}
