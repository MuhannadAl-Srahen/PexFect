/**
 * Helper functions for managing saved challenges per user
 */

import { supabase } from './supabaseClient';

export interface SavedChallenge {
  challenge_id: string;
  saved_at: string;
  title?: string;
  difficulty?: string;
  thumbnail_url?: string;
  tags?: string[];
}

/**
 * Check if a challenge is saved by the current user
 */
export async function isChallengeeSaved(challengeId: string): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase.rpc('is_challenge_saved', {
      user_id: user.id,
      challenge_id: challengeId,
    });

    if (error) {
      console.error('[isChallengeeSaved] Error:', error);
      return false;
    }

    return data === true;
  } catch (error) {
    console.error('[isChallengeeSaved] Exception:', error);
    return false;
  }
}

/**
 * Save a challenge for the current user
 */
export async function saveChallenge(challengeId: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase.rpc('save_challenge', {
      user_id: user.id,
      challenge_id: challengeId,
    });

    if (error) {
      console.error('[saveChallenge] Error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('[saveChallenge] Exception:', error);
    throw error;
  }
}

/**
 * Unsave a challenge for the current user
 */
export async function unsaveChallenge(challengeId: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase.rpc('unsave_challenge', {
      user_id: user.id,
      challenge_id: challengeId,
    });

    if (error) {
      console.error('[unsaveChallenge] Error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('[unsaveChallenge] Exception:', error);
    throw error;
  }
}

/**
 * Toggle saved state for a challenge
 */
export async function toggleChallengeSave(challengeId: string) {
  try {
    const isSaved = await isChallengeeSaved(challengeId);
    
    if (isSaved) {
      return await unsaveChallenge(challengeId);
    } else {
      return await saveChallenge(challengeId);
    }
  } catch (error) {
    console.error('[toggleChallengeSave] Exception:', error);
    throw error;
  }
}

/**
 * Get all saved challenges for the current user
 */
export async function getSavedChallenges(): Promise<SavedChallenge[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return [];
    }

    const { data, error } = await supabase.rpc('get_saved_challenges', {
      user_id: user.id,
    });

    if (error) {
      console.error('[getSavedChallenges] Error:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('[getSavedChallenges] Exception:', error);
    return [];
  }
}

/**
 * Get saved challenge IDs only (for quick lookup)
 */
export async function getSavedChallengeIds(): Promise<string[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return [];
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('saved_challenges')
      .eq('id', user.id)
      .single();

    if (error || !profile?.saved_challenges) {
      return [];
    }

    // Extract just the challenge IDs
    const savedChallenges = profile.saved_challenges as Array<{ challenge_id: string }>;
    return savedChallenges.map(item => item.challenge_id);
  } catch (error) {
    console.error('[getSavedChallengeIds] Exception:', error);
    return [];
  }
}
