#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL) {
  console.error('Set SUPABASE_URL in your environment')
  process.exit(1)
}

const key = SUPABASE_SERVICE_ROLE || SUPABASE_ANON_KEY
if (!key) {
  console.error('Set SUPABASE_SERVICE_ROLE or SUPABASE_ANON_KEY in your environment')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, key)

// Read payload from a sibling file if present, otherwise use an embedded sample
const payloadPath = path.join(process.cwd(), 'scripts', 'resources-payload.json')
let payload
if (fs.existsSync(payloadPath)) {
  payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'))
} else {
  // Minimal example - user can replace with their full JSON
  payload = {
    docs: [],
    videos: [],
    tools: [],
  }
}

async function main() {
  // Check for existing row
  const { data: existing, error: fetchErr } = await supabase.from('resources').select('id').limit(1).maybeSingle()
  if (fetchErr) {
    console.error('Error checking resources table:', fetchErr)
    process.exit(1)
  }

  if (existing && existing.id) {
    const { error: updErr } = await supabase.from('resources').update(payload).eq('id', existing.id)
    if (updErr) {
      console.error('Update error:', updErr)
      process.exit(1)
    }
    console.log('Updated existing resources row')
  } else {
    const { error: insErr } = await supabase.from('resources').insert(payload)
    if (insErr) {
      console.error('Insert error:', insErr)
      process.exit(1)
    }
    console.log('Inserted resources row')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
