import type { UserProfile, ProfileStats } from '@/types'
import { userProfile } from './data'

// Profile API service - will be connected to Supabase later
export const ProfileService = {
  // Get user profile
  async getProfile(userId: string): Promise<UserProfile> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 100))
    // In production, use userId to fetch from database
    console.log('Fetching profile for user:', userId)
    return { ...userProfile }
  },

  // Update user profile
  async updateProfile(
    userId: string,
    updates: Partial<UserProfile>
  ): Promise<UserProfile> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 200))

    // In real implementation, this would update the database
    console.log('Updating profile for user:', userId)
    const updatedProfile = { ...userProfile, ...updates }

    // Here you would typically make a Supabase call like:
    // const { data, error } = await supabase
    //   .from('profiles')
    //   .update(updates)
    //   .eq('id', userId)
    //   .select()
    //   .single()

    return updatedProfile
  },

  // Update profile stats (when challenges are completed, etc.)
  async updateStats(
    userId: string,
    statUpdates: Partial<ProfileStats>
  ): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 100))

    // In real implementation, this would update user stats in database
    console.log('Stats updated for user:', userId, statUpdates)
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
