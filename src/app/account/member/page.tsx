'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import AccountSidebar from '../component/sidebar';
import { membershipData, membershipLevels, MembershipData, MembershipLevel } from './component/mockData';

export default function Page(): React.ReactElement {
  const [hoveredAmount, setHoveredAmount] = useState<number | null>(null);
  
  // คำนวณเปอร์เซ็นต์ความคืบหน้า
  const currentLevel = membershipLevels.find(level => level.isActive) || membershipLevels[1];
  const nextLevelIndex = membershipLevels.findIndex(level => level.isActive) + 1;
  const nextLevel = nextLevelIndex < membershipLevels.length ? membershipLevels[nextLevelIndex] : null;
  
  // คำนวณเปอร์เซ็นต์ความคืบหน้าภายในระดับปัจจุบัน
  const progressPercentage = nextLevel 
    ? ((membershipData.currentAmount - currentLevel.minAmount) / (nextLevel.minAmount - currentLevel.minAmount)) * 100
    : 100;
  
  // คำนวณจำนวนเงินที่ต้องสะสมเพิ่ม
  const remainingAmount = nextLevel ? nextLevel.minAmount - membershipData.currentAmount : 0;

  // คำนวณตำแหน่งของ Paw icon บนไทม์ไลน์
  // กำหนดช่วงต่างๆ
  const friendMinAmount = membershipLevels[1].minAmount; // 0
  const friendMaxAmount = membershipLevels[1].maxAmount; // 15000
  const closeFriendMinAmount = membershipLevels[2].minAmount; // 15001
  const closeFriendMaxAmount = membershipLevels[2].maxAmount; // 35000
  
  // คำนวณความกว้างของแต่ละช่วงในไทม์ไลน์ (ไม่รวม MALL)
  const timelineSegments = 3; // FRIEND, CLOSE FRIEND, BEST FRIEND
  const segmentWidth = 100 / timelineSegments;
  
  // คำนวณตำแหน่งของ Paw icon
  let progressPositionPercentage;
  
  // ถ้าเป็น FRIEND (0-15000 บาท)
  if (membershipData.currentAmount <= friendMaxAmount) {
    // คำนวณตำแหน่งภายในช่วง FRIEND (0-33.33%)
    const friendProgress = (membershipData.currentAmount / friendMaxAmount) * segmentWidth;
    // ปรับตำแหน่งให้เริ่มหลัง MALL (33.33%)
    progressPositionPercentage = friendProgress;
  }
  // ถ้าเป็น CLOSE FRIEND (15001-35000 บาท)
  else if (membershipData.currentAmount <= closeFriendMaxAmount) {
    // คำนวณตำแหน่งภายในช่วง CLOSE FRIEND (33.33-66.66%)
    const excessAmount = membershipData.currentAmount - friendMaxAmount;
    const closeFriendRange = closeFriendMaxAmount - friendMaxAmount;
    const closeFriendProgress = (excessAmount / closeFriendRange) * segmentWidth;
    progressPositionPercentage = segmentWidth + closeFriendProgress;
  }
  // ถ้าเป็น BEST FRIEND (35001+ บาท)
  else {
    // อยู่ในช่วงสุดท้าย (66.66-100%)
    const excessAmount = membershipData.currentAmount - closeFriendMaxAmount;
    const bestFriendMinExcess = 1; // เริ่มที่ 35001 (35000 + 1)
    const bestFriendRange = 15000; // สมมติว่าช่วง BEST FRIEND มีความกว้าง 15000 เท่ากับช่วงอื่น
    const bestFriendProgress = Math.min((excessAmount / bestFriendRange) * segmentWidth, segmentWidth);
    progressPositionPercentage = 2 * segmentWidth + bestFriendProgress;
  }

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
              {/* หัวข้อหลัก */}
              <div className="flex items-center pb-4 mb-6 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#D6A985] flex items-center justify-center mr-4">
                  <img 
                    src="/images/Paw_icon.png" 
                    alt="Paw_icon" 
                  />
                </div>
                <h2 className="text-[28px] font-bold text-[#B86A4B] m-0">สถานะสมาชิกและสิทธิประโยชน์</h2>
              </div>

              {/* SESSION 1: สถานะสมาชิก */}
              <div className="mb-12">
                <div className="flex">
                  {/* ไอคอนสถานะสมาชิก */}
                  <div className="w-[140px] h-[140px] rounded-full overflow-hidden mr-8">
                    <img 
                      src={membershipData.statusImage} 
                      alt={`${membershipData.currentStatus} icon`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* ข้อมูลสถานะและแถบความคืบหน้า */}
                  <div className="flex-1">
                    <h3 className="text-[24px] font-bold text-[#5F6368]">
                      สถานะสมาชิก : {membershipData.currentStatus}
                    </h3>
                    {nextLevel && (
                      <p className="text-[#5F6368] text-[18px] mb-4">
                        สะสมยอดซื้ออีก {remainingAmount.toLocaleString()} บาท ภายใน {membershipData.expiryDate} เพื่อปรับระดับสมาชิกเป็น 
                        <span className="text-[#D6A985] ml-2 text-[18px]">{nextLevel.name}</span>
                      </p>
                    )}
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-5 mb-2">
                      <div 
                        className="bg-[#D6A985] h-5 rounded-full" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-end mb-6">
                      <p className="text-[#5F6368]">{membershipData.currentAmount.toLocaleString()} / {nextLevel ? nextLevel.minAmount.toLocaleString() : membershipData.targetAmount.toLocaleString()} บาท</p>
                    </div>
                    
                    {/* ปุ่มอัพเกรด */}
                    <div className="flex justify-end">
                      <button className="px-4 py-2 border-[2px] border-[#D6A985] text-[#D6A985] text-[16px] rounded-lg font-medium">
                        อัพเกรดสถานะสมาชิก
                      </button>
                    </div>
                    <div className="text-center mt-2 text-sm text-[#D6A985] flex justify-end">
                      * เพื่อรับส่วนลดที่มากกว่าในทุกออเดอร์
                    </div>
                  </div>
                </div>
              </div>
              
              {/* SESSION 2: ระดับสมาชิก */}
              <div className="mt-14">
                <h3 className="text-2xl font-bold text-[#5F6368] mb-2">ระดับสมาชิกของฉัน</h3>
                
                {/* ตำแหน่งของจำนวนเงินด้านบน */}
                <div className="relative w-full mt-8">
                  <div className="absolute right-[15%] top-[-10px]">
                    <p className="text-gray-600 font-medium text-lg">35,001 บาท</p>
                  </div>
                  <div className="absolute right-[58%] top-[-10px]">
                    <p className="text-gray-600 font-medium text-lg">15,001 บาท</p>
                  </div>
                  <div className="absolute right-[82%] top-[-10px]">
                    <p className="text-gray-600 font-medium text-lg">0 บาท</p>
                  </div>
                </div>
                
                {/* ระบบการแสดงผลระดับสมาชิก */}
                <div className="relative mt-16 mb-20">
                  {/* เส้นเชื่อมระหว่างระดับ - หลัก */}
                  <div className="absolute top-[60px] left-[60px] right-[60px] h-[12px] bg-gray-300 z-0"></div>
                  
                  {/* เส้นความคืบหน้า (เส้นสีน้ำตาล) */}
                  <div 
                    className="absolute top-[60px] left-[60px] h-[12px] bg-[#B86A4B] z-10" 
                  >
                    {/* กำหนดความกว้างตามสัดส่วน - ใช้การคำนวณความกว้างที่ซับซ้อนขึ้น */}
                    <div 
                      className="h-full bg-[#B86A4B]"
                      style={{ 
                        width: `${progressPositionPercentage}%` 
                      }}
                    ></div>
                    
                    {/* ไอคอนรอยเท้า (Paw) แสดงตำแหน่งปัจจุบัน */}
                    <div 
                      className="absolute top-[-24px] right-[-25px] z-30 cursor-pointer"
                      onMouseEnter={() => setHoveredAmount(membershipData.currentAmount)}
                      onMouseLeave={() => setHoveredAmount(null)}
                    >
                      <div className="w-[50px] h-[50px] bg-[#B86A4B] rounded-full flex items-center justify-center">
                        <img 
                          src="/images/Paw_icon.png" 
                          alt="Current position" 
                          className="w-9 h-9" 
                        />
                      </div>
                      
                      {/* จำนวนเงินสะสมปัจจุบัน */}
                      <div className="absolute top-[-30px] left-[-10px]">
                        <p className="font-bold text-[#B86A4B] text-lg">{membershipData.currentAmount.toLocaleString()}</p>
                      </div>
                      
                      {/* Tooltip เมื่อ hover */}
                      {hoveredAmount !== null && (
                        <div className="absolute bottom-full mb-2 bg-white shadow-lg rounded-lg px-3 py-2 text-sm whitespace-nowrap">
                          <span>ยอดสั่งซื้อสะสม {hoveredAmount.toLocaleString()} บาท</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* ไอคอนระดับสมาชิกทั้ง 4 ระดับ */}
                  <div className="flex justify-between relative z-20">
                    {membershipLevels.map((level, index) => (
                      <div key={level.id} className="flex flex-col items-center">
                        {/* ไอคอนวงกลม */}
                        <div 
                          className={`w-[120px] h-[120px] rounded-full overflow-hidden ${
                            level.isActive || index < membershipLevels.findIndex(l => l.isActive)
                              ? 'border-[10px] border-[#B86A4B]'
                              : 'border-[10px] border-gray-300'
                          }`}
                        >
                          <img 
                            src={level.iconPath} 
                            alt={level.name} 
                            className="w-full h-full object-contain" 
                          />
                        </div>
                        
                        {/* ชื่อระดับ */}
                        <div className="text-center mt-3">
                          <p className="font-bold text-[#B86A4B] text-lg">
                            {level.name}
                          </p>
                          {level.isActive && (
                            <p className="text-[#B86A4B] text-sm">
                              (สถานะปัจจุบัน)
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* ส่วนแสดงสิทธิประโยชน์ตามระดับสมาชิก */}
                <div className="mt-6 mb-12">
                  <div className="grid grid-cols-4 gap-4">
                    {/* KUMA MALL สิทธิประโยชน์ */}
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="inline-block px-3 py-1 rounded-md bg-transparent text-[#B86A4B]">
                          -
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 h-12 flex items-center justify-center">
                        สินค้าราคาพิเศษ<br />เฉพาะสำหรับนิวคอเมอร์
                      </p>
                      <p className="text-sm text-gray-600 mb-4 h-12 flex items-center justify-center opacity-50">
                        -
                      </p>
                      <p className="text-sm text-gray-600 mb-4 h-12 flex items-center justify-center opacity-50">
                        -
                      </p>
                    </div>
                    
                    {/* KUMA FRIEND สิทธิประโยชน์ */}
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="inline-block px-3 py-1 rounded-md bg-[#B86A4B] text-white">
                          ส่วนลด 3% ทุกคำสั่งซื้อ
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 h-12 flex items-center justify-center opacity-50">
                        -
                      </p>
                      <p className="text-sm text-gray-600 mb-4 h-12 flex items-center justify-center opacity-50">
                        -
                      </p>
                      <p className="text-sm text-gray-600 mb-4 h-12 flex items-center justify-center">
                        สิทธิประโยชน์อื่นๆ<br />อีกมากมายที่รอคุณอยู่!
                      </p>
                    </div>
                    
                    {/* KUMA CLOSE FRIEND สิทธิประโยชน์ */}
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="inline-block px-3 py-1 rounded-md bg-gray-400 text-white">
                          ส่วนลด 5% ทุกคำสั่งซื้อ
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 h-12 flex items-center justify-center">
                        รับบัตชื้อสินค้าราคาพิเศษ<br />เพื่อนสนิทของคุณเท่านั้น!
                      </p>
                      <p className="text-sm text-gray-600 mb-4 h-12 flex items-center justify-center opacity-50">
                        -
                      </p>
                      <p className="text-sm text-gray-600 mb-4 h-12 flex items-center justify-center">
                        สิทธิประโยชน์อื่นๆ<br />อีกมากมายที่รอคุณอยู่!
                      </p>
                    </div>
                    
                    {/* KUMA BEST FRIEND สิทธิประโยชน์ */}
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="inline-block px-3 py-1 rounded-md bg-gray-400 text-white">
                          ส่วนลด 7% ทุกคำสั่งซื้อ
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 h-12 flex items-center justify-center">
                        รับบัตชื้อสินค้าราคาพิเศษ<br />เพื่อนสนิทของคุณเท่านั้น!
                      </p>
                      <p className="text-sm text-gray-600 mb-4 h-12 flex items-center justify-center">
                        Birthday Best Friend Gift<br />ของขวัญวันเกิดสุดพิเศษ
                      </p>
                      <p className="text-sm text-gray-600 mb-4 h-12 flex items-center justify-center">
                        สิทธิประโยชน์อื่นๆ<br />อีกมากมายที่รอคุณอยู่!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}