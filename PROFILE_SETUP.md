# Profile Auto-Creation Setup Guide

This guide explains how to automatically create user profiles when users sign up with GitHub OAuth.

## 🎯 What This Does

When a user signs up with GitHub OAuth, the system will automatically:
- Create a profile in the `profiles` table
- Extract the user's **full name** from GitHub
- Extract the user's **email** from GitHub
- Set the **join date** to the account creation time
- Extract the **profile image** from GitHub avatar

## 📋 Setup Instructions

### Step 1: Run the SQL Migration

You need to run the SQL migration in your Supabase database. You have two options:

#### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy the contents of `supabase/migrations/create_profile_trigger.sql`
5. Paste it into the SQL editor
6. Click **Run** to execute the SQL

#### Option B: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Navigate to your project directory
cd PexFect

# Run the migration
supabase db push
```

### Step 2: Verify the Setup

After running the migration, verify that:

1. **Trigger Function Exists**: Go to Database → Functions in Supabase dashboard
   - Look for `handle_new_user()` function

2. **Trigger Exists**: Go to Database → Triggers
   - Look for `on_auth_user_created` trigger on the `auth.users` table

3. **RLS Policies Exist**: Go to Database → Tables → profiles → Policies
   - "Public profiles are viewable by everyone"
   - "Users can update own profile"
   - "Users can insert own profile"

### Step 3: Test the Integration

1. Sign out of your application (if signed in)
2. Sign in again with GitHub OAuth
3. Check the `profiles` table in Supabase dashboard
4. You should see a new profile created automatically with your GitHub data

## 🔧 How It Works

### Database Trigger
The SQL migration creates a PostgreSQL trigger that:
- Listens for new user inserts in the `auth.users` table
- Automatically calls `handle_new_user()` function
- Extracts user data from GitHub OAuth metadata
- Inserts a new row in the `profiles` table

### GitHub OAuth Data Mapping
```javascript
GitHub Field           → Profiles Table Field
-----------------        ---------------------
raw_user_meta_data.name → full_name
email                   → email
created_at              → joined_date
raw_user_meta_data.     → profile_image_url
  avatar_url
```

### Fallback Profile Creation
The `ensureProfileExists()` function in `src/lib/profileHelpers.ts` provides a fallback:
- Checks if profile exists for current user
- Creates profile if missing (in case trigger didn't run)
- Can be called after authentication to ensure profile exists

## 📝 Usage in Code

### Check/Create Profile After Login

```typescript
import { ensureProfileExists } from '@/lib'

// After user signs in
async function handleAfterSignIn() {
  await ensureProfileExists()
}
```

### Get User Profile

```typescript
import { getUserProfile } from '@/lib'

const profile = await getUserProfile()
console.log(profile.full_name)
```

### Update User Profile

```typescript
import { updateUserProfile } from '@/lib'

await updateUserProfile({
  bio: 'Frontend Developer',
  skills: ['React', 'TypeScript', 'Tailwind'],
  social_links: {
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username'
  }
})
```

## 🔒 Row Level Security (RLS)

The migration automatically sets up RLS policies:

- **Read Access**: Anyone can view all profiles (public profiles)
- **Update Access**: Users can only update their own profile
- **Insert Access**: Users can only insert their own profile

## 🐛 Troubleshooting

### Profile Not Created After Signup

1. **Check if trigger exists**:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
   ```

2. **Check if function exists**:
   ```sql
   SELECT proname FROM pg_proc WHERE proname = 'handle_new_user';
   ```

3. **Manually create profile**:
   ```typescript
   import { ensureProfileExists } from '@/lib'
   await ensureProfileExists()
   ```

### Missing Data from GitHub

Some GitHub accounts might not have all fields:
- **Name**: Some users don't set a display name
- **Email**: Some users make their email private
- **Avatar**: Most users have this, but it's optional

The trigger uses `COALESCE` and null-safe checks to handle missing data.

## 📚 Related Files

- `supabase/migrations/create_profile_trigger.sql` - Database trigger SQL
- `src/lib/profileHelpers.ts` - Helper functions for profile management
- `src/lib/supabaseClient.js` - Supabase client and GitHub OAuth setup

## ✅ Next Steps

After setting up the trigger:

1. ✅ Test signup flow with a new GitHub account
2. ✅ Verify profile data in Supabase dashboard
3. ✅ Implement profile page UI to display user data
4. ✅ Add profile editing functionality using `updateUserProfile()`
5. ✅ Consider adding profile completeness indicator

## 🔗 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [PostgreSQL Triggers](https://www.postgresql.org/docs/current/sql-createtrigger.html)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
