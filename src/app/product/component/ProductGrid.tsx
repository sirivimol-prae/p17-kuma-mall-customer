import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { ProductGroup } from '@/types/product';
import AddToCartButton from './AddToCartButton';

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
              {product.hasDiscount && (
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