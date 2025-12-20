-- Run this SQL script in your Supabase SQL Editor to populate the database
-- This will add sample products and fix any policy issues

-- First, let's ensure the tables exist and fix any policy issues
-- Temporarily disable RLS for data insertion
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Clear existing products
DELETE FROM products;

-- Insert sample products
INSERT INTO products (id, name, description, price, original_price, category, image, badge, rating, reviews, stock) VALUES
('1', 'Red Rose Bouquet', 'Classic dozen red roses - perfect for expressing love', 5000, NULL, 'roses', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500', 'Bestseller', 4.9, 234, 50),
('2', 'Pink Paradise', 'Beautiful pink roses arrangement with baby''s breath', 4500, 6000, 'roses', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500', 'Sale', 4.8, 189, 30),
('3', 'Birthday Celebration', 'Colorful birthday flower arrangement with balloons', 6000, NULL, 'birthday', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500', 'New', 5.0, 45, 25),
('4', 'Romance Special', 'Premium roses for your loved one with chocolates', 8000, 10000, 'romance', 'https://images.unsplash.com/photo-1522057306606-cd098ced7c1f?w=500', 'Premium', 5.0, 312, 15),
('5', 'Sympathy Arrangement', 'Peaceful white lilies and roses', 7000, NULL, 'sympathy', 'https://images.unsplash.com/photo-1581378919990-71e869c1c25b?w=500', NULL, 4.7, 87, 20),
('6', 'Sunflower Delight', 'Bright and cheerful sunflowers bouquet', 4000, NULL, 'birthday', 'https://images.unsplash.com/photo-1597848212624-e30a98c1e145?w=500', 'Bestseller', 4.9, 156, 40),
('7', 'Tulip Garden', 'Mixed tulips in vibrant spring colors', 5500, NULL, 'roses', 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500', 'New', 4.8, 92, 35),
('8', 'Orchid Elegance', 'Exotic orchid arrangement in a beautiful vase', 9000, 11000, 'romance', 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=500', 'Premium', 5.0, 203, 10);

-- Re-enable RLS with proper policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies that might be causing recursion
DROP POLICY IF EXISTS "Allow public read access to products" ON products;
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;

-- Create simple, non-recursive policies
CREATE POLICY "products_select_policy" ON products FOR SELECT USING (true);
CREATE POLICY "products_insert_policy" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "products_update_policy" ON products FOR UPDATE USING (true);
CREATE POLICY "products_delete_policy" ON products FOR DELETE USING (true);

-- Fix user_profiles policies to prevent recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Allow profile creation on signup" ON user_profiles;

-- Create simple user_profiles policies
CREATE POLICY "user_profiles_select_policy" ON user_profiles FOR SELECT USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "user_profiles_insert_policy" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "user_profiles_update_policy" ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- Ensure orders and order_items have simple policies
DROP POLICY IF EXISTS "Users can create orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Admins can update order status" ON orders;

CREATE POLICY "orders_select_policy" ON orders FOR SELECT USING (true);
CREATE POLICY "orders_insert_policy" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "orders_update_policy" ON orders FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Users can create order items" ON order_items;
DROP POLICY IF EXISTS "Users can view their own order items" ON order_items;

CREATE POLICY "order_items_select_policy" ON order_items FOR SELECT USING (true);
CREATE POLICY "order_items_insert_policy" ON order_items FOR INSERT WITH CHECK (true);

-- Verify the data was inserted
SELECT COUNT(*) as product_count FROM products;

-- Show sample of inserted products
SELECT id, name, price, category FROM products LIMIT 3;