'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import { ArrowLeft, X } from 'lucide-react'
import AccountSidebar from '../component/sidebar';

export default function Page() {
  // สถานะสำหรับที่อยู่
  const [selectedInvoice, setSelectedInvoice] = useState(1); // สมมติให้ ID=1 เป็นที่อยู่หลัก
  const [showAddModal, setShowAddModal] = useState(false);
  const [taxType, setTaxType] = useState('personal'); // 'personal' หรือ 'corporate'
  
  // State สำหรับฟอร์มเพิ่มใบกำกับภาษี
  const [newInvoice, setNewInvoice] = useState({
    name: '',
    phone: '',
    email: '',
    taxId: '',
    companyName: '',
    branch: '',
    useAsDefault: false,
    useForShipping: false,
  });

  // ฟังก์ชัน Action
  const handleAddInvoice = () => {
    setShowAddModal(true);
  };

  const handleEditInvoice = () => {
    console.log('แก้ไขที่อยู่');
  };
  
  const handleCloseModal = () => {
    setShowAddModal(false);
    // รีเซ็ตค่าฟอร์ม
    setNewInvoice({
      name: '',
      phone: '',
      email: '',
      taxId: '',
      companyName: '',
      branch: '',
      useAsDefault: false,
      useForShipping: false,
    });
    setTaxType('personal');
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewInvoice({
      ...newInvoice,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSaveInvoice = () => {
    console.log('บันทึกใบกำกับภาษีใหม่:', newInvoice);
    // สำหรับโปรเจกต์จริงจะต้องส่งข้อมูลไปยัง API
    // จากนั้นปิด Modal และรีเฟรชข้อมูล
    handleCloseModal();
  };

  const handleCheckboxChange = (selected) => {
    setNewInvoice({
      ...newInvoice, // รักษาค่าของข้อมูลอื่นๆ ไว้
      useAsDefault: selected === "useAsDefault" ? !newInvoice.useAsDefault : false,
      useForShipping: selected === "useForShipping" ? !newInvoice.useForShipping : false
    });
  };

  return (
    <div className="relative">
        <div className="flex items-center text-gray-600">
          <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
            <ArrowLeft color="#5F6368" />
            <span>หน้าแรก</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#D6A985]">จัดการใบกำกับภาษี</span>
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
                <h2 className="text-[28px] font-bold text-[#B86A4B] m-0">จัดการใบกำกับภาษี</h2>
              </div>

              {/* ตารางข้อมูล */}
              <div className="w-full">
                {/* ตารางแบบไม่มีหัวแยก */}

                {/* รายการที่ 1 */}
                <div className="py-4 border-b border-gray-100">
                  <div className="grid grid-cols-12 mb-2">
                    <div className="col-span-3 text-[#5F6368] pl-10">ชื่อผู้รับ</div>
                    <div className="col-span-3 text-[#5F6368]">ประเภทใบกำกับภาษี</div>
                    <div className="col-span-3 text-[#5F6368]">ประเภทที่อยู่อาศัย</div>
                  </div>
                  
                  <div className="grid grid-cols-12 items-start">
                    <div className="col-span-3 flex items-start">
                      <label className="inline-flex items-start">
                        <input 
                          type="radio" 
                          name="selectedInvoice" 
                          checked={selectedInvoice === 1} 
                          onChange={() => setSelectedInvoice(1)}
                          className="sr-only"
                        />
                        <div className="relative mr-3 mt-1">
                          <div className={`w-5 h-5 rounded-full border-2 ${selectedInvoice === 1 ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                            {selectedInvoice === 1 && (
                              <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                          </div>
                        </div>
                        <div className="text-[#5F6368]">
                          <div>XXXXX XXXXXXXX</div>
                          <div>(+66) 81-123-4567</div>
                          <div>XXXXXXX@gmail.com</div>
                        </div>
                      </label>
                    </div>
                    
                    <div className="col-span-3">
                      <div className="text-[#5F6368]">
                        <div>ภาษีบุคคลธรรมดา</div>
                        <div>เลขประจำตัวผู้เสียภาษี</div>
                        <div>1-1234-12345-12-3</div>
                      </div>
                    </div>
                    
                    <div className="col-span-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[#5F6368]">บ้าน</span>
                          <span className="px-3 bg-[#D6A985] text-white rounded-[10px] text-[14px]">
                            ที่อยู่ปัจจุบัน
                          </span>
                        </div>
                        <div className="text-[#5F6368]">
                          <div>ที่อยู่จัดส่ง</div>
                          <div>8/13 ซอย XXXXX ถนน YYYYYYY แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-3 text-right">
                      <div className="flex flex-col items-end">
                        <button 
                          onClick={handleEditInvoice}
                          className="text-[#D6A985] hover:text-[#B86A4B] text-[16px] mb-1"
                        >
                          แก้ไขที่อยู่
                        </button>
                        <button 
                          className="text-[#D6A985] hover:text-[#B86A4B] text-[16px]"
                        >
                          ลบที่อยู่
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* รายการที่ 2 */}
                <div className="py-4 border-b border-gray-100">
                  <div className="grid grid-cols-12 mb-2">
                    <div className="col-span-3 text-[#5F6368] pl-10">ชื่อบริษัท</div>
                    <div className="col-span-3 text-[#5F6368]">ประเภทใบกำกับภาษี</div>
                    <div className="col-span-3 text-[#5F6368]">ประเภทที่อยู่อาศัย</div>
                  </div>
                  
                  <div className="grid grid-cols-12 items-start">
                    <div className="col-span-3 flex items-start">
                      <label className="inline-flex items-start">
                        <input 
                          type="radio" 
                          name="selectedInvoice" 
                          checked={selectedInvoice === 2} 
                          onChange={() => setSelectedInvoice(2)}
                          className="sr-only"
                        />
                        <div className="relative mr-3 mt-1">
                          <div className={`w-5 h-5 rounded-full border-2 ${selectedInvoice === 2 ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                            {selectedInvoice === 2 && (
                              <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                          </div>
                        </div>
                        <div className="text-[#5F6368]">
                          <div>บริษัท XXXXXXXXX จำกัด</div>
                          <div>สำนักงานใหญ่ (00000)</div>
                          <div>(+66) 81-123-4567</div>
                          <div>XXXXXXX@gmail.com</div>
                        </div>
                      </label>
                    </div>
                    
                    <div className="col-span-3">
                      <div className="text-[#5F6368]">
                        <div>ภาษีนิติบุคคล</div>
                        <div>เลขประจำตัวผู้เสียภาษี</div>
                        <div>1-1234-12345-12-3</div>
                      </div>
                    </div>
                    
                    <div className="col-span-3">
                      <div className="flex flex-col">
                        <div className="text-[#5F6368]">
                          <div>ที่ทำงาน</div>
                          <div>ที่อยู่จัดส่ง</div>
                          <div>8/13 ซอย XXXXX ถนน YYYYYYY แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-3 text-right">
                      <div className="flex flex-col items-end">
                        <button 
                          className="text-[#D6A985] hover:text-[#B86A4B] text-[16px] mb-1"
                        >
                          แก้ไขที่อยู่
                        </button>
                        <button 
                          className="text-[#D6A985] hover:text-[#B86A4B] text-[16px]"
                        >
                          ลบที่อยู่
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* ปุ่มเพิ่มที่อยู่ใหม่ */}
                <div className="mt-6">
                  <button 
                    onClick={handleAddInvoice}
                    className="flex items-center px-4 py-2 border border-[#D6A985] text-[#D6A985] rounded-lg hover:bg-[#F5E1CF] transition-colors text-lg font-medium"
                  >
                    <span className="mr-2 text-xl">+</span>
                    <span>เพิ่มที่อยู่ใหม่</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal เพิ่มข้อมูลใบกำกับภาษี */}
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
                    <h2 className="text-[32px] font-bold text-[#B86A4B] border-b-2 border-[#D6A985] pb-2">เพิ่มข้อมูลใบกำกับภาษี</h2>
                    <div className="text-[#D03D3D] mt-2 text-[18px]">
                    <p>คำเตือน :</p>
                    <p>กรุณาตรวจสอบข้อมูลใบกำกับภาษีให้ถูกต้องทุกครั้ง ทางบริษัทฯ ขอสงวนสิทธิ์ในการแก้ไขใบกำกับภาษี</p>
                    <p>หลังจากคำสั่งซื้อเสร็จสิ้น</p>
                    </div>
                </div>
                
                <div className="mb-6">
                    <p className="text-lg font-medium mb-2 text-[#5F6368]">ประเภทใบกำกับภาษี</p>
                    <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer">
                        <input 
                        type="radio" 
                        name="taxType" 
                        value="personal" 
                        checked={taxType === 'personal'} 
                        onChange={() => setTaxType('personal')}
                        className="sr-only"
                        />
                        <div className="relative mr-3">
                        <div className={`w-5 h-5 rounded-full border-2 ${taxType === 'personal' ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                            {taxType === 'personal' && (
                            <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                        </div>
                        </div>
                        <span className="text-[#5F6368]">ภาษีบุคคลธรรมดา</span>
                    </label>
                    
                    <label className="flex items-center cursor-pointer">
                        <input 
                        type="radio" 
                        name="taxType" 
                        value="corporate" 
                        checked={taxType === 'corporate'} 
                        onChange={() => setTaxType('corporate')}
                        className="sr-only"
                        />
                        <div className="relative mr-3">
                        <div className={`w-5 h-5 rounded-full border-2 ${taxType === 'corporate' ? 'border-[#A6A6A6]' : 'border-gray-300'}`}>
                            {taxType === 'corporate' && (
                            <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                        </div>
                        </div>
                        <span className="text-[#5F6368]">ภาษีนิติบุคคล</span>
                    </label>
                    </div>
                </div>
                
                <div className="mb-4">
                    <label className="block text-[#5F6368] mb-2">เลขประจำตัวผู้เสียภาษี</label>
                    <input 
                    type="text" 
                    name="taxId"
                    value={newInvoice.taxId}
                    onChange={handleInputChange}
                    placeholder="หมายเลขประจำตัวผู้เสียภาษี (เลขบัตรประชาชน 13 หลัก)" 
                    className="w-full px-4 py-2 border border-gray-300 rounded text-[16px] text-[#AFB2B6]"
                    />
                </div>
                
                {taxType === 'corporate' && (
                    <div className="mb-4">
                    <label className="block text-[#5F6368] mb-2">ชื่อบริษัท</label>
                    <input 
                        type="text" 
                        name="companyName"
                        value={newInvoice.companyName}
                        onChange={handleInputChange}
                        placeholder="ชื่อบริษัท" 
                        className="w-full px-4 py-2 border border-gray-300 rounded text-[16px] text-[#AFB2B6]"
                    />
                    
                    <label className="block text-[#5F6368] mt-4 mb-2">สาขา</label>
                    <input 
                        type="text" 
                        name="branch"
                        value={newInvoice.branch}
                        onChange={handleInputChange}
                        placeholder="สาขา (กรุณาระบุเลขสาขา)" 
                        className="w-full px-4 py-2 border border-gray-300 rounded text-[16px] text-[#AFB2B6]"
                    />
                    </div>
                )}
                
                <div className="mb-4">
                    <h3 className="font-medium mb-2 text-[#5F6368]">ข้อมูลผู้ติดต่อ</h3>
                    <div className="mb-4">
                    <label className="block text-[#5F6368] mb-2">ชื่อ - นามสกุล</label>
                    <input 
                        type="text" 
                        name="name"
                        value={newInvoice.name}
                        onChange={handleInputChange}
                        placeholder="ชื่อ - นามสกุล" 
                        className="w-full px-4 py-2 border border-gray-300 rounded text-[16px]"
                    />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-[#5F6368] mb-2">หมายเลขโทรศัพท์</label>
                        <div className="flex">
                        <span className="bg-gray-100 px-4 py-2 border border-gray-300 border-r-0 rounded-l text-[16px] text-[#5F6368]">+66</span>
                        <input 
                            type="tel" 
                            name="phone"
                            value={newInvoice.phone}
                            onChange={handleInputChange}
                            placeholder="81-123-4567" 
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-r text-[16px]"
                        />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-[#5F6368] mb-2">อีเมล</label>
                        <input 
                        type="email" 
                        name="email"
                        value={newInvoice.email}
                        onChange={handleInputChange}
                        placeholder="อีเมล" 
                        className="w-full px-4 py-2 border border-gray-300 rounded text-[16px]"
                        />
                    </div>
                    </div>
                </div>
                
                <div className="mb-6">
                {/* Checkbox 1 */}
                <label className="flex items-center mb-3 cursor-pointer">
                    <input 
                    type="checkbox" 
                    name="useAsDefault"
                    checked={newInvoice.useAsDefault}
                    onChange={() => handleCheckboxChange("useAsDefault")}
                    className="sr-only"
                    />
                    <div className="w-4 h-4 border-[2px] border-[#5F6368] mr-3 flex items-center justify-center">
                    {newInvoice.useAsDefault && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#D6A985]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                    </div>
                    <span className="text-[#5F6368]">ตั้งค่าที่อยู่ปัจจุบัน</span>
                </label>
                
                {/* Checkbox 2 */}
                <label className="flex items-center cursor-pointer">
                    <input 
                    type="checkbox" 
                    name="useForShipping"
                    checked={newInvoice.useForShipping}
                    onChange={() => handleCheckboxChange("useForShipping")}
                    className="sr-only"
                    />
                    <div className="w-4 h-4 border-[2px] border-[#5F6368] mr-3 flex items-center justify-center">
                    {newInvoice.useForShipping && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#D6A985]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                    </div>
                    <span className="text-[#5F6368]">ใช้ตามที่อยู่ในการจัดส่ง</span>
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
                    onClick={handleSaveInvoice}
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