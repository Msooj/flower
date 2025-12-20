-- SIMPLE FIX: Temporarily disable RLS or use permissive policies
-- Run this in Supabase SQL Editor if the other fix doesn't work

-- Option 1: Disable RLS temporarily (NOT RECOMMENDED FOR PRODUCTION)
-- ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE products DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;

-- Option 2: Use permissive policies (BETTER FOR TESTING)
-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Allow profile creation on signup" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_select_policy" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_insert_policy" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_update_policy" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_policy" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_select_own" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_insert_own" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_update_own" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_admin_select" ON user_profiles;

-- Create very simple policies that allow authenticated users
CREATE POLICY "user_profiles_authenticated_select"
    ON user_profiles FOR SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "user_profiles_authenticated_insert"
    ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "user_profiles_authenticated_update"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = id OR auth.uid() IN (
        SELECT id FROM user_profiles WHERE role = 'admin'
    ));

-- Products: Public read, authenticated write
DROP POLICY IF EXISTS "Allow public read access to products" ON products;
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;
DROP POLICY IF EXISTS "products_select_policy" ON products;
DROP POLICY IF EXISTS "products_insert_policy" ON products;
DROP POLICY IF EXISTS "products_update_policy" ON products;
DROP POLICY IF EXISTS "products_delete_policy" ON products;
DROP POLICY IF EXISTS "products_policy" ON products;
DROP POLICY IF EXISTS "products_public_select" ON products;
DROP POLICY IF EXISTS "products_admin_insert" ON products;
DROP POLICY IF EXISTS "products_admin_update" ON products;
DROP POLICY IF EXISTS "products_admin_delete" ON products;

CREATE POLICY "products_public_select"
    ON products FOR SELECT
    USING (true);

CREATE POLICY "products_authenticated_insert"
    ON products FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "products_authenticated_update"
    ON products FOR UPDATE
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "products_authenticated_delete"
    ON products FOR DELETE
    USING (auth.uid() IS NOT NULL);

-- Orders: Authenticated users can create and view
DROP POLICY IF EXISTS "Users can create orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Admins can update order status" ON orders;
DROP POLICY IF EXISTS "orders_select_policy" ON orders;
DROP POLICY IF EXISTS "orders_insert_policy" ON orders;
DROP POLICY IF EXISTS "orders_policy" ON orders;
DROP POLICY IF EXISTS "orders_public_insert" ON orders;
DROP POLICY IF EXISTS "orders_select_own_or_admin" ON orders;
DROP POLICY IF EXISTS "orders_admin_update" ON orders;

CREATE POLICY "orders_authenticated_insert"
    ON orders FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "orders_authenticated_select"
    ON orders FOR SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "orders_authenticated_update"
    ON orders FOR UPDATE
    USING (auth.uid() IS NOT NULL);

-- Order items: Same as orders
DROP POLICY IF EXISTS "Users can create order items" ON order_items;
DROP POLICY IF EXISTS "Users can view their own order items" ON order_items;
DROP POLICY IF EXISTS "order_items_policy" ON order_items;
DROP POLICY IF EXISTS "order_items_public_insert" ON order_items;
DROP POLICY IF EXISTS "order_items_select_own_or_admin" ON order_items;

CREATE POLICY "order_items_authenticated_insert"
    ON order_items FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "order_items_authenticated_select"
    ON order_items FOR SELECT
    USING (auth.uid() IS NOT NULL);

-- Ensure created_at column exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'created_at'
    ) THEN
        ALTER TABLE user_profiles ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

UPDATE user_profiles SET created_at = NOW() WHERE created_at IS NULL;

