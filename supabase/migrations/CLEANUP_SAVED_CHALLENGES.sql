-- =====================================================
-- CLEANUP: Remove entries with isSaved: false
-- =====================================================

-- Step 1: Check current state (see what needs cleaning)
SELECT 
  id,
  full_name,
  saved_challenges,
  jsonb_array_length(COALESCE(saved_challenges, '[]'::jsonb)) as total_entries
FROM public.profiles
WHERE id = auth.uid();

-- Step 2: Clean up - Remove all entries where isSaved is false
UPDATE public.profiles
SET saved_challenges = (
  SELECT COALESCE(jsonb_agg(elem), '[]'::jsonb)
  FROM jsonb_array_elements(COALESCE(saved_challenges, '[]'::jsonb)) elem
  WHERE (elem->>'isSaved')::boolean = true
)
WHERE id = auth.uid();

-- Step 3: Verify - Check cleaned state
SELECT 
  id,
  full_name,
  saved_challenges,
  jsonb_array_length(COALESCE(saved_challenges, '[]'::jsonb)) as total_entries
FROM public.profiles
WHERE id = auth.uid();

-- =====================================================
-- Expected Result:
-- Only entries with "isSaved": true should remain
-- All entries with "isSaved": false should be gone
-- =====================================================

-- Step 4 (OPTIONAL): Clean ALL users (if you want to fix everyone)
UPDATE public.profiles
SET saved_challenges = (
  SELECT COALESCE(jsonb_agg(elem), '[]'::jsonb)
  FROM jsonb_array_elements(COALESCE(saved_challenges, '[]'::jsonb)) elem
  WHERE (elem->>'isSaved')::boolean = true
)
WHERE saved_challenges IS NOT NULL;

-- Step 5: Verify all profiles cleaned
SELECT 
  id,
  username,
  jsonb_array_length(COALESCE(saved_challenges, '[]'::jsonb)) as num_saved,
  saved_challenges
FROM public.profiles
WHERE saved_challenges IS NOT NULL
  AND saved_challenges != '[]'::jsonb
ORDER BY username;
