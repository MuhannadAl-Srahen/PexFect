-- =====================================================
-- FIX: Remove isSaved from challenges table
-- Move saved challenges to user profiles
-- =====================================================

-- Step 1: Remove the isSaved column from challenges table
ALTER TABLE public.challenges 
DROP COLUMN IF EXISTS issaved;

-- Step 2: Ensure saved_challenges column exists in profiles
-- (It should already exist based on your schema)
-- Format: [{ "challenge_id": "uuid", "isSaved": true }, { "challenge_id": "uuid2", "isSaved": true }, ...]

-- Step 3: Drop existing functions if they exist (to avoid conflicts)
DROP FUNCTION IF EXISTS public.get_saved_challenges(uuid);
DROP FUNCTION IF EXISTS public.is_challenge_saved(uuid, uuid);
DROP FUNCTION IF EXISTS public.save_challenge(uuid, uuid);
DROP FUNCTION IF EXISTS public.unsave_challenge(uuid, uuid);

-- Step 4: Create helper functions for managing saved challenges

-- Function to check if a challenge is saved by a user
CREATE OR REPLACE FUNCTION public.is_challenge_saved(
  user_id uuid,
  challenge_id uuid
)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.profiles
    WHERE id = user_id
      AND saved_challenges @> jsonb_build_array(
        jsonb_build_object('challenge_id', challenge_id)
      )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add a challenge to saved list
CREATE OR REPLACE FUNCTION public.save_challenge(
  user_id uuid,
  challenge_id uuid
)
RETURNS jsonb AS $$
DECLARE
  current_saved jsonb;
  new_saved jsonb;
BEGIN
  -- Get current saved challenges
  SELECT COALESCE(saved_challenges, '[]'::jsonb)
  INTO current_saved
  FROM public.profiles
  WHERE id = user_id;

  -- Check if already saved
  IF current_saved @> jsonb_build_array(jsonb_build_object('challenge_id', challenge_id)) THEN
    RETURN jsonb_build_object('success', false, 'message', 'Challenge already saved');
  END IF;

  -- Add new saved challenge with isSaved: true
  new_saved := current_saved || jsonb_build_array(
    jsonb_build_object(
      'challenge_id', challenge_id,
      'isSaved', true
    )
  );

  -- Update profile
  UPDATE public.profiles
  SET saved_challenges = new_saved
  WHERE id = user_id;

  RETURN jsonb_build_object('success', true, 'saved_challenges', new_saved);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to remove a challenge from saved list
CREATE OR REPLACE FUNCTION public.unsave_challenge(
  user_id uuid,
  challenge_id uuid
)
RETURNS jsonb AS $$
DECLARE
  current_saved jsonb;
  new_saved jsonb;
BEGIN
  -- Get current saved challenges
  SELECT COALESCE(saved_challenges, '[]'::jsonb)
  INTO current_saved
  FROM public.profiles
  WHERE id = user_id;

  -- Remove the challenge
  SELECT jsonb_agg(elem)
  INTO new_saved
  FROM jsonb_array_elements(current_saved) elem
  WHERE elem->>'challenge_id' != challenge_id::text;

  -- Handle case where all items were removed
  new_saved := COALESCE(new_saved, '[]'::jsonb);

  -- Update profile
  UPDATE public.profiles
  SET saved_challenges = new_saved
  WHERE id = user_id;

  RETURN jsonb_build_object('success', true, 'saved_challenges', new_saved);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's saved challenges with details
CREATE OR REPLACE FUNCTION public.get_saved_challenges(user_id uuid)
RETURNS TABLE (
  challenge_id uuid,
  is_saved boolean,
  title text,
  difficulty text,
  thumbnail_url text,
  tags text[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (elem->>'challenge_id')::uuid as challenge_id,
    (elem->>'isSaved')::boolean as is_saved,
    c.title,
    c.difficulty,
    c.thumbnail_url,
    c.tags
  FROM public.profiles p
  CROSS JOIN jsonb_array_elements(COALESCE(p.saved_challenges, '[]'::jsonb)) elem
  LEFT JOIN public.challenges c ON c.id = (elem->>'challenge_id')::uuid
  WHERE p.id = user_id
    AND (elem->>'isSaved')::boolean = true
  ORDER BY c.title;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4: Grant execute permissions
GRANT EXECUTE ON FUNCTION public.is_challenge_saved(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.save_challenge(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.unsave_challenge(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_saved_challenges(uuid) TO authenticated;

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check challenges table structure (should NOT have issaved)
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'challenges' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check profiles.saved_challenges
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
  AND column_name = 'saved_challenges';

-- List all helper functions
SELECT 
  routine_name,
  routine_type,
  data_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name LIKE '%challenge%'
ORDER BY routine_name;

-- =====================================================
-- ✅ DONE! 
-- =====================================================

-- HOW TO USE:
-- 
-- 1. Save a challenge:
--    SELECT public.save_challenge('user-uuid', 'challenge-uuid');
--
-- 2. Unsave a challenge:
--    SELECT public.unsave_challenge('user-uuid', 'challenge-uuid');
--
-- 3. Check if saved:
--    SELECT public.is_challenge_saved('user-uuid', 'challenge-uuid');
--
-- 4. Get all saved challenges:
--    SELECT * FROM public.get_saved_challenges('user-uuid');
