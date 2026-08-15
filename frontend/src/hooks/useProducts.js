import { useState, useEffect, useCallback } from 'react';
import { fetchProductsFromDb } from '../lib/products';

/**
 * Shared product loader with DB retries.
 * Products are loaded exclusively from Supabase — no mock fallback.
 */
export function useProducts({ limit = 50 } = {}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [dataSource, setDataSource] = useState('loading');

  const load = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    const { data, error } = await fetchProductsFromDb({ limit });

    if (data.length > 0) {
      setProducts(data);
      setDataSource('database');
    } else {
      setProducts([]);
      setDataSource('empty');
      setLoadError(error);
    }

    setIsLoading(false);
  }, [limit]);

  useEffect(() => {
    load();
  }, [load]);

  return { products, isLoading, loadError, dataSource, retry: load };
};

