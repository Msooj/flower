import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseKey || 'placeholder-key';

console.log('Supabase Init:', { url, keyPrefix: key ? key.substring(0, 10) : 'MISSING' });

export const supabase = createClient(url, key);

export const createFreshClient = () => {
  return createClient(url, key);
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
