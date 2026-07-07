-- Fix: Allow public (anon) users and Googlebot to read published blogs
-- Run this in your Supabase SQL Editor

-- Drop old policy that restricted to authenticated users only
DROP POLICY IF EXISTS "Authenticated users can read published blogs" ON blogs;

-- Create new policy allowing ANYONE (anon) to read published blogs
DROP POLICY IF EXISTS "Public can read published blogs" ON blogs;
CREATE POLICY "Public can read published blogs"
ON blogs FOR SELECT
TO anon
USING (published = true);

-- Keep the existing policy for admins to see ALL blogs (including drafts)
-- "Authenticated users can read all blogs" should already exist, but recreate to be safe:
DROP POLICY IF EXISTS "Authenticated users can read all blogs" ON blogs;
CREATE POLICY "Authenticated users can read all blogs"
ON blogs FOR SELECT
TO authenticated
USING (true);

-- Verify policies are set correctly
SELECT schemaname, tablename, policyname, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'blogs'
ORDER BY policyname;
