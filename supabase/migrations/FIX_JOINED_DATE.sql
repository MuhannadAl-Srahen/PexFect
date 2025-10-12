-- =====================================================
-- FIX: Convert joined_date to Date Only (No Time)
-- =====================================================

-- Option 1: If joined_date column is TIMESTAMP WITH TIME ZONE
-- Convert existing timestamps to dates
UPDATE public.profiles
SET joined_date = DATE(joined_date)
WHERE joined_date IS NOT NULL;

-- Option 2: If you want to change the column type permanently to DATE
-- (This will remove time component from all future inserts automatically)
-- ALTER TABLE public.profiles 
-- ALTER COLUMN joined_date TYPE DATE;

-- =====================================================
-- UPDATE THE TRIGGER FUNCTION
-- =====================================================

-- Update trigger to use DATE() function
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
    DATE(NEW.created_at),  -- Only the date, no time
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
    -- Profile already exists, ignore the error
    RETURN NEW;
  WHEN OTHERS THEN
    -- Log error but don't fail the auth.users insert
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- VERIFY
-- =====================================================

-- Check that dates are now without time
SELECT 
  id,
  full_name,
  joined_date,
  pg_typeof(joined_date) as "Column Type"
FROM public.profiles
ORDER BY joined_date DESC
LIMIT 10;

-- =====================================================
-- ✅ DONE! Joined dates now show only date, no time
-- =====================================================

-- Examples:
-- Before: 2024-01-15 14:23:45.123456+00
-- After:  2024-01-15
