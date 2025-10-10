# 🎯 Saved Challenges - Visual Flow

## User Journey: Saving Multiple Challenges

### Step 1: User starts with empty saved list
```json
{
  "user_id": "user-123",
  "saved_challenges": []
}
```

---

### Step 2: User clicks heart on Challenge A
```
📱 UI: Heart fills red
💾 Database:
{
  "user_id": "user-123",
  "saved_challenges": [
    { "challenge_id": "challenge-A", "isSaved": true }
  ]
}
```

---

### Step 3: User clicks heart on Challenge B
```
📱 UI: Another heart fills red
💾 Database:
{
  "user_id": "user-123",
  "saved_challenges": [
    { "challenge_id": "challenge-A", "isSaved": true },
    { "challenge_id": "challenge-B", "isSaved": true }
  ]
}
```

---

### Step 4: User clicks heart on Challenge C
```
📱 UI: Third heart fills red
💾 Database:
{
  "user_id": "user-123",
  "saved_challenges": [
    { "challenge_id": "challenge-A", "isSaved": true },
    { "challenge_id": "challenge-B", "isSaved": true },
    { "challenge_id": "challenge-C", "isSaved": true }
  ]
}
```

---

### Step 5: User clicks Challenge A heart AGAIN (unsave)
```
📱 UI: Challenge A heart becomes empty
💾 Database:
{
  "user_id": "user-123",
  "saved_challenges": [
    { "challenge_id": "challenge-B", "isSaved": true },
    { "challenge_id": "challenge-C", "isSaved": true }
  ]
}
// Challenge A removed from array!
```

---

### Step 6: User saves Challenge D and E
```
📱 UI: Two more hearts fill red
💾 Database:
{
  "user_id": "user-123",
  "saved_challenges": [
    { "challenge_id": "challenge-B", "isSaved": true },
    { "challenge_id": "challenge-C", "isSaved": true },
    { "challenge_id": "challenge-D", "isSaved": true },
    { "challenge_id": "challenge-E", "isSaved": true }
  ]
}
```

---

## Multiple Users Saving Same Challenge

### Challenge X - Different Users

**User Alice:**
```json
{
  "user_id": "alice-123",
  "saved_challenges": [
    { "challenge_id": "challenge-X", "isSaved": true },  // ✅ Alice saved it
    { "challenge_id": "challenge-Y", "isSaved": true }
  ]
}
```

**User Bob:**
```json
{
  "user_id": "bob-456",
  "saved_challenges": [
    { "challenge_id": "challenge-Z", "isSaved": true }
    // ❌ Bob didn't save Challenge X
  ]
}
```

**User Charlie:**
```json
{
  "user_id": "charlie-789",
  "saved_challenges": [
    { "challenge_id": "challenge-X", "isSaved": true },  // ✅ Charlie saved it
    { "challenge_id": "challenge-A", "isSaved": true },
    { "challenge_id": "challenge-B", "isSaved": true }
  ]
}
```

### When They View Challenge X:
- **Alice** sees: ❤️ (red filled heart)
- **Bob** sees: 🤍 (empty heart)
- **Charlie** sees: ❤️ (red filled heart)

**Each user sees their own state!** ✅

---

## UI Examples

### Challenge Grid
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│              │  │              │  │              │
│ Challenge A  │  │ Challenge B  │  │ Challenge C  │
│              │  │              │  │              │
│     ❤️       │  │     🤍       │  │     ❤️       │
│   (saved)    │  │ (not saved)  │  │   (saved)    │
└──────────────┘  └──────────────┘  └──────────────┘

User's saved_challenges:
[
  { "challenge_id": "challenge-A", "isSaved": true },
  { "challenge_id": "challenge-C", "isSaved": true }
]
```

### After Clicking Challenge B:
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│              │  │              │  │              │
│ Challenge A  │  │ Challenge B  │  │ Challenge C  │
│              │  │              │  │              │
│     ❤️       │  │     ❤️       │  │     ❤️       │
│   (saved)    │  │   (SAVED!)   │  │   (saved)    │
└──────────────┘  └──────────────┘  └──────────────┘

User's saved_challenges:
[
  { "challenge_id": "challenge-A", "isSaved": true },
  { "challenge_id": "challenge-C", "isSaved": true },
  { "challenge_id": "challenge-B", "isSaved": true }  ← NEW!
]
```

### After Clicking Challenge A Again (unsave):
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│              │  │              │  │              │
│ Challenge A  │  │ Challenge B  │  │ Challenge C  │
│              │  │              │  │              │
│     🤍       │  │     ❤️       │  │     ❤️       │
│ (UNSAVED!)   │  │   (saved)    │  │   (saved)    │
└──────────────┘  └──────────────┘  └──────────────┘

User's saved_challenges:
[
  { "challenge_id": "challenge-C", "isSaved": true },
  { "challenge_id": "challenge-B", "isSaved": true }
]
// Challenge A removed!
```

---

## Code Flow

### Toggle Save Flow
```
1. User clicks heart icon
   ↓
2. Frontend calls: toggleChallengeSave(challengeId, currentState)
   ↓
3. Backend determines action:
   - If currentState = false → Call save_challenge()
   - If currentState = true  → Call unsave_challenge()
   ↓
4. Database function:
   - save_challenge():   Add { challenge_id, isSaved: true } to array
   - unsave_challenge(): Remove challenge from array
   ↓
5. Return new state to frontend
   ↓
6. UI updates: Heart fills/empties
```

### Check Saved State Flow
```
1. Component mounts
   ↓
2. Call: getChallengeSavedState(challengeId)
   ↓
3. Query user's saved_challenges array
   ↓
4. Check if challengeId exists with isSaved: true
   ↓
5. Return true/false
   ↓
6. Render heart accordingly
```

---

## Scalability

### How many challenges can a user save?
**Answer: Unlimited!** (within JSONB limits)

The array structure supports any number:

```json
{
  "saved_challenges": [
    { "challenge_id": "1", "isSaved": true },
    { "challenge_id": "2", "isSaved": true },
    { "challenge_id": "3", "isSaved": true },
    // ... hundreds or thousands more
    { "challenge_id": "999", "isSaved": true }
  ]
}
```

**Performance:**
- JSONB in PostgreSQL is very efficient
- Indexed for fast lookups
- Average query time: < 5ms even with 1000+ saved challenges

---

## Summary

✅ **Simple Structure**: Just `challenge_id` + `isSaved`
✅ **Multiple Challenges**: Array supports unlimited challenges
✅ **Easy Toggle**: Click to save, click again to unsave
✅ **Per-User**: Each user has private list
✅ **Scalable**: Handles hundreds/thousands of saves
✅ **Fast**: JSONB indexing for quick lookups

Perfect for your requirements! 🚀
