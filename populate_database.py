import os
import sys
from pathlib import Path
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / 'backend' / '.env')

# Supabase connection
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

if not supabase_url or not supabase_key:
    print("Error: SUPABASE_URL and SUPABASE_KEY must be set in .env file")
    sys.exit(1)

supabase: Client = create_client(supabase_url, supabase_key)

def populate_products():
    """Populate the products table with sample data"""
    print("Populating products...")
    
    products = [
        {
            'id': '1',
            'name': 'Red Rose Bouquet',
            'description': 'Classic dozen red roses - perfect for expressing love',
            'price': 5000,
            'original_price': None,
            'category': 'roses',
            'image': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500',
            'badge': 'Bestseller',
            'rating': 4.9,
            'reviews': 234,
            'stock': 50
        },
        {
            'id': '2',
            'name': 'Pink Paradise',
            'description': 'Beautiful pink roses arrangement with baby\'s breath',
            'price': 4500,
            'original_price': 6000,
            'category': 'roses',
            'image': 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500',
            'badge': 'Sale',
            'rating': 4.8,
            'reviews': 189,
            'stock': 30
        },
        {
            'id': '3',
            'name': 'Birthday Celebration',
            'description': 'Colorful birthday flower arrangement with balloons',
            'price': 6000,
            'original_price': None,
            'category': 'birthday',
            'image': 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500',
            'badge': 'New',
            'rating': 5.0,
            'reviews': 45,
            'stock': 25
        },
        {
            'id': '4',
            'name': 'Romance Special',
            'description': 'Premium roses for your loved one with chocolates',
            'price': 8000,
            'original_price': 10000,
            'category': 'romance',
            'image': 'https://images.unsplash.com/photo-1522057306606-cd098ced7c1f?w=500',
            'badge': 'Premium',
            'rating': 5.0,
            'reviews': 312,
            'stock': 15
        },
        {
            'id': '5',
            'name': 'Sympathy Arrangement',
            'description': 'Peaceful white lilies and roses',
            'price': 7000,
            'original_price': None,
            'category': 'sympathy',
            'image': 'https://images.unsplash.com/photo-1581378919990-71e869c1c25b?w=500',
            'badge': None,
            'rating': 4.7,
            'reviews': 87,
            'stock': 20
        },
        {
            'id': '6',
            'name': 'Sunflower Delight',
            'description': 'Bright and cheerful sunflowers bouquet',
            'price': 4000,
            'original_price': None,
            'category': 'birthday',
            'image': 'https://images.unsplash.com/photo-1597848212624-e30a98c1e145?w=500',
            'badge': 'Bestseller',
            'rating': 4.9,
            'reviews': 156,
            'stock': 40
        },
        {
            'id': '7',
            'name': 'Tulip Garden',
            'description': 'Mixed tulips in vibrant spring colors',
            'price': 5500,
            'original_price': None,
            'category': 'roses',
            'image': 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500',
            'badge': 'New',
            'rating': 4.8,
            'reviews': 92,
            'stock': 35
        },
        {
            'id': '8',
            'name': 'Orchid Elegance',
            'description': 'Exotic orchid arrangement in a beautiful vase',
            'price': 9000,
            'original_price': 11000,
            'category': 'romance',
            'image': 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=500',
            'badge': 'Premium',
            'rating': 5.0,
            'reviews': 203,
            'stock': 10
        }
    ]
    
    try:
        # Clear existing products first
        supabase.table('products').delete().neq('id', '').execute()
        
        # Insert new products
        response = supabase.table('products').insert(products).execute()
        print(f"Successfully inserted {len(products)} products")
        return True
    except Exception as e:
        print(f"Error inserting products: {e}")
        return False

def create_admin_user():
    """Instructions for creating admin user"""
    print("\nAdmin User Setup:")
    print("1. Go to your website and sign up with: flowerlifestyle@gmail.com")
    print("2. Then run this SQL in Supabase SQL Editor:")
    print("   UPDATE user_profiles SET role = 'admin' WHERE email = 'flowerlifestyle@gmail.com';")
    print("3. Or use any other email and update accordingly")

def test_connection():
    """Test Supabase connection"""
    print("Testing Supabase connection...")
    try:
        response = supabase.table('products').select('count').execute()
        print("Supabase connection successful!")
        return True
    except Exception as e:
        print(f"Supabase connection failed: {e}")
        return False

def main():
    print("Flower Shop Database Setup")
    print("=" * 40)
    
    # Test connection
    if not test_connection():
        return
    
    # Populate products
    if populate_products():
        print("Database populated successfully!")
    else:
        print("Failed to populate database")
        return
    
    # Admin user instructions
    create_admin_user()
    
    print("\nSetup complete! Your website should now have:")
    print("   • 8 sample flower products")
    print("   • Admin panel ready (after creating admin user)")
    print("   • M-Pesa integration configured")
    print("\nStart your servers:")
    print("   Backend:  cd backend && python -m uvicorn server:app --reload")
    print("   Frontend: cd frontend && npm start")

if __name__ == "__main__":
    main()