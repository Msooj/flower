-- Fix RLS Policies to Prevent Infinite Recursion
-- Run this SQL in your Supabase SQL Editor

-- Drop all existing policies that might cause recursion
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Allow profile creation on signup" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_select_policy" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_insert_policy" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_update_policy" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_policy" ON user_profiles;

-- Drop policies on other tables that might reference user_profiles
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Admins can update order status" ON orders;

-- Create simple, non-recursive policies for user_profiles
-- Allow users to see their own profile
CREATE POLICY "user_profiles_select_own"
    ON user_profiles FOR SELECT
    USING (auth.uid() = id);

-- Allow authenticated users to insert their own profile
CREATE POLICY "user_profiles_insert_own"
    ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "user_profiles_update_own"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = id);

-- Create a security definer function to check admin role without recursion
CREATE OR REPLACE FUNCTION check_admin_role(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role FROM user_profiles WHERE id = user_id;
    RETURN user_role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin policy for viewing all profiles (uses function to avoid recursion)
CREATE POLICY "user_profiles_admin_select"
    ON user_profiles FOR SELECT
    USING (
        auth.uid() = id OR
        check_admin_role(auth.uid())
    );

-- Simple policies for products (public read, admin write)
DROP POLICY IF EXISTS "Allow public read access to products" ON products;
DROP POLICY IF EXISTS "products_select_policy" ON products;
DROP POLICY IF EXISTS "products_insert_policy" ON products;
DROP POLICY IF EXISTS "products_update_policy" ON products;
DROP POLICY IF EXISTS "products_delete_policy" ON products;
DROP POLICY IF EXISTS "products_policy" ON products;

CREATE POLICY "products_public_select"
    ON products FOR SELECT
    USING (true);

CREATE POLICY "products_admin_insert"
    ON products FOR INSERT
    WITH CHECK (check_admin_role(auth.uid()));

CREATE POLICY "products_admin_update"
    ON products FOR UPDATE
    USING (check_admin_role(auth.uid()));

CREATE POLICY "products_admin_delete"
    ON products FOR DELETE
    USING (check_admin_role(auth.uid()));

-- Simple policies for orders
DROP POLICY IF EXISTS "Users can create orders" ON orders;
DROP POLICY IF EXISTS "orders_select_policy" ON orders;
DROP POLICY IF EXISTS "orders_insert_policy" ON orders;
DROP POLICY IF EXISTS "orders_policy" ON orders;

CREATE POLICY "orders_public_insert"
    ON orders FOR INSERT
    WITH CHECK (true);

CREATE POLICY "orders_select_own_or_admin"
    ON orders FOR SELECT
    USING (
        auth.uid() = user_id OR
        check_admin_role(auth.uid())
    );

CREATE POLICY "orders_admin_update"
    ON orders FOR UPDATE
    USING (check_admin_role(auth.uid()));

-- Simple policies for order_items
DROP POLICY IF EXISTS "Users can create order items" ON order_items;
DROP POLICY IF EXISTS "Users can view their own order items" ON order_items;
DROP POLICY IF EXISTS "order_items_policy" ON order_items;

CREATE POLICY "order_items_public_insert"
    ON order_items FOR INSERT
    WITH CHECK (true);

CREATE POLICY "order_items_select_own_or_admin"
    ON order_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND (
                orders.user_id = auth.uid() OR
                check_admin_role(auth.uid())
            )
        )
    );

-- Ensure created_at column exists in user_profiles (if it doesn't)
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

-- Update existing rows to have created_at if null
UPDATE user_profiles SET created_at = NOW() WHERE created_at IS NULL;

