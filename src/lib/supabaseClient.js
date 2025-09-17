// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wtskvwjjmmsdqoewzndp.supabase.co'
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0c2t2d2pqbW1zZHFvZXd6bmRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2OTI3NjYsImV4cCI6MjA3MTI2ODc2Nn0.YWHt9325fEWRp1pHfIA7BKo3HDEXEnhF2IwE_Ic6qFQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export async function signInWithGitHub() {
  // Clear existing Supabase session
  await supabase.auth.signOut()

  // Redirect to GitHub OAuth with prompt
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      queryParams: {
        prompt: 'select_account', // force GitHub to show account chooser
      },
    },
  })

  if (error) console.error(error)
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) console.error(error)
}
