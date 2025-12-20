-- COMPLETE RLS FIX - Run this in Supabase SQL Editor
-- This will fix all RLS policy issues

-- Step 1: Add missing columns first
DO $$
BEGIN
    -- Orders table columns
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'payment_method'
    ) THEN
        ALTER TABLE orders ADD COLUMN payment_method TEXT DEFAULT 'cash';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'payment_phone_number'
    ) THEN
        ALTER TABLE orders ADD COLUMN payment_phone_number TEXT;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'payment_status'
    ) THEN
        ALTER TABLE orders ADD COLUMN payment_status TEXT DEFAULT 'pending';
    END IF;
    
    -- User profiles columns
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
UPDATE user_profiles SET created_at = COALESCE(created_at, NOW()) WHERE created_at IS NULL;
UPDATE user_profiles SET updated_at = COALESCE(updated_at, NOW()) WHERE updated_at IS NULL;

-- Step 2: Drop ALL existing policies to start fresh
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

-- Step 3: Create simple, non-recursive policies

-- USER_PROFILES: Allow authenticated users to read all profiles (for admin dashboard)
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

-- PRODUCTS: Public read access, authenticated write
CREATE POLICY "products_read_public"
    ON products FOR SELECT
    USING (true);

CREATE POLICY "products_insert_authenticated"
    ON products FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "products_update_authenticated"
    ON products FOR UPDATE
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "products_delete_authenticated"
    ON products FOR DELETE
    USING (auth.uid() IS NOT NULL);

-- ORDERS: Authenticated users can read and write
CREATE POLICY "orders_read_authenticated"
    ON orders FOR SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "orders_insert_authenticated"
    ON orders FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "orders_update_authenticated"
    ON orders FOR UPDATE
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- ORDER_ITEMS: Authenticated users can read and write
CREATE POLICY "order_items_read_authenticated"
    ON order_items FOR SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "order_items_insert_authenticated"
    ON order_items FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Verify policies were created
SELECT 'Policies created successfully' as status;

