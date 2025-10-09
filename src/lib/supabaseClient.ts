// Typed wrapper around the JS supabase client so TypeScript imports resolve to a module
import { supabase as supabaseAny } from './supabaseClient.js'
import type { SupabaseClient } from '@supabase/supabase-js'

// Re-export the runtime client. Use SupabaseClient<unknown> to provide a usable
// TS type without needing to model your full DB types here.
export const supabase: SupabaseClient<unknown> =
	(supabaseAny as unknown) as SupabaseClient<unknown>

export default supabase
