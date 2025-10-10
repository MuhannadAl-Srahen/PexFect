// FIXED VERSION OF handleToggleSave
// Replace the existing handleToggleSave function in src/routes/challenges/index.tsx with this:

const handleToggleSave = async (challengeId: string) => {
  // Store original state for potential revert
  const originalSavedState = [...savedChallenges]
  
  try {
    console.log('[handleToggleSave] 🔄 Starting toggle for:', challengeId)
    console.log('[handleToggleSave] 📌 Original saved array:', originalSavedState)
    
    // Get current state
    const currentSavedState = savedChallenges.includes(challengeId)
    console.log('[handleToggleSave] 📌 Current saved state:', currentSavedState ? 'SAVED' : 'NOT SAVED')
    
    // Optimistic UI update (instant feedback)
    const optimisticUpdate = currentSavedState
      ? savedChallenges.filter((id) => id !== challengeId)
      : [...savedChallenges, challengeId]
    
    console.log('[handleToggleSave] ⚡ Applying optimistic update...')
    setSavedChallenges(optimisticUpdate)

    // Update in database - now returns the full saved array directly
    console.log('[handleToggleSave] 💾 Calling database function...')
    const freshSavedIds = await toggleChallengeSave(challengeId, currentSavedState)
    console.log('[handleToggleSave] 📦 Database response:', freshSavedIds)
    
    if (freshSavedIds === null) {
      // Database update failed - revert to original
      console.error('[handleToggleSave] ❌ Database update FAILED - reverting UI')
      setSavedChallenges(originalSavedState)
      
      setAllChallenges((prev) =>
        prev.map((c) => ({
          ...c,
          isSaved: originalSavedState.includes(c.id)
        }))
      )
    } else {
      // Database update succeeded - use the returned array directly
      console.log('[handleToggleSave] ✅ Database update SUCCESS')
      console.log('[handleToggleSave] 📥 Fresh data received:', freshSavedIds.length, 'challenges')
      console.log('[handleToggleSave] 📥 Fresh IDs:', freshSavedIds)
      
      // Update state with the fresh data from database
      setSavedChallenges(freshSavedIds)
      
      // Also update allChallenges to keep everything in sync
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
    // Revert to original state on any error
    console.log('[handleToggleSave] 🔄 Reverting to original state due to exception')
    setSavedChallenges(originalSavedState)
    
    setAllChallenges((prev) =>
      prev.map((c) => ({
        ...c,
        isSaved: originalSavedState.includes(c.id)
      }))
    )
  }
}

// KEY CHANGES:
// 1. Store original state at the START (before any updates)
// 2. Revert uses originalSavedState (not the closure variable savedChallenges which might be stale)
// 3. Better logging to see what's happening
// 4. Sync allChallenges on both success AND revert
