'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import AccountSidebar from '../component/sidebar';
import { membershipData, membershipLevels } from './component/mockData';
import DiscountRibbon from './component/DiscountRibbon';

export default function Page(): React.ReactElement {
  const [currentAmount, setCurrentAmount] = useState(membershipData.currentAmount);
  const [timelineWidth, setTimelineWidth] = useState(0);
  const [currentMemberData, setCurrentMemberData] = useState(membershipData);
  const [levels, setLevels] = useState(membershipLevels);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const timelineRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    setCurrentAmount(membershipData.currentAmount);
    setCurrentMemberData(membershipData);
    setLevels(membershipLevels);
  }, [membershipData, membershipLevels]);
  
  useEffect(() => {
    if (timelineRef.current) {
      const width = timelineRef.current.offsetWidth;
      setTimelineWidth(width);
    }
    
    const handleResize = () => {
      if (timelineRef.current) {
        const width = timelineRef.current.offsetWidth;
        setTimelineWidth(width);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const currentLevel = levels.find(level => level.isActive) || levels[1];
  const nextLevelIndex = levels.findIndex(level => level.isActive) + 1;
  const nextLevel = nextLevelIndex < levels.length ? levels[nextLevelIndex] : null;
  
  const calculateProgressPercentage = () => {
    if (!nextLevel) return 100;
    
    const currentMin = currentLevel.minAmount;
    const nextMin = nextLevel.minAmount;
    const range = nextMin - currentMin;
    
    if (range <= 0) return 0;
    
    const progress = ((currentAmount - currentMin) / range) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };
  
  const calculateRemainingAmount = () => {
    if (!nextLevel) return 0;
    return Math.max(nextLevel.minAmount - currentAmount, 0);
  };
  
  const progressPercentage = calculateProgressPercentage();
  const remainingAmount = calculateRemainingAmount();
  
  const calculatePawPosition = () => {
    if (!currentMemberData.isLoggedIn) {
      return 33.33;
    }
    
    const MALL_POSITION = 0;
    const FRIEND_POSITION = 33.33;
    const CLOSE_FRIEND_POSITION = 66.67;
    const BEST_FRIEND_POSITION = 100;
    
    const CIRCLE_WIDTH_PERCENT = 10; 
    
    const FRIEND_RIGHT_EDGE = FRIEND_POSITION + (CIRCLE_WIDTH_PERCENT / 2);
    
    const BEST_FRIEND_LEFT_EDGE = BEST_FRIEND_POSITION - (CIRCLE_WIDTH_PERCENT / 2);
    const BEST_FRIEND_RIGHT_EDGE = BEST_FRIEND_POSITION + (CIRCLE_WIDTH_PERCENT / 2);
    
    const MOVABLE_RANGE = BEST_FRIEND_LEFT_EDGE - FRIEND_RIGHT_EDGE;
    
    const FRIEND_MAX = 14999;
    const CLOSE_FRIEND_MAX = 34999;
    
    if (currentAmount === 0) {
      return FRIEND_RIGHT_EDGE;
    } 
    else if (currentAmount <= FRIEND_MAX) {
      const rangeToCloseLeft = CLOSE_FRIEND_POSITION - (CIRCLE_WIDTH_PERCENT / 2) - FRIEND_RIGHT_EDGE;
      const progress = currentAmount / FRIEND_MAX;
      return FRIEND_RIGHT_EDGE + progress * rangeToCloseLeft;
    } 
    else if (currentAmount < 35000) {
      const closeRightEdge = CLOSE_FRIEND_POSITION + (CIRCLE_WIDTH_PERCENT / 2);
      const progress = (currentAmount - FRIEND_MAX) / (CLOSE_FRIEND_MAX - FRIEND_MAX);
      return closeRightEdge + progress * (BEST_FRIEND_LEFT_EDGE - closeRightEdge);
    } 
    else if (currentAmount === 35000) {
      return BEST_FRIEND_RIGHT_EDGE;
    }
    else {
      return BEST_FRIEND_RIGHT_EDGE;
    }
  };
  
  const pawPosition = calculatePawPosition();
  
  const isExactBreakpoint = false;

  const handleMouseOver = () => {
    setShowTooltip(true);
  };
  
  const handleMouseOut = () => {
    setShowTooltip(false);
  };

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

            <div className="mb-12">
              <div className="flex">
                <div className="w-[140px] h-[140px] rounded-full overflow-hidden mr-8">
                  <img 
                    src={currentMemberData.statusImage} 
                    alt={`${currentMemberData.currentStatus} icon`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-[24px] font-bold text-[#5F6368]">
                    สถานะสมาชิก : {currentMemberData.currentStatus}
                  </h3>
                  {nextLevel && (
                    <p className="text-[#5F6368] text-[18px] mb-4">
                      สะสมยอดซื้ออีก {remainingAmount.toLocaleString()} บาท ภายใน {currentMemberData.expiryDate} เพื่อปรับระดับสมาชิกเป็น 
                      <span className="text-[#D6A985] ml-2 text-[18px]">{nextLevel.name}</span>
                    </p>
                  )}
                  
                  <div className="w-full bg-gray-200 rounded-full h-5 mb-2">
                    <div 
                      className="bg-[#D6A985] h-5 rounded-full" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-end mb-6">
                    <p className="text-[#5F6368]">
                      {currentAmount.toLocaleString()} / {nextLevel ? nextLevel.minAmount.toLocaleString() : currentAmount.toLocaleString()} บาท
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Link href="/account/mycoin">
                      <button className="px-4 py-2 border-[3px] border-[#D6A985] text-[#D6A985] text-[18px] rounded-lg font-medium">
                        อัพเกรดสถานะสมาชิก
                      </button>
                    </Link>
                  </div>
                  <div className="text-center mt-2 text-[18px] text-[#D6A985] flex justify-end">
                    * เพื่อรับส่วนลดที่มากกว่าในทุกออเดอร์
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-14">
              <h3 className="text-[28px] font-bold text-[#5F6368] mb-2">ระดับสมาชิกของฉัน</h3>
              
              <div className="relative mt-10 mb-5">
                <div ref={timelineRef} className="relative">
                  <div className="grid grid-cols-4 relative z-20">
                    {levels.map((level, index) => {
                      const activeIndex = levels.findIndex(l => l.isActive);
                      
                      const highlightIcon = level.id === 'mall' ? 
                        true : 
                        (level.isActive || (index > 0 && index <= activeIndex));
                      
                      return (
                        <div key={level.id} className="flex flex-col items-center relative">
                          {index > 0 && (
                            <div 
                              className={`absolute text-gray-600 font-medium text-lg ${
                                currentAmount >= level.minAmount ? 'opacity-0' : 'opacity-100'
                              }`} 
                              style={{ top: '-40px' }}
                            >
                              {index === 1 ? '0' : index === 2 ? '15,000' : '35,000'}
                            </div>
                          )}
                          
                          <div 
                            className={`w-[120px] h-[120px] rounded-full overflow-hidden ${
                              highlightIcon ? 'border-[10px] border-[#B86A4B]' : 'border-[10px] border-gray-300'
                            }`}
                          >
                            <img 
                              src={level.iconPath} 
                              alt={level.name} 
                              className="w-full h-full object-contain" 
                            />
                          </div>
                          
                          <div className="text-center mt-3">
                            <p className={`font-bold text-[20px] ${
                              level.id === 'mall' ? 'text-[#D6A985]' :
                              level.isActive ? 'text-[#B86A4B]' :
                              currentMemberData.isLoggedIn && index <= activeIndex ? 'text-[#D6A985]' : 'text-[#A6A6A6]'
                            }`}>
                              {level.name}
                            </p>
                            {level.isActive && (
                              <p className="text-[#B86A4B] text-sm">
                                (สถานะปัจจุบัน)
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="absolute top-[60px] h-[12px] z-10" style={{ left: '125px', right: '125px' }}>
                    <div className="absolute h-full bg-gray-300 left-0 right-0"></div>
                    
                    <div className="absolute h-full bg-[#B86A4B] left-0" style={{ width: '33.33%' }}></div>
                    
                    {currentMemberData.isLoggedIn && currentAmount > 0 && (
                      <div 
                        className="absolute h-full bg-[#B86A4B]" 
                        style={{ 
                          left: '33.33%',
                          width: `${pawPosition - 33.33}%`,
                          zIndex: 15
                        }}
                      ></div>
                    )}
                    
                    {currentMemberData.isLoggedIn && !isExactBreakpoint && (
                      <>
                        <div
                          className="absolute text-[#B86A4B] font-bold text-center"
                          style={{ 
                            left: `${pawPosition}%`,
                            top: '-45px',
                            transform: 'translateX(-50%)',
                            width: '100px'
                          }}
                        >
                          {currentAmount.toLocaleString()}
                        </div>
                        
                        <div 
                          className="absolute top-[-24px] z-30"
                          style={{ 
                            left: `${pawPosition}%`,
                            transform: 'translateX(-25px)'
                          }}
                        >
                          <div className="relative group">
                            <div 
                              className="w-[50px] h-[50px] bg-[#B86A4B] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#a55c3f] transition-colors duration-200"
                            >
                              <img 
                                src="/images/foot.png" 
                                alt="Current position" 
                                className="w-9 h-9" 
                              />
                            </div>
                            
                            <div 
                              className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 px-3 py-2 bg-white shadow-lg rounded-md border border-gray-200 text-sm text-gray-700 whitespace-nowrap z-[9999] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                            >
                              ยอดซื้อสะสม {currentAmount.toLocaleString()} บาท
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
                
              <div className="relative mt-10">
                <div className="w-full h-px bg-[#A6A6A6]"></div>

                <div className="grid grid-cols-4">
                  <div className="p-4 flex justify-center">
                    <p className="text-center text-[18px] text-[#D6A985]">
                      สินค้าราคาพิเศษ<br />เฉพาะสำหรับเว็บไซต์เท่านั้น
                    </p>
                  </div>
                  
                  <div className="p-4 flex justify-center">
                    <DiscountRibbon 
                      isActive={currentMemberData.isLoggedIn && currentAmount > 0} 
                      discount="ส่วนลด 3% ทุกคำสั่งซื้อ" 
                      isCurrent={currentMemberData.isLoggedIn && currentAmount > 0 && currentAmount <= 14999}
                    />
                  </div>
                  
                  <div className="p-4 flex justify-center">
                    <DiscountRibbon 
                      isActive={currentMemberData.isLoggedIn && currentAmount >= 15000} 
                      discount="ส่วนลด 5% ทุกคำสั่งซื้อ" 
                      isCurrent={currentMemberData.isLoggedIn && currentAmount >= 15000 && currentAmount <= 34999}
                    />
                  </div>
                  
                  <div className="p-4 flex justify-center">
                    <DiscountRibbon 
                      isActive={currentMemberData.isLoggedIn && currentAmount >= 35000} 
                      discount="ส่วนลด 7% ทุกคำสั่งซื้อ" 
                      isCurrent={currentMemberData.isLoggedIn && currentAmount >= 35000}
                    />
                  </div>
                </div>
                  
                <div className="w-full h-px bg-[#A6A6A6]"></div>
                  
                <div className="grid grid-cols-4">
                  <div className="p-4 flex justify-center">
                    <p className="text-center text-[18px] text-[#D6A985]">-</p>
                  </div>
                  
                  <div className="p-4 flex justify-center">
                    <p className={`text-center text-[18px] ${
                      currentMemberData.isLoggedIn && currentAmount > 0 && currentAmount <= 14999
                      ? 'text-[#B86A4B]' : 
                      currentMemberData.isLoggedIn && currentAmount > 14999
                      ? 'text-[#D6A985]' : 'text-[#A6A6A6]'
                    }`}>-</p>
                  </div>
                  
                  <div className="p-4 flex justify-center">
                    <p className={`text-center text-[18px] ${
                      currentMemberData.isLoggedIn && currentAmount >= 15000 && currentAmount <= 34999
                      ? 'text-[#B86A4B]' : 
                      currentMemberData.isLoggedIn && currentAmount > 34999
                      ? 'text-[#D6A985]' : 'text-[#A6A6A6]'
                    }`}>
                      ช้อปสินค้าราคาเฉพาะ<br />เพื่อนสนิทของคุมะเท่านั้น !
                    </p>
                  </div>
                  
                  <div className="p-4 flex justify-center">
                    <p className={`text-center text-[18px] ${
                      currentMemberData.isLoggedIn && currentAmount >= 35000
                      ? 'text-[#B86A4B]' : 'text-[#A6A6A6]'
                    }`}>
                      ช้อปสินค้าราคาเฉพาะ<br />เพื่อนแท้ของคุมะเท่านั้น !
                    </p>
                  </div>
                </div>
                  
                <div className="w-full h-px bg-[#A6A6A6]"></div>
                  
                <div className="grid grid-cols-4">
                  <div className="p-4 flex justify-center">
                    <p className="text-center text-[18px] text-[#D6A985]">-</p>
                  </div>
                  
                  <div className="p-4 flex justify-center">
                    <p className={`text-center text-[18px] ${
                      currentMemberData.isLoggedIn && currentAmount > 0 && currentAmount <= 14999
                      ? 'text-[#B86A4B]' : 
                      currentMemberData.isLoggedIn && currentAmount > 14999
                      ? 'text-[#D6A985]' : 'text-[#A6A6A6]'
                    }`}>-</p>
                  </div>
                  
                  <div className="p-4 flex justify-center">
                    <p className={`text-center text-[18px] ${
                      currentMemberData.isLoggedIn && currentAmount >= 15000 && currentAmount <= 34999
                      ? 'text-[#B86A4B]' : 
                      currentMemberData.isLoggedIn && currentAmount > 34999
                      ? 'text-[#D6A985]' : 'text-[#A6A6A6]'
                    }`}>-</p>
                  </div>
                  
                  <div className="p-4 flex justify-center">
                    <p className={`text-center text-[18px] ${
                      currentMemberData.isLoggedIn && currentAmount >= 35000
                      ? 'text-[#B86A4B]' : 'text-[#A6A6A6]'
                    }`}>
                      Birthday Best Friend Gift<br />ของขวัญวันเกิดสุดพิเศษ
                    </p>
                  </div>
                </div>
                  
                <div className="w-full h-px bg-[#A6A6A6]"></div>
                  
                <div className="grid grid-cols-4">
                  <div className="p-4 flex justify-center">
                    <p className={`text-center text-[18px] ${
                      !currentMemberData.isLoggedIn ? 'text-[#B86A4B]' : 'text-[#D6A985]'
                    }`}>
                      สิทธิประโยชน์อื่นๆ<br />อีกมากมายรอให้ลุ้น !
                    </p>
                  </div>
                  
                  <div className="p-4 flex justify-center">
                    <p className={`text-center text-[18px] ${
                      currentMemberData.isLoggedIn && currentAmount > 0 && currentAmount <= 14999
                      ? 'text-[#B86A4B]' : 
                      currentMemberData.isLoggedIn && currentAmount > 14999
                      ? 'text-[#D6A985]' : 'text-[#A6A6A6]'
                    }`}>
                      สิทธิประโยชน์อื่นๆ<br />อีกมากมายรอให้ลุ้น !
                    </p>
                  </div>
                  
                  <div className="p-4 flex justify-center">
                    <p className={`text-center text-[18px] ${
                      currentMemberData.isLoggedIn && currentAmount >= 15000 && currentAmount <= 34999
                      ? 'text-[#B86A4B]' : 
                      currentMemberData.isLoggedIn && currentAmount > 34999
                      ? 'text-[#D6A985]' : 'text-[#A6A6A6]'
                    }`}>
                      สิทธิประโยชน์อื่นๆ<br />อีกมากมายรอให้ลุ้น !
                    </p>
                  </div>
                  
                  <div className="p-4 flex justify-center">
                    <p className={`text-center text-[18px] ${
                      currentMemberData.isLoggedIn && currentAmount >= 35000
                      ? 'text-[#B86A4B]' : 'text-[#A6A6A6]'
                    }`}>
                      สิทธิประโยชน์อื่นๆ<br />อีกมากมายรอให้ลุ้น !
                    </p>
                  </div>
                </div>
                  
                <div className="w-full h-px bg-[#A6A6A6]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}