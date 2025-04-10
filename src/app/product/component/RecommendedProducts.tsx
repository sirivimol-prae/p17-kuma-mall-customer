import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ChevronRight, ChevronLeft } from 'lucide-react';
import { mockProducts } from '../../categories/component/mockProducts';

interface Product {
  id: string | number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating?: string | number;
}

const RecommendedProducts = () => {
  const displayProducts = mockProducts as Product[];
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollAmount = (235 + 24) * 5;

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mt-12 mb-8">
      <div className="flex items-center px-2 mb-3">
        <div className="w-8 h-8 mr-3">
          <Image 
            src="/images/paw_icon.png" 
            alt="KUMA Logo" 
            width={32} 
            height={32}
            className="w-full h-full"
          />
        </div>
        <span className="text-[#B86A4B] font-bold text-[28px]">โปรโมชั่นสินค้า</span>
        <div className="ml-auto">
          <Link href="/special_discount" className="text-[#D6A985] text-[18px] flex items-center gap-1">
            ดูทั้งหมด <span><ChevronRight color="#d6a985" /></span>
          </Link>
        </div>
      </div>
      <div className="h-[0.5px] w-full bg-[#D6A985] mb-4"></div>
      
      <div className="relative px-6">
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white transition-colors"
        >
          <ChevronLeft color="#D6A985" size={24} />
        </button>
        
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white transition-colors"
        >
          <ChevronRight color="#D6A985" size={24} />
        </button>
        
        <div className="flex justify-center">
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              maxWidth: 'calc((235px + 24px) * 5 - 24px)'
            }}
          >
            {displayProducts.map(product => (
              <div key={product.id} className="rounded-lg relative w-full min-w-[235px] max-w-[235px] pb-3 flex-shrink-0">
                <Link href={`/product/${product.id}`}>
                  <div className="relative rounded-[5px] w-[235px] h-[235px]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="235px"
                      className="object-contain rounded-[5px]"
                      priority={false}
                    />
                  </div>
                </Link>
                
                <div className="p-0 mb-1">
                  <div className="w-full">
                    <div className="flex flex-col w-full mb-0">
                      <Link href={`/product/${product.id}`}>
                        <h3 
                          className="font-medium text-[#5F6368] text-[24px] leading-tight w-full truncate cursor-pointer pl-0 pr-0 ml-0 mr-0 mb-0"
                          title={product.name}
                        >
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="inline-block bg-[#D6A985] text-white text-[16px] px-2 py-0 rounded-md w-fit ml-0">
                        KUMAま FRIEND
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-0.5">
                    <span className="text-[#B86A4B] font-bold text-[28px]">฿{product.price.toLocaleString()}</span>
                    <span className="text-[#A6A6A6] line-through ml-2 text-[18px]">
                      ฿{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-0 mb-1">
                    <div className="flex text-yellow-400 leading-none text-[22px]">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>

                    <span className="text-[#A6A6A6] ml-1 text-[20px]">| {product.rating || "4.8"}</span>
                    <div className="ml-auto pr-1">
                      <button 
                        className="relative flex justify-center items-center bg-[#D6A985] text-white border-4 border-white shadow-[0_0_0_2px_#D6A985] rounded-[12px]"
                        style={{ 
                          width: "70px", 
                          height: "40px", 
                          marginBottom: "0px" 
                        }}
                      >
                        <div className="flex justify-center items-center w-full h-full bg-[#cfa580] rounded-lg">
                          <ShoppingCart size={18} className="text-white" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;