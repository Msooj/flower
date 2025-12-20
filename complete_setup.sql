-- Complete database setup for flower shop
-- Run this entire script in Supabase SQL Editor

-- Drop existing tables if they exist
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS status_checks CASCADE;

-- Create user_profiles table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    address TEXT,
    role TEXT NOT NULL DEFAULT 'customer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    category TEXT NOT NULL,
    image TEXT,
    badge TEXT,
    rating DECIMAL(3, 2) DEFAULT 5.0,
    reviews INTEGER DEFAULT 0,
    stock INTEGER DEFAULT 100,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id UUID REFERENCES auth.users(id),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    customer_address TEXT NOT NULL,
    personalized_message TEXT,
    delivery_date DATE,
    delivery_time TEXT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    payment_method TEXT DEFAULT 'cash',
    payment_phone_number TEXT,
    payment_status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE order_items (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES products(id),
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create status_checks table
CREATE TABLE status_checks (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Disable RLS temporarily
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE status_checks DISABLE ROW LEVEL SECURITY;

-- Insert sample products
INSERT INTO products (name, description, price, category, image, stock) VALUES
('Red Rose Bouquet', 'Classic dozen red roses - perfect for expressing love', 5000, 'roses', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500', 50),
('Pink Paradise', 'Beautiful pink roses arrangement with babys breath', 4500, 'roses', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500', 30),
('Birthday Celebration', 'Colorful birthday flower arrangement with balloons', 6000, 'birthday', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500', 25),
('Romance Special', 'Premium roses for your loved one with chocolates', 8000, 'romance', 'https://images.unsplash.com/photo-1522057306606-cd098ced7c1f?w=500', 15),
('Sunflower Delight', 'Bright and cheerful sunflowers bouquet', 4000, 'birthday', 'https://images.unsplash.com/photo-1597848212624-e30a98c1e145?w=500', 40);

-- Enable RLS and create simple policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_checks ENABLE ROW LEVEL SECURITY;

-- Simple policies that allow everything
CREATE POLICY "user_profiles_policy" ON user_profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "products_policy" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "orders_policy" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "order_items_policy" ON order_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "status_checks_policy" ON status_checks FOR ALL USING (true) WITH CHECK (true);

-- Verify setup
SELECT 'Products created:' as info, COUNT(*) as count FROM products;
SELECT 'Tables created successfully' as status;