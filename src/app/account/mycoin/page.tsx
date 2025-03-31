'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import AccountSidebar from '../component/sidebar';
import TermsModal from '@/app/component/terms-modal'

export default function page() {
  const [userInfo, setUserInfo] = useState({
    name: 'XXXXX XXXXXXXX',
    phone: '81-123-4567',
    email: 'XXXXXXXX@gmail.com',
    birthdate: '23/07/1998',
    gender: 'ชาย'
  });
  
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('บันทึกข้อมูล:', userInfo);
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
                    {/* บัตรเติม 1000 Coin */}
                    <div className="border border-[#FFFFFF] rounded-lg p-4 w-full cursor-pointer hover:shadow-md" onClick={() => window.location.href = '/account/mycoin/1000coin'}>
                      <div className="flex h-full">
                        <div className="flex items-center">
                          <div className="border-[2px] border-[#D6A985] rounded-lg p-2 mr-6 w-[220px] h-[180px] flex items-center justify-center cursor-pointer" onClick={(e) => {e.stopPropagation(); window.location.href = '/account/mycoin/1000coin'}}>
                            <img src="/images/card1.png" alt="KUMAま 1000 Coin" className="w-[180px] h-auto" />
                          </div>
                          <div>
                          <div className="inline-flex items-center text-[24px] font-bold text-[#5F6368]">
                              บัตรเติม 1000 Coin
                              <img src="/images/kumacoin.png" alt="Coin Icon" className="w-6 h-6 ml-2" />
                            </div>
                            <div className="text-[30px] font-bold text-[#B86A4B] mt-1">฿ 990</div>
                            <div className="border border-[#D6A985] rounded-md px-3 py-1 mt-2 inline-block text-[#D6A985]">ส่งเป็นของขวัญได้</div>
                            <div className="text-[16px] text-gray-500 mt-1">
                              ใช้ได้ก่อน 31/12/2025 | 
                              <span 
                                className="text-[#D6A985] cursor-pointer hover:underline" 
                                onClick={(e) => {e.stopPropagation(); setIsTermsModalOpen(true)}}
                              >
                                เงื่อนไข
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* บัตรเติม 3000 Coin */}
                    <div className="border border-[#FFFFFF] rounded-lg p-4 w-full cursor-pointer hover:shadow-md" onClick={() => window.location.href = '/account/mycoin/3000coin'}>
                      <div className="flex h-full">
                        <div className="flex items-center">
                          <div className="border-[2px] border-[#D6A985] rounded-lg p-2 mr-6 w-[220px] h-[180px] flex items-center justify-center cursor-pointer" onClick={(e) => {e.stopPropagation(); window.location.href = '/account/mycoin/3000coin'}}>
                            <img src="/images/card2.png" alt="KUMAま 3000 Coin" className="w-[180px] h-auto" />
                          </div>
                          <div>
                          <div className="inline-flex items-center text-[24px] font-bold text-[#5F6368]">
                            บัตรเติม 3000 Coin
                            <img src="/images/kumacoin.png" alt="Coin Icon" className="w-6 h-6 ml-2" />
                          </div>
                            <div className="text-[30px] font-bold text-[#B86A4B] mt-1">฿ 2950</div>
                            <div className="border border-[#D6A985] rounded-md px-3 py-1 mt-2 inline-block text-[#D6A985] w-[160px] h-[30px] text-center text-[16px] font-bold">ส่งเป็นของขวัญได้</div>
                            <div className="text-[16px] text-gray-500 mt-1">
                              ใช้ได้ก่อน 31/12/2025 | 
                              <span 
                                className="text-[#D6A985] cursor-pointer hover:underline" 
                                onClick={(e) => {e.stopPropagation(); setIsTermsModalOpen(true)}}
                              >
                                เงื่อนไข
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* บัตรเติม 5000 Coin */}
                    <div className="border border-[#FFFFFF] rounded-lg p-4 w-full cursor-pointer hover:shadow-md" onClick={() => window.location.href = '/account/mycoin/5000coin'}>
                      <div className="flex h-full">
                        <div className="flex items-center">
                          <div className="border-[2px] border-[#D6A985] rounded-lg p-2 mr-6 w-[220px] h-[180px] flex items-center justify-center cursor-pointer" onClick={(e) => {e.stopPropagation(); window.location.href = '/account/mycoin/5000coin'}}>
                            <img src="/images/card3.png" alt="KUMAま 5000 Coin" className="w-[180px] h-auto" />
                          </div>
                          <div>
                          <div className="inline-flex items-center text-[24px] font-bold text-[#5F6368]">
                              บัตรเติม 5000 Coin
                              <img src="/images/kumacoin.png" alt="Coin Icon" className="w-6 h-6 ml-2" />
                            </div>
                            <div className="text-[30px] font-bold text-[#B86A4B] mt-1">฿ 4850</div>
                            <div className="border border-[#D6A985] rounded-md px-3 py-1 mt-2 inline-block text-[#D6A985] w-[160px] h-[30px] text-center text-[16px] font-bold">ส่งเป็นของขวัญได้</div>
                            <div className="text-[16px] text-gray-500 mt-1">
                              ใช้ได้ก่อน 31/12/2025 | 
                              <span 
                                className="text-[#D6A985] cursor-pointer hover:underline" 
                                onClick={(e) => {e.stopPropagation(); setIsTermsModalOpen(true)}}
                              >
                                เงื่อนไข
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* บัตรเติม 10000 Coin */}
                    <div className="border border-[#FFFFFF] rounded-lg p-4 w-full cursor-pointer hover:shadow-md" onClick={() => window.location.href = '/account/mycoin/10000coin'}>
                      <div className="flex h-full">
                        <div className="flex items-center">
                          <div className="border-[2px] border-[#D6A985] rounded-lg p-2 mr-6 w-[220px] h-[180px] flex items-center justify-center cursor-pointer" onClick={(e) => {e.stopPropagation(); window.location.href = '/account/mycoin/10000coin'}}>
                            <img src="/images/card4.png" alt="KUMAま 10000 Coin" className="w-[180px] h-auto" />
                          </div>
                          <div>
                            <div className="text-[24px] font-bold text-[#5F6368]">บัตรเติม 10000 Coin</div>
                            <div className="text-[30px] font-bold text-[#B86A4B] mt-1">฿ 9500</div>
                            <div className="border border-[#D6A985] rounded-md px-3 py-1 mt-2 inline-block text-[#D6A985] w-[160px] h-[30px] text-center text-[16px] font-bold">ส่งเป็นของขวัญได้</div>
                            <div className="text-[16px] text-gray-500 mt-1">
                              ใช้ได้ก่อน 31/12/2025 | 
                              <span 
                                className="text-[#D6A985] cursor-pointer hover:underline" 
                                onClick={(e) => {e.stopPropagation(); setIsTermsModalOpen(true)}}
                              >
                                เงื่อนไข
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* บัตรเติม 15000 Coin */}
                    <div className="border border-[#FFFFFF] rounded-lg p-4 w-full cursor-pointer hover:shadow-md relative" onClick={() => window.location.href = '/account/mycoin/15000coin'}>
                      <div className="flex h-full">
                        <div className="flex items-center">
                          <div className="border-[2px] border-[#D6A985] rounded-lg p-2 mr-6 w-[220px] h-[180px] flex items-center justify-center cursor-pointer" onClick={(e) => {e.stopPropagation(); window.location.href = '/account/mycoin/15000coin'}}>
                            <img src="/images/card5.png" alt="KUMAま 15000 Coin" className="w-[180px] h-auto" />
                          </div>
                          <div>
                          <div className="inline-flex items-center text-[24px] font-bold text-[#5F6368]">
                              บัตรเติม 15000 Coin
                              <img src="/images/kumacoin.png" alt="Coin Icon" className="w-6 h-6 ml-2" />
                            </div>
                            <div className="text-[30px] font-bold text-[#B86A4B] mt-1">฿ 13900</div>
                            <div className="border border-[#D6A985] rounded-md px-3 py-1 mt-2 inline-block text-[#D6A985] w-[160px] h-[30px] text-center text-[16px] font-bold">ส่งเป็นของขวัญได้</div>
                            <div className="text-[16px] text-gray-500 mt-1">
                              ใช้ได้ก่อน 31/12/2025 | 
                              <span 
                                className="text-[#D6A985] cursor-pointer hover:underline" 
                                onClick={(e) => {e.stopPropagation(); setIsTermsModalOpen(true)}}
                              >
                                เงื่อนไข
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute right-2 top-12">
                        <img src="/images/5Discount.png" alt="5% DISCOUNT FRIEND ONLY" className="w-[180px] h-[130px]" />
                      </div>
                    </div>
                    
                    {/* บัตรเติม 25000 Coin */}
                    <div className="border border-[#FFFFFF] rounded-lg p-4 w-full cursor-pointer hover:shadow-md" onClick={() => window.location.href = '/account/mycoin/25000coin'}>
                      <div className="flex h-full">
                        <div className="flex items-center">
                          <div className="border-[2px] border-[#D6A985] rounded-lg p-2 mr-6 w-[220px] h-[180px] flex items-center justify-center cursor-pointer" onClick={(e) => {e.stopPropagation(); window.location.href = '/account/mycoin/25000coin'}}>
                            <img src="/images/card6.png" alt="KUMAま 25000 Coin" className="w-[180px] h-auto" />
                          </div>
                          <div>
                          <div className="inline-flex items-center text-[24px] font-bold text-[#5F6368]">
                            บัตรเติม 25000 Coin
                            <img src="/images/kumacoin.png" alt="Coin Icon" className="w-6 h-6 ml-2" />
                          </div>
                            <div className="text-[30px] font-bold text-[#B86A4B] mt-1">฿ 22900</div>
                            <div className="border border-[#D6A985] rounded-md px-3 py-1 mt-2 inline-block text-[#D6A985] w-[160px] h-[30px] text-center text-[16px] font-bold">ส่งเป็นของขวัญได้</div>
                            <div className="text-[16px] text-gray-500 mt-1">
                              ใช้ได้ก่อน 31/12/2025 | 
                              <span 
                                className="text-[#D6A985] cursor-pointer hover:underline" 
                                onClick={(e) => {e.stopPropagation(); setIsTermsModalOpen(true)}}
                              >
                                เงื่อนไข
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* บัตรเติม 35000 Coin */}
                    <div className="border border-[#FFFFFF] rounded-lg p-4 w-full cursor-pointer hover:shadow-md relative" onClick={() => window.location.href = '/account/mycoin/35000coin'}>
                      <div className="flex h-full">
                        <div className="flex items-center">
                          <div className="border-[2px] border-[#D6A985] rounded-lg p-2 mr-6 w-[220px] h-[180px] flex items-center justify-center cursor-pointer" onClick={(e) => {e.stopPropagation(); window.location.href = '/account/mycoin/35000coin'}}>
                            <img src="/images/card7.png" alt="KUMAま 35000 Coin" className="w-[180px] h-auto" />
                          </div>
                          <div>
                          <div className="inline-flex items-center text-[24px] font-bold text-[#5F6368]">
                            บัตรเติม 35000 Coin
                            <img src="/images/kumacoin.png" alt="Coin Icon" className="w-6 h-6 ml-2" />
                          </div>
                            <div className="text-[30px] font-bold text-[#B86A4B] mt-1">฿ 31900</div>
                            <div className="border border-[#D6A985] rounded-md px-3 py-1 mt-2 inline-block text-[#D6A985] w-[160px] h-[30px] text-center text-[16px] font-bold">ส่งเป็นของขวัญได้</div>
                            <div className="text-[16px] text-gray-500 mt-1">
                              ใช้ได้ก่อน 31/12/2025 | 
                              <span 
                                className="text-[#D6A985] cursor-pointer hover:underline" 
                                onClick={(e) => {e.stopPropagation(); setIsTermsModalOpen(true)}}
                              >
                                เงื่อนไข
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute right-2 top-12">
                        <img src="/images/7Discount.png" alt="7% DISCOUNT BEST FRIEND ONLY" className="w-[180px] h-[130px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Terms and Conditions Modal */}
        <TermsModal 
          isOpen={isTermsModalOpen} 
          onClose={() => setIsTermsModalOpen(false)} 
        />
    </div>
  )
}