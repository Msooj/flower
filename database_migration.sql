-- Migration script to add payment fields to existing orders table
-- Run this in your Supabase SQL Editor if the orders table already exists

-- Add payment columns to orders table if they don't exist
DO $$ 
BEGIN
    -- Add payment_method column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'orders' AND column_name = 'payment_method') THEN
        ALTER TABLE orders ADD COLUMN payment_method TEXT DEFAULT 'cash';
    END IF;
    
    -- Add payment_phone_number column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'orders' AND column_name = 'payment_phone_number') THEN
        ALTER TABLE orders ADD COLUMN payment_phone_number TEXT;
    END IF;
    
    -- Add payment_status column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'orders' AND column_name = 'payment_status') THEN
        ALTER TABLE orders ADD COLUMN payment_status TEXT DEFAULT 'pending';
    END IF;
END $$;

-- Create M-Pesa payments table if it doesn't exist
CREATE TABLE IF NOT EXISTS mpesa_payments (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    phone_number TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    merchant_request_id TEXT,
    checkout_request_id TEXT,
    mpesa_receipt_number TEXT,
    transaction_date TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for M-Pesa payments if not already enabled
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'mpesa_payments' AND policyname = 'Admins can view all mpesa payments'
    ) THEN
        ALTER TABLE mpesa_payments ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Admins can view all mpesa payments"
            ON mpesa_payments FOR SELECT
            USING (
                EXISTS (
                    SELECT 1 FROM user_profiles
                    WHERE id = auth.uid() AND role = 'admin'
                )
            );
        
        CREATE POLICY "Allow mpesa payment creation"
            ON mpesa_payments FOR INSERT
            WITH CHECK (true);
        
        CREATE POLICY "Allow mpesa payment updates"
            ON mpesa_payments FOR UPDATE
            USING (true);
    END IF;
END $$;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_mpesa_payments_order_id ON mpesa_payments(order_id);
CREATE INDEX IF NOT EXISTS idx_mpesa_payments_checkout_request_id ON mpesa_payments(checkout_request_id);

-- Update existing orders to have default payment method
UPDATE orders SET payment_method = 'cash' WHERE payment_method IS NULL;
UPDATE orders SET payment_status = 'pending' WHERE payment_status IS NULL;