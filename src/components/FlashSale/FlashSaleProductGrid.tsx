import React from 'react';
import { FlashSaleProduct } from '@/types/product';
import FlashSaleProductCard from './FlashSaleProductCard';

interface FlashSaleProductGridProps {
  products: FlashSaleProduct[];
  cardSize?: 'small' | 'medium' | 'large';
  layout?: 'grid' | 'carousel';
  columns?: 1 | 2 | 3 | 4 | 5;
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * คอมโพเนนต์สำหรับแสดงสินค้า Flash Sale ในรูปแบบกริด
 * สามารถกำหนดขนาดการ์ด, รูปแบบการแสดงผล, จำนวนคอลัมน์ และระยะห่างได้
 */
const FlashSaleProductGrid: React.FC<FlashSaleProductGridProps> = ({
  products,
  cardSize = 'medium',
  layout = 'grid',
  columns = 4,
  gap = 'medium',
  className = '',
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#5F6368] text-xl">ไม่พบสินค้า Flash Sale ในขณะนี้</p>
      </div>
    );
  }

  const columnsCSS = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  };

  const gapCSS = {
    small: 'gap-2',
    medium: 'gap-6',
    large: 'gap-8',
  };

  if (layout === 'grid') {
    return (
      <div className={`grid ${columnsCSS[columns]} ${gapCSS[gap]} px-4 md:px-8 ${className}`}>
        {products.map((product) => (
          <FlashSaleProductCard key={product.id} product={product} size={cardSize} />
        ))}
      </div>
    );
  } else {
    return (
      <div className={`flex overflow-x-auto ${gapCSS[gap]} px-4 md:px-8 pb-4 hide-scrollbar ${className}`} 
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0">
            <FlashSaleProductCard product={product} size={cardSize} />
          </div>
        ))}
      </div>
    );
  }
};

export default FlashSaleProductGrid;