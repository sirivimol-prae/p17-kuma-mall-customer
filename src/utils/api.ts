import axios from 'axios';
import { ProductsResponse, CategoriesResponse } from '@/types/product';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
});

export const getFlashSaleProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await API.get('/api/flashsale');
    return response.data;
  } catch (error) {
    console.error('Error fetching flash sale products:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<CategoriesResponse> => {
  try {
    const response = await API.get('/api/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export default API;