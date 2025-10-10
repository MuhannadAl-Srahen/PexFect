# 🔧 FIX: Permission Denied Error for Profiles Table

## ❌ The Problem

You're seeing this error:
```
permission denied for table profiles
code: '42501'
```

This means the **Row Level Security (RLS) policies** aren't configured correctly.

---

## ✅ The Solution

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New query**

### Step 2: Copy and Run This SQL

Copy the **entire content** of this file:
```
supabase/migrations/FIX_RLS_POLICIES.sql
```

Or copy this directly:

```sql
-- Drop all existing policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.profiles;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow everyone to READ all profiles
CREATE POLICY "profiles_select_policy"
  ON public.profiles
  FOR SELECT
  USING (true);

-- Allow authenticated users to INSERT their own profile
CREATE POLICY "profiles_insert_policy"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow users to UPDATE only their own profile
CREATE POLICY "profiles_update_policy"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow users to DELETE only their own profile
CREATE POLICY "profiles_delete_policy"
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);
```

### Step 3: Click "Run" Button

Click the **Run** button in Supabase SQL Editor.

### Step 4: Verify Policies Were Created

Run this query to check:

```sql
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'profiles';
```

You should see 4 policies:
- ✅ `profiles_select_policy` (SELECT)
- ✅ `profiles_insert_policy` (INSERT)
- ✅ `profiles_update_policy` (UPDATE)
- ✅ `profiles_delete_policy` (DELETE)

### Step 5: Refresh Your App

1. Go back to your app in the browser
2. Press `Ctrl + Shift + R` (hard refresh)
3. The errors should be gone! ✅

---

## 🧪 Test It

1. Sign out and sign in again with GitHub
2. Check the browser console - no more 403 errors!
3. Check Supabase Dashboard → Database → `profiles` table
4. You should see your profile data

---

## 🤔 Why Did This Happen?

The original SQL migration had generic policy names that might have conflicted with existing policies or weren't properly set up for authenticated users. The fix:

1. **Clears all old policies** - Fresh start
2. **Creates specific policies** - Clear naming convention
3. **Uses `TO authenticated`** - Explicitly targets authenticated users
4. **Uses `USING` and `WITH CHECK`** - Proper RLS syntax

---

## 📊 What Each Policy Does

| Policy | What It Does |
|--------|-------------|
| `profiles_select_policy` | Anyone can **read** all profiles (public) |
| `profiles_insert_policy` | Authenticated users can **create** their own profile |
| `profiles_update_policy` | Users can **edit** only their own profile |
| `profiles_delete_policy` | Users can **delete** only their own profile |

---

## 🆘 Still Having Issues?

If you still see errors:

1. **Check if RLS is enabled**:
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE tablename = 'profiles';
   ```
   Should show `rowsecurity = true`

2. **Check user authentication**:
   ```javascript
   // In browser console
   const { data } = await supabase.auth.getSession()
   console.log(data.session?.user)
   ```
   Make sure user is authenticated

3. **Check table owner**:
   ```sql
   SELECT tableowner FROM pg_tables WHERE tablename = 'profiles';
   ```
   Should be `postgres` or `supabase_admin`

---

## 🎉 All Fixed!

After running the fix, you should see:
- ✅ No more 403 Forbidden errors
- ✅ No more "permission denied" messages
- ✅ Profiles created automatically on signup
- ✅ Profile data accessible in your app

Your console should show:
```
[ensureProfileExists] ✅ Profile already exists
```

Instead of:
```
❌ permission denied for table profiles
```

---

**Need more help?** Check `PROFILE_SETUP.md` for full documentation.
