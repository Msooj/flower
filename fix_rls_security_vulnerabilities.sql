-- =========================================================================
-- CYBERSECURITY PATCH: Fix Row Level Security (RLS) Vulnerabilities
-- Target Tables: blogs, mpesa_payments
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- =========================================================================

-- 1. SECURE THE 'blogs' TABLE
-- Before: Any logged-in user could insert, update, or delete blog posts.
-- After: Only authenticated users with role = 'admin' in user_profiles can insert, update, or delete blogs.

-- Drop insecure policies
DROP POLICY IF EXISTS "Authenticated users can insert blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can update blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can delete blogs" ON blogs;

-- Re-create secure Admin-only policies for blogs
CREATE POLICY "Admins can insert blogs"
ON blogs FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);

CREATE POLICY "Admins can update blogs"
ON blogs FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);

CREATE POLICY "Admins can delete blogs"
ON blogs FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);


-- 2. SECURE THE 'mpesa_payments' TABLE
-- Before: Any public user could update M-Pesa payment records (including receipt numbers, checkout status).
-- After: Only authenticated users with role = 'admin' can update M-Pesa records.

-- Drop insecure public update policy
DROP POLICY IF EXISTS "Allow mpesa payment updates" ON mpesa_payments;
DROP POLICY IF EXISTS "Admins can update mpesa payments" ON mpesa_payments;

-- Create secure Admin-only policy for updating M-Pesa payments
CREATE POLICY "Admins can update mpesa payments"
ON mpesa_payments FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- OPTIONAL: Secure SELECT access to mpesa_payments
-- Before: Only admins could view. If regular users need to check their transaction logs, they can only select their own.
DROP POLICY IF EXISTS "Users can view their own mpesa payments" ON mpesa_payments;
CREATE POLICY "Users can view their own mpesa payments"
ON mpesa_payments FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM orders
        WHERE orders.id = mpesa_payments.order_id
        AND orders.user_id = auth.uid()
    ) OR
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Verify that the policies were successfully applied
SELECT schemaname, tablename, policyname, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename IN ('blogs', 'mpesa_payments')
ORDER BY tablename, policyname;
