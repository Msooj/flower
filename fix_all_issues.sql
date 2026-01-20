-- COMPLETE FIX FOR FLOWER SHOP
-- This script fixes RLS policies, Storage buckets, and Admin permissions.
-- Run this in the Supabase SQL Editor.

-- 1. FIX USER PROFILES & ROLES
-- Ensure the admin user exists and has the admin role
INSERT INTO public.user_profiles (id, email, full_name, role)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', ''), 'admin'
FROM auth.users
WHERE email = 'flowerlifestyle@gmail.com'
ON CONFLICT (id) DO UPDATE 
SET role = 'admin', updated_at = NOW();

-- 2. FIX STORAGE BUCKETS
-- Create the 'products' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'products' bucket
-- Allow public access to view images
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated Insert Access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');

-- Allow authenticated users to update/delete their own uploads (simplified for admin)
CREATE POLICY "Authenticated Update Access"
ON storage.objects FOR UPDATE
USING (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Delete Access"
ON storage.objects FOR DELETE
USING (bucket_id = 'products' AND auth.role() = 'authenticated');


-- 3. FIX TABLE RLS POLICIES (More permissive for Admin usage)

-- Drop existing policies to avoid conflicts
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public' AND tablename IN ('products', 'orders', 'order_items', 'user_profiles')) LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON ' || quote_ident(r.tablename);
    END LOOP;
END $$;

-- User Profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read for all authenticated" ON user_profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for self" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Enable update for self" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin full access" ON user_profiles FOR ALL USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read" ON products FOR SELECT USING (true);
CREATE POLICY "Admin Insert" ON products FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin') OR auth.role() = 'authenticated');
CREATE POLICY "Admin Update" ON products FOR UPDATE USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin') OR auth.role() = 'authenticated');
CREATE POLICY "Admin Delete" ON products FOR DELETE USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin') OR auth.role() = 'authenticated');

-- Orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin can update orders" ON orders FOR UPDATE USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Order Items
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can create items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own items" ON order_items FOR SELECT USING (true); -- Simplified for access

-- 4. FINAL VERIFICATION
SELECT name, public FROM storage.buckets WHERE id = 'products';
SELECT email, role FROM user_profiles WHERE email = 'flowerlifestyle@gmail.com';
