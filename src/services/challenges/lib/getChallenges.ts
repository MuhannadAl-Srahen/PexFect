import { supabase } from '@/lib/supabaseClient'
import type { Challenge, ChallengeListItem } from '@/types'

const toStr = (v: unknown): string => (typeof v === 'string' ? v : '')
const toId = (v: unknown): string => {
  if (typeof v === 'string' && v.trim() !== '') return v
  if (typeof v === 'number') return String(v)
  return ''
}
const toStrArray = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [])

const mapRowToListItem = (row: unknown): ChallengeListItem => {
  const r = row as Record<string, unknown>
  return {
    id: toId(r.id),
    title: toStr(r.title) || 'Untitled',
    difficulty: (r.difficulty as unknown as Challenge['difficulty']) || 'Beginner',
    tags: toStrArray(r.tags),
    description: toStr(r.description),
    // Database uses 'thumbnail_url', frontend expects 'image'
    image: toStr(r.thumbnail_url) || toStr(r.image) || undefined,
    // Database uses lowercase 'estimatedtime', frontend expects 'estimatedTime'
    estimatedTime: toStr(r.estimatedtime) || toStr(r.estimated_time) || toStr(r.estimatedTime) || '',
    submissions: Number(toId(r.submissions) || 0),
    // isSaved is now determined per-user from profiles.saved_challenges, not from challenges table
    isSaved: false, // Default to false, will be updated based on user's profile
  }
}

const mapRowToDetail = (row: unknown): Challenge => {
  const r = row as Record<string, unknown>
  return {
    id: toId(r.id),
    title: toStr(r.title) || 'Untitled',
    difficulty: (r.difficulty as unknown as Challenge['difficulty']) || 'Beginner',
    tags: toStrArray(r.tags),
    description: toStr(r.description),
    images: (r.images as unknown as Challenge['images']) || [],
    livePreviewUrl: toStr(r.live_preview_url) || toStr(r.livePreviewUrl) || '',
    estimatedTime: toStr(r.estimated_time) || toStr(r.estimatedTime) || '',
    completions: Number(toId(r.completions) || 0),
    submissions: Number(toId(r.submissions) || 0),
    rating: Number(toId(r.rating) || 0),
    requirements: (r.requirements as unknown as string[]) || [],
    tips: (r.tips as unknown as string[]) || [],
    pitfalls: (r.pitfalls as unknown as string[]) || [],
    designSpecs:
      (r.design_specs as unknown as Challenge['designSpecs']) ||
      (r.designSpecs as unknown as Challenge['designSpecs']) ||
      ({} as Challenge['designSpecs']),
    resources: (r.resources as unknown as Challenge['resources']) || ({} as Challenge['resources']),
  }
}

export const getChallenges = async (): Promise<ChallengeListItem[]> => {
  try {
    // Fetch challenges sorted by newest first (created_at DESC)
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('[getChallenges] Supabase error:', error)
      console.error('[getChallenges] ⚠️  Please apply RLS policies - see database-setup.sql')
      return []
    }
    if (!data) return []
    
    console.log(`✅ [getChallenges] Successfully fetched ${data.length} challenges from database`)
    if (data.length > 0) console.debug('[getChallenges] First challenge:', data[0])
    
    return data.map(mapRowToListItem)
  } catch (err) {
    console.error('[getChallenges] Unexpected error:', err)
    return []
  }
}

export const getChallenge = async (id: string): Promise<Challenge | null> => {
  try {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('id', id)
      .limit(1)
      .maybeSingle()
    
    if (error) {
      console.error('[getChallenge] Supabase error:', error)
      console.error('[getChallenge] ⚠️  Please apply RLS policies - see database-setup.sql')
      return null
    }
    if (!data) {
      console.warn(`[getChallenge] No challenge found with id: ${id}`)
      return null
    }
    
    console.log(`✅ [getChallenge] Successfully fetched challenge from database`)
    return mapRowToDetail(data)
  } catch (err) {
    console.error('[getChallenge] unexpected error', err)
    return null
  }
}

export default getChallenges
