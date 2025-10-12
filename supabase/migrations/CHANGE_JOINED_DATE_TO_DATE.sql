-- =====================================================
-- COMPLETE FIX: Change joined_date to DATE type
-- =====================================================

-- Step 1: Change the column type from timestamp to date
ALTER TABLE public.profiles 
ALTER COLUMN joined_date TYPE DATE;

-- Step 2: Update trigger to use DATE (in case it wasn't updated)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  github_username text;
BEGIN
  -- Extract GitHub username from metadata
  github_username := NEW.raw_user_meta_data->>'user_name';
  
  INSERT INTO public.profiles (
    id,
    full_name,
    email,
    joined_date,
    profile_image_url,
    github_url
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.email,
    DATE(NEW.created_at),
    NEW.raw_user_meta_data->>'avatar_url',
    CASE 
      WHEN github_username IS NOT NULL 
      THEN 'https://github.com/' || github_username
      ELSE NULL
    END
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    RETURN NEW;
  WHEN OTHERS THEN
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Verify the change
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'profiles' 
  AND column_name = 'joined_date';

-- Step 4: Check the data
SELECT 
  full_name,
  joined_date,
  pg_typeof(joined_date) as "Data Type"
FROM public.profiles
ORDER BY joined_date DESC
LIMIT 5;

-- =====================================================
-- ✅ DONE! Now joined_date is pure DATE type
-- =====================================================

-- Expected output:
-- column_name | data_type | is_nullable
-- ------------|-----------|------------
-- joined_date | date      | YES

-- Display will now be: 2025-10-10 (no timestamp!)
