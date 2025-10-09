-- ============================================================================
-- GRANT UPDATE PERMISSION FOR CHALLENGES.ISSAVED FIELD
-- ============================================================================
-- This script adds UPDATE permission to the challenges table RLS policy
-- to allow users to save/unsave challenges by updating the issaved field.
--
-- Run this in Supabase SQL Editor:
-- 1. Go to https://supabase.com/dashboard/project/wtskvwjjmmsdqoewzndp/sql/new
-- 2. Copy and paste this entire file
-- 3. Click "Run" or press Ctrl+Enter
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to challenges" ON public.challenges;
DROP POLICY IF EXISTS "Allow public read and save challenges" ON public.challenges;
DROP POLICY IF EXISTS "Allow public read challenges" ON public.challenges;
DROP POLICY IF EXISTS "Allow public update challenge saved state" ON public.challenges;

-- Create RLS policy to allow both SELECT and UPDATE
-- Note: This allows PUBLIC access. Adjust to authenticated users if needed.
CREATE POLICY "Allow public read and save challenges"
ON public.challenges
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Alternative: If you want to keep separate policies for SELECT and UPDATE
-- Uncomment the following and comment out the policy above:

-- Drop the combined policy first:
-- DROP POLICY IF EXISTS "Allow public read and save challenges" ON public.challenges;

-- Allow SELECT (read) access
-- CREATE POLICY "Allow public read challenges"
-- ON public.challenges
-- FOR SELECT
-- TO public
-- USING (true);

-- Allow UPDATE access (for saving/unsaving)
-- CREATE POLICY "Allow public update challenge saved state"
-- ON public.challenges
-- FOR UPDATE
-- TO public
-- USING (true)
-- WITH CHECK (true);

-- Verify the policy was created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'challenges';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check if issaved field exists in challenges table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'challenges'
  AND column_name = 'issaved';

-- View current saved challenges
SELECT id, title, issaved
FROM public.challenges
ORDER BY created_at DESC;

-- ============================================================================
-- NOTES
-- ============================================================================
-- 
-- Security Considerations:
-- - Currently allows PUBLIC (anonymous) access to update issaved
-- - For production, consider restricting to authenticated users:
--   TO authenticated instead of TO public
--
-- - Or add row-level security based on user ownership:
--   USING (auth.uid() = user_id)
--
-- Next Steps:
-- 1. Run this script in Supabase SQL Editor
-- 2. Test the heart button in your application
-- 3. Verify that issaved field updates successfully
-- 
-- ============================================================================
