'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FlashSaleProduct } from '@/types/product'
import { FlashSaleProductGrid, FlashSaleCountdown } from '@/components/FlashSale'

interface HomepageFlashSaleProps {
  products: FlashSaleProduct[];
}

export default function HomepageFlashSale({ products }: HomepageFlashSaleProps) {
  const [sortedProducts, setSortedProducts] = useState<FlashSaleProduct[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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
      containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  
  if (!sortedProducts || sortedProducts.length === 0) {
    return null;
  }
  
  return (
    <div className="max-w-[1255px] mx-auto px-4 my-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="text-orange-500 font-medium">FLASH SALE</span>
          <span className="text-xs text-gray-500">(Website Only)</span>
          {sortedProducts.length > 0 && (
            <div className="ml-2">
              <FlashSaleCountdown 
                endDate={sortedProducts[0].endDate}
                size="small"
                showLabels={false}
              />
            </div>
          )}
        </div>
        
        <Link href="/flashsale" className="text-orange-500 flex items-center gap-1">
          ดูทั้งหมด
          <ChevronRight size={16} />
        </Link>
      </div>

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
          className="flex overflow-x-auto gap-4 px-8 py-2 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <FlashSaleProductGrid 
            products={sortedProducts}
            cardSize="small"
            layout="carousel"
            gap="small"
          />
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