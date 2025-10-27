// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Log presence of env values (do not print the key). This helps debugging when
// running the app to ensure vite has loaded .env values.
console.debug('[supabaseClient] SUPABASE_URL present:', Boolean(SUPABASE_URL))
console.debug('[supabaseClient] SUPABASE_KEY present:', Boolean(SUPABASE_KEY))

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'x-client-info': 'pexfect-web',
    },
  },
  db: {
    schema: 'public',
  },
  // Add timeout and retry configuration
})

export async function signInWithGitHub() {
  // Clear existing Supabase session
  await supabase.auth.signOut()

  // Allowlist of permitted origins to prevent open redirect vulnerabilities
  const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://pexfect.vercel.app',
    import.meta.env.VITE_APP_URL, // Production URL from env
  ].filter(Boolean) // Remove undefined values

  const currentOrigin = window.location.origin

  // Validate the origin against the allowlist
  if (!ALLOWED_ORIGINS.includes(currentOrigin)) {
    console.error('Unauthorized origin detected:', currentOrigin)
    throw new Error('Authentication not allowed from this domain')
  }

  // Redirect to GitHub OAuth with validated origin
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: currentOrigin,
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
