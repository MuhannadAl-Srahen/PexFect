import type { Resource } from '@/types'
import { resources } from './data'

export const getResourceById = (id: string): Resource | undefined => {
  return resources.find((resource) => resource.id === id)
}

export const searchResources = (query: string): Resource[] => {
  const lowercaseQuery = query.toLowerCase()
  return resources.filter(
    (resource: Resource) =>
      resource.title.toLowerCase().includes(lowercaseQuery) ||
      resource.description.toLowerCase().includes(lowercaseQuery) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export const getResourcesByCategory = (category: string): Resource[] => {
  return resources.filter(
    (resource: Resource) => resource.category === category
  )
}
