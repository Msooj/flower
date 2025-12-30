# 🛑 CRITICAL ACTION REQUIRED: Enable Google Provider

You are receiving the error:
> `"error_code": "validation_failed", "msg": "Unsupported provider: provider is not enabled"`

This means the **Google Login Switch** is turned **OFF** in your Supabase Dashboard. The code on your computer is correct, but the cloud service is rejecting it.

## ✅ How to Fix It (Takes 1 Minute)

1. **Open Supabase Dashboard**
   - Go to [https://supabase.com/dashboard/project/_/auth/providers](https://supabase.com/dashboard/project/_/auth/providers)
   - (Select your flower project if asked).

2. **Find "Google"**
   - In the "Auth Providers" list, find **Google**.
   - It will likely say "Disabled".

3. **Enable It**
   - Click to expand the Google section.
   - **Flip the "Enable Google" toggle to ON.**
   - Ensure your **Client ID** and **Client Secret** are pasted there (from Google Cloud Console).
   - Click **Save**.

## 🔄 Verify
1. Go back to your website (`http://localhost...`).
2. Refresh.
3. Click "Continue with Google".
4. It should now work (or give a different error if Redirect URI is wrong, but the "Provider not enabled" error will be gone).
