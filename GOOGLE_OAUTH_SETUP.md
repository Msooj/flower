# Google OAuth Setup Guide for Flower Shop

This guide will help you set up Google Sign-In for your Flower Shop application.

## Prerequisites
- Access to your Supabase project dashboard
- A Google Cloud Console account

## Step 1: Set Up Google Cloud OAuth Credentials

### 1.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API for your project

### 1.2 Configure OAuth Consent Screen
1. In Google Cloud Console, go to **APIs & Services** > **OAuth consent screen**
2. Select **External** user type (unless you have a Google Workspace account)
3. Fill in the required information:
   - **App name**: Flower Lifestyle
   - **User support email**: Your email
   - **Developer contact email**: Your email
4. Add scopes (optional):
   - `userinfo.email`
   - `userinfo.profile`
5. Save and continue

### 1.3 Create OAuth 2.0 Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Select **Web application**
4. Configure the OAuth client:
   - **Name**: Flower Lifestyle Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:5173` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**:
     - `https://YOUR_SUPABASE_PROJECT_ID.supabase.co/auth/v1/callback`
     - (Get this from your Supabase dashboard → Authentication → Providers → Google)
5. Click **Create**
6. **Important**: Copy your **Client ID** and **Client Secret**

## Step 2: Configure Google Provider in Supabase

### 2.1 Enable Google Authentication
1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project: `flower-main`
3. Navigate to **Authentication** > **Providers**
4. Find **Google** and click to expand

### 2.2 Configure Google Settings
1. **Enable Google provider**: Turn ON
2. **Client ID**: Paste your Google OAuth Client ID
3. **Client Secret**: Paste your Google OAuth Client Secret
4. **Redirect URL**: Copy this URL and add it to your Google Cloud Console (you already did this in Step 1.3)
   - It should be: `https://YOUR_SUPABASE_PROJECT_ID.supabase.co/auth/v1/callback`
5. Click **Save**

## Step 3: Update Database for Custom Orders

### 3.1 Run SQL Migration
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of `add_custom_orders_column.sql`
5. Click **Run** to execute the migration
6. Verify the columns were added successfully

This will add:
- `custom_order_details` (JSONB) - stores custom flower order information
- `delivery_address` (TEXT) - stores delivery address if not already present

## Step 4: Test Google Sign-In

### 4.1 Start Your Application
```bash
cd frontend
npm run dev
```

### 4.2 Test the Flow
1. Navigate to `http://localhost:5173/login`
2. Click **Continue with Google**
3. You should be redirected to Google's login page
4. After successful authentication, you should be redirected back to `/flowers`
5. Check that your user profile was created in Supabase:
   - Go to **Authentication** > **Users** in Supabase
   - Verify the user appears
   - Go to **Table Editor** > **user_profiles**
   - Verify a profile was created with `role = 'customer'`

## Step 5: Test Custom Flower Orders

### 5.1 Submit a Custom Order
1. Sign in to your application
2. Navigate to `/custom-order`
3. Fill out the custom flower order form
4. Submit the form
5. Verify:
   - Order appears in **Table Editor** > **orders**
   - The `custom_order_details` field contains your order details (JSON)
   - You're redirected to `/orders` page
   - WhatsApp notification is sent

## Common Issues & Troubleshooting

### Issue 1: "Invalid OAuth Credentials"
**Solution**: 
- Double-check that your Client ID and Client Secret are correctly copied from Google Cloud Console
- Ensure there are no extra spaces before or after the credentials

### Issue 2: "Redirect URI Mismatch"
**Solution**:
- Go to Google Cloud Console > Credentials
- Edit your OAuth client
- Ensure the redirect URI exactly matches the one from Supabase (including `https://`)
- Common mistake: Using `http://` instead of `https://`

### Issue 3: User Profile Not Created
**Solution**:
- Check browser console for errors
- Verify the `useAuthCallback` hook is working
- Check Supabase logs: Dashboard > Logs > Auth Logs
- Manually check if a trigger exists: `on_auth_user_created` should automatically create profiles

### Issue 4: Custom Orders Not Saving
**Solution**:
- Verify you ran the migration SQL (`add_custom_orders_column.sql`)
- Check that `custom_order_details` column exists in the `orders` table
- Ensure you're signed in when submitting the form
- Check browser console and Supabase logs for errors

### Issue 5: RLS Policy Errors
**Solution**:
- Ensure RLS policies allow users to create orders
- You can temporarily disable RLS for testing (not recommended for production):
  ```sql
  ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
  ```
- Better solution: Review and fix the RLS policies in `database_setup.sql`

## Security Best Practices

1. **Never commit credentials**: Keep your `.env` file in `.gitignore`
2. **Use environment variables**: Store Google OAuth credentials securely
3. **Enable RLS**: Always keep Row Level Security enabled in production
4. **Regular audits**: Periodically review OAuth scopes and permissions
5. **HTTPS only**: Never use OAuth over HTTP in production

## Additional Resources

- [Supabase Google Auth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Supabase RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check Supabase Dashboard > Logs
3. Review the conversation history for additional context
4. Consult Supabase documentation

---

**Last Updated**: December 30, 2025
**Version**: 1.0
