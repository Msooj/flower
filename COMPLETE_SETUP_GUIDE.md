# Complete Setup Guide - Flower Lifestyle Shop

## 🚀 What's Been Implemented

I've built a complete flower shop system with all the features you requested:

### ✅ User Authentication
- **Login Page** (`/login`) - Fully functional with Supabase authentication
- **Signup Page** (`/signup`) - User registration with automatic profile creation
- Users can log in/sign up and their sessions are managed by Supabase

### ✅ Admin System
- **Admin Login** - Only users with 'admin' role can access admin panel
- **Admin Email**: flowerlifestyle@gmail.com
- **Platform**: Supabase Auth (you need to create this account first)
- **Order Management**: View all orders, update status to delivered/processing/cancelled
- **Product Management**: Add new flower products
- **View Customer Messages**: See personalized messages for each order

### ✅ Order System with Personalized Messages
- **Cart Page** (`/cart`) - Add/remove items, update quantities
- **Checkout Form** with:
  - Customer details (name, email, phone, address)
  - **Personalized Message** (up to 500 characters) - sent with flowers
  - **Delivery Date** preference
  - **Delivery Time** (morning/afternoon/evening)
- Orders saved to Supabase database

### ✅ Admin Order Management
- View all orders with full details
- See personalized messages customers wrote
- Update order status: pending → processing → delivered
- Cancel orders if needed
- View delivery preferences

## 📋 Setup Steps

### STEP 1: Set Up Supabase Database

1. **Go to**: https://supabase.com/dashboard
2. **Sign in** and select your project (duazdpldzqodpucqoyta)
3. **Click "SQL Editor"** in the sidebar
4. **Copy the entire contents** of `database_setup.sql`
5. **Paste and click "Run"**

This will create:
- ✅ user_profiles table (stores user roles)
- ✅ products table (8 sample flowers included)
- ✅ orders table (with personalized_message, delivery_date, delivery_time fields)
- ✅ order_items table
- ✅ Row Level Security policies
- ✅ Automatic profile creation trigger

### STEP 2: Create Admin Account

1. **Go to** Supabase Dashboard → Authentication → Users
2. **Click "Add User"** or **"Invite User"**
3. **Email**: flowerlifestyle@gmail.com
4. **Password**: syndicate1812
5. After creating, **go to SQL Editor** and run:
```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'flowerlifestyle@gmail.com';
```

### STEP 3: Test Your Website

Your servers are already running:
- **Frontend**: http://localhost:3001
- **Backend**: http://localhost:8000

#### Test User Flow:
1. Go to `/signup` - Create a customer account
2. Browse products on home page
3. Add flowers to cart
4. Go to `/cart`
5. Click "Proceed to Checkout"
6. Fill in delivery details
7. Add a personalized message (e.g., "Happy Birthday Mom! Love, Sarah")
8. Choose delivery date and time
9. Place order

#### Test Admin Flow:
1. Go to `/login`
2. Login with: flowerlifestyle@gmail.com / syndicate1812
3. You'll be redirected to `/admin`
4. Click "Orders" tab
5. You'll see all customer orders with:
   - Customer details
   - Personalized messages
   - Delivery preferences
   - Order items
6. Change order status to "Processing" or "Delivered"
7. Click "Add Product" tab to add new flowers

## 🔧 Configuration Files Already Set

### Frontend (.env)
```
VITE_BACKEND_URL=http://localhost:8000
VITE_ADMIN_USERNAME=flowerlifestyle@gmail.com
VITE_ADMIN_PASSWORD=syndicate1812
VITE_SUPABASE_URL=https://duazdpldzqodpucqoyta.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_aUd0PD0wpnKSN7cLOO2cbw_i52hwuzN
```

### Backend (.env)
```
SUPABASE_URL="https://duazdpldzqodpucqoyta.supabase.co"
SUPABASE_KEY="sb_publishable_aUd0PD0wpnKSN7cLOO2cbw_i52hwuzN"
CORS_ORIGINS="*"
```

## 📊 Database Schema

### user_profiles
- id (UUID, links to auth.users)
- email
- full_name
- phone
- address
- **role** ('customer' or 'admin')
- created_at, updated_at

### products
- id, name, description
- price, original_price
- category (roses, birthday, romance, sympathy)
- image, badge (Bestseller, New, Sale, Premium)
- rating, reviews, stock
- created_at, updated_at

### orders
- id, user_id
- customer_name, customer_email, customer_phone
- customer_address
- **personalized_message** ⭐ NEW
- **delivery_date** ⭐ NEW
- **delivery_time** (morning/afternoon/evening) ⭐ NEW
- total_amount
- **status** (pending/processing/delivered/cancelled)
- created_at, updated_at

### order_items
- id, order_id, product_id
- product_name, quantity, price
- created_at

## 🎯 Key Features

### For Customers:
1. ✅ Browse beautiful flower products
2. ✅ Add to cart and manage quantities
3. ✅ **Write personalized messages** to send with flowers
4. ✅ Choose delivery date and preferred time
5. ✅ Secure checkout
6. ✅ Order tracking

### For Admin:
1. ✅ View all customer orders
2. ✅ **See personalized messages** from customers
3. ✅ View delivery preferences (date/time)
4. ✅ **Update order status** (pending → processing → delivered)
5. ✅ Cancel orders if needed
6. ✅ Add new flower products
7. ✅ View customer contact details

## 🔒 Security

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Customers can only see their own orders
- ✅ Admins can see and manage all orders
- ✅ Only admins can add/edit/delete products
- ✅ Secure authentication with Supabase

## 🆘 Troubleshooting

### If login doesn't work:
1. Make sure you've created the admin user in Supabase Auth
2. Verify the user's role is set to 'admin' in user_profiles table

### If checkout fails:
1. Make sure you've run the database_setup.sql script
2. Check that tables exist in Supabase
3. Verify RLS policies are enabled

### If products don't show:
1. Check that database_setup.sql was run (it inserts 8 products)
2. Verify frontend can connect to Supabase (check browser console)

## 📱 Next Steps (Optional Enhancements)

- Add email notifications when order status changes
- Add payment gateway integration (Stripe/M-Pesa)
- Add product images upload to Supabase Storage
- Add order history page for customers
- Add analytics dashboard for admin
- Add product reviews and ratings
- Add inventory management

## 🎉 You're All Set!

Your flower shop now has:
- ✅ Complete user authentication
- ✅ Admin panel with order management
- ✅ Personalized message feature
- ✅ Delivery date/time preferences
- ✅ Order status updates
- ✅ Product management

Just complete STEP 1 and STEP 2 above, then your website will be fully functional!
