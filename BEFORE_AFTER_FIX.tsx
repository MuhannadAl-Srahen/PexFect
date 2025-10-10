// ===== BEFORE (Current - BUGGY) =====
const handleToggleSave = async (challengeId: string) => {
  try {
    console.log('[handleToggleSave] 🔄 Starting toggle for:', challengeId)
    
    const currentSavedState = savedChallenges.includes(challengeId)
    console.log('[handleToggleSave] 📌 Current saved state:', currentSavedState)
    
    // 🔴 DELETE THIS BLOCK - causes state conflicts!
    const optimisticUpdate = currentSavedState
      ? savedChallenges.filter((id) => id !== challengeId)
      : [...savedChallenges, challengeId]
    
    setSavedChallenges(optimisticUpdate)
    console.log('[handleToggleSave] ⚡ Optimistic UI update applied')
    // 🔴 END DELETE

    console.log('[handleToggleSave] 💾 Calling database function...')
    const freshSavedIds = await toggleChallengeSave(challengeId, currentSavedState)
    console.log('[handleToggleSave] 📦 Database response:', freshSavedIds)
    
    if (freshSavedIds === null) {
      console.error('[handleToggleSave] ❌ Database update FAILED - reverting UI')
      setSavedChallenges(savedChallenges)  // 🔴 DELETE THIS LINE - uses stale value!
    } else {
      console.log('[handleToggleSave] ✅ Database update SUCCESS')
      console.log('[handleToggleSave] � Fresh data received:', freshSavedIds.length, 'challenges')
      
      setSavedChallenges(freshSavedIds)
      
      setAllChallenges((prev) =>
        prev.map((c) => ({
          ...c,
          isSaved: freshSavedIds.includes(c.id)
        }))
      )
      console.log('[handleToggleSave] ✅ All state synchronized instantly!')
    }
  } catch (error) {
    console.error('[handleToggleSave] ❌ EXCEPTION:', error)
    console.error('[handleToggleSave] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })
    setSavedChallenges(savedChallenges)  // 🔴 DELETE THIS LINE - uses stale value!
  }
}

// ===== AFTER (Fixed - WORKING) =====
const handleToggleSave = async (challengeId: string) => {
  try {
    console.log('[handleToggleSave] 🔄 Starting toggle for:', challengeId)
    
    const currentSavedState = savedChallenges.includes(challengeId)
    console.log('[handleToggleSave] 📌 Current saved state:', currentSavedState)
    
    // ✅ Call database directly - wait for response
    console.log('[handleToggleSave] 💾 Calling database function...')
    const freshSavedIds = await toggleChallengeSave(challengeId, currentSavedState)
    console.log('[handleToggleSave] 📦 Database response:', freshSavedIds)
    
    if (freshSavedIds === null) {
      console.error('[handleToggleSave] ❌ Database update FAILED')
      // ✅ Just log error - don't try to revert since we never optimistically updated!
    } else {
      console.log('[handleToggleSave] ✅ Database update SUCCESS')
      console.log('[handleToggleSave] 📥 Fresh data received:', freshSavedIds.length, 'challenges')
      
      // ✅ Update state with database response (single source of truth)
      setSavedChallenges(freshSavedIds)
      
      setAllChallenges((prev) =>
        prev.map((c) => ({
          ...c,
          isSaved: freshSavedIds.includes(c.id)
        }))
      )
      console.log('[handleToggleSave] ✅ All state synchronized!')
    }
  } catch (error) {
    console.error('[handleToggleSave] ❌ EXCEPTION:', error)
    console.error('[handleToggleSave] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })
    // ✅ Just log - no revert needed!
  }
}
