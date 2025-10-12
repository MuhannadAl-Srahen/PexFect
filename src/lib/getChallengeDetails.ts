import { supabase } from './supabaseClient';
import type {
  Challenge,
  ChallengeImage,
  Typography,
  VideoResource,
  DocumentResource,
  GuideResource,
  ToolResource,
} from '@/types';

// Database types
interface DbChallenge {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  tags: string[] | null;
  submissions: number;
  estimatedtime: string | null;
  thumbnail_url: string;
  created_at: string;
  issaved: boolean;
}

interface DbChallengeOverview {
  id: string;
  challenge_id: string;
  images: Record<string, unknown>;
  livepreviewurl: string | null;
  requirements: string[] | null;
  tips: string[] | null;
  pitfalls: string[] | null;
  description: string | null;
}

interface DbChallengeResources {
  id: string;
  challenge_id: string;
  docs: Record<string, unknown>;
  videos: Record<string, unknown>;
  tools: Record<string, unknown>;
  guides: Record<string, unknown>;
}

interface DbDesignGuidelines {
  id: string;
  challenge_id: string;
  typography: Record<string, unknown>;
  colorpalette: Record<string, unknown>;
  breakpoints: Record<string, unknown>;
  notes: string[] | null;
  spacing: Record<string, unknown>;
}

/**
 * Fetches complete challenge details including overview, resources, and design guidelines
 * @param challengeId - The UUID of the challenge
 * @returns Promise<Challenge | null>
 */
export async function getChallengeDetails(
  challengeId: string
): Promise<Challenge | null> {
  try {
    console.log(
      `[getChallengeDetails] Fetching details for challenge: ${challengeId}`
    );

    // Fetch the main challenge data
    const { data: challenge, error: challengeError } = await supabase
      .from('challenges')
      .select('*')
      .eq('id', challengeId)
      .single<DbChallenge>();

    if (challengeError) {
      console.error('[getChallengeDetails] Challenge error:', challengeError);
      return null;
    }

    if (!challenge) {
      console.warn(
        `[getChallengeDetails] No challenge found with id: ${challengeId}`
      );
      return null;
    }

    // Fetch challenge overview
    const { data: overview, error: overviewError } = await supabase
      .from('challenge_overview')
      .select('*')
      .eq('challenge_id', challengeId)
      .maybeSingle<DbChallengeOverview>();

    if (overviewError && overviewError.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      console.error('[getChallengeDetails] Overview error:', overviewError);
    }

    // Fetch challenge resources
    const { data: resources, error: resourcesError } = await supabase
      .from('challenge_resources')
      .select('*')
      .eq('challenge_id', challengeId)
      .maybeSingle<DbChallengeResources>();

    if (resourcesError && resourcesError.code !== 'PGRST116') {
      console.error('[getChallengeDetails] Resources error:', resourcesError);
    }

    // Fetch design guidelines
    const { data: design, error: designError } = await supabase
      .from('design_guidelines')
      .select('*')
      .eq('challenge_id', challengeId)
      .maybeSingle<DbDesignGuidelines>();

    if (designError && designError.code !== 'PGRST116') {
      console.error('[getChallengeDetails] Design error:', designError);
    }

    // Map the database data to the Challenge type
    const challengeDetails: Challenge = {
      // Main challenge fields
      id: challenge.id,
      title: challenge.title,
      difficulty: challenge.difficulty,
      tags: challenge.tags || [],
      description: overview?.description || challenge.description,
      estimatedTime: challenge.estimatedtime || 'Not specified',
      completions: challenge.submissions || 0,
      rating: 4.5, // Default rating, you might want to calculate this from feedback

      // Overview fields
      images: ((overview?.images as unknown) as ChallengeImage[]) || [],
      livePreviewUrl: overview?.livepreviewurl ?? '',
      requirements: overview?.requirements || [],
      tips: overview?.tips || [],
      pitfalls: overview?.pitfalls || [],

      // Design specifications
      designSpecs: design
        ? {
            typography: (design.typography as unknown) as Typography,
            breakpoints: design.breakpoints as Record<string, string>,
            colorPalette: design.colorpalette as Record<string, string>,
            spacing: design.spacing as Record<string, string>,
          }
        : {
            typography: {
              primaryFont: '',
              fallbackFonts: '',
              fontSizes: {},
              fontWeights: {},
            },
            breakpoints: {},
            colorPalette: {},
            spacing: {},
          },

      // Resources
      resources: resources
        ? {
            videos: ((resources.videos as unknown) as VideoResource[]) || [],
            documents: ((resources.docs as unknown) as DocumentResource[]) || [],
            guides: ((resources.guides as unknown) as GuideResource[]) || [],
            tools: ((resources.tools as unknown) as ToolResource[]) || [],
          }
        : {
            videos: [],
            documents: [],
            guides: [],
            tools: [],
          },
    };

    console.log('[getChallengeDetails] ✅ Successfully fetched challenge details');
    return challengeDetails;
  } catch (error) {
    console.error('[getChallengeDetails] Unexpected error:', error);
    return null;
  }
}
