import { supabase } from '@/lib/supabaseClient';

// Database row types
interface ChallengeRow {
  id: string;
  issaved: boolean;
}

/**
 * Toggles the isSaved status of a challenge in the database
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

    const updateQuery = supabase
      .from('challenges')
      // @ts-expect-error - Supabase client type inference issue with unknown database schema
      .update({ issaved: !currentSavedState })
      .eq('id', challengeId)
      .select('issaved')
      .single();

    const { data, error } = await updateQuery;

    if (error) {
      console.error('[toggleChallengeSave] Error:', error);
      return null;
    }

    if (!data) {
      console.warn(
        `[toggleChallengeSave] No challenge found with id: ${challengeId}`
      );
      return null;
    }

    const result = data as unknown as ChallengeRow;
    const newSavedState = result.issaved;
    console.log(
      `✅ [toggleChallengeSave] Successfully updated challenge saved state to: ${newSavedState}`
    );
    return newSavedState;
  } catch (err) {
    console.error('[toggleChallengeSave] Unexpected error:', err);
    return null;
  }
}

/**
 * Gets the current saved state of a challenge
 * @param challengeId - The UUID of the challenge
 * @returns Promise<boolean | null> - Saved state or null if error
 */
export async function getChallengeSavedState(
  challengeId: string
): Promise<boolean | null> {
  try {
    const { data, error } = await supabase
      .from('challenges')
      .select('issaved')
      .eq('id', challengeId)
      .single();

    if (error) {
      console.error('[getChallengeSavedState] Error:', error);
      return null;
    }

    if (!data) {
      console.warn(
        `[getChallengeSavedState] No challenge found with id: ${challengeId}`
      );
      return null;
    }

    const result = data as unknown as ChallengeRow;
    return result.issaved;
  } catch (err) {
    console.error('[getChallengeSavedState] Unexpected error:', err);
    return null;
  }
}

/**
 * Gets all saved challenges
 * @returns Promise<string[]> - Array of challenge IDs that are saved
 */
export async function getSavedChallenges(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('challenges')
      .select('id')
      .eq('issaved', true);

    if (error) {
      console.error('[getSavedChallenges] Error:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    const results = data as unknown as Array<Pick<ChallengeRow, 'id'>>;
    const savedIds = results.map((row) => row.id);
    console.log(
      `✅ [getSavedChallenges] Found ${savedIds.length} saved challenges`
    );
    return savedIds;
  } catch (err) {
    console.error('[getSavedChallenges] Unexpected error:', err);
    return [];
  }
}
