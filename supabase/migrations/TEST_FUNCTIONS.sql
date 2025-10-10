-- =====================================================
-- VERIFY: Check if all functions exist and work
-- =====================================================

-- Test 1: Check if functions exist
SELECT 
  routine_name,
  routine_type,
  data_type as return_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN (
    'save_challenge',
    'unsave_challenge',
    'is_challenge_saved',
    'get_saved_challenges'
  )
ORDER BY routine_name;

-- Expected: 4 rows
-- If you see 0 or fewer than 4: Run FIX_SAVED_CHALLENGES.sql first!

-- Test 2: Check permissions
SELECT 
  routine_name,
  grantee,
  privilege_type
FROM information_schema.routine_privileges
WHERE routine_schema = 'public'
  AND routine_name IN (
    'save_challenge',
    'unsave_challenge',
    'is_challenge_saved',
    'get_saved_challenges'
  )
  AND grantee = 'authenticated'
ORDER BY routine_name;

-- Expected: 4 rows with EXECUTE permission
-- If you see 0: Functions don't have proper permissions!

-- Test 3: Clear your saved_challenges
UPDATE profiles 
SET saved_challenges = '[]'::jsonb 
WHERE id = auth.uid();

-- Verify cleared
SELECT saved_challenges FROM profiles WHERE id = auth.uid();
-- Should show: []

-- Test 4: Try to save a challenge manually
SELECT public.save_challenge(
  auth.uid(),
  '626f8cf2-8924-411b-84d4-285799e77f53'::uuid
);

-- Expected result:
-- {"success": true, "saved_challenges": [{"isSaved": true, "challenge_id": "626f8cf2-8924-411b-84d4-285799e77f53"}]}

-- If you get an error, copy the EXACT error message!

-- Test 5: Check what's in the database now
SELECT 
  saved_challenges,
  jsonb_array_length(saved_challenges) as count
FROM profiles 
WHERE id = auth.uid();

-- Expected: count = 1

-- Test 6: Save another challenge
SELECT public.save_challenge(
  auth.uid(),
  '01ced4a5-9cf4-45eb-a3fe-fd5380848969'::uuid
);

-- Test 7: Check count increased
SELECT 
  saved_challenges,
  jsonb_array_length(saved_challenges) as count
FROM profiles 
WHERE id = auth.uid();

-- Expected: count = 2

-- Test 8: Unsave first challenge
SELECT public.unsave_challenge(
  auth.uid(),
  '626f8cf2-8924-411b-84d4-285799e77f53'::uuid
);

-- Test 9: Verify removed
SELECT 
  saved_challenges,
  jsonb_array_length(saved_challenges) as count
FROM profiles 
WHERE id = auth.uid();

-- Expected: count = 1 (only second challenge remains)

-- Test 10: Check is_challenge_saved
SELECT public.is_challenge_saved(
  auth.uid(),
  '01ced4a5-9cf4-45eb-a3fe-fd5380848969'::uuid
);
-- Expected: true

SELECT public.is_challenge_saved(
  auth.uid(),
  '626f8cf2-8924-411b-84d4-285799e77f53'::uuid
);
-- Expected: false (we removed it)

-- =====================================================
-- If ANY test fails, report back with:
-- 1. Which test number failed
-- 2. The EXACT error message
-- 3. What the query returned
-- =====================================================
