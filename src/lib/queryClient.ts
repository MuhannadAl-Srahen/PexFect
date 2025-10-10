import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Retry failed requests 3 times before giving up
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      refetchOnWindowFocus: true, // Refetch when user returns to tab
      refetchOnReconnect: true, // Refetch when internet reconnects
      staleTime: 1000 * 30, // 30 seconds - data is fresh for 30s
      gcTime: 1000 * 60 * 5, // 5 minutes - keep unused data in cache for 5 minutes
    },
    mutations: {
      retry: 1, // Retry mutations once
      onError: (error) => {
        console.error('[QueryClient] Mutation error:', error)
        // TODO: Add toast notification here
      },
    },
  },
})
