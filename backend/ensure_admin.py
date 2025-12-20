import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

try:
    # Use service_role key to manage users
    supabase = create_client(supabase_url, supabase_key)
    
    # Try to create the admin user
    email = "flowerlifestyle@gmail.com"
    password = "syndicate1812"
    
    print(f"Attempting to create/update user: {email}")
    
    # In Supabase Auth, we usually use auth.admin.create_user
    try:
        # Try to find user in user_profiles to get ID
        res = supabase.table("user_profiles").select("id").eq("email", email).execute()
        if res.data:
            uid = res.data[0]['id']
            print(f"Found user ID: {uid}")
            supabase.auth.admin.update_user_by_id(uid, {
                "password": password,
                "email_confirm": True
            })
            print("User updated: password reset and email confirmed.")
        else:
            # Try to create if not found
            user = supabase.auth.admin.create_user({
                "email": email,
                "password": password,
                "email_confirm": True
            })
            print("User created successfully!")
    except Exception as e:
        print(f"Error managing user: {e}")
            
    # Ensure role is admin
    supabase.table("user_profiles").update({"role": "admin"}).eq("email", email).execute()
    print("Role ensured as admin.")

except Exception as e:
    print(f"Setup failed: {e}")
