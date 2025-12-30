-- Add custom_order_details column to orders table
-- This column will store JSONB data for custom flower orders

-- Add the column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'orders' 
        AND column_name = 'custom_order_details'
    ) THEN
        ALTER TABLE orders ADD COLUMN custom_order_details JSONB;
        
        -- Add comment
        COMMENT ON COLUMN orders.custom_order_details IS 'JSON data for custom flower order details (occasion, flower types, color preferences, etc.)';
        
        RAISE NOTICE 'Column custom_order_details added successfully';
    ELSE
        RAISE NOTICE 'Column custom_order_details already exists';
    END IF;
END $$;

-- Also add delivery_address if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'orders' 
        AND column_name = 'delivery_address'
    ) THEN
        ALTER TABLE orders ADD COLUMN delivery_address TEXT;
        COMMENT ON COLUMN orders.delivery_address IS 'Delivery address for the order';
        RAISE NOTICE 'Column delivery_address added successfully';
    ELSE
        RAISE NOTICE 'Column delivery_address already exists';
    END IF;
END $$;
