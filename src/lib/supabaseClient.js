// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Vite exposes env vars on import.meta.env. Some setups (or plugins) also
// expose a `local` namespace for .env.local values. Support both patterns
// and fall back to runtime-injected globals (window.__ENV, window._env_,
// direct window.VITE_* names) and meta tags. This makes the app more
// resilient when running a built bundle where envs may be provided at
// runtime by the hosting platform.
function readMeta(name) {
  try {
    const el = typeof document !== 'undefined' && document.querySelector(`meta[name="${name}"]`)
    return el ? el.getAttribute('content') : null
  } catch (e) {
    return null
  }
}

const env = (typeof import.meta !== 'undefined' && import.meta.env) || {}

const SUPABASE_URL =
  (env && env.local && env.local.VITE_SUPABASE_URL) ||
  env.VITE_SUPABASE_URL ||
  (typeof window !== 'undefined' && window.__ENV && window.__ENV.VITE_SUPABASE_URL) ||
  (typeof window !== 'undefined' && window._env_ && window._env_.VITE_SUPABASE_URL) ||
  (typeof window !== 'undefined' && window.VITE_SUPABASE_URL) ||
  readMeta('VITE_SUPABASE_URL') ||
  null

const SUPABASE_KEY =
  (env && env.local && env.local.VITE_SUPABASE_ANON_KEY) ||
  env.VITE_SUPABASE_ANON_KEY ||
  (typeof window !== 'undefined' && window.__ENV && window.__ENV.VITE_SUPABASE_ANON_KEY) ||
  (typeof window !== 'undefined' && window._env_ && window._env_.VITE_SUPABASE_ANON_KEY) ||
  (typeof window !== 'undefined' && window.VITE_SUPABASE_ANON_KEY) ||
  readMeta('VITE_SUPABASE_ANON_KEY') ||
  null

// Log presence of env values (do not print the key). Use console.log so the
// messages are visible even if debug logs are filtered in the browser.
console.log('[supabaseClient] SUPABASE_URL present:', Boolean(SUPABASE_URL))
console.log('[supabaseClient] SUPABASE_KEY present:', Boolean(SUPABASE_KEY))
// Also log whether import.meta.env appears to contain our keys (without printing keys)
try {
  console.log('[supabaseClient] import.meta.env present:', Boolean(env && Object.keys(env).length > 0))
  console.log('[supabaseClient] import.meta.env.VITE_SUPABASE_URL present:', Boolean(env && env.VITE_SUPABASE_URL))
  console.log('[supabaseClient] import.meta.env.VITE_SUPABASE_ANON_KEY present:', Boolean(env && env.VITE_SUPABASE_ANON_KEY))
} catch (e) {
  // ignore
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
  // Provide a clearer message so the developer knows which env vars are required
  // and where we looked for them (helpful for debugging runtime deployments).
  const sources = []
  try {
    if (env && env.VITE_SUPABASE_URL) sources.push('import.meta.env.VITE_SUPABASE_URL')
    if (env && env.local && env.local.VITE_SUPABASE_URL) sources.push('import.meta.env.local.VITE_SUPABASE_URL')
  } catch (e) {}
  if (typeof window !== 'undefined') {
    if (window && window.__ENV && window.__ENV.VITE_SUPABASE_URL) sources.push('window.__ENV.VITE_SUPABASE_URL')
    if (window && window._env_ && window._env_.VITE_SUPABASE_URL) sources.push('window._env_.VITE_SUPABASE_URL')
    if (window && window.VITE_SUPABASE_URL) sources.push('window.VITE_SUPABASE_URL')
  }

  throw new Error(
    `Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment (e.g. .env.local). Checked sources: ${sources.join(', ') || 'none'}`
  )
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
