// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase environment variables')
}

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

  if (error) console.error('Failed to sign in with GitHub:', error)
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Failed to sign out:', error)
}
