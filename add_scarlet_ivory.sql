-- Test Product Addition Script for Scarlet Ivory
-- Run this in Supabase SQL Editor to add Scarlet Ivory product

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
    'Scarlet Ivory',
    'timeless blend of love and celebration — this arrangement features fresh red and white chrysanthemums paired with classic red roses, beautifully finished with a custom "Happy Birthday Mum" ribbon. Designed to honor her warmth and strength, it''s a heartfelt birthday gift that speaks elegance, appreciation, and pure Flower Lifestyle charm.',
    3000.00,
    'mothers-day',
    'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
    100,
    5.0,
    0
);

-- Verify the product was added
SELECT * FROM products WHERE name = 'Scarlet Ivory' ORDER BY created_at DESC LIMIT 1;
