'use client';

import React from 'react';
import { coinCardImages, discountImages } from './cardImages';

interface CoinCardProps {
  id: string;
  title: string;
  price: string;
  discount: string | null;
  canGift: boolean;
  onOpenTermsModal: () => void;
}

const CoinCard: React.FC<CoinCardProps> = ({ 
  id, 
  title, 
  price, 
  discount, 
  canGift, 
  onOpenTermsModal 
}) => {
  const handleCardClick = () => {
    window.location.href = `/account/mycoin/${id}`;
  };

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="border border-[#FFFFFF] rounded-lg p-4 w-full cursor-pointer hover:shadow-md relative" 
      onClick={handleCardClick}
    >
      <div className="flex h-full">
        <div className="flex items-center">
          <div 
            className="border-[2px] border-[#D6A985] rounded-lg p-2 mr-6 w-[220px] h-[180px] flex items-center justify-center cursor-pointer" 
            onClick={handleCardClick}
          >
            <img src={coinCardImages[id as keyof typeof coinCardImages]} alt={`KUMAま ${title}`} className="w-[180px] h-auto" />
          </div>
          <div>
            <div className="inline-flex items-center text-[24px] font-bold text-[#5F6368]">
              {title}
              <img src="/images/kumacoin.png" alt="Coin Icon" className="w-6 h-6 ml-2" />
            </div>
            <div className="text-[30px] font-bold text-[#B86A4B] mt-1">฿ {price}</div>
            {canGift && (
              <div className="border border-[#D6A985] rounded-md px-3 py-1 mt-2 inline-block text-[#D6A985] w-[160px] h-[30px] text-center text-[16px] font-bold">
                ส่งเป็นของขวัญได้
              </div>
            )}
            <div className="text-[16px] text-gray-500 mt-1">
              ใช้ได้ก่อน 31/12/2025 | 
              <span 
                className="text-[#D6A985] cursor-pointer hover:underline ml-1" 
                onClick={(e) => {
                  handleStopPropagation(e);
                  onOpenTermsModal();
                }}
              >
                เงื่อนไข
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {discount && discountImages[id as keyof typeof discountImages] && (
        <div className="absolute right-2 top-12">
          <img 
            src={discountImages[id as keyof typeof discountImages]} 
            alt={discount} 
            className="w-[180px] h-[130px]" 
          />
        </div>
      )}
    </div>
  );
};

export default CoinCard;