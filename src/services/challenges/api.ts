import type { Challenge } from '@/types'
import { getChallengeDetails } from './lib/getChallengeDetails'
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

    // Insert the submission into the database first (without screenshot)
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

    const submissionId = (data as { id: string }).id

    // Handle screenshot upload if provided (after we have submission ID)
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

    return {
      success: true,
      submissionId: submissionId,
      message: 'Solution submitted successfully',
    } as const
  } catch (error) {
    console.error('Submit challenge solution error:', error)
    throw error
  }
}
