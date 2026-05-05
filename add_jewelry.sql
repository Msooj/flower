-- Test Product Addition Script for Jewelry
-- Run this in Supabase SQL Editor to add Jewelry product

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
    'Jewelry',
    'Sleek, timeless, and beautifully curated — this elegant jewelry box holds a stunning trio of a necklace, matching earrings, and a classic watch. Designed to elevate any special moment, it''s a refined gift that captures style, sentiment, and lasting impressions… all wrapped in the signature Flower Lifestyle touch.',
    4000.00,
    'mothers-day',
    'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
    100,
    5.0,
    0
);

-- Verify the product was added
SELECT * FROM products WHERE name = 'Jewelry' ORDER BY created_at DESC LIMIT 1;
