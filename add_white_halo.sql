-- Test Product Addition Script for White Halo
-- Run this in Supabase SQL Editor to add White Halo product

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
    'White Halo',
    'Pure, timeless, and effortlessly luxurious — this 100 stem white rose bouquet is gracefully surrounded by soft gypsophila, creating a cloud-like finish that feels both serene and grand. A symbol of elegance, sincerity, and refined love, it''s a perfect statement piece for unforgettable moments… wrapped in the true Flower Lifestyle essence.',
    5500.00,
    'mothers-day',
    'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
    100,
    5.0,
    0
);

-- Verify the product was added
SELECT * FROM products WHERE name = 'White Halo' ORDER BY created_at DESC LIMIT 1;
