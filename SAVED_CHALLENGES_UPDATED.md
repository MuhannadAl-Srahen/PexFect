# ✅ UPDATED: Saved Challenges System

## New Data Structure

### Format:
```json
// profiles.saved_challenges
[
  { "challenge_id": "uuid-1", "isSaved": true },
  { "challenge_id": "uuid-2", "isSaved": true },
  { "challenge_id": "uuid-3", "isSaved": true }
]
```

### Benefits:
- ✅ **Simple**: Just `challenge_id` and `isSaved`
- ✅ **Multiple challenges**: Array supports any number
- ✅ **Toggle-friendly**: Click again → `isSaved: false` → remove from array
- ✅ **Per-user**: Each user has their own list

---

## How It Works

### 1. User Clicks Heart (Save)
```
saved_challenges: []  →  [{ "challenge_id": "abc", "isSaved": true }]
```

### 2. User Saves Another Challenge
```
[{ "challenge_id": "abc", "isSaved": true }]
↓
[
  { "challenge_id": "abc", "isSaved": true },
  { "challenge_id": "xyz", "isSaved": true }
]
```

### 3. User Clicks Heart Again (Unsave)
```
[
  { "challenge_id": "abc", "isSaved": true },
  { "challenge_id": "xyz", "isSaved": true }
]
↓
[{ "challenge_id": "xyz", "isSaved": true }]  // abc removed
```

---

## Database Functions

### `save_challenge(user_id, challenge_id)`
Adds challenge with `isSaved: true`:
```sql
SELECT public.save_challenge(
  'user-uuid',
  'challenge-uuid'
);
```

### `unsave_challenge(user_id, challenge_id)`
Removes challenge from array:
```sql
SELECT public.unsave_challenge(
  'user-uuid',
  'challenge-uuid'
);
```

### `is_challenge_saved(user_id, challenge_id)`
Checks if challenge is in user's saved list:
```sql
SELECT public.is_challenge_saved(
  'user-uuid',
  'challenge-uuid'
);
-- Returns: true or false
```

### `get_saved_challenges(user_id)`
Gets all saved challenges with details:
```sql
SELECT * FROM public.get_saved_challenges('user-uuid');
```

Returns:
```
challenge_id | is_saved | title      | difficulty | thumbnail_url | tags
-------------|----------|------------|------------|---------------|------
uuid-1       | true     | Challenge1 | Beginner   | url1          | {css}
uuid-2       | true     | Challenge2 | Advanced   | url2          | {js,react}
```

---

## Frontend Usage

### Toggle Save/Unsave
```tsx
import { toggleChallengeSave } from '@/services/challenges/lib';

function SaveButton({ challengeId, isSaved }) {
  const [saved, setSaved] = useState(isSaved);

  async function handleClick() {
    const newState = await toggleChallengeSave(challengeId, saved);
    if (newState !== null) {
      setSaved(newState);
    }
  }

  return (
    <button onClick={handleClick}>
      <Heart className={saved ? 'fill-red-500' : 'text-gray-400'} />
    </button>
  );
}
```

### Check if Saved
```tsx
import { getChallengeSavedState } from '@/services/challenges/lib';

useEffect(() => {
  getChallengeSavedState(challengeId).then(setIsSaved);
}, [challengeId]);
```

### Get All Saved Challenges
```tsx
import { getSavedChallenges } from '@/services/challenges/lib';

const savedIds = await getSavedChallenges();
// Returns: ['uuid-1', 'uuid-2', 'uuid-3']
```

---

## Multi-User Example

### User Alice:
```json
{
  "id": "alice-123",
  "saved_challenges": [
    { "challenge_id": "challenge-A", "isSaved": true },
    { "challenge_id": "challenge-C", "isSaved": true }
  ]
}
```

### User Bob:
```json
{
  "id": "bob-456",
  "saved_challenges": [
    { "challenge_id": "challenge-B", "isSaved": true },
    { "challenge_id": "challenge-D", "isSaved": true },
    { "challenge_id": "challenge-E", "isSaved": true }
  ]
}
```

**Result**: Alice has 2 saved, Bob has 3 saved - completely independent! ✅

---

## Migration Steps

### 1. Run SQL Migration
```bash
# Open Supabase Dashboard → SQL Editor
# Run: FIX_SAVED_CHALLENGES.sql
```

This will:
- Remove `issaved` column from `challenges` table
- Create database functions
- Set up permissions

### 2. Refresh Your App
```bash
# Hard refresh
Ctrl + Shift + R
```

### 3. Test
- Click heart on Challenge 1 → Saved ✅
- Click heart on Challenge 2 → Saved ✅
- Click heart on Challenge 3 → Saved ✅
- Click heart on Challenge 1 again → Unsaved ✅
- Refresh page → Challenge 2 & 3 still saved ✅

---

## API Reference

### TypeScript Interface
```typescript
interface SavedChallenge {
  challenge_id: string;
  isSaved: boolean;
  title?: string;
  difficulty?: string;
  thumbnail_url?: string;
  tags?: string[];
}
```

### Functions
```typescript
// Toggle save state
toggleChallengeSave(challengeId: string, currentState: boolean): Promise<boolean | null>

// Check if saved
getChallengeSavedState(challengeId: string): Promise<boolean | null>

// Get all saved IDs
getSavedChallenges(): Promise<string[]>

// From savedChallenges.ts (more features)
isChallengeeSaved(challengeId: string): Promise<boolean>
saveChallenge(challengeId: string): Promise<any>
unsaveChallenge(challengeId: string): Promise<any>
getSavedChallenges(): Promise<SavedChallenge[]>
getSavedChallengeIds(): Promise<string[]>
```

---

## Summary

### Old System:
```json
// ❌ Global in challenges table
{ "id": "challenge-1", "issaved": true }
```

### New System:
```json
// ✅ Per-user in profiles table
{
  "user_id": "alice-123",
  "saved_challenges": [
    { "challenge_id": "challenge-1", "isSaved": true },
    { "challenge_id": "challenge-2", "isSaved": true }
  ]
}
```

**Features:**
- ✅ Simple structure: just `challenge_id` + `isSaved`
- ✅ Supports any number of challenges
- ✅ Easy toggle: click to save, click again to unsave
- ✅ Private: each user has their own list
- ✅ Fast: JSONB indexing for quick lookups

Perfect for your use case! 🎯
