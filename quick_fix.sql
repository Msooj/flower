-- Quick database fix and population script
-- Run this in your Supabase SQL Editor

-- First, let's temporarily disable RLS to insert data
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;

-- Clear and populate products
DELETE FROM products;
INSERT INTO products (id, name, description, price, original_price, category, image, badge, rating, reviews, stock) VALUES
('1', 'Red Rose Bouquet', 'Classic dozen red roses - perfect for expressing love', 5000, NULL, 'roses', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500', 'Bestseller', 4.9, 234, 50),
('2', 'Pink Paradise', 'Beautiful pink roses arrangement with babys breath', 4500, 6000, 'roses', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500', 'Sale', 4.8, 189, 30),
('3', 'Birthday Celebration', 'Colorful birthday flower arrangement with balloons', 6000, NULL, 'birthday', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500', 'New', 5.0, 45, 25),
('4', 'Romance Special', 'Premium roses for your loved one with chocolates', 8000, 10000, 'romance', 'https://images.unsplash.com/photo-1522057306606-cd098ced7c1f?w=500', 'Premium', 5.0, 312, 15),
('5', 'Sympathy Arrangement', 'Peaceful white lilies and roses', 7000, NULL, 'sympathy', 'https://images.unsplash.com/photo-1581378919990-71e869c1c25b?w=500', NULL, 4.7, 87, 20),
('6', 'Sunflower Delight', 'Bright and cheerful sunflowers bouquet', 4000, NULL, 'birthday', 'https://images.unsplash.com/photo-1597848212624-e30a98c1e145?w=500', 'Bestseller', 4.9, 156, 40),
('7', 'Tulip Garden', 'Mixed tulips in vibrant spring colors', 5500, NULL, 'roses', 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500', 'New', 4.8, 92, 35),
('8', 'Orchid Elegance', 'Exotic orchid arrangement in a beautiful vase', 9000, 11000, 'romance', 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=500', 'Premium', 5.0, 203, 10);

-- Re-enable RLS with simple policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to prevent conflicts
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename);
    END LOOP;
END $$;

-- Create simple, working policies
CREATE POLICY "products_policy" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "user_profiles_policy" ON user_profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "orders_policy" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "order_items_policy" ON order_items FOR ALL USING (true) WITH CHECK (true);

-- Verify data
SELECT 'Products inserted:' as info, COUNT(*) as count FROM products;
SELECT 'Sample products:' as info, id, name, price FROM products LIMIT 3;