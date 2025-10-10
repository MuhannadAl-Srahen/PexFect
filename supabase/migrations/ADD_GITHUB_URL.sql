-- =====================================================
-- UPDATE: Add GitHub URL to Profile Auto-Creation
-- =====================================================

-- Update the trigger function to include github_url
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
-- UPDATE EXISTING PROFILES WITH GITHUB URL
-- =====================================================

-- This will update profiles that don't have github_url set
-- Run this to backfill existing users
UPDATE public.profiles p
SET github_url = 'https://github.com/' || (u.raw_user_meta_data->>'user_name')
FROM auth.users u
WHERE p.id = u.id
  AND p.github_url IS NULL
  AND u.raw_user_meta_data->>'user_name' IS NOT NULL;

-- =====================================================
-- VERIFY
-- =====================================================

-- Check profiles with GitHub URLs
SELECT 
  id,
  full_name,
  email,
  github_url
FROM public.profiles
ORDER BY joined_date DESC
LIMIT 10;

-- =====================================================
-- ✅ DONE! New signups will include GitHub URL
-- =====================================================
