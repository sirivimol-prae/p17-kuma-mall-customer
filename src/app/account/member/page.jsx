'use client'

import React from 'react'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import AccountSidebar from '../component/sidebar';

export default function page() {
  return (
    <div>
        <div className="flex items-center text-gray-600">
          <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
            <ArrowLeft color="#5F6368" />
            <span>หน้าแรก</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#D6A985]">สถานะสมาชิกและสิทธิประโยชน์</span>
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
                <h2 className="text-[28px] font-bold text-[#B86A4B] m-0">สถานะสมาชิกและสิทธิประโยชน์</h2>
              </div>

              {/* สถานะสมาชิก */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-[140px] h-[140px] rounded-full overflow-hidden mr-4">
                    <img 
                      src="/images/kuma-friend.png" 
                      alt="KUMA Friend icon" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-[24px] font-bold text-[#5F6368]">
                        สถานะสมาชิก : KUMAま FRIEND
                    </h3>
                    <p className="text-[#5F6368] text-[18px]">
                        สะสมยอดซื้ออีก 10,000 บาท ภายใน 22/07/2025 เพื่อปรับระดับสมาชิกเป็น 
                        <span className="text-[#D6A985] ml-2 text-[18px]">KUMAま CLOSE FRIEND</span>
                    </p>
                    </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-[730px] bg-gray-200 rounded-full h-5 mb-2">
                  <div className="bg-[#D6A985] h-5 rounded-full" style={{ width: '33.33%' }}></div>
                </div>
                <div className="flex justify-end mb-6">
                  <p className="text-[#5F6368]">5,000 / 15,000 บาท</p>
                </div>
                
                <div className="flex justify-end">
                  <button className="px-3 py-1 border-[3px] border-[#D6A985] text-[#D6A985] text-[18px] rounded-lg font-medium">
                    อัพเกรดสถานะสมาชิก
                  </button>
                </div>
                <div className="text-center mt-2 text-sm text-[#D6A985] flex justify-end">
                  * เพื่อรับส่วนลดที่มากกว่าในทุกออเดอร์
                </div>
              </div>

              </div>
          </div>
        </div>
    </div>
  )
}