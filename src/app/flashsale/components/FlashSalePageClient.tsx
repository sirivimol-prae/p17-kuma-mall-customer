'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Sidebar from './Sidebar';
import ProductGrid from '../../../components/FlashSale/FlashSaleProductGrid';
import Pagination from '../../product/component/Pagination';
import { FlashSaleProduct, PaginationInfo } from '@/types/product';

interface FlashSalePageClientProps {
  initialProducts: FlashSaleProduct[];
  initialPagination: PaginationInfo;
  initialSort: string;
}

export default function FlashSalePageClient({ 
  initialProducts, 
  initialPagination,
  initialSort
}: FlashSalePageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<FlashSaleProduct[]>(initialProducts);
  const [pagination, setPagination] = useState<PaginationInfo>(initialPagination);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  
  const sortOptions = [
    { value: 'endDate', label: 'ใกล้หมดเวลา' },
    { value: 'priceAsc', label: 'ราคาต่ำ - สูง' },
    { value: 'priceDesc', label: 'ราคาสูง - ต่ำ' },
    { value: 'discount', label: 'ส่วนลดมากสุด' }
  ];

  useEffect(() => {
    if (!products || products.length === 0) return;

    const productsWithEndDate = products.filter(p => p.endDate);
    if (productsWithEndDate.length === 0) return;
    
    const latestProduct = [...productsWithEndDate].sort((a, b) => {
      const dateA = a.endDate ? new Date(a.endDate).getTime() : 0;
      const dateB = b.endDate ? new Date(b.endDate).getTime() : 0;
      return dateB - dateA;
    })[0];
    
    if (latestProduct && latestProduct.endDate) {
      const endTime = new Date(latestProduct.endDate).getTime();

      const updateCountdown = () => {
        const now = new Date().getTime();
        const timeRemaining = endTime - now;
        
        if (timeRemaining <= 0) {
          setCountdown({ hours: 0, minutes: 0, seconds: 0 });
          return;
        }
        
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        setCountdown({ hours, minutes, seconds });
      };

      updateCountdown();

      const timer = setInterval(updateCountdown, 1000);
      
      return () => clearInterval(timer);
    }
  }, [products]);

  useEffect(() => {
    const fetchFlashSaleProducts = async () => {
      const currentPage = parseInt(searchParams.get('page') || '1');
      const currentSort = searchParams.get('sort') || 'endDate';
      const categoryParam = searchParams.get('category');
      const minPriceParam = searchParams.get('minPrice');
      const maxPriceParam = searchParams.get('maxPrice');
      const pageChanged = currentPage !== pagination.page;
      const sortChanged = currentSort !== sortBy;
      const hasFilters = categoryParam || minPriceParam || maxPriceParam;

      if (pageChanged || sortChanged || hasFilters) {
        try {
          setLoading(true);
          setError(null);

          let url = `/api/flashsale?page=${currentPage}&pageSize=${pagination.pageSize}`;

          if(currentSort) {
            url += `&sort=${currentSort}`;
          }

          if(categoryParam) {
            url += `&category=${categoryParam}`;
          }
          
          if(minPriceParam) {
            url += `&minPrice=${minPriceParam}`;
          }
          
          if(maxPriceParam) {
            url += `&maxPrice=${maxPriceParam}`;
          }
          
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data.success) {
            setProducts(data.data);
            if (data.pagination) {
              setPagination(data.pagination);
            }
          } else {
            setError(data.error || 'เกิดข้อผิดพลาดในการดึงข้อมูล');
            setProducts([]);
          }
        } catch (err) {
          console.error('Error fetching flash sale products:', err);
          setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
          setProducts([]);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchFlashSaleProducts();
  }, [searchParams, pagination.pageSize]);

  useEffect(() => {
    const urlSort = searchParams.get('sort');
    if (urlSort && urlSort !== sortBy) {
      setSortBy(urlSort);
    }
  }, [searchParams, sortBy]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    
    router.push(`/flashsale?${params.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setIsSortMenuOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    params.set('page', '1');
    
    router.push(`/flashsale?${params.toString()}`);
  };

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Image 
            src="/images/paw_icon.png" 
            alt="Paw Icon" 
            className="w-8 h-8 mr-2"
            width={32}
            height={32}
          />
          <span className="font-medium text-[#B86A4B] text-[24px]">สินค้า Flash Sale</span>

          <div className="flex items-center ml-4">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="text-orange-500 font-medium ml-1">FLASH SALE</span>
            <span className="text-xs text-gray-500 ml-1">(Website Only)</span>
            
            <div className="flex gap-1 ml-2">
              <span className="bg-gray-700 text-white text-sm px-1 rounded">{formatNumber(countdown.hours)}</span>
              <span className="text-gray-700">:</span>
              <span className="bg-gray-700 text-white text-sm px-1 rounded">{formatNumber(countdown.minutes)}</span>
              <span className="text-gray-700">:</span>
              <span className="bg-gray-700 text-white text-sm px-1 rounded">{formatNumber(countdown.seconds)}</span>
            </div>
          </div>
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
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#5F6368] text-xl">ไม่พบสินค้า Flash Sale ที่ตรงกับเงื่อนไขในขณะนี้</p>
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