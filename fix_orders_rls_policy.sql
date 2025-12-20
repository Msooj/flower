-- Fix RLS Policy for Orders Table
-- This script ensures proper user_id assignment and access control for the orders table

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can create orders" ON orders;
DROP POLICY IF EXISTS "orders_public_insert" ON orders;

-- Create a security definer function to check admin role without recursion
-- (Only if it doesn't exist already from previous fixes)
CREATE OR REPLACE FUNCTION check_admin_role(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    user_role TEXT;
BEGIN
    -- This is a safe way to check the role without causing RLS recursion
    SELECT role INTO user_role 
    FROM user_profiles 
    WHERE id = user_id;
    
    RETURN user_role = 'admin';
EXCEPTION WHEN OTHERS THEN
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policy for creating orders
-- Ensures that the user_id is set to the authenticated user's ID
CREATE POLICY "orders_authenticated_insert"
    ON orders FOR INSERT
    WITH CHECK (
        -- For authenticated users, user_id must match their auth ID
        (auth.uid() IS NOT NULL AND user_id = auth.uid())
        OR
        -- For unauthenticated users, user_id can be NULL (if your schema allows it)
        (auth.uid() IS NULL AND user_id IS NULL)
    );

-- Policy for viewing orders
-- Users can see their own orders, admins can see all
CREATE POLICY "orders_select_own_or_admin"
    ON orders FOR SELECT
    USING (
        auth.uid() = user_id OR
        check_admin_role(auth.uid())
    );

-- Policy for updating orders
-- Only admins can update orders
CREATE POLICY "orders_admin_update"
    ON orders FOR UPDATE
    USING (check_admin_role(auth.uid()));

-- Policy for deleting orders
-- Only admins can delete orders
CREATE POLICY "orders_admin_delete"
    ON orders FOR DELETE
    USING (check_admin_role(auth.uid()));

-- Enable RLS if not already enabled
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Notify the user of successful application
SELECT 'Successfully applied RLS policies to the orders table' AS message;
