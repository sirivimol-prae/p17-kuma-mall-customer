import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { FlashSaleProduct } from '@/types/product';

interface FlashSaleProductCardProps {
  product: FlashSaleProduct;
  size?: 'small' | 'medium' | 'large';
}

const FlashSaleProductCard: React.FC<FlashSaleProductCardProps> = ({ product, size = 'medium' }) => {
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

  const cardSizes = {
    small: {
      card: 'max-w-[160px]',
      image: 'w-[160px] h-[160px]',
      title: 'text-base',
      price: 'text-lg',
      badgeWidth: '50px',
      badge: 'h-12',
      timer: 'text-xs py-1 px-2',
      zapIcon: 14
    },
    medium: {
      card: 'max-w-[235px]',
      image: 'w-[235px] h-[235px]',
      title: 'text-[24px]',
      price: 'text-[28px]',
      badgeWidth: '50px',
      badge: 'h-[55px]',
      timer: 'text-sm py-1.5 px-3',
      zapIcon: 16
    },
    large: {
      card: 'max-w-[280px]',
      image: 'w-[280px] h-[280px]',
      title: 'text-[28px]',
      price: 'text-[32px]',
      badgeWidth: '50px',
      badge: 'h-[65px]',
      timer: 'text-base py-2 px-4',
      zapIcon: 18
    }
  };

  const currentSize = cardSizes[size];

  // สายฟ้าทึบสำหรับใช้แทน Lucide icon
  const BoldLightningIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width={size === 'small' ? "14" : "16"} 
      height={size === 'small' ? "14" : "16"} 
      fill="currentColor"
      className="mx-[-2px]"
    >
      <path d="M13 9h9l-10 13v-9H3l10-13z" />
    </svg>
  );

  const PriceFlashIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width={currentSize.zapIcon} 
      height={currentSize.zapIcon} 
      fill="currentColor"
      className="mr-1 text-[#B86A4B]"
    >
      <path d="M13 9h9l-10 13v-9H3l10-13z" />
    </svg>
  );

  return (
    <div className={`rounded-lg overflow-hidden relative w-full ${currentSize.card} pb-3`}>
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-[5px]">
          {product.image ? (
            <div className={`relative ${currentSize.image}`}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes={size === 'small' ? '160px' : size === 'medium' ? '235px' : '280px'}
                className="object-cover"
                priority={false}
              />
              
              <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                <div className={`bg-[#5F6368] bg-opacity-70 text-[#ffffff] font-medium rounded-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] border border-white ${currentSize.timer}`}>
                  เหลือเวลาอีก: {formatTimeRemaining(product.endDate)}
                </div>
              </div>
            </div>
          ) : (
            <div className={`bg-gray-100 flex items-center justify-center ${currentSize.image} relative`}>
              <div className="flex flex-col items-center justify-center">
                <div className="text-5xl mb-2">🐾</div>
                <div className="text-lg text-[#D6A985]">KUMAま</div>
                <div className="text-sm text-gray-400 mt-1">ไม่มีรูปภาพ</div>
              </div>
              
              <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                <div className={`bg-[#5F6368] bg-opacity-70 text-[#ffffff] font-medium rounded-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] border border-white ${currentSize.timer}`}>
                  เหลือเวลาอีก: {formatTimeRemaining(product.endDate)}
                </div>
              </div>
            </div>
          )}
          {product.discount > 0 && (
            <div className="absolute top-0 right-3">
              <div 
                className={`relative bg-[#B86A4B] text-white p-2 flex flex-col items-center justify-center rounded-bl-[14px] rounded-br-[14px] ${currentSize.badge}`}
                style={{
                  width: currentSize.badgeWidth
                }}
              >
                <div className="absolute inset-0 border-[4px] border-white rounded-bl-[12px] rounded-br-[12px] m-[4px]"></div>
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className={size === 'small' ? 'text-sm font-bold' : 'text-[16px] font-bold'}>ลด</div>
                  <div className={size === 'small' ? 'text-sm font-bold' : 'text-[16px] font-bold'}>{product.discount}%</div>
                </div>
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
                title={product.title}
              >
                {product.title}
              </h3>
            </Link>
            
            <div className="w-full flex items-center text-[16px]">
              <span className="bg-[#B86A4B] text-white px-2 py-0 rounded-md flex items-center justify-center">
                F<BoldLightningIcon />ASH SALE
              </span>
              <span className="text-[#D6A985] ml-1">| จำนวนจำกัด!</span>
            </div>
          </div>
        </div>
        
        {/* โครงสร้างแถว-คอลัมน์สำหรับ ราคา/รีวิว/ปุ่มตะกร้า */}
        <div className="grid grid-cols-[1fr_auto] gap-x-2 mt-1">
          {/* คอลัมน์ที่ 1 แถวที่ 1: ราคา */}
          <div className="flex items-center">
            <span className={`text-[#B86A4B] font-bold ${currentSize.price} flex items-center`}>
              <PriceFlashIcon />฿{product.price.toLocaleString()}
            </span>
            {product.discount > 0 && (
              <span className={`text-[#A6A6A6] line-through ml-2 ${size === 'small' ? 'text-sm' : 'text-[18px]'}`}>
                ฿{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {/* คอลัมน์ที่ 2 แถวที่ 1 และ 2: ปุ่มตะกร้า (rowspan 2) - ขนาดคงที่ 40x80 */}
          <div className="row-span-2 flex items-end justify-end relative">
            <button 
              className="absolute bottom-1 right-[3px] flex justify-center items-center bg-[#D6A985] text-white border-4 border-white shadow-[0_0_0_2px_#D6A985] rounded-[12px]"
              style={{ 
                width: "80px",
                height: "40px"
              }}
            >
              <div className="flex justify-center items-center w-full h-full bg-[#cfa580] rounded-lg">
                <ShoppingCart size={20} className="text-white" />
              </div>
            </button>
          </div>
          
          {/* คอลัมน์ที่ 1 แถวที่ 2: ดาวรีวิว */}
          <div className="flex items-center">
            <div className={`flex text-yellow-400 leading-none ${size === 'small' ? 'text-base' : 'text-[22px]'}`}>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <span className={`text-[#A6A6A6] ml-1 ${size === 'small' ? 'text-sm' : 'text-[20px]'}`}>| 4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleProductCard;