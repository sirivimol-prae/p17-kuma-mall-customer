'use client'

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Sidebar from '../component/sidebar';
import ProductGrid from '../component/ProductGrid';
import Pagination from '../component/Pagination';
import { ProductGroup, PaginationInfo } from '@/types/product';

interface ProductPageClientProps {
  initialProducts: ProductGroup[];
  initialPagination: PaginationInfo;
  initialFlashSaleCount: number;
  initialSort: string;
}

export default function ProductPageClient({ 
  initialProducts, 
  initialPagination,
  initialFlashSaleCount,
  initialSort
}: ProductPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<ProductGroup[]>(initialProducts);
  const [pagination, setPagination] = useState<PaginationInfo>(initialPagination);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [flashSaleCount, setFlashSaleCount] = useState(initialFlashSaleCount);
  
  const sortOptions = [
    { value: 'latest', label: 'สินค้าล่าสุด' },
    { value: 'priceAsc', label: 'ราคาต่ำ - สูง' },
    { value: 'priceDesc', label: 'ราคาสูง - ต่ำ' }
  ];
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const currentPage = parseInt(searchParams.get('page') || '1');
        let url = `/api/products?page=${currentPage}&pageSize=${pagination.pageSize}`;
        
        if (sortBy) {
          url += `&sort=${sortBy}`;
        }

        const collectionParam = searchParams.get('collection');
        if (collectionParam) {
          url += `&collection=${collectionParam}`;
        }
        
        const minPriceParam = searchParams.get('minPrice');
        const maxPriceParam = searchParams.get('maxPrice');
        if (minPriceParam) {
          url += `&minPrice=${minPriceParam}`;
        }
        if (maxPriceParam) {
          url += `&maxPrice=${maxPriceParam}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.data);

          const flashSaleItems = data.data.filter((product: ProductGroup) => product.isFlashSale);
          setFlashSaleCount(flashSaleItems.length);

          if (data.pagination) {
            setPagination(data.pagination);
          }
        } else {
          setError(data.error || 'เกิดข้อผิดพลาดในการดึงข้อมูล');
          setProducts([]);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const pageChanged = parseInt(searchParams.get('page') || '1') !== pagination.page;
    const sortChanged = searchParams.get('sort') !== sortBy;
    const filtersChanged = searchParams.get('collection') || searchParams.get('minPrice') || searchParams.get('maxPrice');
    
    if (pageChanged || sortChanged || filtersChanged) {
      fetchProducts();
    }
  }, [searchParams, sortBy]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    
    router.push(`/product?${params.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setIsSortMenuOpen(false);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    params.set('page', '1');
    
    router.push(`/product?${params.toString()}`);
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Image 
            src="/images/paw_icon.png" 
            alt="Paw Icon" 
            className="w-8 h-8 mr-2"
            width={32}
            height={32}
          />
          <span className="font-medium text-[#B86A4B] text-[24px]">สินค้าทั้งหมด</span>
          {flashSaleCount > 0 && (
            <span className="ml-3 bg-[#B86A4B] text-white px-2 py-1 rounded-md text-sm">
              Flash Sale: {flashSaleCount} รายการ
            </span>
          )}
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
            className="flex items-center text-[#D6A985] text-[18px]"
          >
            <span className="mr-1">
              {sortOptions.find(option => option.value === sortBy)?.label || 'เรียงลำดับ'}
            </span>
            <ChevronDown size={16} />
          </button>
          
          {isSortMenuOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                    sortBy === option.value ? 'text-[#D6A985] font-medium' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="border-b border-[#D6A985] mb-6"></div>
      
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/5 mb-6 md:mb-0">
          <Sidebar />
        </div>
        <div className="w-full md:w-4/5">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D6A985]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">
              <p>{error}</p>
              <button 
                className="mt-4 px-4 py-2 bg-[#D6A985] text-white rounded"
                onClick={() => window.location.reload()}
              >
                ลองใหม่
              </button>
            </div>
          ) : (
            <>
              
              <ProductGrid products={products} />
              
              {pagination.totalPages > 1 && (
                <Pagination 
                  currentPage={pagination.page} 
                  totalPages={pagination.totalPages} 
                  onPageChange={handlePageChange} 
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}