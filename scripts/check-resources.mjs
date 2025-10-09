#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Set SUPABASE_URL and SUPABASE_ANON_KEY in your environment')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function main() {
  const { data, error } = await supabase.from('resources').select('docs, videos, tools').limit(1).maybeSingle()
  if (error) {
    console.error('Error fetching resources:', error)
    process.exit(1)
  }

  if (!data) {
    console.log('No resources row found (table may be empty)')
    process.exit(0)
  }

  console.log('Resources row:')
  console.log(JSON.stringify(data, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
