'use client'

import React, { useState, useEffect, useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { FlashSaleProduct } from '@/types/product';
import { FilterContext } from './Sidebar';

interface ProductGridProps {
  products: FlashSaleProduct[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { filters } = useContext(FilterContext);
  const [filteredProducts, setFilteredProducts] = useState<FlashSaleProduct[]>(products || []);
  const [isLoading, setIsLoading] = useState(false);

  console.log("ProductGrid received products:", products);
  console.log("Products length:", products?.length || 0);

  useEffect(() => {
    setIsLoading(true);
    
    console.log("Filter effect triggered. Products:", products?.length || 0);
    console.log("Current price range:", filters.priceRange);

    const timer = setTimeout(() => {
      if (products && products.length > 0) {
        setFilteredProducts(products);
        console.log("Setting all products:", products.length);
      } else {
        console.log("No products to filter");
        setFilteredProducts([]);
      }
      
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [products]);

  if (products && products.length > 0 && filteredProducts.length === 0 && !isLoading) {
    return (
      <div>
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden relative w-[235px]">
              {/* Product Image Container */}
              <div className="relative">
                {/* แสดงช่องว่างเมื่อไม่พบรูปภาพ */}
                <div 
                  className="w-full h-[235px] bg-gray-100 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-5xl mb-2">🐾</div>
                    <div className="text-lg text-[#D6A985]">KUMAま</div>
                    <div className="text-sm text-gray-400 mt-1">สินค้ารอการอัพเดท</div>
                  </div>
                </div>
                
                {/* Discount Badge - ตรงตามรูปแบบต้นฉบับ */}
                {product.discount > 0 && (
                  <div className="absolute top-0 right-3">
                    <div className="bg-[#B86A4B] text-white p-2 border-2 border-white flex flex-col items-center justify-center rounded-none rounded-bl-[10px] rounded-br-[10px]" style={{width: '50px', height: '55px'}}>
                      <div className="text-[20px] font-bold">ลด</div>
                      <div className="text-[20px] font-bold">{product.discount}%</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-3">
                {/* Product Name */}
                <div className="mb-1">
                  <div className="flex items-center">
                    <h3 className="font-medium text-[#5F6368] text-[24px]">{product.title}</h3>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-[#B86A4B] text-white text-xs px-2 py-0.5 rounded mr-2">
                      FLASHSALES
                    </div>
                    <span className="text-[#D6A985] text-sm">จำนวนจำกัด !!</span>
                  </div>
                </div>
                
                {/* Price */}
                <div className="flex items-center mt-2">
                  <span className="text-[#B86A4B] font-bold text-xl">฿{product.price.toLocaleString()}</span>
                  {product.discount > 0 && (
                    <span className="text-[#A6A6A6] line-through ml-2 text-sm">฿{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                
                {/* Rating - ตามรูปแบบต้นฉบับ */}
                <div className="flex items-center mt-1">
                  {/* Stars */}
                  <div className="flex text-yellow-400">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>

                  {/* Rating */}
                  <span className="text-[#A6A6A6] ml-1">| 4.8</span>
                  <div className="ml-auto">
                    <button 
                      className="relative flex justify-center items-center py-2 px-4 rounded-full bg-[#D6A985] text-white border-4 border-white shadow-[0_0_0_2px_#D6A985] rounded-[12px]"
                      style={{width:"80px", height:"40px"}}
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#D6A985]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden relative w-[235px]">
              {/* Product Image Container */}
              <div className="relative">
                {/* แสดงช่องว่างเมื่อไม่พบรูปภาพ */}
                <div 
                  className="w-full h-[235px] bg-gray-100 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-5xl mb-2">🐾</div>
                    <div className="text-lg text-[#D6A985]">KUMAま</div>
                    <div className="text-sm text-gray-400 mt-1">สินค้ารอการอัพเดท</div>
                  </div>
                </div>
                
                {/* Discount Badge - ตรงตามรูปแบบต้นฉบับ */}
                {product.discount > 0 && (
                  <div className="absolute top-0 right-3">
                    <div className="bg-[#B86A4B] text-white p-2 border-2 border-white flex flex-col items-center justify-center rounded-none rounded-bl-[10px] rounded-br-[10px]" style={{width: '50px', height: '55px'}}>
                      <div className="text-[20px] font-bold">ลด</div>
                      <div className="text-[20px] font-bold">{product.discount}%</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-3">
                {/* Product Name */}
                <div className="mb-1">
                  <div className="flex items-center">
                    <h3 className="font-medium text-[#5F6368] text-[24px]">{product.title}</h3>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-[#B86A4B] text-white text-xs px-2 py-0.5 rounded mr-2">
                      FLASHSALES
                    </div>
                    <span className="text-[#D6A985] text-sm">จำนวนจำกัด !!</span>
                  </div>
                </div>
                
                {/* Price */}
                <div className="flex items-center mt-2">
                  <span className="text-[#B86A4B] font-bold text-xl">฿{product.price.toLocaleString()}</span>
                  {product.discount > 0 && (
                    <span className="text-[#A6A6A6] line-through ml-2 text-sm">฿{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                
                {/* Rating - ตามรูปแบบต้นฉบับ */}
                <div className="flex items-center mt-1">
                  {/* Stars */}
                  <div className="flex text-yellow-400">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>

                  {/* Rating */}
                  <span className="text-[#A6A6A6] ml-1">| 4.8</span>
                  <div className="ml-auto">
                    <button 
                      className="relative flex justify-center items-center py-2 px-4 rounded-full bg-[#D6A985] text-white border-4 border-white shadow-[0_0_0_2px_#D6A985] rounded-[12px]"
                      style={{width:"80px", height:"40px"}}
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductGrid;