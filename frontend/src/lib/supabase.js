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

if (key && !key.startsWith('ey') && !key.startsWith('sb')) {
  console.warn('WARNING: VITE_SUPABASE_ANON_KEY does not appear to be a valid Supabase key. It should start with "ey" (legacy) or "sb" (new).');
}

export const supabase = createClient(url, key, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true, // Enable OAuth redirect detection
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'supabase.auth.token',
    flowType: 'pkce' // Use PKCE flow for better security
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-client-info': 'flower-shop-admin'
    }
  }
})

// Use the same client instance to avoid multiple instances
export const createFreshClient = () => {
  return supabase
}

export const safeAuthCall = async (authPromise) => {
  try {
    const result = await authPromise
    return result
  } catch (error) {
    console.error('Auth error:', error)
    return { error, data: null }
  }
}
