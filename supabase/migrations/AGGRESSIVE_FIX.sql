-- =====================================================
-- AGGRESSIVE FIX: Complete RLS Reset for Profiles
-- =====================================================

-- Step 1: Disable RLS temporarily
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL policies (no matter what they're called)
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'profiles') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.profiles';
    END LOOP;
END $$;

-- Step 3: Grant basic permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO anon;

-- Step 4: Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Step 5: Create fresh policies with clear names
CREATE POLICY "allow_public_read_profiles"
  ON public.profiles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "allow_authenticated_insert_own_profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "allow_authenticated_update_own_profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "allow_authenticated_delete_own_profile"
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Step 6: Also allow anon to read (for public profiles)
CREATE POLICY "allow_anon_read_profiles"
  ON public.profiles
  FOR SELECT
  TO anon
  USING (true);

-- =====================================================
-- VERIFY
-- =====================================================

-- Show all policies
SELECT 
  policyname,
  cmd,
  roles,
  permissive
FROM pg_policies 
WHERE tablename = 'profiles'
ORDER BY cmd, policyname;

-- Show RLS status
SELECT 
  tablename,
  rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE tablename = 'profiles';

-- =====================================================
-- ✅ DONE! Now test your app
-- =====================================================
