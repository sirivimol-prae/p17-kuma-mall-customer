'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import { ArrowLeft, X } from 'lucide-react'
import AccountSidebar from '../component/sidebar';

export default function page() {
  // สถานะสำหรับที่อยู่
  const [selectedAddress, setSelectedAddress] = useState(1); // สมมติให้ ID=1 เป็นที่อยู่หลัก
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    addressType: 'home', // 'home', 'office', 'other'
    address: '',
    isDefault: false
  });

  // Mock data สำหรับที่อยู่
  const addressData = {
    recipientName: "XXXXX XXXXXXXX",
    phone: "(+66) 81-123-4567",
    addressType: "บ้าน",
    addressDetail: "8/13 ซอย XXXXX ถนน YYYYYYY แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110"
  };

  // ฟังก์ชัน Action
  const handleAddAddress = () => {
    setShowAddModal(true);
  };

  const handleEditAddress = () => {
    console.log('แก้ไขที่อยู่');
  };

  const handleDeleteAddress = () => {
    console.log('ลบที่อยู่');
  };
  
  const handleCloseModal = () => {
    setShowAddModal(false);
    // รีเซ็ตค่าฟอร์ม
    setNewAddress({
      name: '',
      phone: '',
      addressType: 'home',
      address: '',
      isDefault: false
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSaveAddress = () => {
    console.log('บันทึกที่อยู่ใหม่:', newAddress);
    // สำหรับโปรเจกต์จริงจะต้องส่งข้อมูลไปยัง API
    // จากนั้นปิด Modal และรีเฟรชข้อมูล
    handleCloseModal();
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
                    src="/images/paw_icon.png" 
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
        
        {/* Modal เพิ่มที่อยู่ใหม่ */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto py-6">
            <div className="bg-white rounded-[10px] w-full max-w-2xl p-6 relative mx-auto my-4 max-h-[90vh] overflow-y-auto">
              <button 
                onClick={handleCloseModal} 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              
              <div className="mb-6">
                <h2 className="text-[32px] font-bold text-[#B86A4B] border-b-2 border-[#D6A985] pb-2">เพิ่มที่อยู่จัดส่งใหม่</h2>
              </div>
              
              <div className="mb-6">
                <p className="text-lg font-medium mb-2 text-[#5F6368]">ประเภทที่อยู่อาศัย</p>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="addressType" 
                      value="home" 
                      checked={newAddress.addressType === 'home'} 
                      onChange={() => setNewAddress({...newAddress, addressType: 'home'})}
                      className="sr-only"
                    />
                    <div className="relative mr-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${newAddress.addressType === 'home' ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                        {newAddress.addressType === 'home' && (
                          <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        )}
                      </div>
                    </div>
                    <span className="text-[#5F6368]">บ้าน</span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="addressType" 
                      value="office" 
                      checked={newAddress.addressType === 'office'} 
                      onChange={() => setNewAddress({...newAddress, addressType: 'office'})}
                      className="sr-only"
                    />
                    <div className="relative mr-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${newAddress.addressType === 'office' ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                        {newAddress.addressType === 'office' && (
                          <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        )}
                      </div>
                    </div>
                    <span className="text-[#5F6368]">ที่ทำงาน</span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="addressType" 
                      value="other" 
                      checked={newAddress.addressType === 'other'} 
                      onChange={() => setNewAddress({...newAddress, addressType: 'other'})}
                      className="sr-only"
                    />
                    <div className="relative mr-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${newAddress.addressType === 'other' ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                        {newAddress.addressType === 'other' && (
                          <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        )}
                      </div>
                    </div>
                    <span className="text-[#5F6368]">อื่นๆ</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2 text-[#5F6368]">ข้อมูลผู้รับ</h3>
                <div className="mb-4">
                  <label className="block text-[#5F6368] mb-2">ชื่อ - นามสกุล</label>
                  <input 
                    type="text" 
                    name="name"
                    value={newAddress.name}
                    onChange={handleInputChange}
                    placeholder="ชื่อ - นามสกุล" 
                    className="w-full px-4 py-2 border border-gray-300 rounded text-[16px]"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-[#5F6368] mb-2">หมายเลขโทรศัพท์</label>
                  <div className="flex">
                    <span className="bg-gray-100 px-4 py-2 border border-gray-300 border-r-0 rounded-l text-[16px] text-[#5F6368]">+66</span>
                    <input 
                      type="tel" 
                      name="phone"
                      value={newAddress.phone}
                      onChange={handleInputChange}
                      placeholder="81-123-4567" 
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-r text-[16px]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-[#5F6368] mb-2">ที่อยู่จัดส่ง</label>
                <textarea 
                  name="address"
                  value={newAddress.address}
                  onChange={handleInputChange}
                  placeholder="เลขที่, ซอย, ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด, รหัสไปรษณีย์" 
                  className="w-full px-4 py-2 border border-gray-300 rounded text-[16px] min-h-[100px]"
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isDefault"
                    checked={newAddress.isDefault}
                    onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                    className="sr-only"
                  />
                  <div className="w-4 h-4 border-[2px] border-[#5F6368] mr-3 flex items-center justify-center">
                    {newAddress.isDefault && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#D6A985]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[#5F6368]">ตั้งค่าที่อยู่ปัจจุบัน</span>
                </label>
              </div>
              
              <div className="flex gap-4 justify-end">
                <button 
                  onClick={handleCloseModal}
                  className="w-[180px] h-[50px] border border-gray-300 rounded-[10px] text-[#A6A6A6] hover:bg-gray-100 text-[18px]"
                >
                  ยกเลิก
                </button>
                <button 
                  onClick={handleSaveAddress}
                  className="w-[180px] h-[50px] bg-[#D6A985] text-white rounded-[10px] hover:bg-[#c49976] text-[18px]"
                >
                  ยืนยันที่อยู่จัดส่ง
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}