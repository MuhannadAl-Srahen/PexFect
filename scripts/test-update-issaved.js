// Quick test script to verify UPDATE permissions work on challenges.issaved
// Run this in browser console to test database UPDATE capability

import { supabase } from '../src/lib/supabaseClient.js'

async function testUpdateIsSaved() {
  console.log('=== Testing UPDATE on challenges.issaved ===')
  
  // 1. Get first challenge
  const { data: challenges, error: fetchError } = await supabase
    .from('challenges')
    .select('id, title, issaved')
    .limit(1)
    .single()
  
  if (fetchError) {
    console.error('❌ Failed to fetch challenge:', fetchError)
    return
  }
  
  console.log('✅ Fetched challenge:', challenges)
  console.log('Current issaved value:', challenges.issaved)
  
  // 2. Toggle issaved
  const newValue = !challenges.issaved
  console.log('Attempting to update issaved to:', newValue)
  
  const { data: updated, error: updateError } = await supabase
    .from('challenges')
    .update({ issaved: newValue })
    .eq('id', challenges.id)
    .select('issaved')
    .single()
  
  if (updateError) {
    console.error('❌ Failed to update:', updateError)
    console.error('Error details:', {
      code: updateError.code,
      message: updateError.message,
      details: updateError.details,
      hint: updateError.hint
    })
    return
  }
  
  console.log('✅ Successfully updated to:', updated)
  console.log('=== Test Complete ===')
}

// Run test
testUpdateIsSaved()
