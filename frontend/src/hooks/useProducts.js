import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchProductsFromDb, getCachedProducts } from '../lib/products';

/**
 * Shared product loader with DB retries.
 * Products are loaded exclusively from Supabase — no mock fallback.
 * If the module-level cache is warm, products are returned synchronously
 * (no spinner shown at all).
 */
export function useProducts({ limit = 50 } = {}) {
  // Pre-check the cache so we can initialise with data already available,
  // avoiding a blank-screen flash on pages that have already loaded products.
  const cachedOnMount = useRef(getCachedProducts(limit));

  const [products, setProducts] = useState(cachedOnMount.current ?? []);
  const [isLoading, setIsLoading] = useState(cachedOnMount.current === null);
  const [loadError, setLoadError] = useState(null);

  const load = useCallback(async () => {
    // If cache is still valid, return immediately — no network call, no spinner
    const cached = getCachedProducts(limit);
    if (cached !== null) {
      setProducts(cached);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadError(null);

    const { data, error } = await fetchProductsFromDb({ limit });

    if (data.length > 0) {
      setProducts(data);
    } else {
      setProducts([]);
      setLoadError(error);
    }

    setIsLoading(false);
  }, [limit]);

  useEffect(() => {
    load();
  }, [load]);

  return { products, isLoading, loadError, retry: load };
};
