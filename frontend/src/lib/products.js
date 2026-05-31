import { supabase } from './supabase';
import { runSupabaseQuery } from './supabaseFetch';

const PRODUCT_COLUMNS =
  'id, name, price, original_price, image, category, badge, rating, reviews, stock, description';

export const normalizeProduct = (p) => ({
  id: p.id,
  name: p.name,
  price: Number(p.price) || 0,
  originalPrice: p.original_price ? Number(p.original_price) : null,
  image: p.image || '',
  category: p.category || 'roses',
  badge: p.badge || null,
  rating: Number(p.rating) || 5.0,
  reviews: Number(p.reviews) || 0,
  stock: Number(p.stock) || 0,
  description: p.description || '',
});

/** Load products from Supabase with retries. Returns { data, error }. */
export const fetchProductsFromDb = async ({ limit = 50 } = {}) => {
  const { data, error } = await runSupabaseQuery(() =>
    supabase
      .from('products')
      .select(PRODUCT_COLUMNS)
      .order('created_at', { ascending: false })
      .limit(limit)
  );

  if (error || !data?.length) {
    return { data: [], error: error || null };
  }

  return { data: data.map(normalizeProduct), error: null };
};
