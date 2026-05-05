# Supabase SQL Setup Queries for Admin Product Management

## 1. Create User Profiles Table

```sql
CREATE TABLE user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
```

## 2. Insert Admin User Profile

```sql
-- Run this once to create admin profile for your user
-- Replace 'your-email@example.com' with your actual admin email
INSERT INTO user_profiles (id, email, role)
SELECT 
    id, 
    email, 
    'admin' as role
FROM auth.users 
WHERE email = 'your-email@example.com';
```

## 3. Create Products Table (if not exists)

```sql
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    stock INTEGER DEFAULT 100,
    rating DECIMAL(3,2) DEFAULT 5.0,
    reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
```

## 4. RLS Policies for Products Table

```sql
-- Policy 1: Allow admins to do everything
CREATE POLICY "Admins can manage products" ON products
FOR ALL
USING (
    (SELECT role FROM user_profiles WHERE user_profiles.id = auth.uid())
) = 'admin'
WITH CHECK (
    (SELECT role FROM user_profiles WHERE user_profiles.id = auth.uid())
) = 'admin'
);

-- Policy 2: Allow authenticated users to read products
CREATE POLICY "Users can view products" ON products
FOR SELECT
USING (auth.role() = 'authenticated');

-- Policy 3: Allow admins to insert products
CREATE POLICY "Admins can insert products" ON products
FOR INSERT
WITH CHECK (
    (SELECT role FROM user_profiles WHERE user_profiles.id = auth.uid())
) = 'admin'
);

-- Policy 4: Allow admins to update products
CREATE POLICY "Admins can update products" ON products
FOR UPDATE
USING (
    (SELECT role FROM user_profiles WHERE user_profiles.id = auth.uid())
) = 'admin'
WITH CHECK (
    (SELECT role FROM user_profiles WHERE user_profiles.id = auth.uid())
) = 'admin'
);

-- Policy 5: Allow admins to delete products
CREATE POLICY "Admins can delete products" ON products
FOR DELETE
USING (
    (SELECT role FROM user_profiles WHERE user_profiles.id = auth.uid())
) = 'admin';
```

## 5. RLS Policies for User Profiles Table

```sql
-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
FOR SELECT
USING (auth.uid() = id);

-- Allow users to update their own profile (but not role)
CREATE POLICY "Users can update own profile" ON user_profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id AND role = 'user');

-- Allow admins to manage all profiles
CREATE POLICY "Admins can manage profiles" ON user_profiles
FOR ALL
USING (
    (SELECT role FROM user_profiles WHERE user_profiles.id = auth.uid())
) = 'admin'
WITH CHECK (
    (SELECT role FROM user_profiles WHERE user_profiles.id = auth.uid())
) = 'admin'
);
```

## 6. Storage Bucket Setup

```sql
-- Create storage bucket (if not exists)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'products', 
    'products', 
    true, 
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;
```

## 7. Storage Policies

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT
WITH CHECK (
    bucket_id = 'products' AND
    auth.role() = 'authenticated'
);

-- Allow authenticated users to view files
CREATE POLICY "Authenticated users can view" ON storage.objects
FOR SELECT
USING (bucket_id = 'products');

-- Allow authenticated users to update files
CREATE POLICY "Authenticated users can update" ON storage.objects
FOR UPDATE
USING (bucket_id = 'products');

-- Allow admins to delete files
CREATE POLICY "Admins can delete files" ON storage.objects
FOR DELETE
USING (
    bucket_id = 'products' AND
    (SELECT role FROM user_profiles WHERE user_profiles.id = auth.uid())
) = 'admin'
);
```

## 8. Quick Setup Script

```sql
-- Run this script in Supabase SQL Editor to set up everything
-- Replace 'your-admin-email@example.com' with your actual email

-- Step 1: Create admin profile
INSERT INTO user_profiles (id, email, role)
SELECT id, email, 'admin' as role
FROM auth.users 
WHERE email = 'your-admin-email@example.com';

-- Step 2: Verify admin profile was created
SELECT * FROM user_profiles WHERE email = 'your-admin-email@example.com';

-- Step 3: Test product insertion (as admin)
-- This should work if setup is correct
INSERT INTO products (name, description, price, category, image, stock, rating, reviews)
VALUES (
    'Test Product',
    'Test Description',
    100.00,
    'test-category',
    'https://example.com/image.jpg',
    100,
    5.0,
    0
);

-- Step 4: Verify test product was created
SELECT * FROM products WHERE name = 'Test Product';

-- Clean up test data
DELETE FROM products WHERE name = 'Test Product';
```

## 9. Troubleshooting Queries

```sql
-- Check if user profile exists
SELECT * FROM user_profiles WHERE id = 'your-user-id';

-- Check user role
SELECT role FROM user_profiles WHERE id = 'your-user-id';

-- Check all RLS policies on products
SELECT * FROM pg_policies WHERE tablename = 'products';

-- Check storage bucket exists
SELECT * FROM storage.buckets WHERE name = 'products';

-- Check storage policies
SELECT * FROM pg_policies WHERE tablename = 'storage.objects';
```

## 10. Important Notes

1. **Run queries in Supabase SQL Editor** (not in your app)
2. **Replace email placeholders** with your actual admin email
3. **Test with small files first** before uploading large images
4. **Check RLS policies** after creating them
5. **Ensure storage bucket is public** for image access
6. **User authentication** must be working in your app
7. **RLS policies** are applied in order, so be specific
8. **Test admin functionality** after setup

## 11. Common Issues and Solutions

### Issue: "Permission denied" on product insertion
**Solution**: Check if user has role='admin' in user_profiles table

### Issue: "Bucket not found" error
**Solution**: Create 'products' bucket in Supabase Storage

### Issue: "Policy violation" on upload
**Solution**: Check storage policies allow INSERT for authenticated users

### Issue: "No rows returned" for profile
**Solution**: Create user profile for your admin user first
