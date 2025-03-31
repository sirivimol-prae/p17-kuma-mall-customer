import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';

/**
 * ฟังก์ชันสำหรับสร้าง query string
 * ใช้ได้ทั้ง Client และ Server Components
 */
export function createQueryString(
  params: Record<string, string | string[] | number | number[] | null | undefined>,
  baseParams?: URLSearchParams
): string {
  const newSearchParams = baseParams ? new URLSearchParams(baseParams.toString()) : new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      newSearchParams.delete(key);
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        newSearchParams.set(key, value.join(','));
      } else {
        newSearchParams.delete(key);
      }
    } else {
      newSearchParams.set(key, String(value));
    }
  });
  
  return newSearchParams.toString();
}

/**
 * ฟังก์ชันสำหรับการกรองราคา
 * ใช้กับทั้ง FlashSale และ Product
 */
export function getPriceFilter(minPrice: number, maxPrice: number) {
  return {
    gte: minPrice,
    lte: maxPrice
  };
}

/**
 * ฟังก์ชันสำหรับสร้างข้อมูลการแบ่งหน้า
 */
export function createPagination(page: number, pageSize: number, totalItems: number) {
  const totalPages = Math.ceil(totalItems / pageSize);
  
  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
}

/**
 * ฟังก์ชันสำหรับแปลงข้อมูลเป็นฟอร์แมตที่ต้องการ
 * สามารถใช้ได้กับทั้ง FlashSale และ Product
 */
export function formatImageUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null;

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
}

/**
 * ฟังก์ชันช่วยสำหรับการเรียงลำดับข้อมูล
 */
export function getSortOptions(sortType: string) {
  switch (sortType) {
    case 'priceAsc':
      return { price_origin: 'asc' as Prisma.SortOrder };
    case 'priceDesc':
      return { price_origin: 'desc' as Prisma.SortOrder };
    case 'latest':
      return { create_Date: 'desc' as Prisma.SortOrder };
    case 'endDate':
      return { end_date: 'asc' as Prisma.SortOrder };
    case 'discount':
      return { flash_sale_per: 'desc' as Prisma.SortOrder };
    default:
      return { create_Date: 'desc' as Prisma.SortOrder };
  }
}