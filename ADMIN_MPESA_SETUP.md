# Flower Shop - Admin & M-Pesa Setup Guide

## 🚀 Quick Setup

### 1. Database Setup
Run the following SQL scripts in your Supabase SQL Editor:

1. **First time setup**: Run `database_setup.sql`
2. **If updating existing database**: Run `database_migration.sql`

### 2. Backend Configuration

Update your `backend/.env` file with M-Pesa credentials:

```env
# M-Pesa Configuration
MPESA_CONSUMER_KEY="your_consumer_key_here"
MPESA_CONSUMER_SECRET="your_consumer_secret_here"
MPESA_BUSINESS_SHORTCODE="174379"
MPESA_PASSKEY="your_passkey_here"
MPESA_CALLBACK_URL="https://your-domain.com/api/mpesa/callback"
MPESA_ENVIRONMENT="sandbox"  # Change to "production" for live
```

### 3. Create Admin User

1. Sign up normally through the website
2. In Supabase SQL Editor, run:
```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';
```

## ✅ Features Working

### Admin Panel (`/admin`)
- ✅ **Order Management**: View, update order status
- ✅ **Product Management**: Add, edit, delete products
- ✅ **Authentication**: Role-based access control
- ✅ **Real-time Updates**: Automatic data refresh

### M-Pesa Integration
- ✅ **Payment Display**: Shows business number (0742 370 307)
- ✅ **STK Push**: Automatic payment requests (when configured)
- ✅ **Fallback**: Manual payment instructions
- ✅ **Order Tracking**: Payment status in admin panel

## 🔧 Admin Functions

### Product Management
- **Add Products**: Complete form validation
- **Edit Products**: Inline editing with save/cancel
- **Delete Products**: Confirmation dialog
- **Stock Management**: Track inventory levels

### Order Management
- **View Orders**: Complete order details
- **Status Updates**: pending → processing → delivered
- **Payment Tracking**: M-Pesa integration status
- **Customer Info**: Full delivery details

## 📱 M-Pesa Setup (Optional)

To enable automatic M-Pesa payments:

1. **Get M-Pesa Credentials**:
   - Register at [Safaricom Developer Portal](https://developer.safaricom.co.ke)
   - Create an app and get Consumer Key/Secret
   - Get Business Shortcode and Passkey

2. **Update Environment Variables**:
   - Add credentials to `backend/.env`
   - Set callback URL to your domain

3. **Test Integration**:
   - Use sandbox credentials first
   - Test with Safaricom test numbers

## 🚨 Current Status

### ✅ Working Features
- Admin authentication and authorization
- Complete product CRUD operations
- Order management system
- M-Pesa payment display (manual)
- Database relationships and constraints

### ⚠️ Manual M-Pesa (Current)
- Customers see payment number: **0742 370 307**
- Orders created with payment method tracking
- Admin can see payment phone numbers
- Manual verification process

### 🔄 Auto M-Pesa (With Setup)
- Automatic STK Push to customer phone
- Real-time payment verification
- Automatic order status updates
- Payment callback handling

## 🛠️ Troubleshooting

### Admin Access Issues
```sql
-- Check user role
SELECT email, role FROM user_profiles WHERE email = 'your-email@example.com';

-- Grant admin access
UPDATE user_profiles SET role = 'admin' WHERE email = 'your-email@example.com';
```

### Product Management Issues
- Ensure all required fields are filled
- Check image URLs are valid
- Verify price is a positive number

### M-Pesa Issues
- Check backend environment variables
- Verify Safaricom credentials
- Test with sandbox first

## 📞 Support

For M-Pesa integration support:
- Safaricom Developer Portal: https://developer.safaricom.co.ke
- M-Pesa API Documentation: Available in developer portal

The system is fully functional for manual M-Pesa payments and complete admin management!