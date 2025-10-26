import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on auth errors (401, 403) or Supabase auth error codes (e.g., PGRST301)
        if (error && typeof error === 'object') {
          // Check for HTTP status codes
          if ('status' in error) {
            const status = (error as { status?: number }).status
            if (status === 401 || status === 403) return false
          }
          // Check for Supabase-specific error codes
          if ('code' in error) {
            const code = (error as { code?: string }).code
            // PGRST301: JWT expired, add other relevant codes as needed
            if (code === 'PGRST301') return false
          }
        }
        // Retry up to 3 times for other errors
        return failureCount < 3
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      refetchOnWindowFocus: false, // Disable to prevent unnecessary refetches
      refetchOnReconnect: true, // Refetch when internet reconnects
      staleTime: 1000 * 60, // 1 minute - data is fresh for 1 minute
      gcTime: 1000 * 60 * 5, // 5 minutes - keep unused data in cache for 5 minutes
      networkMode: 'online', // Only fetch when online
    },
    mutations: {
      retry: 1, // Retry mutations once
      networkMode: 'online', // Only mutate when online
      onError: (error) => {
        console.error('[QueryClient] Mutation error:', error)
        // TODO: Add toast notification here
      },
    },
  },
})
