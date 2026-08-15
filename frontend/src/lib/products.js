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

// ── Module-level cache ───────────────────────────────────────────────────────
// Shared across ALL useProducts() calls in the same browser session.
// Prevents FeaturedProducts + FlowersPage (and any other consumer) from each
// firing their own independent Supabase query on every page visit.
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes stale time
const _cache = {
  data: null,       // normalized product array, or null
  fetchedAt: 0,     // timestamp of last successful fetch
  limit: 0,         // how many items are in the cache
  inFlight: null,   // Promise while a fetch is in progress
};

/** Load products from Supabase with cache + in-flight deduplication. Returns { data, error }. */
export const fetchProductsFromDb = async ({ limit = 50 } = {}) => {
  const now = Date.now();

  // 1. Return cached result if still fresh and covers the requested limit
  if (
    _cache.data &&
    _cache.limit >= limit &&
    now - _cache.fetchedAt < CACHE_TTL_MS
  ) {
    return { data: _cache.data.slice(0, limit), error: null };
  }

  // 2. If a fetch is already running, wait for it — don't fire a second one
  if (_cache.inFlight) {
    const result = await _cache.inFlight;
    return { data: (result.data || []).slice(0, limit), error: result.error };
  }

  // 3. Start a fresh fetch and share the Promise so concurrent callers wait on it
  _cache.inFlight = (async () => {
    const fetchLimit = Math.max(limit, 50); // always fetch ≥50 so cache is reusable
    const { data, error } = await runSupabaseQuery(() =>
      supabase
        .from('products')
        .select(PRODUCT_COLUMNS)
        .order('created_at', { ascending: false })
        .limit(fetchLimit)
    );

    if (error || !data?.length) {
      return { data: [], error: error || null };
    }

    const normalized = data.map(normalizeProduct);
    _cache.data = normalized;
    _cache.fetchedAt = Date.now();
    _cache.limit = normalized.length;
    return { data: normalized, error: null };
  })();

  const result = await _cache.inFlight;
  _cache.inFlight = null; // clear so the next call after TTL starts a new fetch

  return { data: (result.data || []).slice(0, limit), error: result.error };
};

/**
 * Force the cache to expire immediately.
 * Call this after an admin adds, updates, or deletes a product so the
 * public storefront reflects the change on the next page load.
 */
export const invalidateProductCache = () => {
  _cache.data = null;
  _cache.fetchedAt = 0;
  _cache.limit = 0;
  _cache.inFlight = null;
};
