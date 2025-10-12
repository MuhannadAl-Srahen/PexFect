-- =====================================================
-- DEBUG: Test Save/Unsave with Detailed Logging
-- =====================================================

-- Step 1: Clear your saved challenges to start fresh
UPDATE profiles 
SET saved_challenges = '[]'::jsonb 
WHERE id = auth.uid();

SELECT 'Step 1: Cleared saved_challenges' as status;

-- Verify cleared
SELECT 
  'After Clear' as step,
  saved_challenges,
  jsonb_array_length(saved_challenges) as count
FROM profiles 
WHERE id = auth.uid();

-- =====================================================
-- Step 2: Test SAVE - Add Challenge A
-- =====================================================

SELECT 'Step 2: Saving Challenge A' as status;

SELECT public.save_challenge(
  auth.uid(),
  '626f8cf2-8924-411b-84d4-285799e77f53'::uuid
);

-- Check database immediately
SELECT 
  'After Save A' as step,
  saved_challenges,
  jsonb_array_length(saved_challenges) as count
FROM profiles 
WHERE id = auth.uid();

-- =====================================================
-- Step 3: Test SAVE - Add Challenge B
-- =====================================================

SELECT 'Step 3: Saving Challenge B' as status;

SELECT public.save_challenge(
  auth.uid(),
  '01ced4a5-9cf4-45eb-a3fe-fd5380848969'::uuid
);

-- Check database immediately
SELECT 
  'After Save B' as step,
  saved_challenges,
  jsonb_array_length(saved_challenges) as count
FROM profiles 
WHERE id = auth.uid();

-- =====================================================
-- Step 4: Test SAVE - Add Challenge C
-- =====================================================

SELECT 'Step 4: Saving Challenge C' as status;

SELECT public.save_challenge(
  auth.uid(),
  'bc1a2fc3-539b-4712-87e5-3d4a8f4b1001'::uuid
);

-- Check database immediately
SELECT 
  'After Save C' as step,
  saved_challenges,
  jsonb_array_length(saved_challenges) as count
FROM profiles 
WHERE id = auth.uid();

-- Expected: count = 3

-- =====================================================
-- Step 5: Test UNSAVE - Remove Challenge B (middle)
-- =====================================================

SELECT 'Step 5: Unsaving Challenge B' as status;

SELECT public.unsave_challenge(
  auth.uid(),
  '01ced4a5-9cf4-45eb-a3fe-fd5380848969'::uuid
);

-- Check database immediately - B should be GONE!
SELECT 
  'After Unsave B' as step,
  saved_challenges,
  jsonb_array_length(saved_challenges) as count
FROM profiles 
WHERE id = auth.uid();

-- Expected: count = 2 (only A and C remain)

-- =====================================================
-- Step 6: Verify Challenge B is Really Gone
-- =====================================================

SELECT 'Step 6: Verifying B is gone' as status;

-- This should return FALSE
SELECT public.is_challenge_saved(
  auth.uid(),
  '01ced4a5-9cf4-45eb-a3fe-fd5380848969'::uuid
) as "Challenge B is saved?";

-- This should return TRUE
SELECT public.is_challenge_saved(
  auth.uid(),
  '626f8cf2-8924-411b-84d4-285799e77f53'::uuid
) as "Challenge A is saved?";

-- This should return TRUE
SELECT public.is_challenge_saved(
  auth.uid(),
  'bc1a2fc3-539b-4712-87e5-3d4a8f4b1001'::uuid
) as "Challenge C is saved?";

-- =====================================================
-- Step 7: Test UNSAVE - Remove All Remaining
-- =====================================================

SELECT 'Step 7: Unsaving Challenge A' as status;

SELECT public.unsave_challenge(
  auth.uid(),
  '626f8cf2-8924-411b-84d4-285799e77f53'::uuid
);

SELECT 'Step 8: Unsaving Challenge C' as status;

SELECT public.unsave_challenge(
  auth.uid(),
  'bc1a2fc3-539b-4712-87e5-3d4a8f4b1001'::uuid
);

-- Check database - should be empty!
SELECT 
  'After Unsave All' as step,
  saved_challenges,
  jsonb_array_length(saved_challenges) as count
FROM profiles 
WHERE id = auth.uid();

-- Expected: count = 0, saved_challenges = []

-- =====================================================
-- SUMMARY: What to Look For
-- =====================================================

-- ✅ After Save A: count = 1
-- ✅ After Save B: count = 2
-- ✅ After Save C: count = 3
-- ✅ After Unsave B: count = 2 (B removed!)
-- ✅ is_challenge_saved(B): FALSE
-- ✅ is_challenge_saved(A): TRUE
-- ✅ is_challenge_saved(C): TRUE
-- ✅ After Unsave All: count = 0

-- Also check the NOTICE messages in the logs panel!
-- They will show:
-- NOTICE: Current saved challenges: [...]
-- NOTICE: Trying to remove challenge_id: ...
-- NOTICE: New saved challenges: [...]
-- NOTICE: Rows updated: 1

-- If "Rows updated: 0" → The UPDATE didn't work!
-- If count doesn't change → The function isn't working!
