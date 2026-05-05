-- Test Product Addition Script
-- Run this in Supabase SQL Editor to add the Crimson Luxe Package

INSERT INTO products (
    name, 
    description, 
    price, 
    category, 
    image, 
    stock, 
    rating, 
    reviews
) VALUES (
    'Crimson Luxe Package',
    'A bold expression of love and indulgence — 60 velvety red roses paired with a sleek jewelry box and a bottle of Luc Belaire. Crafted for grand gestures, this set speaks passion, elegance, and unforgettable moments.',
    13000.00,
    'mothers-day',
    'https://duazdpldzqodpucqoyta.supabase.co/storage/v1/object/public/products/products/1777980659692_nnr7s.jpeg',
    100,
    5.0,
    0
);

-- Verify the product was added
SELECT * FROM products WHERE name = 'Crimson Luxe Package' ORDER BY created_at DESC LIMIT 1;
