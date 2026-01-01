# Supabase Database Setup Guide

## Your Supabase Connection Details
- **URL:** [Your Supabase Project URL]
- **Anon Key:** [Your Supabase Anon Key]

## Setup Instructions

### 1. Access Supabase SQL Editor
1. Go to https://supabase.com/dashboard
2. Sign in to your account
3. Select your project ([Your Project Name])
4. Click on "SQL Editor" in the left sidebar

### 2. Run the Database Setup Script
1. Copy the contents of `database_setup.sql` file
2. Paste it into the SQL Editor
3. Click "Run" or press Ctrl+Enter

This will create:
- ✅ `status_checks` table (for API testing)
- ✅ `products` table (for flower products)
- ✅ `orders` table (for customer orders)
- ✅ `order_items` table (for order line items)
- ✅ Row Level Security (RLS) policies
- ✅ 8 sample flower products

### 3. Verify Tables Were Created
1. Click on "Table Editor" in the left sidebar
2. You should see all 4 tables listed
3. Click on "products" to view the sample flower data

### 4. Test the Connection
Visit: http://localhost:3001/
The website should now be able to:
- Display products from the database
- Save orders to the database
- Admin can add new products

## Tables Created

### products
Stores all flower products with:
- name, description, price
- category (roses, birthday, romance, sympathy)
- image URL
- rating and reviews
- stock levels

### orders
Stores customer orders with:
- customer details
- total amount
- order status
- timestamps

### order_items
Links products to orders

### status_checks
For API health monitoring

## Environment Variables Already Configured

### Frontend (.env)
```
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### Backend (.env)
```
SUPABASE_URL="YOUR_SUPABASE_URL"
SUPABASE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
```

## Next Steps

After setting up the database:
1. Refresh your website at http://localhost:3001/
2. Products should load from Supabase
3. Test adding products via admin panel at http://localhost:3001/admin
4. Test placing orders through the cart

## Troubleshooting

If tables aren't showing up:
1. Make sure you're in the correct Supabase project
2. Check that the SQL ran without errors
3. Verify RLS policies are enabled but allow public access for testing

For production:
- Update RLS policies to restrict access
- Add proper authentication
- Protect admin routes
