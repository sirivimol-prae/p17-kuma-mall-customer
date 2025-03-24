import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { ProductGroup } from '@/types/product';

interface ProductGridProps {
  products: ProductGroup[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#5F6368] text-xl">ไม่พบสินค้าในขณะนี้</p>
      </div>
    );
  }

  const formatTimeRemaining = (endDate: string | Date | undefined): string => {
    if (!endDate) return "";
    
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-8">
      {products.map((product) => (
        <div key={product.id} className="rounded-lg overflow-hidden relative w-full max-w-[235px] pb-3">
          <Link href={`/product/${product.id}`}>
            <div className="relative overflow-hidden rounded-[5px]">
              {product.image ? (
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover" 
                  width={235}
                  height={235}
                  priority={false}
                />
              ) : (
                <div className="w-full h-[235px] bg-gray-100 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-5xl mb-2">🐾</div>
                    <div className="text-lg text-[#D6A985]">KUMAま</div>
                    <div className="text-sm text-gray-400 mt-1">ไม่มีรูปภาพ</div>
                  </div>
                </div>
              )}

              {product.isFlashSale && product.discount && product.discount > 0 && (
                <div className="absolute top-0 right-3">
                  <div className="bg-[#B86A4B] text-white p-2 border-2 border-white flex flex-col items-center justify-center rounded-none rounded-bl-[10px] rounded-br-[10px]" style={{width: '50px', height: '55px'}}>
                    <div className="text-[20px] font-bold">ลด</div>
                    <div className="text-[20px] font-bold">{product.discount}%</div>
                  </div>
                </div>
              )}
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
                  {product.isFlashSale ? "FLASH SALE" : "KUMAま FRIEND"}
                </div>
              </div>
            </div>
            
            <div className="flex items-center mt-0.5">
              <span className="text-[#B86A4B] font-bold text-[28px]">฿{product.price.toLocaleString()}</span>
              {(product.hasDiscount || product.isFlashSale) && (
                <span className="text-[#A6A6A6] line-through ml-2 text-[18px]">
                  ฿{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center mt-0 mb-1">
              <div className="flex text-yellow-400 leading-none text-[22px]">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              <span className="text-[#A6A6A6] ml-1 text-[20px]">| 4.8</span>
              <div className="ml-auto pr-1">
                <button 
                  className="relative flex justify-center items-center bg-[#D6A985] text-white border-4 border-white shadow-[0_0_0_2px_#D6A985] rounded-[12px]"
                  style={{ width: "70px", height: "40px", marginBottom: "0px" }}
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
  );
};

export default ProductGrid;