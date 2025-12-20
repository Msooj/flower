import { supabase } from './src/lib/supabase.js';

async function testConnection() {
    console.log('Testing Supabase connection...');
    
    try {
        // Test 1: Simple select
        console.log('Test 1: Fetching products...');
        const { data: products, error: productsError } = await supabase
            .from('products')
            .select('*')
            .limit(5);
        
        if (productsError) {
            console.error('Products error:', productsError);
        } else {
            console.log(`✅ Products loaded: ${products?.length || 0} items`);
            if (products?.length > 0) {
                console.log('Sample product:', products[0]);
            }
        }
        
        // Test 2: Check if we can insert (will fail if no permissions, but that's ok)
        console.log('\nTest 2: Testing insert permissions...');
        const testProduct = {
            name: 'Test Product',
            description: 'Test Description',
            price: 1000,
            category: 'roses',
            image: 'https://via.placeholder.com/300',
            stock: 10
        };
        
        const { data: insertData, error: insertError } = await supabase
            .from('products')
            .insert([testProduct])
            .select();
        
        if (insertError) {
            console.error('Insert error (expected if no permissions):', insertError.message);
        } else {
            console.log('✅ Insert successful:', insertData);
            
            // Clean up test product
            if (insertData?.[0]?.id) {
                await supabase.from('products').delete().eq('id', insertData[0].id);
                console.log('✅ Test product cleaned up');
            }
        }
        
    } catch (error) {
        console.error('❌ Connection test failed:', error);
    }
}

testConnection();