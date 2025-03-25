'use client'

import { useRouter } from 'next/navigation';
import { FlashSaleContainer } from '@/components/FlashSale';
import { FlashSaleProduct, PaginationInfo } from '@/types/product';

interface FlashSaleClientWrapperProps {
  products: FlashSaleProduct[];
  pagination: PaginationInfo;
  initialSort: string;
}

export default function FlashSaleClientWrapper({
  products,
  pagination,
  initialSort
}: FlashSaleClientWrapperProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set('page', page.toString());
    
    router.push(`${url.pathname}?${params.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set('sort', sort);
    params.set('page', '1');
    
    router.push(`${url.pathname}?${params.toString()}`);
  };

  const handleFilterChange = (filters: any) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
  
    if (filters.categories && filters.categories.length > 0) {
      params.set('category', filters.categories.join(','));
    } else {
      params.delete('category');
    }
    
    if (filters.priceRange) {
      params.set('minPrice', filters.priceRange[0].toString());
      params.set('maxPrice', filters.priceRange[1].toString());
    }
    
    params.set('page', '1');
    
    router.push(`${url.pathname}?${params.toString()}`);
  };

  return (
    <FlashSaleContainer 
      products={products}
      pagination={pagination}
      title="สินค้า Flash Sale"
      showHeader={true}
      showFilter={true}
      showPagination={true}
      cardSize="medium"
      layout="grid"
      columns={4}
      gap="medium"
      initialSort={initialSort}
      className="mb-8"
    />
  );
}