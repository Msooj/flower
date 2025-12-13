import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Configuration Check:');
console.log('URL:', supabaseUrl ? 'Found' : 'Missing', supabaseUrl);
console.log('Key:', supabaseKey ? 'Found' : 'Missing');

if (!supabaseUrl) console.error('CRITICAL: VITE_SUPABASE_URL is missing in .env');
if (!supabaseKey) console.error('CRITICAL: VITE_SUPABASE_ANON_KEY is missing in .env');

// Fallback to prevent app crash if variables are missing
const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseKey || 'placeholder-key';

if (key && !key.startsWith('ey')) {
  console.warn('WARNING: VITE_SUPABASE_ANON_KEY does not appear to be a valid Supabase JWT. It should start with "ey".');
}

export const supabase = createClient(url, key, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export const safeAuthCall = async (authPromise) => {
  try {
    const result = await authPromise
    return result
  } catch (error) {
    console.error('Auth error:', error)
    return { error, data: null }
  }
}
