import { useState, useEffect, useCallback } from 'react';
import { fetchProductsFromDb } from '../lib/products';
import { allProducts } from '../data/mock';

/**
 * Shared product loader with DB retries and optional mock fallback.
 */
export function useProducts({ limit = 50, fallbackToMock = true } = {}) {
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
