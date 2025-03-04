'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import AccountSidebar from './component/sidebar';

//MockData
export default function page() {
  const [userInfo, setUserInfo] = useState({
    name: 'XXXXX XXXXXXXX',
    phone: '81-123-4567',
    email: 'XXXXXXXX@gmail.com',
    birthdate: '23/07/1998',
    gender: 'ชาย'
  });

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
          <span className="text-[#D6A985]">ข้อมูลส่วนตัวของฉัน</span>
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
                <h2 className="text-[28px] font-bold text-[#B86A4B] m-0">ข้อมูลส่วนตัวของฉัน</h2>
              </div>

              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-5">
                  <label htmlFor="fullname" className="block mb-2 text-[16px] text-[#5F6368]">ชื่อ - นามสกุล</label>
                  <input 
                    type="text" 
                    id="fullname" 
                    value={userInfo.name} 
                    placeholder="XXXXX XXXXXXXX"
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    className="w-full px-4 py-2 border border-[#AFB2B6] rounded text-[16px] text-[#5F6368]"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-5 mb-5">
                  <div className="flex-1">
                    <label htmlFor="phone" className="block mb-2 text-[16px] text-[#5F6368]">หมายเลขโทรศัพท์</label>
                    <div className="flex">
                      <span className="bg-white px-4 py-2 border border-[#AFB2B6] border-r-0 rounded-l text-[16px] text-[#5F6368]">+66</span>
                      <input 
                        type="tel" 
                        id="phone" 
                        value={userInfo.phone} 
                        placeholder="81-123-4567"
                        onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                        className="flex-1 px-4 py-2 border border-[#AFB2B6] rounded-r text-[16px] text-[#5F6368]"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="email" className="block mb-2 text-[16px] text-[#5F6368]">อีเมล</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={userInfo.email} 
                      placeholder="XXXXXXXX@gmail.com"
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      className="w-full px-4 py-2 border border-[#AFB2B6] rounded text-[16px] text-[#5F6368]"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 mb-5">
                  <div className="flex-1">
                    <label htmlFor="birthdate" className="block mb-2 text-[16px] text-[#5F6368]">วัน/เดือน/ปี เกิด</label>
                    <input 
                      type="text" 
                      id="birthdate" 
                      value={userInfo.birthdate} 
                      placeholder="DD/MM/YYYY"
                      onChange={(e) => setUserInfo({...userInfo, birthdate: e.target.value})}
                      className="w-full px-4 py-2 border border-[#AFB2B6] rounded text-[16px] text-[#5F6368]"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="gender" className="block mb-2 text-[16px] text-[#5F6368]">เพศของฉัน</label>
                    <div className="flex gap-5">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input 
                            type="radio" 
                            name="gender" 
                            value="ชาย" 
                            checked={userInfo.gender === 'ชาย'} 
                            onChange={(e) => setUserInfo({...userInfo, gender: e.target.value})}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 ${userInfo.gender === 'ชาย' ? 'border-[#AFB2B6]' : 'border-gray-300'}`}>
                            {userInfo.gender === 'ชาย' && (
                              <div className="w-3 h-3 rounded-full bg-[#AFB2B6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                          </div>
                        </div>
                        <span className="ml-2 text-[16px] text-[#5F6368]">ชาย</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input 
                            type="radio" 
                            name="gender" 
                            value="หญิง" 
                            checked={userInfo.gender === 'หญิง'} 
                            onChange={(e) => setUserInfo({...userInfo, gender: e.target.value})}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 ${userInfo.gender === 'หญิง' ? 'border-[#AFB2B6]' : 'border-gray-300'}`}>
                            {userInfo.gender === 'หญิง' && (
                              <div className="w-3 h-3 rounded-full bg-[#AFB2B6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                          </div>
                        </div>
                        <span className="ml-2 text-[16px] text-[#5F6368]">หญิง</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input 
                            type="radio" 
                            name="gender" 
                            value="ไม่ระบุเพศ" 
                            checked={userInfo.gender === 'ไม่ระบุเพศ'} 
                            onChange={(e) => setUserInfo({...userInfo, gender: e.target.value})}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 ${userInfo.gender === 'ไม่ระบุเพศ' ? 'border-[#AFB2B6]' : 'border-gray-300'}`}>
                            {userInfo.gender === 'ไม่ระบุเพศ' && (
                              <div className="w-3 h-3 rounded-full bg-[#AFB2B6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                          </div>
                        </div>
                        <span className="ml-2 text-[16px] text-[#5F6368]">ไม่ระบุเพศ</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-start">
                <button 
                  type="submit" 
                  className="px-8 py-3 bg-[#D6A985] text-white border-0 rounded-[10px] text-[18px] font-bold cursor-pointer transition-colors hover:bg-[#c49976] w-[180px] h-[50px]"
                >
                  บันทึกข้อมูล
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}