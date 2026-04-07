-- Add Petal Sonata product to the database
-- Run this in your Supabase SQL Editor

-- Temporarily disable RLS on products for insertion
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Insert Petal Sonata product
INSERT INTO products (id, name, description, price, original_price, category, image, badge, rating, reviews, stock)
VALUES 
  ('petal-sonata', 'Petal Sonata', 'Elegant and sophisticated flower arrangement featuring delicate petals in perfect harmony. A premium choice for special occasions.', 6000, 7500, 'roses', 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=800', 'Premium', 4.9, 167, 25)
ON CONFLICT (id) DO NOTHING;

-- Re-enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Verify the product was inserted
SELECT id, name, category, price FROM products WHERE id = 'petal-sonata';
