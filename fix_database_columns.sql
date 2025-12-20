-- Fix missing columns and RLS policies
-- Run this in Supabase SQL Editor

-- First, ensure all columns exist in orders table
DO $$
BEGIN
    -- Add payment_method column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'payment_method'
    ) THEN
        ALTER TABLE orders ADD COLUMN payment_method TEXT DEFAULT 'cash';
    END IF;
    
    -- Add payment_phone_number column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'payment_phone_number'
    ) THEN
        ALTER TABLE orders ADD COLUMN payment_phone_number TEXT;
    END IF;
    
    -- Add payment_status column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'payment_status'
    ) THEN
        ALTER TABLE orders ADD COLUMN payment_status TEXT DEFAULT 'pending';
    END IF;
END $$;

-- Ensure created_at exists in user_profiles
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' AND column_name = 'created_at'
    ) THEN
        ALTER TABLE user_profiles ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE user_profiles ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

-- Update existing rows
UPDATE user_profiles SET created_at = NOW() WHERE created_at IS NULL;
UPDATE user_profiles SET updated_at = NOW() WHERE updated_at IS NULL;

-- Now fix RLS policies - drop ALL existing ones using a loop to catch everything
DO $$
DECLARE
    r RECORD;
BEGIN
    -- Drop all policies on user_profiles
    FOR r IN (SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_profiles') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON user_profiles';
    END LOOP;
    
    -- Drop all policies on products
    FOR r IN (SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'products') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON products';
    END LOOP;
    
    -- Drop all policies on orders
    FOR r IN (SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'orders') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON orders';
    END LOOP;
    
    -- Drop all policies on order_items
    FOR r IN (SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'order_items') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON order_items';
    END LOOP;
END $$;

-- Create simple, non-recursive policies for user_profiles
-- Allow authenticated users to read all profiles (for admin dashboard)
CREATE POLICY "user_profiles_read_all_authenticated"
    ON user_profiles FOR SELECT
    USING (auth.uid() IS NOT NULL);

-- Allow users to insert their own profile
CREATE POLICY "user_profiles_insert_own"
    ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "user_profiles_update_own"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Fix products policies
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
DROP POLICY IF EXISTS "products_authenticated_insert" ON products;
DROP POLICY IF EXISTS "products_authenticated_update" ON products;
DROP POLICY IF EXISTS "products_authenticated_delete" ON products;

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

-- Fix orders policies
DROP POLICY IF EXISTS "Users can create orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Admins can update order status" ON orders;
DROP POLICY IF EXISTS "orders_select_policy" ON orders;
DROP POLICY IF EXISTS "orders_insert_policy" ON orders;
DROP POLICY IF EXISTS "orders_policy" ON orders;
DROP POLICY IF EXISTS "orders_public_insert" ON orders;
DROP POLICY IF EXISTS "orders_select_own_or_admin" ON orders;
DROP POLICY IF EXISTS "orders_admin_update" ON orders;
DROP POLICY IF EXISTS "orders_authenticated_insert" ON orders;
DROP POLICY IF EXISTS "orders_authenticated_select" ON orders;
DROP POLICY IF EXISTS "orders_authenticated_update" ON orders;

CREATE POLICY "orders_authenticated_insert"
    ON orders FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "orders_authenticated_select"
    ON orders FOR SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "orders_authenticated_update"
    ON orders FOR UPDATE
    USING (auth.uid() IS NOT NULL);

-- Fix order_items policies
DROP POLICY IF EXISTS "Users can create order items" ON order_items;
DROP POLICY IF EXISTS "Users can view their own order items" ON order_items;
DROP POLICY IF EXISTS "order_items_policy" ON order_items;
DROP POLICY IF EXISTS "order_items_public_insert" ON order_items;
DROP POLICY IF EXISTS "order_items_select_own_or_admin" ON order_items;
DROP POLICY IF EXISTS "order_items_authenticated_insert" ON order_items;
DROP POLICY IF EXISTS "order_items_authenticated_select" ON order_items;

CREATE POLICY "order_items_authenticated_insert"
    ON order_items FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "order_items_authenticated_select"
    ON order_items FOR SELECT
    USING (auth.uid() IS NOT NULL);

