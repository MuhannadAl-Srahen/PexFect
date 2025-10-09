-- ============================================================================
-- SECURE CHALLENGES TABLE - AUTHENTICATED USERS ONLY FOR UPDATES
-- ============================================================================
-- Allow public read access but only authenticated users can update issaved
-- ============================================================================

-- Step 1: Revoke UPDATE permission from anon (public)
REVOKE UPDATE ON public.challenges FROM anon;

-- Step 2: Keep SELECT (read) for everyone
GRANT SELECT ON public.challenges TO anon;
GRANT SELECT ON public.challenges TO authenticated;

-- Step 3: Only authenticated users can UPDATE
GRANT UPDATE ON public.challenges TO authenticated;

-- Step 4: Enable RLS
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

-- Step 5: Drop any existing policies
DROP POLICY IF EXISTS "Allow all operations on challenges" ON public.challenges;
DROP POLICY IF EXISTS "Allow public read challenges" ON public.challenges;
DROP POLICY IF EXISTS "Allow authenticated update challenges" ON public.challenges;

-- Step 6: Create policy for public read access
CREATE POLICY "Allow public read challenges"
ON public.challenges
FOR SELECT
TO anon, authenticated
USING (true);

-- Step 7: Create policy for authenticated users to update
CREATE POLICY "Allow authenticated update challenges"
ON public.challenges
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Step 8: Verify permissions
SELECT 
    grantee,
    privilege_type,
    table_schema,
    table_name
FROM information_schema.table_privileges
WHERE table_schema = 'public' 
  AND table_name = 'challenges'
  AND grantee IN ('anon', 'authenticated')
ORDER BY grantee, privilege_type;

-- Step 9: Verify RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'challenges'
ORDER BY policyname;

-- Step 10: Verify RLS is enabled
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public' 
  AND tablename = 'challenges';

-- ============================================================================
-- RESULT
-- ============================================================================
-- ✅ Anonymous users: Can READ challenges
-- ✅ Authenticated users: Can READ and UPDATE challenges
-- ❌ Anonymous users: CANNOT update issaved field
-- ============================================================================
