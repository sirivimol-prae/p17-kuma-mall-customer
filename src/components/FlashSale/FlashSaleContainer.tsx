'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import FlashSaleProductGrid from './FlashSaleProductGrid';
import { FlashSaleProduct, PaginationInfo } from '@/types/product';
import UnifiedSidebar from '@/components/ui/sidebar/UnifiedSidebar';
import Pagination from '@/app/product/component/Pagination';

interface FlashSaleContainerProps {
  products: FlashSaleProduct[];
  pagination?: PaginationInfo;
  title?: string;
  showHeader?: boolean;
  showFilter?: boolean;
  showPagination?: boolean;
  cardSize?: 'small' | 'medium' | 'large';
  layout?: 'grid' | 'carousel';
  columns?: 1 | 2 | 3 | 4 | 5;
  gap?: 'small' | 'medium' | 'large';
  initialSort?: string;
  className?: string;
}

/**
 * คอมโพเนนต์หลักสำหรับส่วนแสดงสินค้า Flash Sale
 * รวมส่วนของ Header, Filter, กริดสินค้า และ Pagination ไว้ด้วยกัน
 */
const FlashSaleContainer: React.FC<FlashSaleContainerProps> = ({
  products,
  pagination,
  title = 'สินค้า Flash Sale',
  showHeader = true,
  showFilter = false,
  showPagination = false,
  cardSize = 'medium',
  layout = 'grid',
  columns = 4,
  gap = 'medium',
  initialSort = 'endDate',
  className = '',
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  
  const sortOptions = [
    { value: 'endDate', label: 'ใกล้หมดเวลา' },
    { value: 'priceAsc', label: 'ราคาต่ำ - สูง' },
    { value: 'priceDesc', label: 'ราคาสูง - ต่ำ' },
    { value: 'discount', label: 'ส่วนลดมากสุด' }
  ];

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setIsSortMenuOpen(false);
  
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    params.set('page', '1');
    
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className={`container mx-auto ${className}`}>
      {showHeader && (
        <>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Image 
                src="/images/paw_icon.png" 
                alt="Paw Icon" 
                className="w-8 h-8 mr-2"
                width={32}
                height={32}
              />
              <span className="font-medium text-[#B86A4B] text-[24px]">{title}</span>
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
        </>
      )}
      
      <div className="flex flex-col md:flex-row">
        {showFilter && (
          <div className="w-full md:w-1/5 mb-6 md:mb-0">
            <UnifiedSidebar 
              type="flashsale"
              showCategories={true}
              showCollections={false}
              showServices={false}
              showPriceRange={true}
            />
          </div>
        )}

        <div className={`w-full ${showFilter ? 'md:w-4/5' : 'md:w-full'}`}>
          {products.length > 0 ? (
            <FlashSaleProductGrid 
              products={products} 
              cardSize={cardSize}
              layout={layout}
              columns={columns}
              gap={gap}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-[#5F6368] text-xl">ไม่พบสินค้า Flash Sale ที่ตรงกับเงื่อนไขการค้นหา</p>
            </div>
          )}
          
          {showPagination && pagination && pagination.totalPages > 1 && (
            <Pagination 
              currentPage={pagination.page} 
              totalPages={pagination.totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </div>
      </div>
      
      {!showPagination && products.length > 0 && layout === 'carousel' && (
        <div className="text-center mt-4">
          <Link href="/flashsale" className="text-[#D6A985] hover:underline">
            ดูสินค้า Flash Sale ทั้งหมด &rarr;
          </Link>
        </div>
      )}
    </div>
  );
};

export default FlashSaleContainer;