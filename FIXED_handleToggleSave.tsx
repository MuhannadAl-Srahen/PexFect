// COPY THIS AND REPLACE LINES 93-145 in src/routes/challenges/index.tsx

  const handleToggleSave = async (challengeId: string) => {
    try {
      console.log('[handleToggleSave] 🔄 Starting toggle for:', challengeId)
      console.log('[handleToggleSave] 📌 Current saved array BEFORE:', savedChallenges)
      
      // Get current state
      const currentSavedState = savedChallenges.includes(challengeId)
      console.log('[handleToggleSave] 📌 Is currently saved?', currentSavedState ? 'YES' : 'NO')
      
      // Call database directly - NO optimistic update to avoid state conflicts
      console.log('[handleToggleSave] 💾 Calling database function...')
      const freshSavedIds = await toggleChallengeSave(challengeId, currentSavedState)
      console.log('[handleToggleSave] 📦 Database response:', freshSavedIds)
      
      if (freshSavedIds === null) {
        // Database update failed
        console.error('[handleToggleSave] ❌ Database update FAILED')
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
        console.log('[handleToggleSave] 📌 Current saved array AFTER:', freshSavedIds)
      }
    } catch (error) {
      console.error('[handleToggleSave] ❌ EXCEPTION:', error)
      console.error('[handleToggleSave] Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      })
    }
  }

// KEY CHANGES:
// 1. REMOVED optimistic update completely
// 2. Wait for database response first
// 3. Only update state AFTER database succeeds
// 4. No more trying to revert with stale closure variables
// 5. Database response IS the source of truth
