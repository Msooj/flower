import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

print(f"URL: {supabase_url}")
print(f"KEY: {supabase_key[:10]}...")

try:
    supabase = create_client(os.environ.get("SUPABASE_URL"), os.environ.get("SUPABASE_KEY"))
    # Try to access admin stats or something restricted
    # Or just check if we can list users (requires service-role)
    # Actually, we can try to access the 'auth.users' view if we have permissions
    # But a simpler way is to check if we can insert into 'products' without a session
    response = supabase.table("products").select("name").limit(1).execute()
    print("Read successful!")
    print(f"Products: {response.data}")
except Exception as e:
    print(f"Backend check failed: {e}")
