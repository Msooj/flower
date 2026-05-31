import { createClient } from '@supabase/supabase-js';
import { createRetryFetch } from './supabaseFetch';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = Boolean(supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder'));

if (import.meta.env.PROD && !isConfigured) {
  console.error(
    '[Flower Lifestyle] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Product data will not load until these are set in your hosting environment.'
  );
}

const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseKey || 'placeholder-key';

export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    fetch: createRetryFetch(3),
  },
});

export const createFreshClient = () =>
  createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true },
    global: { fetch: createRetryFetch(3) },
  });

export const isSupabaseConfigured = isConfigured;

export const safeAuthCall = async (authPromise) => {
  try {
    return await authPromise;
  } catch (error) {
    console.error('Auth error:', error);
    return { error, data: null };
  }
};
