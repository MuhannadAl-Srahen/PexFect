# 🎯 Quick Start: Fix Saved Challenges

## The Problem
`isSaved` is in `challenges` table → **GLOBAL** for all users ❌

When User A saves a challenge, User B also sees it as saved!

---

## The Solution
Move to `profiles.saved_challenges` → **PER USER** ✅

Each user has their own private saved list!

---

## Step 1: Run SQL Migration

1. Open **Supabase Dashboard** → **SQL Editor**
2. Copy and run `FIX_SAVED_CHALLENGES.sql`
3. This will:
   - Remove `issaved` column from `challenges` table
   - Create helper functions for saving/unsaving
   - Set up proper permissions

---

## Step 2: Use in Your Components

### Save Button Example

```tsx
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { isChallengeeSaved, toggleChallengeSave } from '@/lib';

export function SaveButton({ challengeId }: { challengeId: string }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    isChallengeeSaved(challengeId).then(setIsSaved);
  }, [challengeId]);

  async function handleClick() {
    await toggleChallengeSave(challengeId);
    setIsSaved(!isSaved);
  }

  return (
    <button onClick={handleClick}>
      <Heart className={isSaved ? 'fill-red-500' : 'text-gray-400'} />
    </button>
  );
}
```

### Show Saved Challenges

```tsx
import { useQuery } from '@tanstack/react-query';
import { getSavedChallenges } from '@/lib';

export function SavedPage() {
  const { data: saved } = useQuery({
    queryKey: ['saved'],
    queryFn: getSavedChallenges,
  });

  return (
    <div>
      <h1>My Saved Challenges ({saved?.length || 0})</h1>
      {saved?.map(c => (
        <ChallengeCard key={c.challenge_id} {...c} />
      ))}
    </div>
  );
}
```

---

## Available Functions

```typescript
// From '@/lib'
isChallengeeSaved(id)      // Check if saved
saveChallenge(id)          // Save it
unsaveChallenge(id)        // Unsave it
toggleChallengeSave(id)    // Toggle state
getSavedChallenges()       // Get all saved (with details)
getSavedChallengeIds()     // Get just IDs (fast)
```

---

## Data Structure

```json
// profiles.saved_challenges
[
  {
    "challenge_id": "uuid-1",
    "saved_at": "2025-10-10T14:23:45+00"
  },
  {
    "challenge_id": "uuid-2",
    "saved_at": "2025-10-10T15:30:00+00"
  }
]
```

---

## Testing

1. ✅ Run migration
2. ✅ Click save button → heart fills red
3. ✅ Refresh page → heart stays red
4. ✅ Log in as different user → heart is empty (not saved)
5. ✅ Go to saved page → see your saved challenges

---

## Files Created

1. `FIX_SAVED_CHALLENGES.sql` - Database migration
2. `src/lib/savedChallenges.ts` - Helper functions
3. `SAVED_CHALLENGES_GUIDE.md` - Full documentation

---

## What Changed?

**Before:**
```sql
challenges {
  id
  title
  issaved  ❌ Global!
}
```

**After:**
```sql
challenges {
  id
  title
  -- no issaved!
}

profiles {
  id
  saved_challenges  ✅ Per user!
}
```

---

## Result

✅ Each user has their own saved list
✅ Private - users can't see others' saves
✅ Fast - JSONB indexing
✅ Flexible - easy to add notes, tags, etc.

---

Need help? Check `SAVED_CHALLENGES_GUIDE.md` for detailed examples!
