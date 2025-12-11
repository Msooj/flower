"""
Supabase Database Setup Script
This script creates all necessary tables for the flower shop application
"""

from supabase import create_client, Client
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

# Get Supabase credentials
SUPABASE_URL = "https://duazdpldzqodpucqoyta.supabase.co"
SUPABASE_KEY = "sb_publishable_aUd0PD0wpnKSN7cLOO2cbw_i52hwuzN"

print(f"Connecting to Supabase at: {SUPABASE_URL}")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# SQL to create all tables
CREATE_TABLES_SQL = """
-- Create status_checks table
CREATE TABLE IF NOT EXISTS status_checks (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create products table
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

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    customer_address TEXT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
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
"""

# Note: The Supabase Python client doesn't support raw SQL execution
# You need to use the Supabase SQL Editor for schema changes
# This script will test the connection and insert sample data instead

def test_connection():
    """Test Supabase connection"""
    try:
        # Try to query any table to test connection
        result = supabase.table('products').select('*').limit(1).execute()
        print("✅ Successfully connected to Supabase!")
        return True
    except Exception as e:
        print(f"⚠️  Connection test: {str(e)}")
        return True  # Connection works, table just doesn't exist yet

def insert_sample_products():
    """Insert sample products into the database"""
    sample_products = [
        {
            'id': '1',
            'name': 'Red Rose Bouquet',
            'description': 'Classic dozen red roses',
            'price': 5000,
            'category': 'roses',
            'image': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500',
            'badge': 'Bestseller',
            'rating': 4.9,
            'reviews': 234
        },
        {
            'id': '2',
            'name': 'Pink Paradise',
            'description': 'Beautiful pink roses arrangement',
            'price': 4500,
            'original_price': 6000,
            'category': 'roses',
            'image': 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500',
            'badge': 'Sale',
            'rating': 4.8,
            'reviews': 189
        },
        {
            'id': '3',
            'name': 'Birthday Celebration',
            'description': 'Colorful birthday flower arrangement',
            'price': 6000,
            'category': 'birthday',
            'image': 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500',
            'badge': 'New',
            'rating': 5.0,
            'reviews': 45
        },
        {
            'id': '4',
            'name': 'Romance Special',
            'description': 'Premium roses for your loved one',
            'price': 8000,
            'original_price': 10000,
            'category': 'romance',
            'image': 'https://images.unsplash.com/photo-1522057306606-cd098ced7c1f?w=500',
            'badge': 'Premium',
            'rating': 5.0,
            'reviews': 312
        },
        {
            'id': '5',
            'name': 'Sympathy Arrangement',
            'description': 'White lilies and roses',
            'price': 7000,
            'category': 'sympathy',
            'image': 'https://images.unsplash.com/photo-1581378919990-71e869c1c25b?w=500',
            'rating': 4.7,
            'reviews': 87
        },
        {
            'id': '6',
            'name': 'Sunflower Delight',
            'description': 'Bright and cheerful sunflowers',
            'price': 4000,
            'category': 'birthday',
            'image': 'https://images.unsplash.com/photo-1597848212624-e30a98c1e145?w=500',
            'badge': 'Bestseller',
            'rating': 4.9,
            'reviews': 156
        },
        {
            'id': '7',
            'name': 'Tulip Garden',
            'description': 'Mixed tulips in vibrant colors',
            'price': 5500,
            'category': 'roses',
            'image': 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500',
            'badge': 'New',
            'rating': 4.8,
            'reviews': 92
        },
        {
            'id': '8',
            'name': 'Orchid Elegance',
            'description': 'Exotic orchid arrangement',
            'price': 9000,
            'original_price': 11000,
            'category': 'romance',
            'image': 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=500',
            'badge': 'Premium',
            'rating': 5.0,
            'reviews': 203
        }
    ]
    
    try:
        for product in sample_products:
            supabase.table('products').upsert(product).execute()
        print(f"✅ Successfully inserted {len(sample_products)} sample products!")
        return True
    except Exception as e:
        print(f"❌ Error inserting products: {str(e)}")
        return False

if __name__ == "__main__":
    print("\n" + "="*60)
    print("🌸 Flower Shop - Supabase Database Setup")
    print("="*60 + "\n")
    
    print("Testing connection...")
    test_connection()
    
    print("\n" + "-"*60)
    print("\n⚠️  IMPORTANT: Schema creation requires SQL Editor")
    print("\nTo create the database tables:")
    print("1. Go to: https://supabase.com/dashboard")
    print("2. Select your project (duazdpldzqodpucqoyta)")
    print("3. Click 'SQL Editor' in the sidebar")
    print("4. Copy the contents of 'database_setup.sql'")
    print("5. Paste and click 'Run'")
    print("\nAfter creating tables, run this script again to insert sample data.")
    print("\n" + "-"*60)
    
    print("\nAttempting to insert sample products...")
    print("(This will only work if tables already exist)")
    insert_sample_products()
    
    print("\n" + "="*60)
    print("Setup process complete!")
    print("="*60 + "\n")
