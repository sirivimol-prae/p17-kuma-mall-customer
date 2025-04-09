'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { coinCards } from './mockData';
import TermsModal from '@/app/component/terms-modal';

const CoinSidebar = () => {
  const displayedCoins = coinCards.slice(0, 4);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  return (
    <div className="pl-0">
      <h3 className="text-[24px] font-bold text-[#5F6368] mb-2 pl-0">
        บัตรเติม KUMAま Coin
      </h3>
      
      <div className="space-y-3 flex flex-col items-start">
        {displayedCoins.map((coin) => (
          <div key={coin.id} className="w-[235px] flex flex-col">
            <div className="flex flex-col">
              <div className="border border-[#D6A985] rounded-lg p-2 mb-2">
                <div className="relative w-[215px] h-[170px] flex items-center justify-center">
                  <Image 
                    src={coin.image} 
                    alt={coin.title} 
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <h4 className="text-[24px] font-bold text-[#5F6368] flex items-center mb-1">
                  {coin.title}
                  <Image
                    src="/images/kumacoin.png"
                    alt="Kuma Coin"
                    width={16}
                    height={16}
                    className="ml-1"
                  />
                </h4>
                
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[26px] font-bold text-[#B86A4B]">
                    ฿{coin.price.toLocaleString()}
                  </p>
                  
                  {coin.canGift && (
                    <span className="border border-[#D6A985] rounded-md px-1 py-0.5 text-[16px] text-[#D6A985] inline-block w-[130px] h-[25px] leading-[1.2] text-center whitespace-nowrap overflow-hidden text-ellipsis">
                    ส่งเป็นของขวัญได้
                  </span>                  
                  )}
                </div>
                
                <div className="flex items-center text-[18px] text-gray-500">
                  <span>ใช้ได้ก่อน {coin.expireDate}</span>
                  <span className="mx-1">|</span>
                  <span 
                    className="text-[#D6A985] cursor-pointer underline hover:underline"
                    onClick={() => setIsTermsModalOpen(true)}
                  >
                    เงื่อนไข
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <TermsModal 
        isOpen={isTermsModalOpen} 
        onClose={() => setIsTermsModalOpen(false)} 
      />
    </div>
  );
};

export default CoinSidebar;