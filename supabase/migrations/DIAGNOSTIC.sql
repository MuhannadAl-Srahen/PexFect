-- =====================================================
-- DIAGNOSTIC: Check Current RLS Setup
-- =====================================================
-- Run this first to see what's wrong
-- Copy the output and share it

-- 1. Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity AS "RLS Enabled"
FROM pg_tables 
WHERE tablename = 'profiles';

-- 2. Check existing policies
SELECT 
  policyname AS "Policy Name",
  cmd AS "Command",
  roles AS "Roles",
  qual AS "USING clause",
  with_check AS "WITH CHECK clause"
FROM pg_policies 
WHERE tablename = 'profiles'
ORDER BY cmd, policyname;

-- 3. Check table owner
SELECT tableowner AS "Table Owner"
FROM pg_tables 
WHERE tablename = 'profiles';

-- 4. Test if you can select from profiles (run as authenticated user)
-- This will tell us if SELECT policy works
SELECT COUNT(*) as "Can Select?" FROM public.profiles;

-- =====================================================
-- COPY THE OUTPUT ABOVE AND SHARE IT
-- =====================================================
