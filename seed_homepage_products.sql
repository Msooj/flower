-- Seed homepage products so they exist in the database
-- Run this in your Supabase SQL Editor AFTER the tables are created

-- Temporarily disable RLS on products for seeding
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Insert products that match the homepage mock data
-- This will skip products that already exist (based on id)
INSERT INTO products (id, name, description, price, original_price, category, image, badge, rating, reviews, stock)
VALUES
  ('hp1', 'Pink Rose Elegance', 'Beautiful pink rose bouquet, as seen on the homepage featured section.', 4500, 5200, 'roses', 'https://images.unsplash.com/photo-1712258093579-190d48841a93?w=500', 'Bestseller', 4.8, 124, 50),
  ('hp2', 'Blush Peony Bouquet', 'Soft blush peonies perfect for birthdays and celebrations.', 6800, NULL, 'birthday', 'https://images.unsplash.com/photo-1599215966323-88d801b84771?w=500', 'New', 4.9, 89, 40),
  ('hp3', 'Romance Rose Box', 'Romantic mixed rose box ideal for special occasions.', 7200, 8500, 'romance', 'https://images.unsplash.com/photo-1712258091779-48b46ad77437?w=500', 'Sale', 4.7, 156, 30),
  ('hp4', 'Luxury Vase Arrangement', 'Premium vase arrangement for anniversaries and milestones.', 9600, NULL, 'anniversary', 'https://images.unsplash.com/photo-1722289702402-2bbd33f3e328?w=500', NULL, 5.0, 45, 20),
  ('hp5', 'Sweet Pink Tulips', 'Sweet and simple pink tulip arrangement.', 3200, NULL, 'birthday', 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500', NULL, 4.6, 78, 35),
  ('hp6', 'Romantic Red & Pink Mix', 'Romantic mix of red and pink blooms.', 5500, 6200, 'romance', 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=500', 'Popular', 4.8, 203, 40),
  ('hp7', 'Celebration Combo', 'Perfect celebration combo bouquet.', 8900, NULL, 'combos', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500', NULL, 4.5, 67, 25),
  ('hp8', 'Garden Fresh Bouquet', 'Fresh garden-style bouquet as seen on homepage.', 4200, NULL, 'birthday', 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500', NULL, 4.7, 91, 30),
  ('hp9', 'Eternal Love Roses', 'Eternal love premium rose arrangement.', 11500, 13000, 'anniversary', 'https://images.unsplash.com/photo-1518882605630-8eb578d60a6d?w=500', 'Premium', 4.9, 134, 15),
  ('hp10', 'Pastel Dreams', 'Soft pastel bouquet ideal for many occasions.', 5800, NULL, 'roses', 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500', NULL, 4.6, 56, 30),
  ('hp11', 'White Lily Sympathy', 'White lily sympathy arrangement.', 6500, NULL, 'sympathy', 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=500', NULL, 4.8, 42, 20),
  ('hp12', 'Chocolate & Roses Combo', 'Chocolate and roses gift combo.', 7800, 8900, 'combos', 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500', 'Gift', 4.9, 178, 25)
ON CONFLICT (id) DO NOTHING;

-- Re-enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Verify the products were inserted
SELECT COUNT(*) AS total_products FROM products;
SELECT id, name, category, price FROM products ORDER BY created_at DESC LIMIT 5;


