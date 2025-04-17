'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FlashSaleProduct } from '@/types/product'
import FlashSaleProductCard from '@/components/FlashSale/FlashSaleProductCard'

interface HomepageFlashSaleProps {
  products: FlashSaleProduct[];
}

export default function HomepageFlashSale({ products }: HomepageFlashSaleProps) {
  const [sortedProducts, setSortedProducts] = useState<FlashSaleProduct[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // คำนวณเวลาที่เหลือเป็นข้อความสำหรับการแสดงผล countdown
  const formatTimeRemaining = (endDate: string | Date): string => {
    const end = new Date(endDate);
    const now = new Date();
    const diffMs = end.getTime() - now.getTime();
    
    if (diffMs <= 0) return "หมดเวลา";
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days} วัน ${hours} ชั่วโมง`;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ชั่วโมง`;
  };

  useEffect(() => {
    if (!products || products.length === 0) return;

    const sorted = [...products].sort((a, b) => {
      const dateA = a.endDate ? new Date(a.endDate).getTime() : Number.MAX_SAFE_INTEGER;
      const dateB = b.endDate ? new Date(b.endDate).getTime() : Number.MAX_SAFE_INTEGER;
      return dateA - dateB;
    });
    
    setSortedProducts(sorted);
  }, [products]);

  useEffect(() => {
    const checkScroll = () => {
      if (!containerRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10); 
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();

      const timeoutId = setTimeout(checkScroll, 200);
      
      return () => {
        container.removeEventListener('scroll', checkScroll);
        clearTimeout(timeoutId);
      };
    }
  }, [sortedProducts]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -235, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 235, behavior: 'smooth' });
    }
  };
  
  if (!sortedProducts || sortedProducts.length === 0) {
    return null;
  }

  // ไอคอน Lightning สำหรับ Flash Sale
  const BoldLightningIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width="16" 
      height="16" 
      fill="currentColor"
      className="mx-[-2px]"
    >
      <path d="M13 9h9l-10 13v-9H3l10-13z" />
    </svg>
  );
  
  return (
    <div className="max-w-[1440px] mx-auto px-4 mt-0 pt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-[#B86A4B] text-white px-2 py-0.5 rounded-md flex items-center justify-center">
            F<BoldLightningIcon />ASH SALE
          </div>
          <span className="text-[#D6A985]">| จำนวนจำกัด!</span>
          {sortedProducts.length > 0 && (
            <div className="ml-2 bg-[#5F6368] bg-opacity-70 text-white text-sm font-medium rounded-[20px] px-3 py-1 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] border border-white">
              เหลือเวลาอีก: {formatTimeRemaining(sortedProducts[0].endDate)}
            </div>
          )}
        </div>
        
        <Link href="/flashsale" className="text-[#B86A4B] flex items-center gap-1 text-[24px]">
          ดูทั้งหมด
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="border-b border-[#D6A985] mb-4"></div>

      <div className="relative">
        {showLeftArrow && (
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center"
            aria-label="เลื่อนไปทางซ้าย"
          >
            <ChevronLeft size={24} className="text-gray-500" />
          </button>
        )}

        <div 
          ref={containerRef}
          className="flex overflow-x-auto overflow-y-hidden gap-6 px-8 pb-3 no-scrollbar"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            height: '410px'  // กำหนดความสูงให้พอดีกับ FlashSaleProductCard
          }}
        >
          {sortedProducts.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0" 
              style={{ 
                width: '235px'
              }}
            >
              <FlashSaleProductCard product={product} size="medium" />
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center"
            aria-label="เลื่อนไปทางขวา"
          >
            <ChevronRight size={24} className="text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
}