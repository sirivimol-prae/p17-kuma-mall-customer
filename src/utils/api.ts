import axios from 'axios';
import { ProductsResponse, CollectionsResponse } from '@/types/product';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
});

export const getProducts = async (
  page: number = 1, 
  pageSize: number = 12,
  filters: {
    collections?: number[],
    priceRange?: [number, number],
    sortBy?: string
  } = {}
): Promise<ProductsResponse> => {
  try {
    let url = `/api/products?page=${page}&pageSize=${pageSize}`;

    if (filters.collections && filters.collections.length > 0) {
      url += `&collection=${filters.collections.join(',')}`;
    }
    
    if (filters.priceRange) {
      url += `&minPrice=${filters.priceRange[0]}&maxPrice=${filters.priceRange[1]}`;
    }
    
    if (filters.sortBy) {
      url += `&sort=${filters.sortBy}`;
    }
    
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getCollections = async (): Promise<CollectionsResponse> => {
  try {
    const response = await API.get('/api/collections');
    return response.data;
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
};

export default API;