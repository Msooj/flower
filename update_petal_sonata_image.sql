-- Update Petal Sonata image URL to use Supabase storage
-- Run this in your Supabase SQL Editor

-- Temporarily disable RLS on products for update
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Update Petal Sonata product with correct Supabase storage image
UPDATE products 
SET image = 'https://duazdpldzqodpucqoyta.supabase.co/storage/v1/object/public/products/products/1766216396653_hd1fdp.jpeg'
WHERE id = 'petal-sonata';

-- Re-enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Verify the update
SELECT id, name, image FROM products WHERE id = 'petal-sonata';
