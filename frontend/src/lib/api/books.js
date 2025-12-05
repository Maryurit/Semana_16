const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const booksAPI = {
  getAll: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_URL}/libros${queryString ? `?${queryString}` : ''}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching books:', error);
      return { success: false, data: [] };
    }
  },

  getFeatured: async (limit = 8) => {
    try {
      const response = await fetch(`${API_URL}/libros/destacados?limit=${limit}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching featured books:', error);
      return { success: false, data: [] };
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/libros/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching book:', error);
      return { success: false, data: null };
    }
  },

  search: async (query) => {
    try {
      const response = await fetch(`${API_URL}/libros?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching books:', error);
      return { success: false, data: [] };
    }
  },

  getBySlug: async (slug) => {
    try {
      const response = await fetch(`${API_URL}/libros/slug/${slug}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching book by slug:', error);
      return { success: false, data: null };
    }
  },
};
