import { useState, useMemo, useEffect } from 'react'
import { fetchResources } from '../lib/getResources'
import type { ResourceItem } from '@/types'

export function useResourceManagement(externalSearchTerm?: string) {
  const [activeTab, setActiveTab] = useState('documentation')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [cache, setCache] = useState<Record<string, ResourceItem[]>>({})

  // Use external search term if provided, otherwise use internal search term
  const effectiveSearchTerm =
    externalSearchTerm !== undefined ? externalSearchTerm : searchTerm

  const getTabData = (key: string): ResourceItem[] => {
    return cache[key] || []
  }

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
    const tabData = cache[activeTab] || []
    return filterResources(tabData, effectiveSearchTerm)
  }, [effectiveSearchTerm, activeTab, cache])

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setLoading(true)
      try {
        const typeMap: Record<string, 'video' | 'documentation' | 'tools'> = {
          documentation: 'documentation',
          tools: 'tools',
          video: 'video',
        }
        const resType = typeMap[activeTab]
        const data = await fetchResources(resType)
        console.debug('[useResourceManagement] fetched', resType, data)
        if (!mounted) return
        // fetchResources returns the array stored in the JSONB column
        setCache((c) => ({ ...c, [activeTab]: (data as ResourceItem[]) || [] }))
      } catch (err) {
        console.error('Failed to load resources for', activeTab, err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [activeTab])

  // manual reload exposed to UI
  const reload = async () => {
    setLoading(true)
    try {
      const typeMap: Record<string, 'video' | 'documentation' | 'tools'> = {
        documentation: 'documentation',
        tools: 'tools',
        video: 'video',
      }
      const resType = typeMap[activeTab]
      const data = await fetchResources(resType)
      console.debug('[useResourceManagement] reload fetched', resType, data)
      setCache((c) => ({ ...c, [activeTab]: (data as ResourceItem[]) || [] }))
    } catch (err) {
      console.error('Reload failed for', activeTab, err)
    } finally {
      setLoading(false)
    }
  }

  return {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    filteredData,
    loading,
    getTabData,
    reload,
  }
}
