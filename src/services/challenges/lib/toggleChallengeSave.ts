import { supabase } from '@/lib/supabaseClient';

/**
 * Toggles the saved status of a challenge for the current user
 * Uses user's profile.saved_challenges array (per-user, not global)
 * @param challengeId - The UUID of the challenge
 * @param currentSavedState - Current saved state (true/false)
 * @returns Promise<boolean | null> - New saved state or null if error
 */
export async function toggleChallengeSave(
  challengeId: string,
  currentSavedState: boolean
): Promise<boolean | null> {
  try {
    console.log(
      `[toggleChallengeSave] Toggling save for challenge: ${challengeId} from ${currentSavedState} to ${!currentSavedState}`
    );

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('[toggleChallengeSave] Not authenticated:', authError);
      return null;
    }

    // Call the appropriate database function
    const functionName = currentSavedState ? 'unsave_challenge' : 'save_challenge';
    
    const { data, error } = await supabase.rpc(functionName, {
      user_id: user.id,
      challenge_id: challengeId,
    });

    if (error) {
      console.error(`[toggleChallengeSave] Error calling ${functionName}:`, error);
      return null;
    }

    if (!data || !data.success) {
      console.warn(`[toggleChallengeSave] Function returned unsuccessful:`, data);
      return null;
    }

    const newSavedState = !currentSavedState;
    console.log(
      `✅ [toggleChallengeSave] Successfully ${newSavedState ? 'saved' : 'unsaved'} challenge`
    );
    return newSavedState;
  } catch (err) {
    console.error('[toggleChallengeSave] Unexpected error:', err);
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
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('[getSavedChallenges] Not authenticated:', authError);
      return [];
    }

    // Get user's saved_challenges from profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('saved_challenges')
      .eq('id', user.id)
      .single();

    if (error || !profile?.saved_challenges) {
      return [];
    }

    // Extract challenge IDs where isSaved is true
    const savedChallenges = profile.saved_challenges as Array<{ 
      challenge_id: string;
      isSaved: boolean;
    }>;
    const savedIds = savedChallenges
      .filter(item => item.isSaved === true)
      .map(item => item.challenge_id);
    
    console.log(
      `✅ [getSavedChallenges] Found ${savedIds.length} saved challenges`
    );
    return savedIds;
  } catch (err) {
    console.error('[getSavedChallenges] Unexpected error:', err);
    return [];
  }
}

