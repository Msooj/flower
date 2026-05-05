-- Test Product Addition Script for Petal Sonata
-- Run this in Supabase SQL Editor to add Petal Sonata product

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
    'Petal Sonata',
    'Soft, romantic, and effortlessly graceful — this bouquet blends delicate pink roses with blooming pink lilies, creating a harmonious expression of love and admiration. With its gentle tones and luxurious feel, it''s a perfect piece for sweet moments, warm gestures, and unforgettable Flower Lifestyle elegance.',
    5000.00,
    'mothers-day',
    'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
    100,
    5.0,
    0
);

-- Verify the product was added
SELECT * FROM products WHERE name = 'Petal Sonata' ORDER BY created_at DESC LIMIT 1;
