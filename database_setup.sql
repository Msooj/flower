-- Supabase Database Setup for Flower Shop
-- Run this SQL in your Supabase SQL Editor

-- Create status_checks table
CREATE TABLE IF NOT EXISTS status_checks (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_profiles table to store additional user info
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    address TEXT,
    role TEXT NOT NULL DEFAULT 'customer', -- 'customer' or 'admin'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create products table for the flower shop
CREATE TABLE IF NOT EXISTS products (
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

-- Create orders table with personalized message support
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id UUID REFERENCES auth.users(id),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    customer_address TEXT NOT NULL,
    personalized_message TEXT, -- Message to be delivered with flowers
    delivery_date DATE, -- Preferred delivery date
    delivery_time TEXT, -- Preferred delivery time (morning/afternoon/evening)
    total_amount DECIMAL(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, delivered, cancelled
    payment_method TEXT DEFAULT 'cash', -- mpesa, cash
    payment_phone_number TEXT, -- M-Pesa phone number
    payment_status TEXT DEFAULT 'pending', -- pending, paid, failed
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES products(id),
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE status_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- RLS POLICIES
-- ==========================================

-- User Profiles Policies
CREATE POLICY "Users can view their own profile"
    ON user_profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Allow profile creation on signup"
    ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
    ON user_profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Products Policies
CREATE POLICY "Allow public read access to products"
    ON products FOR SELECT
    USING (true);

CREATE POLICY "Admins can insert products"
    ON products FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update products"
    ON products FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete products"
    ON products FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Orders Policies
CREATE POLICY "Users can create orders"
    ON orders FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can view their own orders"
    ON orders FOR SELECT
    USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update order status"
    ON orders FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Order Items Policies
CREATE POLICY "Users can create order items"
    ON order_items FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can view their own order items"
    ON order_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND (orders.user_id = auth.uid() OR
                 EXISTS (
                    SELECT 1 FROM user_profiles
                    WHERE id = auth.uid() AND role = 'admin'
                 ))
        )
    );

-- Status Checks Policies (allow all for testing)
CREATE POLICY "Allow all operations on status_checks"
    ON status_checks FOR ALL
    USING (true)
    WITH CHECK (true);

-- ==========================================
-- SEED DATA
-- ==========================================

-- Insert sample products
INSERT INTO products (id, name, description, price, original_price, category, image, badge, rating, reviews)
VALUES 
    ('1', 'Red Rose Bouquet', 'Classic dozen red roses - perfect for expressing love', 5000, NULL, 'roses', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500', 'Bestseller', 4.9, 234),
    ('2', 'Pink Paradise', 'Beautiful pink roses arrangement with baby''s breath', 4500, 6000, 'roses', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500', 'Sale', 4.8, 189),
    ('3', 'Birthday Celebration', 'Colorful birthday flower arrangement with balloons', 6000, NULL, 'birthday', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500', 'New', 5.0, 45),
    ('4', 'Romance Special', 'Premium roses for your loved one with chocolates', 8000, 10000, 'romance', 'https://images.unsplash.com/photo-1522057306606-cd098ced7c1f?w=500', 'Premium', 5.0, 312),
    ('5', 'Sympathy Arrangement', 'Peaceful white lilies and roses', 7000, NULL, 'sympathy', 'https://images.unsplash.com/photo-1581378919990-71e869c1c25b?w=500', NULL, 4.7, 87),
    ('6', 'Sunflower Delight', 'Bright and cheerful sunflowers bouquet', 4000, NULL, 'birthday', 'https://images.unsplash.com/photo-1597848212624-e30a98c1e145?w=500', 'Bestseller', 4.9, 156),
    ('7', 'Tulip Garden', 'Mixed tulips in vibrant spring colors', 5500, NULL, 'roses', 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500', 'New', 4.8, 92),
    ('8', 'Orchid Elegance', 'Exotic orchid arrangement in a beautiful vase', 9000, 11000, 'romance', 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=500', 'Premium', 5.0, 203)
ON CONFLICT (id) DO NOTHING;

-- Create the admin user (you'll need to create this account via Supabase Auth first)
-- After creating the account with email flowerlifestyle@gmail.com, run this:
-- UPDATE user_profiles SET role = 'admin' WHERE email = 'flowerlifestyle@gmail.com';

-- Create M-Pesa payments tracking table
CREATE TABLE IF NOT EXISTS mpesa_payments (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    phone_number TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    merchant_request_id TEXT,
    checkout_request_id TEXT,
    mpesa_receipt_number TEXT,
    transaction_date TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, success, failed
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for M-Pesa payments
ALTER TABLE mpesa_payments ENABLE ROW LEVEL SECURITY;

-- M-Pesa payments policies
CREATE POLICY "Admins can view all mpesa payments"
    ON mpesa_payments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Allow mpesa payment creation"
    ON mpesa_payments FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins can update mpesa payments"
    ON mpesa_payments FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_mpesa_payments_order_id ON mpesa_payments(order_id);
CREATE INDEX IF NOT EXISTS idx_mpesa_payments_checkout_request_id ON mpesa_payments(checkout_request_id);

-- Add comments
COMMENT ON TABLE user_profiles IS 'Extended user information and roles';
COMMENT ON TABLE products IS 'Stores all flower products available in the shop';
COMMENT ON TABLE orders IS 'Stores customer orders with personalized messages';
COMMENT ON TABLE order_items IS 'Stores individual items within each order';
COMMENT ON TABLE status_checks IS 'Test table for API health checks';

-- Create a function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'customer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to run function on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
