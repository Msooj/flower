-- Test Product Addition Script for Lilac Whisper
-- Run this in Supabase SQL Editor to add Lilac Whisper product

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
    'Lilac Whisper',
    'Soft whites, gentle lilacs, and a message straight from the heart — Happy Birthday Mum. 💜🤍 A graceful bouquet made to celebrate her love, her strength, and her endless warmth… wrapped in the true Flower Lifestyle way.',
    3500.00,
    'mothers-day',
    'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
    100,
    5.0,
    0
);

-- Verify the product was added
SELECT * FROM products WHERE name = 'Lilac Whisper' ORDER BY created_at DESC LIMIT 1;
