import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { ProductGroup } from '@/types/product';

interface ProductCardProps {
  product: ProductGroup;
  size?: 'small' | 'medium' | 'large';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, size = 'medium' }) => {
  const cardSizes = {
    small: {
      card: 'max-w-[160px]',
      image: 'w-[160px] h-[160px]',
      title: 'text-base',
      price: 'text-lg',
      badge: 'w-10 h-12'
    },
    medium: {
      card: 'max-w-[235px]',
      image: 'w-[235px] h-[235px]',
      title: 'text-[24px]',
      price: 'text-[28px]',
      badge: 'w-[50px] h-[55px]'
    },
    large: {
      card: 'max-w-[280px]',
      image: 'w-[280px] h-[280px]',
      title: 'text-[28px]',
      price: 'text-[32px]',
      badge: 'w-[60px] h-[65px]'
    }
  };

  const currentSize = cardSizes[size];

  return (
    <div className={`rounded-lg overflow-hidden relative w-full ${currentSize.card} pb-3`}>
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-[5px]">
          {product.image ? (
            <div className={`relative ${currentSize.image}`}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes={size === 'small' ? '160px' : size === 'medium' ? '235px' : '280px'}
                className="object-cover"
                priority={false}
              />
            </div>
          ) : (
            <div className={`bg-gray-100 flex items-center justify-center ${currentSize.image}`}>
              <div className="flex flex-col items-center justify-center">
                <div className="text-5xl mb-2">🐾</div>
                <div className="text-lg text-[#D6A985]">KUMAま</div>
                <div className="text-sm text-gray-400 mt-1">ไม่มีรูปภาพ</div>
              </div>
            </div>
          )}
          
          {product.isFlashSale && product.discount && product.discount > 0 && (
            <div className="absolute top-0 right-3">
              <div 
                className="bg-[#B86A4B] text-white p-2 border-2 border-white flex flex-col items-center justify-center rounded-none rounded-bl-[10px] rounded-br-[10px]"
                style={{width: currentSize.badge.split(' ')[0], height: currentSize.badge.split(' ')[1]}}
              >
                <div className={size === 'small' ? 'text-sm font-bold' : 'text-[20px] font-bold'}>ลด</div>
                <div className={size === 'small' ? 'text-sm font-bold' : 'text-[20px] font-bold'}>{product.discount}%</div>
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
                className={`font-medium text-[#5F6368] ${currentSize.title} leading-tight w-full truncate cursor-pointer pl-0 pr-0 ml-0 mr-0 mb-0`}
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
          <span className={`text-[#B86A4B] font-bold ${currentSize.price}`}>฿{product.price.toLocaleString()}</span>
          {(product.hasDiscount || product.isFlashSale) && (
            <span className={`text-[#A6A6A6] line-through ml-2 ${size === 'small' ? 'text-sm' : 'text-[18px]'}`}>
              ฿{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        <div className="flex items-center mt-0 mb-1">
          <div className={`flex text-yellow-400 leading-none ${size === 'small' ? 'text-base' : 'text-[22px]'}`}>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>

          <span className={`text-[#A6A6A6] ml-1 ${size === 'small' ? 'text-sm' : 'text-[20px]'}`}>| 4.8</span>
          <div className="ml-auto pr-1">
            <button 
              className="relative flex justify-center items-center bg-[#D6A985] text-white border-4 border-white shadow-[0_0_0_2px_#D6A985] rounded-[12px]"
              style={{ 
                width: size === 'small' ? "50px" : "70px", 
                height: size === 'small' ? "30px" : "40px", 
                marginBottom: "0px" 
              }}
            >
              <div className="flex justify-center items-center w-full h-full bg-[#cfa580] rounded-lg">
                <ShoppingCart size={size === 'small' ? 14 : 18} className="text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;