import { useState, useEffect, useCallback } from 'react';
import { fetchProductsFromDb } from '../lib/products';
import { allProducts } from '../data/mock';

/**
 * Shared product loader with DB retries and optional mock fallback.
 * On first render, mock data is shown immediately (no loading flash).
 * If the DB fetch succeeds, products are upgraded to live data.
 */
export function useProducts({ limit = 50, fallbackToMock = true } = {}) {
  // Initialise with mock data immediately so the page always renders on reload.
  const initialProducts = fallbackToMock ? allProducts.slice(0, limit) : [];
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [dataSource, setDataSource] = useState(fallbackToMock ? 'fallback' : 'loading');

  const load = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    const { data, error } = await fetchProductsFromDb({ limit });

    if (data.length > 0) {
      setProducts(data);
      setDataSource('database');
      setIsLoading(false);
      return;
    }

    if (fallbackToMock) {
      setProducts(allProducts.slice(0, limit));
      setDataSource('fallback');
      if (error) setLoadError(error);
    } else {
      setProducts([]);
      setDataSource('empty');
      setLoadError(error);
    }

    setIsLoading(false);
  }, [limit, fallbackToMock]);

  useEffect(() => {
    load();
  }, [load]);

  return { products, isLoading, loadError, dataSource, retry: load };
};
