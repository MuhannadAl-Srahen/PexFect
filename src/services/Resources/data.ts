import type { Resource } from '@/types'

export const resources: Resource[] = []

export const searchResources = (query: string): Resource[] => {
  const lowercaseQuery = query.toLowerCase()

  return resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(lowercaseQuery) ||
      resource.description.toLowerCase().includes(lowercaseQuery) ||
      resource.url.toLowerCase().includes(lowercaseQuery) ||
      resource.category.toLowerCase().includes(lowercaseQuery) ||
      resource.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  )
}
