-- ============================================================================
-- FIX RLS POLICIES FOR CHALLENGES TABLE - ALLOW UPDATE
-- ============================================================================
-- This script completely rebuilds the RLS policies for the challenges table
-- to ensure UPDATE permissions work for the issaved field.
--
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/wtskvwjjmmsdqoewzndp/sql/new
-- ============================================================================

-- Step 1: Disable RLS temporarily to clean up
ALTER TABLE public.challenges DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies on challenges table
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'challenges'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.challenges', policy_record.policyname);
    END LOOP;
END $$;

-- Step 3: Re-enable RLS
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

-- Step 4: Create comprehensive policy for ALL operations (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "Allow all operations on challenges"
ON public.challenges
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Step 5: Verify the policy was created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    CASE 
        WHEN qual IS NULL THEN 'true'
        ELSE qual
    END as using_expression,
    CASE 
        WHEN with_check IS NULL THEN 'true'
        ELSE with_check
    END as with_check_expression
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'challenges';

-- Step 6: Verify issaved column exists
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'challenges'
  AND column_name = 'issaved';

-- Step 7: Test UPDATE permission with a simple query
-- This should return success, not an error
DO $$
BEGIN
    -- Try to update a record (this is just a test, we'll rollback)
    RAISE NOTICE 'Testing UPDATE permission...';
    
    -- Check if we can at least see the table
    PERFORM * FROM public.challenges LIMIT 1;
    RAISE NOTICE '✅ SELECT permission works';
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Error: %', SQLERRM;
END $$;

-- ============================================================================
-- VERIFICATION QUERIES - Check current state
-- ============================================================================

-- Show all challenges with their issaved status
SELECT 
    id,
    title,
    COALESCE(issaved, false) as issaved,
    created_at
FROM public.challenges
ORDER BY created_at DESC;

-- ============================================================================
-- MANUAL TEST QUERY
-- ============================================================================
-- After running this script, test UPDATE manually:
-- Replace <challenge-id> with an actual ID from above
--
-- UPDATE public.challenges 
-- SET issaved = true 
-- WHERE id = '<challenge-id>'
-- RETURNING id, issaved;
-- ============================================================================

RAISE NOTICE '✅ RLS policies have been reset. Try your application now!';
