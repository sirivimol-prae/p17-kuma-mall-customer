'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import AccountSidebar from '../component/sidebar';
import TermsModal from '@/app/component/terms-modal';
import CoinCard from './component/CoinCard';
import { coinCardData } from './component/cardData';

export default function page() {
  const [userInfo, setUserInfo] = useState({
    name: 'XXXXX XXXXXXXX',
    phone: '81-123-4567',
    email: 'XXXXXXXX@gmail.com',
    birthdate: '23/07/1998',
    gender: 'ชาย'
  });
  
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('บันทึกข้อมูล:', userInfo);
  };

  const handleOpenTermsModal = () => {
    setIsTermsModalOpen(true);
  };

  return (
    <div>
        <div className="flex items-center text-gray-600">
          <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
            <ArrowLeft color="#5F6368" />
            <span>หน้าแรก</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#D6A985]">KUMAま Coin ของฉัน</span>
        </div>
        <br />
        <div className="flex gap-6">
          <AccountSidebar />
          <div className="flex-1">
            <div className="w-full bg-white rounded shadow-sm p-6">
              <div className="flex items-center pb-4 mb-6 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#D6A985] flex items-center justify-center mr-4">
                  <img 
                    src="/images/Paw_icon.png" 
                    alt="Paw_icon" 
                  />
                </div>
                <h2 className="text-[28px] font-bold text-[#B86A4B] m-0">KUMAま Coin ของฉัน</h2>
              </div>

              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-8">
                  <div className="flex items-start">
                    <div className="mr-6">
                      <img src="/images/kumacoin.png" alt="KUMA Coin" className="w-[160px] h-[160px]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[#5F6368] mb-4">
                        <div className="text-[24px] font-bold mb-2">จำนวนเหรียญคงเหลือ :</div>
                        <div className="text-[38px] font-bold text-[#D6A985]">50 Coin</div>
                        <div className="text-[16px] mt-1 text-[#A6A6A6]">
                          <p>หมายเหตุ : การใช้งาน KUMAま Coin เป็นไปตามเงื่อนไขของทาง www.kuma-mail.com เท่านั้น</p>
                          <p className="mt-2">- 1 Coin มีมูลค่าเท่ากับ 1 บาท</p>
                          <p>- ทุกการสั่งซื้อครบ 50 บาท จะได้รับ 1 Coin ซึ่งสามารถสะสมแต้มได้สำหรับครอบครัว KUMAま</p>
                          <p className="text-[#D6A985]">- เลื่อนระดับสมาชิกเป็น KUMAま CLOSE FRIEND : เพียงมียอดซื้อสะสมครบ 15,000 บาท</p>
                          <p className="text-[#D6A985]">- เลื่อนระดับสมาชิกเป็น KUMAま BEST FRIEND : เพียงมียอดซื้อสะสมครบ 35,000 บาท</p>
                          <p>- สามารถซื้อบัตรเติม KUMAま Coin ในการอัพเกรดสถานะสมาชิก เพื่อรับสิทธิประโยชน์และส่วนลดที่มากกว่าทันทีในทุกคำสั่งซื้อ</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h3 className="text-[24px] font-bold text-[#5F6368] mb-4">บัตรเติม KUMAま Coin</h3>

                  <div className="flex flex-col">
                    {coinCardData.map((card) => (
                      <CoinCard
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        price={card.price}
                        discount={card.discount}
                        canGift={card.canGift}
                        onOpenTermsModal={handleOpenTermsModal}
                      />
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <TermsModal 
          isOpen={isTermsModalOpen} 
          onClose={() => setIsTermsModalOpen(false)} 
        />
    </div>
  )
}