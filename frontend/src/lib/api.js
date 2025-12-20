const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};

export const api = {
  products: {
    getAll: () => apiCall('/products'),
    create: (data) => apiCall('/products', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiCall(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiCall(`/products/${id}`, { method: 'DELETE' }),
  },
  orders: {
    getAll: () => apiCall('/orders'),
    updateStatus: (id, status) => apiCall(`/orders/${id}`, { 
      method: 'PUT', 
      body: JSON.stringify({ status: status }) 
    }),
  },
  users: {
    getAll: () => apiCall('/users'),
  },
};
