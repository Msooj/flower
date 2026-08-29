-- Fix Products RLS Policies for Public Read Access
-- Run this in Supabase SQL Editor to ensure products appear on shop page

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to products" ON products;
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;

-- Create policy to allow public (including anon) read access to products
CREATE POLICY "Allow public read access to products"
    ON products FOR SELECT
    USING (true);

-- Create policy for admins to insert products
CREATE POLICY "Admins can insert products"
    ON products FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create policy for admins to update products
CREATE POLICY "Admins can update products"
    ON products FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create policy for admins to delete products
CREATE POLICY "Admins can delete products"
    ON products FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Verify policies are created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'products';

-- Check if products exist
SELECT COUNT(*) AS product_count FROM products;
