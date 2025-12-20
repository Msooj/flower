import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

supabase_url = "https://duazdpldzqodpucqoyta.supabase.co"
supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQw54Hh7uK0JBFkGx7_98"

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
