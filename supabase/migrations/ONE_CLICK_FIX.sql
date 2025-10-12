-- ⚡ COPY AND PASTE THIS ENTIRE BLOCK INTO SUPABASE SQL EDITOR ⚡

-- 1. Clean up old policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete_policy" ON public.profiles;

-- 2. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create new policies
CREATE POLICY "profiles_select_policy" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_policy" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_policy" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_delete_policy" ON public.profiles FOR DELETE TO authenticated USING (auth.uid() = id);

-- 4. Verify (should show 4 policies)
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'profiles' ORDER BY cmd;

-- ✅ DONE! Refresh your app and the errors will be gone!
