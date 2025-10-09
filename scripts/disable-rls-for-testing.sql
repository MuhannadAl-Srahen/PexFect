-- ============================================================================
-- TEMPORARILY DISABLE RLS ON CHALLENGES TABLE (FOR TESTING)
-- ============================================================================
-- This will disable Row Level Security completely to test if that's the issue
-- WARNING: This makes the table publicly accessible for ALL operations
-- Only use this temporarily for testing!
-- ============================================================================

-- Disable RLS on challenges table
ALTER TABLE public.challenges DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public' 
  AND tablename = 'challenges';

-- Show all policies (should be empty or inactive)
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'challenges';

-- Test query - this should work now
SELECT 
    id,
    title,
    COALESCE(issaved, false) as issaved
FROM public.challenges
ORDER BY created_at DESC
LIMIT 5;

-- ============================================================================
-- AFTER TESTING: Re-enable RLS with proper policy
-- ============================================================================
-- Once you confirm the heart button works, run this:
--
-- ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
-- 
-- CREATE POLICY "Allow all operations on challenges"
-- ON public.challenges
-- FOR ALL
-- TO anon, authenticated
-- USING (true)
-- WITH CHECK (true);
-- ============================================================================
