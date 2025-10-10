import { supabase } from '@/lib/supabaseClient';

// Type for saved challenge items in the database
type SavedChallengeItem = {
  challenge_id: string;
  isSaved: boolean;
};

/**
 * Toggles the saved status of a challenge for the current user
 * Uses user's profile.saved_challenges array (per-user, not global)
 * @param challengeId - The UUID of the challenge
 * @param currentSavedState - Current saved state (true/false)
 * @returns Promise<string[] | null> - Array of all saved challenge IDs or null if error
 */
export async function toggleChallengeSave(
  challengeId: string,
  currentSavedState: boolean
): Promise<string[] | null> {
  try {
    console.log(
      `[toggleChallengeSave] 🔄 Toggling save for challenge: ${challengeId}`
    );
    console.log(`[toggleChallengeSave] 📌 Current state: ${currentSavedState ? 'SAVED' : 'NOT SAVED'}`);
    console.log(`[toggleChallengeSave] 🎯 Target action: ${currentSavedState ? 'UNSAVE (remove from array)' : 'SAVE (add to array)'}`);

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('[toggleChallengeSave] ❌ Not authenticated:', authError);
      return null;
    }

    console.log(`[toggleChallengeSave] 👤 User ID: ${user.id}`);

    // Call the appropriate database function
    const functionName = currentSavedState ? 'unsave_challenge' : 'save_challenge';
    console.log(`[toggleChallengeSave] 📞 Calling function: ${functionName}`);
    console.log(`[toggleChallengeSave] 📞 With params:`, {
      user_id: user.id,
      challenge_id: challengeId,
    });
    
    // Use type assertion to bypass TypeScript errors
    const { data, error } = await (supabase.rpc as any)(functionName, {
      user_id: user.id,
      challenge_id: challengeId,
    });

    console.log(`[toggleChallengeSave] 📬 RPC call completed`);
    console.log(`[toggleChallengeSave] 📦 Response data:`, data);
    console.log(`[toggleChallengeSave] ⚠️ Response error:`, error);

    if (error) {
      console.error(`[toggleChallengeSave] ❌ Error calling ${functionName}:`, error);
      console.error(`[toggleChallengeSave] ❌ Error details:`, {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return null;
    }

    console.log(`[toggleChallengeSave] 📦 Response data:`, data);

    if (!data || !data.success) {
      console.warn(`[toggleChallengeSave] ⚠️ Function returned unsuccessful:`, data);
      return null;
    }

    // Log the new array state
    console.log(`[toggleChallengeSave] 📊 New saved_challenges array:`, data.saved_challenges);
    console.log(`[toggleChallengeSave] 📊 Array length: ${data.saved_challenges?.length || 0}`);

    // Return the full array of saved challenge IDs from the database response
    // This ensures we have the fresh, accurate state immediately
    const savedChallengeIds = ((data.saved_challenges || []) as SavedChallengeItem[])
      .filter((item) => item.isSaved === true)
      .map((item) => item.challenge_id);
    
    console.log(`[toggleChallengeSave] ✅ Successfully toggled - Returning ${savedChallengeIds.length} saved IDs`);
    return savedChallengeIds;
  } catch (err) {
    console.error('[toggleChallengeSave] ❌ Unexpected error:', err);
    return null;
  }
}

/**
 * Gets the current saved state of a challenge for the current user
 * @param challengeId - The UUID of the challenge
 * @returns Promise<boolean | null> - Saved state or null if error
 */
export async function getChallengeSavedState(
  challengeId: string
): Promise<boolean | null> {
  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('[getChallengeSavedState] Not authenticated:', authError);
      return false; // Not logged in = not saved
    }

    const { data, error } = await supabase.rpc('is_challenge_saved', {
      user_id: user.id,
      challenge_id: challengeId,
    });

    if (error) {
      console.error('[getChallengeSavedState] Error:', error);
      return null;
    }

    return data === true;
  } catch (err) {
    console.error('[getChallengeSavedState] Unexpected error:', err);
    return null;
  }
}

/**
 * Gets all saved challenge IDs for the current user
 * @returns Promise<string[]> - Array of challenge IDs that are saved
 */
export async function getSavedChallenges(): Promise<string[]> {
  try {
    console.log('[getSavedChallenges] 🔍 Fetching saved challenges...')
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('[getSavedChallenges] ❌ Not authenticated:', authError);
      return [];
    }

    console.log('[getSavedChallenges] 👤 User ID:', user.id)

    // Get user's saved_challenges from profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('saved_challenges')
      .eq('id', user.id)
      .single();

    console.log('[getSavedChallenges] 📦 Profile data:', profile)
    console.log('[getSavedChallenges] ⚠️ Profile error:', error)

    if (error) {
      console.error('[getSavedChallenges] ❌ Database error:', error);
      return [];
    }

    if (!profile) {
      console.warn('[getSavedChallenges] ⚠️ No profile found');
      return [];
    }

    // Use type assertion to access saved_challenges
    const profileData = profile as any;
    
    if (!profileData.saved_challenges || !Array.isArray(profileData.saved_challenges)) {
      console.log('[getSavedChallenges] ℹ️ No saved challenges found (empty or null)');
      return [];
    }

    // Extract challenge IDs where isSaved is true
    const savedChallenges = profileData.saved_challenges as Array<{ 
      challenge_id: string;
      isSaved: boolean;
    }>;
    
    const savedIds = savedChallenges
      .filter(item => item.isSaved === true)
      .map(item => item.challenge_id);
    
    console.log('[getSavedChallenges] ✅ Found', savedIds.length, 'saved challenges:', savedIds);
    return savedIds;
  } catch (err) {
    console.error('[getSavedChallenges] ❌ Unexpected error:', err);
    return [];
  }
}

