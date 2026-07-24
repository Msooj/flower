-- Create blogs table for Flower Lifestyle
-- This table will store blog posts and articles

CREATE TABLE IF NOT EXISTS blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author TEXT DEFAULT 'Flower Lifestyle',
    category TEXT DEFAULT 'general',
    image TEXT,
    published BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);

-- Create index on published status
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);

-- Create index on category
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can read published blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can read all blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can insert blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can update blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can delete blogs" ON blogs;

-- Policy: Allow authenticated users to read published blogs
CREATE POLICY "Authenticated users can read published blogs"
ON blogs FOR SELECT
TO authenticated
USING (published = true);

-- Policy: Allow all authenticated users to read all blogs (for admin panel access)
CREATE POLICY "Authenticated users can read all blogs"
ON blogs FOR SELECT
TO authenticated
USING (true);

-- Policy: Allow admins to insert blogs
CREATE POLICY "Admins can insert blogs"
ON blogs FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Policy: Allow admins to update blogs
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

-- Policy: Allow admins to delete blogs
CREATE POLICY "Admins can delete blogs"
ON blogs FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Insert sample blog post (only if it doesn't exist)
INSERT INTO blogs (title, slug, excerpt, content, author, category, image, published, featured, published_at)
SELECT 
    'The Art of Flower Arranging: A Beginner''s Guide',
    'the-art-of-flower-arranging-a-beginners-guide',
    'Discover the secrets to creating stunning floral arrangements that will brighten any room and bring joy to your home.',
    'Flower arranging is an art form that has been practiced for centuries. Whether you''re looking to create a simple bouquet for your dining table or an elaborate centerpiece for a special occasion, understanding the basics of flower arranging can help you achieve beautiful results.

In this guide, we''ll cover the essential techniques and tips you need to get started with flower arranging, from choosing the right flowers to creating balanced compositions that showcase the natural beauty of each bloom.

Choosing Your Flowers
The first step in creating a beautiful arrangement is selecting the right flowers. Consider the color palette you want to achieve, the season, and the occasion. Fresh flowers from Flower Lifestyle are always the best choice, as they''re guaranteed to be of the highest quality.

Tools You''ll Need
- Sharp scissors or floral shears
- A clean vase or container
- Floral foam (optional)
- Water and flower food
- Ribbon or decorative elements (optional)

Basic Arranging Techniques
1. Start with a clean vase filled with fresh water
2. Trim stems at an angle for better water absorption
3. Remove leaves that will be below the water line
4. Start with your largest flowers as the focal point
5. Fill in with smaller flowers and greenery
6. Step back and adjust as needed

With practice, you''ll develop your own style and create stunning arrangements that bring beauty and joy to any space.',
    'Flower Lifestyle',
    'tips',
    'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800',
    true,
    true,
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM blogs WHERE slug = 'the-art-of-flower-arranging-a-beginners-guide'
);

SELECT * FROM blogs ORDER BY created_at DESC LIMIT 1;
