// src/lib/profileHelpers.ts
import { supabase } from './supabaseClient'

interface ProfileUpdate {
  full_name?: string
  bio?: string
  skills?: string[]
  social_links?: Record<string, string>
  profile_image_url?: string
  github_url?: string
}

/**
 * Ensures that a profile exists for the current user
 * This is a fallback in case the trigger didn't run for some reason
 */
export async function ensureProfileExists() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      console.log('[ensureProfileExists] No user found')
      return null
    }

    // Check if profile already exists first (no arbitrary wait)
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle() // Use maybeSingle instead of single to handle 0 or 1 results

    // If there's an error that's not "no rows", log it
    if (fetchError) {
      // Check if it's a permission error (42501)
      if (fetchError.code === '42501') {
        console.error('[ensureProfileExists] ❌ RLS Policy Error - Please run the SQL migration!')
        console.error('[ensureProfileExists] Run: supabase/migrations/AGGRESSIVE_FIX.sql')
      } else {
        console.error('[ensureProfileExists] Error checking profile:', fetchError)
      }
      return null
    }

    // If profile exists, return it
    if (existingProfile) {
      console.log('[ensureProfileExists] ✅ Profile already exists')
      return existingProfile
    }

    // Profile doesn't exist, create it with upsert to avoid race conditions
    console.log('[ensureProfileExists] Creating new profile...')
    
    // Extract GitHub username and construct GitHub URL
    const githubUsername = user.user_metadata?.user_name
    const githubUrl = githubUsername ? `https://github.com/${githubUsername}` : null
    
    // Extract only the date part (YYYY-MM-DD) from created_at timestamp
    const joinedDate = user.created_at ? user.created_at.split('T')[0] : null
    
    // Use upsert to handle race conditions (if trigger creates it simultaneously)
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      // @ts-expect-error - Supabase client type inference issue with unknown database schema
      .upsert(
        {
          id: user.id,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
          email: user.email || null,
          joined_date: joinedDate,
          profile_image_url: user.user_metadata?.avatar_url || null,
          github_url: githubUrl,
        },
        {
          onConflict: 'id',
          ignoreDuplicates: false // Update if exists
        }
      )
      .select()
      .maybeSingle()

    if (insertError) {
      console.error('[ensureProfileExists] Error upserting profile:', insertError)
      return null
    }

    console.log('[ensureProfileExists] ✅ Profile created successfully')
    return newProfile
  } catch (error) {
    console.error('[ensureProfileExists] Unexpected error:', error)
    return null
  }
}

/**
 * Gets the current user's profile
 */
export async function getUserProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('[getUserProfile] Error fetching profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('[getUserProfile] Unexpected error:', error)
    return null
  }
}

/**
 * Updates the current user's profile
 */
export async function updateUserProfile(updates: ProfileUpdate) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      console.error('[updateUserProfile] No user found')
      return null
    }

    const { data, error } = await supabase
      .from('profiles')
      // @ts-expect-error - Supabase client type inference issue with unknown database schema
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      console.error('[updateUserProfile] Error updating profile:', error)
      return null
    }

    console.log('[updateUserProfile] Profile updated successfully')
    return data
  } catch (error) {
    console.error('[updateUserProfile] Unexpected error:', error)
    return null
  }
}
