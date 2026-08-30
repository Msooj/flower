-- ============================================================
-- Fix: Blogs Not Visible in Admin Panel + Update Not Working
-- Run this entire script in your Supabase SQL Editor
-- ============================================================

-- 1. Drop all existing blog policies to start fresh
DROP POLICY IF EXISTS "Authenticated users can read published blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can read all blogs" ON blogs;
DROP POLICY IF EXISTS "Public can read published blogs" ON blogs;
DROP POLICY IF EXISTS "Admins can insert blogs" ON blogs;
DROP POLICY IF EXISTS "Admins can update blogs" ON blogs;
DROP POLICY IF EXISTS "Admins can delete blogs" ON blogs;

-- 2. Allow anyone (anon) to read published blogs (for the public blog page)
CREATE POLICY "Public can read published blogs"
ON blogs FOR SELECT
TO anon
USING (published = true);

-- 3. Allow ALL authenticated users to read ALL blogs (drafts + published)
--    This is what makes blogs visible in the admin panel
CREATE POLICY "Authenticated users can read all blogs"
ON blogs FOR SELECT
TO authenticated
USING (true);

-- 4. Allow admins to insert new blogs
CREATE POLICY "Admins can insert blogs"
ON blogs FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- 5. Allow admins to update blogs
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

-- 6. Allow admins to delete blogs
CREATE POLICY "Admins can delete blogs"
ON blogs FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- 7. Check which users have admin role
SELECT id, email, role FROM public.user_profiles WHERE role = 'admin';

-- 8. If your user is missing admin role, run (replace UUID):
-- UPDATE public.user_profiles SET role = 'admin' WHERE id = 'YOUR-USER-UUID-HERE';

-- 9. Verify policies
SELECT policyname, roles, cmd FROM pg_policies WHERE tablename = 'blogs' ORDER BY policyname;

-- 10. Count blogs
SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE published) AS published, COUNT(*) FILTER (WHERE NOT published) AS drafts FROM blogs;
