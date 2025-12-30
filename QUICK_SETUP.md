# Quick Setup Guide - Custom Flowers & Google Sign-In

## 🚀 Quick Start (5 Minutes)

### Step 1: Run Database Migration
1. Open [Supabase Dashboard](https://app.supabase.com/)
2. Go to **SQL Editor**
3. Click **New Query**
4. Paste contents of `add_custom_orders_column.sql`
5. Click **Run**

### Step 2: Set Up Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth credentials (see `GOOGLE_OAUTH_SETUP.md` for details)
3. Copy **Client ID** and **Client Secret**
4. Go to Supabase Dashboard > Authentication > Providers > Google
5. Paste credentials and Save

### Step 3: Test It Out
```bash
cd frontend
npm run dev
```

Then:
- Visit `http://localhost:5173/login`
- Try "Continue with Google"
- Visit `http://localhost:5173/custom-order` and submit a custom order

## ✅ What Was Fixed

### Custom Flower Orders
- ✅ Now saves to database (not just WhatsApp)
- ✅ Requires user to be signed in
- ✅ Auto-fills user information
- ✅ Stores custom details as JSON
- ✅ Sends WhatsApp notification with Order ID
- ✅ Redirects to orders page after submission

### Google Sign-In
- ✅ Properly configured OAuth flow
- ✅ Automatically creates user profiles
- ✅ Handles authentication callbacks
- ✅ Better error messages
- ✅ Secure PKCE flow
- ✅ Session persistence

## 📁 Files Changed

**Modified:**
- `frontend/src/components/orders/CustomOrderForm.jsx`
- `frontend/src/pages/LoginPage.jsx`
- `frontend/src/pages/SignupPage.jsx`
- `frontend/src/lib/supabase.js`
- `frontend/src/App.jsx`

**Created:**
- `frontend/src/hooks/useAuthCallback.js`
- `add_custom_orders_column.sql`
- `GOOGLE_OAUTH_SETUP.md`
- `CHANGES_SUMMARY.md`

## 🆘 Quick Troubleshooting

**Problem:** Google Sign-In button doesn't work
- **Solution:** Check that you set up OAuth credentials in both Google Cloud Console AND Supabase

**Problem:** Custom orders not saving
- **Solution:** Make sure you ran the SQL migration (`add_custom_orders_column.sql`)

**Problem:** "Please sign in" message on custom order page
- **Solution:** This is expected! Sign in first, then submit custom orders

**Problem:** User profile not created after Google Sign-In
- **Solution:** Check the `useAuthCallback` hook is working (check browser console)

## 📚 Full Documentation

For detailed information, see:
- `GOOGLE_OAUTH_SETUP.md` - Complete OAuth setup guide
- `CHANGES_SUMMARY.md` - All changes in detail

## 🎯 Next Steps

1. Run the database migration
2. Set up Google OAuth credentials
3. Test both features
4. Deploy to production (update redirect URLs)

---

Need help? Check the full guides or ask for assistance!
