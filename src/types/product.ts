export interface Category {
  id: number;
  uuid: string;
  name: string;
  description?: string | null;
  create_Date: string;
}

export interface Collection {
  id: number;
  uuid: string;
  name: string;
  description?: string | null;
  create_Date: string;
}

export interface FlashSaleProduct {
  id: number;
  uuid: string;
  title: string;
  subname?: string;
  price: number;
  originalPrice: number;
  discount: number;
  quantity: number;
  image?: string | null;
  endDate: string | Date;
  categories: {
    id: number;
    name: string;
  }[];
  productSku: string;
  isFlashSale?: boolean;
}

export interface ProductGroup {
  id: number;
  uuid: string;
  name: string;
  subname: string;
  image: string | null;
  collections: {
    id: number;
    name: string;
  }[];
  price: number;
  originalPrice: number;
  hasDiscount: boolean;
  isFlashSale?: boolean;
  flashSalePrice?: number;
  discount?: number;
  endDate?: string | Date;
  quantity?: number;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProductsResponse {
  success: boolean;
  data: ProductGroup[];
  pagination: PaginationInfo;
  error?: string;
}

export interface FlashSaleResponse {
  success: boolean;
  data: FlashSaleProduct[];
  pagination: PaginationInfo;
  error?: string;
}