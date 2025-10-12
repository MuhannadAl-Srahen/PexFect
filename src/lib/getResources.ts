import { supabase } from './supabaseClient'
import type { ResourceItem } from '@/types'

/**
 * Read the resources row and return the requested JSONB column.
 * Uses a safe query that selects only the jsonb columns and uses limit(1).maybeSingle()
 * to avoid errors if the table is empty. Returns an empty array on error.
 */
export async function fetchResources(
  type?: 'video' | 'documentation' | 'tools'
): Promise<ResourceItem[]> {
  try {
    // select only the JSONB columns that we expect
    const { data, error } = await supabase
      .from('resources')
      .select('docs, videos, tools')
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('[getResources] Supabase error:', error)
      console.error('[getResources] ⚠️  Please apply RLS policies - see database-setup.sql')
      return []
    }

    if (!data) {
      console.warn('[getResources] No resources row found in database')
      return []
    }

    console.log(`✅ [getResources] Successfully fetched ${type || 'all'} resources from database`)
    console.debug('[getResources] Row data:', data)

    const row = data as Record<string, unknown>

    const ensureArray = (val: unknown): ResourceItem[] =>
      Array.isArray(val) ? (val as ResourceItem[]) : []

    switch (type) {
      case 'video':
        return ensureArray(row.videos ?? row.video)
      case 'documentation':
        return ensureArray(row.docs ?? row.documentation)
      case 'tools':
        return ensureArray(row.tools ?? row.tool)
      default:
        return []
    }
  } catch (err) {
    console.error('[getResources] Unexpected error:', err)
    return []
  }
}
