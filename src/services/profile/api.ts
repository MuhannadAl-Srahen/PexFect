import type { UserProfile, ProfileStats } from '@/types'
import { supabase } from '@/lib/supabaseClient'
import { userProfile } from './data'

// Database profile type (matching your schema)
interface DbProfile {
  id: string
  full_name: string | null
  email: string | null
  bio: string | null
  skills: string[] | null
  social_links: Record<string, string> | null
  joined_date: string | null
  profile_image_url: string | null
  saved_challenges: unknown | null
  github_url: string | null
}

// Profile API service
export const ProfileService = {
  // Get user profile from Supabase
  async getProfile(userId?: string): Promise<UserProfile | null> {
    try {
      // If no userId provided, get current user
      if (!userId) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return null
        userId = user.id
      }

      console.log('[ProfileService] Fetching profile for user:', userId)

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('[ProfileService] Error fetching profile:', error)
        return null
      }

      if (!data) {
        console.warn('[ProfileService] No profile found for user:', userId)
        return null
      }

      console.log('[ProfileService] ✅ Profile fetched successfully:', data)

      // Map database profile to UserProfile type
      const dbProfile = data as DbProfile
      const socialLinks = dbProfile.social_links as Record<string, string> | null

      const profile: UserProfile = {
        id: dbProfile.id,
        username: dbProfile.full_name?.split(' ')[0].toLowerCase() || 'user',
        fullName: dbProfile.full_name || 'Unknown User',
        email: dbProfile.email || '',
        avatar: dbProfile.profile_image_url || undefined,
        bio: dbProfile.bio || undefined,
        location: socialLinks?.location || undefined,
        website: socialLinks?.website || undefined,
        githubUrl: dbProfile.github_url || socialLinks?.github || undefined,
        linkedinUrl: socialLinks?.linkedin || undefined,
        twitterUrl: socialLinks?.twitter || undefined,
        skills: dbProfile.skills || [],
        experience: 'Intermediate', // Default value, you can add this to your schema
        joinedAt: dbProfile.joined_date || new Date().toISOString().split('T')[0],
        stats: {
          challengesCompleted: 0, // TODO: Calculate from saved_challenges
          totalSubmissions: 0,
          averageRating: 0,
          currentStreak: 0,
          longestStreak: 0,
          totalPoints: 0,
        },
      }

      return profile
    } catch (error) {
      console.error('[ProfileService] Exception:', error)
      return null
    }
  },

  // Update user profile
  async updateProfile(
    userId: string,
    updates: Partial<UserProfile>
  ): Promise<UserProfile | null> {
    try {
      console.log('[ProfileService] Updating profile for user:', userId, updates)

      // First, get existing profile to merge social links properly
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('social_links')
        .eq('id', userId)
        .single()

      // Map UserProfile updates to database schema
      const dbUpdates: Partial<DbProfile> = {}

      if (updates.fullName !== undefined) dbUpdates.full_name = updates.fullName
      if (updates.email !== undefined) dbUpdates.email = updates.email
      if (updates.bio !== undefined) dbUpdates.bio = updates.bio
      if (updates.skills !== undefined) dbUpdates.skills = updates.skills
      if (updates.avatar !== undefined) dbUpdates.profile_image_url = updates.avatar
      if (updates.githubUrl !== undefined) dbUpdates.github_url = updates.githubUrl

      // Handle social links - merge with existing ones
      if (updates.linkedinUrl !== undefined || updates.twitterUrl !== undefined || 
          updates.website !== undefined || updates.location !== undefined) {
        // Get existing social links
        function isRecordOfString(obj: unknown): obj is Record<string, string> {
          return typeof obj === 'object' && obj !== null &&
            Object.values(obj).every(v => typeof v === 'string');
        }
        const existingSocialLinks: Record<string, string> =
          isRecordOfString(existingProfile?.social_links) ? existingProfile!.social_links as Record<string, string> : {};
        
        // Merge with new values
        const socialLinks: Record<string, string> = { ...existingSocialLinks }
        if (updates.linkedinUrl !== undefined) socialLinks.linkedin = updates.linkedinUrl
        if (updates.twitterUrl !== undefined) socialLinks.twitter = updates.twitterUrl
        if (updates.website !== undefined) socialLinks.website = updates.website
        if (updates.location !== undefined) socialLinks.location = updates.location
        
        dbUpdates.social_links = socialLinks
      }

      console.log('[ProfileService] Database updates:', dbUpdates)

      const { error } = await supabase
        .from('profiles')
        // @ts-expect-error - Supabase client type inference issue with unknown database schema
        .update(dbUpdates)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        console.error('[ProfileService] Error updating profile:', error)
        throw error
      }

      console.log('[ProfileService] ✅ Profile updated successfully')

      // Return the updated profile
      return await this.getProfile(userId)
    } catch (error) {
      console.error('[ProfileService] Exception:', error)
      return null
    }
  },

  // Update profile stats (when challenges are completed, etc.)
  async updateStats(
    userId: string,
    statUpdates: Partial<ProfileStats>
  ): Promise<void> {
    // TODO: Implement stats tracking in a separate table or jsonb field
    console.log('[ProfileService] Stats updated for user:', userId, statUpdates)
  },
}

// Hooks for React components
export const useProfile = (userId: string) => {
  // This will be replaced with React Query or similar data fetching library
  // For now, return mock data
  return {
    data: userProfile,
    isLoading: false,
    error: null,
    mutate: (updates: Partial<UserProfile>) =>
      ProfileService.updateProfile(userId, updates),
  }
}
