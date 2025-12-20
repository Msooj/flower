-- Simple database setup
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

DELETE FROM products;

INSERT INTO products (name, description, price, category, image, stock) VALUES
('Red Rose Bouquet', 'Classic dozen red roses', 5000, 'roses', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500', 50),
('Pink Paradise', 'Beautiful pink roses', 4500, 'roses', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500', 30),
('Birthday Flowers', 'Colorful birthday arrangement', 6000, 'birthday', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500', 25);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_all" ON products FOR ALL USING (true) WITH CHECK (true);

SELECT * FROM products;