'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import AccountSidebar from '../account/component/sidebar';

export default function page() {
  // สถานะสำหรับที่อยู่
  const [selectedAddress, setSelectedAddress] = useState(1); // สมมติให้ ID=1 เป็นที่อยู่หลัก

  // Mock data สำหรับที่อยู่
  const addressData = {
    recipientName: "XXXXX XXXXXXXX",
    phone: "(+66) 81-123-4567",
    addressType: "บ้าน",
    addressDetail: "8/13 ซอย XXXXX ถนน YYYYYYY แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110"
  };

  // ฟังก์ชัน Action
  const handleAddAddress = () => {
    console.log('เพิ่มที่อยู่ใหม่');
  };

  const handleEditAddress = () => {
    console.log('แก้ไขที่อยู่');
  };

  const handleDeleteAddress = () => {
    console.log('ลบที่อยู่');
  };

  return (
    <div>
        <div className="flex items-center text-gray-600">
          <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
            <ArrowLeft color="#5F6368" />
            <span>หน้าแรก</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#D6A985]">จัดการที่อยู่จัดส่ง</span>
        </div>
        <br />
        <div className="flex gap-6">
          <AccountSidebar />
          <div className="flex-1">
            <div className="w-full bg-white rounded shadow-sm p-6">
              <div className="flex items-center pb-4 mb-6 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#D6A985] flex items-center justify-center mr-4">
                  <img 
                    src="./images/Paw_icon.png" 
                    alt="Paw_icon" 
                  />
                </div>
                <h2 className="text-[28px] font-bold text-[#B86A4B] m-0">จัดการที่อยู่จัดส่ง</h2>
              </div>

              <div className="w-full mb-6">
                {/* ที่อยู่จัดส่ง */}
                <div className="rounded-lg border border-gray-200 p-4">
                    
                {/* หัวตาราง */}
                <div className="grid grid-cols-12 mb-3">
                <div className="col-span-3 flex items-start text-[#5F6368] pl-14 text-[16px]">ชื่อผู้รับ</div>
                <div className="col-span-2 text-[#5F6368] text-[16px]">ประเภทที่อยู่อาศัย</div>
                <div className="col-span-5 text-[#5F6368] text-[16px]">ที่อยู่จัดส่ง</div>
                </div>

                  <div className="grid grid-cols-12 items-center">
                  <div className="col-span-3 flex items-start">
                    <label className="inline-flex items-center">
                        <input 
                        type="radio" 
                        name="selectedAddress" 
                        checked={selectedAddress === 1} 
                        onChange={() => setSelectedAddress(1)}
                        className="sr-only"
                        />
                        <div className="relative mr-3">
                        <div className={`w-5 h-5 rounded-full border-2 ${selectedAddress === 1 ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                            {selectedAddress === 1 && (
                            <div className="text-[16px] w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                        </div>
                        </div>
                        <div className="text-[#5F6368]">
                        <div>XXXXX XXXXXXXX</div>
                        <div>(+66) 81-123-4567</div>
                        </div>
                    </label>
                    </div>
                    
                    <div className="col-span-2 flex items-center gap-2">
                    <span className="text-[#5F6368]">บ้าน</span>
                    <span className="px-4 py-1 bg-[#D6A985] text-white rounded-full text-[16px]">
                        ที่อยู่ปัจจุบัน
                    </span>
                    </div>

                    <div className="col-span-5 text-[#5F6368]">
                      8/13 ซอย XXXXX ถนน YYYYYYY แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110
                    </div>
                    
                    <div className="col-span-2 text-right">
                      <div className="flex flex-col items-end">
                        <button 
                          onClick={handleEditAddress}
                          className="text-[#D6A985] hover:text-[#B86A4B] text-[16px] mb-1"
                        >
                          แก้ไขที่อยู่
                        </button>
                        <button 
                          onClick={handleDeleteAddress}
                          className="text-[#D6A985] hover:text-[#B86A4B] text-[16px]"
                        >
                          ลบที่อยู่
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* ปุ่มเพิ่มที่อยู่ใหม่ */}
                <div className="mt-4 w-[180px] h-[50px]">
                  <button 
                    onClick={handleAddAddress}
                    className="flex items-center px-4 py-2 border border-[#D6A985] text-[#D6A985] font-bold text-[18px] rounded-lg hover:bg-[#F5E1CF] transition-colors"
                  >
                    <span className="mr-2 font-bold text-[18px]">+</span>
                    <span>เพิ่มที่อยู่ใหม่</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}