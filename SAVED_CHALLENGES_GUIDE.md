# Saved Challenges Implementation Guide

## Problem
The `isSaved` field was in the `challenges` table, making it global for all users. When one user saved a challenge, it appeared saved for everyone.

## Solution
Move saved challenges to `profiles.saved_challenges` as a JSONB array, making it **per-user**.

---

## 1. Database Migration

### Run `FIX_SAVED_CHALLENGES.sql` in Supabase SQL Editor

This migration will:
1. ✅ Remove `issaved` column from `challenges` table
2. ✅ Create 4 helper functions:
   - `is_challenge_saved(user_id, challenge_id)` - Check if saved
   - `save_challenge(user_id, challenge_id)` - Add to saved list
   - `unsave_challenge(user_id, challenge_id)` - Remove from saved list
   - `get_saved_challenges(user_id)` - Get all saved with details

### Data Structure
```json
// profiles.saved_challenges format:
[
  {
    "challenge_id": "uuid-here",
    "saved_at": "2025-10-10T14:23:45+00"
  },
  {
    "challenge_id": "another-uuid",
    "saved_at": "2025-10-10T15:30:00+00"
  }
]
```

---

## 2. Frontend Implementation

### Available Functions (from `src/lib/savedChallenges.ts`)

```typescript
import { 
  isChallengeeSaved,      // Check if saved
  saveChallenge,          // Save challenge
  unsaveChallenge,        // Unsave challenge
  toggleChallengeSave,    // Toggle saved state
  getSavedChallenges,     // Get all saved with details
  getSavedChallengeIds    // Get just IDs for quick lookup
} from '@/lib';
```

### Example: Heart Icon with Save/Unsave

```tsx
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { isChallengeeSaved, toggleChallengeSave } from '@/lib';

interface SaveButtonProps {
  challengeId: string;
}

export function SaveButton({ challengeId }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if already saved on mount
  useEffect(() => {
    async function checkSaved() {
      const saved = await isChallengeeSaved(challengeId);
      setIsSaved(saved);
    }
    checkSaved();
  }, [challengeId]);

  async function handleToggle() {
    try {
      setIsLoading(true);
      await toggleChallengeSave(challengeId);
      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Failed to toggle save:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className="p-2 rounded-full hover:bg-gray-100"
    >
      <Heart 
        className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
      />
    </button>
  );
}
```

### Example: Challenge Card with Save Button

```tsx
import { SaveButton } from './SaveButton';

interface ChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    difficulty: string;
    thumbnail_url: string;
  };
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <div className="challenge-card">
      <img src={challenge.thumbnail_url} alt={challenge.title} />
      <h3>{challenge.title}</h3>
      <span className="difficulty">{challenge.difficulty}</span>
      
      {/* Save button in corner */}
      <div className="absolute top-2 right-2">
        <SaveButton challengeId={challenge.id} />
      </div>
    </div>
  );
}
```

### Example: Saved Challenges Page

```tsx
import { useQuery } from '@tanstack/react-query';
import { getSavedChallenges } from '@/lib';
import { ChallengeCard } from '@/components/ChallengeCard';

export function SavedChallengesPage() {
  const { data: savedChallenges, isLoading } = useQuery({
    queryKey: ['saved-challenges'],
    queryFn: getSavedChallenges,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!savedChallenges || savedChallenges.length === 0) {
    return (
      <div className="empty-state">
        <Heart className="w-16 h-16 text-gray-300" />
        <h2>No saved challenges yet</h2>
        <p>Start saving challenges you want to complete later!</p>
      </div>
    );
  }

  return (
    <div className="saved-challenges">
      <h1>My Saved Challenges ({savedChallenges.length})</h1>
      <div className="grid grid-cols-3 gap-4">
        {savedChallenges.map(challenge => (
          <ChallengeCard 
            key={challenge.challenge_id}
            challenge={{
              id: challenge.challenge_id,
              title: challenge.title || 'Untitled',
              difficulty: challenge.difficulty || 'Unknown',
              thumbnail_url: challenge.thumbnail_url || '/placeholder.jpg',
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

### Example: Optimized Challenge List (Show Saved State)

```tsx
import { useQuery } from '@tanstack/react-query';
import { getSavedChallengeIds } from '@/lib';
import { supabase } from '@/lib/supabaseClient';

export function ChallengeList() {
  // Get all challenges
  const { data: challenges } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      const { data } = await supabase
        .from('challenges')
        .select('*')
        .order('created_at', { ascending: false });
      return data || [];
    },
  });

  // Get saved challenge IDs (fast lookup)
  const { data: savedIds = [] } = useQuery({
    queryKey: ['saved-challenge-ids'],
    queryFn: getSavedChallengeIds,
  });

  return (
    <div className="grid">
      {challenges?.map(challenge => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          isSaved={savedIds.includes(challenge.id)}
        />
      ))}
    </div>
  );
}
```

---

## 3. Query Invalidation

When saving/unsaving, invalidate queries to update UI:

```typescript
import { useQueryClient } from '@tanstack/react-query';

function useSaveChallenge() {
  const queryClient = useQueryClient();

  async function handleSave(challengeId: string) {
    await toggleChallengeSave(challengeId);
    
    // Refresh saved challenges list
    queryClient.invalidateQueries({ queryKey: ['saved-challenges'] });
    queryClient.invalidateQueries({ queryKey: ['saved-challenge-ids'] });
  }

  return handleSave;
}
```

---

## 4. Database Queries (Direct SQL)

If you need to query directly:

```sql
-- Check if user saved a challenge
SELECT public.is_challenge_saved(
  'user-uuid-here',
  'challenge-uuid-here'
);

-- Save a challenge
SELECT public.save_challenge(
  'user-uuid-here',
  'challenge-uuid-here'
);

-- Unsave a challenge
SELECT public.unsave_challenge(
  'user-uuid-here',
  'challenge-uuid-here'
);

-- Get all saved challenges with details
SELECT * FROM public.get_saved_challenges('user-uuid-here');

-- Raw query: Get saved challenge IDs only
SELECT saved_challenges 
FROM public.profiles 
WHERE id = 'user-uuid-here';
```

---

## 5. Benefits of This Approach

✅ **Per-User**: Each user has their own saved list
✅ **Efficient**: JSONB indexing for fast lookups
✅ **Flexible**: Easy to add metadata (saved_at, notes, etc.)
✅ **Type-Safe**: TypeScript interfaces provided
✅ **Scalable**: No junction table needed for simple saves

---

## 6. Testing Checklist

- [ ] Run `FIX_SAVED_CHALLENGES.sql` migration
- [ ] Verify `issaved` column removed from challenges table
- [ ] Test save button - heart icon fills when saved
- [ ] Test unsave button - heart icon empties
- [ ] Refresh page - saved state persists
- [ ] Multiple users - each has different saved challenges
- [ ] Saved challenges page shows correct list
- [ ] Query invalidation updates UI immediately

---

## 7. Future Enhancements

### Add Save Notes
```typescript
// Modify saved_challenges format:
[
  {
    "challenge_id": "uuid",
    "saved_at": "2025-10-10T14:23:45+00",
    "notes": "Want to try this with React",
    "priority": "high"
  }
]
```

### Add Collections
```typescript
// Group saved challenges:
[
  {
    "challenge_id": "uuid",
    "saved_at": "2025-10-10T14:23:45+00",
    "collection": "Weekend Projects"
  }
]
```

---

## Summary

**Before**: `challenges.issaved` (global, wrong ❌)
**After**: `profiles.saved_challenges` (per-user, correct ✅)

Each user now has their own private saved challenges list!
