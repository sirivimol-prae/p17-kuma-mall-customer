'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductGroup } from '@/types/product'
import { ProductGrid } from '@/components/Product'

interface HomepageProductsProps {
  products: ProductGroup[];
}

export default function HomepageProducts({ products }: HomepageProductsProps) {
  const [filteredProducts, setFilteredProducts] = useState<ProductGroup[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const nonFlashSaleProducts = products.filter(product => !product.isFlashSale);

    const sorted = [...nonFlashSaleProducts].sort((a, b) => b.id - a.id);
    
    setFilteredProducts(sorted);
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
  }, [filteredProducts]);

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
  
  if (!filteredProducts || filteredProducts.length === 0) {
    return null;
  }
  
  return (
    <div className="max-w-[1440px] mx-auto px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#D6A985] rounded-full flex items-center justify-center">
            <Image src="/images/paw_icon.png" alt="Paw Icon" width={20} height={20} className="w-5 h-5" />
          </div>
          <span className="text-[#B86A4B] font-medium text-xl">สินค้าแนะนำ</span>
        </div>
        
        <Link href="/product" className="text-[#D6A985] flex items-center gap-1">
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
          className="flex overflow-x-auto gap-6 px-8 py-2 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <ProductGrid 
            products={filteredProducts}
            cardSize="small"
            layout="carousel"
            gap="medium"
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