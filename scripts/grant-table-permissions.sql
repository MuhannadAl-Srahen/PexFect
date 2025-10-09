-- ============================================================================
-- GRANT TABLE-LEVEL PERMISSIONS TO ANON ROLE
-- ============================================================================
-- The issue is that the 'anon' role (used by Supabase client) doesn't have
-- UPDATE permission on the challenges table at the PostgreSQL level
-- ============================================================================

-- Grant ALL permissions to anon role (public access via API key)
GRANT ALL ON public.challenges TO anon;
GRANT ALL ON public.challenges TO authenticated;

-- Also grant USAGE on the schema
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Grant permissions on the sequence (if id is auto-generated)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Verify permissions
SELECT 
    grantee,
    privilege_type,
    table_schema,
    table_name
FROM information_schema.table_privileges
WHERE table_schema = 'public' 
  AND table_name = 'challenges'
  AND grantee IN ('anon', 'authenticated', 'public')
ORDER BY grantee, privilege_type;

-- Also check if RLS is disabled
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public' 
  AND tablename = 'challenges';

-- ============================================================================
-- TEST UPDATE
-- ============================================================================
-- Now test if UPDATE works (replace with actual challenge ID)
-- UPDATE public.challenges 
-- SET issaved = true 
-- WHERE id = '626f8cf2-8924-411b-84d4-285799e77f53'
-- RETURNING id, issaved;
-- ============================================================================
