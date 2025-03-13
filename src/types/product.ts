export interface Category {
  id: number;
  uuid: string;
  name: string;
  description?: string | null;
  create_Date: string;
}

export interface FlashSaleProduct {
  id: number;
  sku: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  quantity: number;
  image?: string;
  endDate: string | Date;
  categories: {
    id: number;
    name: string;
  }[];
}

export interface ProductsResponse {
  success: boolean;
  data: FlashSaleProduct[];
  error?: string;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  error?: string;
}