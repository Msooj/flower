# Fix RLS Policy Errors - Step by Step Guide

## Problem
You're seeing "RLS policy error" messages and data is not loading in the admin dashboard.

## Solution Options (Try in order)

### Option 1: Complete Fix (Recommended)
**File: `fix_rls_complete.sql`**

1. Open Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **"New query"**
5. Copy the **ENTIRE** contents of `fix_rls_complete.sql`
6. Paste into the SQL Editor
7. Click **"Run"** (or press Ctrl+Enter)
8. Wait for "Success" message
9. **Refresh your browser** (Ctrl+Shift+R)
10. Log out and log back into admin dashboard

### Option 2: Updated Database Columns Fix
**File: `fix_database_columns.sql`** (Updated version)

Follow the same steps as Option 1, but use `fix_database_columns.sql` instead.

### Option 3: Emergency Quick Fix (If others don't work)
**File: `EMERGENCY_DISABLE_RLS.sql`**

⚠️ **WARNING**: This temporarily disables RLS (less secure but will work immediately)

1. Follow steps 1-8 from Option 1 using `EMERGENCY_DISABLE_RLS.sql`
2. This will disable RLS and add missing columns
3. Data should load immediately
4. You can re-enable RLS later with proper policies

## What These Scripts Do

1. **Add Missing Columns**: 
   - `payment_method`, `payment_phone_number`, `payment_status` to orders table
   - `created_at`, `updated_at` to user_profiles table

2. **Fix RLS Policies**:
   - Drop ALL existing policies (including hidden/conflicting ones)
   - Create new simple policies that allow authenticated users
   - Avoid recursion by not checking user_profiles within policies

## After Running SQL

1. **Hard refresh browser**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Clear browser cache** if needed
3. **Log out** from admin dashboard
4. **Log back in**
5. Data should now load!

## Troubleshooting

### Still seeing errors?
1. Check Supabase SQL Editor for any error messages
2. Make sure you ran the ENTIRE script (not just part of it)
3. Try Option 3 (Emergency Fix) to get data loading first
4. Check browser console for specific error messages

### "Policy already exists" errors?
- This is OK - the script uses `DROP POLICY IF EXISTS` to handle this
- Continue running the script

### Still no data loading?
- Verify you're logged in as admin (flowerlifestyle@gmail.com)
- Check that tables have data: Run `SELECT COUNT(*) FROM products;` in SQL Editor
- Check browser console for specific errors

## Files Created

- `fix_rls_complete.sql` - Most comprehensive fix (recommended)
- `fix_database_columns.sql` - Updated version with better policy handling
- `EMERGENCY_DISABLE_RLS.sql` - Quick fix that disables RLS temporarily

