import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error) throw error
      return { isAuthenticated: !!session, session }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // Auth should fail fast
  })
}
