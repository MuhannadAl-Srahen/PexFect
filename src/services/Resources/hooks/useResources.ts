import { useQuery } from '@tanstack/react-query'
import { fetchResources } from '../lib/getResources'
import type { ResourceItem } from '@/types'

export const useResources = (type: 'video' | 'documentation' | 'tools') => {
  return useQuery<ResourceItem[], Error>({
    queryKey: ['resources', type],
    queryFn: () => fetchResources(type),
    staleTime: 1000 * 60 * 10, // 10 minutes - resources don't change often
    gcTime: 1000 * 60 * 30, // 30 minutes cache
    retry: 2,
  })
}
