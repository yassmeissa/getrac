import axios from 'axios';
import type { Product, Category, ContactForm } from '../types';

const API_BASE = 'https://getrac-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const productService = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  getById: async (id: number): Promise<Product | null> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await api.get(`/products?category=${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      return [];
    }
  },

  search: async (query: string): Promise<Product[]> => {
    try {
      const response = await api.get(`/products/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },
};

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },
};

export const contactService = {
  send: async (form: ContactForm): Promise<boolean> => {
    try {
      await api.post('/contact', form);
      return true;
    } catch (error) {
      console.error('Error sending contact form:', error);
      return false;
    }
  },
};

export default api;
