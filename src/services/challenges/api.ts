import type { Challenge } from '@/types'
import { getChallengeDetails } from './lib/getChallengeDetails'
import { ProfileService } from '@/services/profile/api'
import { supabase } from '@/lib/supabaseClient'

export const getChallengeById = async (
  id: string
): Promise<Challenge | null> => {
  // Small delay kept for parity with previous behavior
  await new Promise((resolve) => setTimeout(resolve, 200))
  try {
    const result = await getChallengeDetails(id)
    if (!result) console.warn('[getChallengeById] no challenge found for id', id)
    return result
  } catch (err) {
    console.error('[getChallengeById] unexpected error', err)
    return null
  }
}

export const submitChallengeSolution = async (
  challengeId: string,
  submission: {
    title: string
    githubUrl: string
    liveUrl: string
    screenshot: File | null
    description: string
  }
) => {
  try {
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('User not authenticated')
    }

    // Check if the live preview URL matches any official challenge URLs
    if (submission.liveUrl) {
// Define the type for challenge_overview table
type ChallengeOverview = {
  challenge_id: string
  livepreviewurl: string | null
}
      const { data: officialChallenges } = await supabase
        .from('challenge_overview')
        .select('challenge_id, livepreviewurl')
        .not('livepreviewurl', 'is', null)

      if (officialChallenges && officialChallenges.length > 0) {
        const isOfficialUrl = officialChallenges.some((challenge: ChallengeOverview) => 
          challenge.livepreviewurl && challenge.livepreviewurl.toLowerCase() === submission.liveUrl.toLowerCase()
        )
        
        if (isOfficialUrl) {
          throw new Error(`OFFICIAL_URL_USED: The live preview URL "${submission.liveUrl}" is an official challenge URL. You cannot submit the official solution as your own work.`)
        }
      }
    }

    // Check if URLs are already used for a DIFFERENT challenge
    const { data: existingWithGithub } = await (supabase
      .from('challenge_submissions') as any)
      .select('challenge_id, challenge_title')
      .eq('github_url', submission.githubUrl)
      .neq('challenge_id', challengeId)
      .limit(1)

    if (existingWithGithub && existingWithGithub.length > 0) {
      throw new Error(`GITHUB_URL_USED: The GitHub repository URL "${submission.githubUrl}" that you're trying to submit is already used for another challenge. Please create a new repository for this challenge.`)
    }

    const { data: existingWithLive } = await (supabase
      .from('challenge_submissions') as any)
      .select('challenge_id, challenge_title')
      .eq('live_site_url', submission.liveUrl)
      .neq('challenge_id', challengeId)
      .limit(1)

    if (existingWithLive && existingWithLive.length > 0) {
      throw new Error(`LIVE_URL_USED: The live preview URL "${submission.liveUrl}" that you're trying to submit is already used for another challenge. Please deploy this project to a different URL.`)
    }

    // Check if user already submitted this challenge with these URLs
    const { data: existingSubmission } = await (supabase
      .from('challenge_submissions') as any)
      .select('id')
      .eq('challenge_id', challengeId)
      .eq('profile_id', user.id)
      .or(`github_url.eq.${submission.githubUrl},live_site_url.eq.${submission.liveUrl}`)
      .maybeSingle()

    let submissionId: string
    let isUpdate = false

    if (existingSubmission) {
      // UPDATE existing submission
      submissionId = existingSubmission.id
      isUpdate = true

      const { error: updateError } = await (supabase
        .from('challenge_submissions') as any)
        .update({
          challenge_title: submission.title,
          github_url: submission.githubUrl,
          live_site_url: submission.liveUrl,
          submission_description: submission.description || null,
          submitted_at: new Date().toISOString(), // Update timestamp
        })
        .eq('id', submissionId)

      if (updateError) {
        console.error('Update error:', updateError)
        throw new Error(updateError.message)
      }
    } else {
      // INSERT new submission
      const { data, error } = await (supabase
        .from('challenge_submissions') as any)
        .insert({
          challenge_id: challengeId,
          profile_id: user.id,
          challenge_title: submission.title,
          github_url: submission.githubUrl,
          live_site_url: submission.liveUrl,
          screenshots: null, // Will update after upload
          submission_description: submission.description || null,
        })
        .select('id')
        .single()

      if (error) {
        console.error('Submission error:', error)
        throw new Error(error.message)
      }

      submissionId = (data as { id: string }).id
    }

    // Handle screenshot upload if provided
    if (submission.screenshot) {
      const fileExt = submission.screenshot.name.split('.').pop()
      const fileName = `${challengeId}/${user.id}/${submissionId}/${Date.now()}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('submission-screenshots')
        .upload(fileName, submission.screenshot)

      if (uploadError) {
        console.error('Screenshot upload error:', uploadError)
        // Continue without screenshot if upload fails
      } else if (uploadData) {
        const { data: { publicUrl } } = supabase.storage
          .from('submission-screenshots')
          .getPublicUrl(uploadData.path)
        
        // Update the submission with screenshot URL
        await (supabase
          .from('challenge_submissions') as any)
          .update({ screenshots: [publicUrl] })
          .eq('id', submissionId)
      }
    }

    // If this was a new submission (not an update), record progress for the user on the learning path
    if (!isUpdate) {
      try {
        const challenge = await getChallengeById(challengeId)
        if (challenge) {
          const difficulty = challenge.difficulty // 'Beginner' | 'Intermediate' | 'Advanced'
          const pathId = difficulty.toLowerCase()

          // Count total challenges for this difficulty
          const { count } = await supabase
            .from('challenges')
            .select('id', { count: 'exact', head: true })
            .eq('difficulty', difficulty)

          const totalChallenges = (count as number) || 0

          // Get current profile to merge existing completedChallenges
          const currentProfile = await ProfileService.getProfile(user.id)
          const existingLP = (currentProfile && currentProfile.learningPaths) || {}
          const existingEntry = existingLP[pathId] || { started: true, progress: 0, completedChallenges: [] }

          const completedSet = new Set<string>(existingEntry.completedChallenges || [])
          completedSet.add(challengeId)
          const completedArr = Array.from(completedSet)

          const newProgress = totalChallenges > 0 ? Math.round((completedArr.length / totalChallenges) * 100) : 0

          const lpUpdate = {
            [pathId]: {
              started: true,
              progress: newProgress,
              completedChallenges: completedArr,
            },
          }

          // Persist via ProfileService (it merges learningPaths into social_links)
          await ProfileService.updateProfile(user.id, { learningPaths: lpUpdate })
        }
      } catch (err) {
        console.error('Failed to update learning path progress:', err)
        // Non-fatal; continue
      }
    }

    return {
      success: true,
      submissionId: submissionId,
      message: isUpdate ? 'Solution updated successfully' : 'Solution submitted successfully',
      isUpdate,
    } as const
  } catch (error) {
    console.error('Submit challenge solution error:', error)
    throw error
  }
}
