'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CreditCard, Calendar, Lock, Check, ChevronDown, X, Edit } from 'lucide-react'
import { mockOrders } from '../account/myorder/componrnt/MockData'

const ConfirmOrderPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('qr')
  const [saveCard, setSaveCard] = useState(false)
  const [useCoin, setUseCoin] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [needInvoice, setNeedInvoice] = useState(true)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  })
  
  const [editingAddress, setEditingAddress] = useState(false)
  const [addressDetails, setAddressDetails] = useState({
    name: 'XXXXX XXXXXXXX',
    phone: '81-123-4567',
    addressType: 'บ้าน, ที่ทำงาน',
    address: '8/13 ซอย XXXXX ถนน YYYYYYY',
    postalCode: '10110',
    province: 'กรุงเทพมหานคร',
    district: 'เขตคลองเตย',
    subdistrict: 'แขวงคลองตัน',
    isDefault: true
  })
  
  const creditFormRef = useRef<HTMLDivElement>(null)
  const qrDetailsRef = useRef<HTMLDivElement>(null)
  const cartItems = mockOrders[0].items
  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
  }

  const calculateOriginalTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.originalPrice * item.quantity,
      0
    )
  }

  const totalDiscount = calculateOriginalTotal() - calculateTotal()
  const shippingFee = 120
  const coinDiscount = useCoin ? 50 : 0
  const grandTotal = calculateTotal() + shippingFee - coinDiscount
  const toggleUseCoin = () => {
    setUseCoin(!useCoin)
  }
  const handleCouponClick = () => {
    setShowCouponInput(!showCouponInput)
  }
  const toggleEditAddress = () => {
    setEditingAddress(!editingAddress)
  }

  useEffect(() => {
    if (qrDetailsRef.current) {
      if (paymentMethod === 'qr') {
        qrDetailsRef.current.style.maxHeight = `${qrDetailsRef.current.scrollHeight}px`
        qrDetailsRef.current.style.opacity = '1'
      } else {
        qrDetailsRef.current.style.maxHeight = '0'
        qrDetailsRef.current.style.opacity = '0'
      }
    }
  }, [paymentMethod])

  useEffect(() => {
    if (creditFormRef.current) {
      if (paymentMethod === 'credit') {
        creditFormRef.current.style.maxHeight = `${creditFormRef.current.scrollHeight}px`
        creditFormRef.current.style.opacity = '1'
      } else {
        creditFormRef.current.style.maxHeight = '0'
        creditFormRef.current.style.opacity = '0'
      }
    }
  }, [paymentMethod])

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts: string[] = []
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    
    return value
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formatted = formatCardNumber(e.target.value)
    setCardDetails({ ...cardDetails, cardNumber: formatted })
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formatted = formatExpiryDate(e.target.value)
    setCardDetails({ ...cardDetails, expiry: formatted })
  }

  const handleSaveAddress = () => {
    setEditingAddress(false)
  }

  const handleSubmitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("ขอบคุณสำหรับการสั่งซื้อ")
  }

  return (
<div className="min-h-screen">
  <div className="container mx-auto py-3">
    <div className="flex justify-between items-center mb-6">
      {/* ส่วนซ้าย: โลโก้และชื่อ */}
      <div className="flex items-center">
        <img src="/images/logo.png" alt="logo" className="w-12 h-12" />
        <span className="mx-2 text-gray-500">|</span>
        <h1 className="text-2xl font-bold text-[#5F6368]">คำสั่งซื้อของฉัน</h1>
      </div>

      {/* ส่วนกลาง: ขั้นตอนการสั่งซื้อ */}
      <div className="flex items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#D6A985] flex items-center justify-center text-white font-bold">1</div>
          <div className="text-[#D6A985] font-medium mx-2">รายการสั่งซื้อ</div>
          <div className="h-[2px] w-20 bg-gray-300"></div>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">2</div>
          <div className="text-gray-500 font-medium mx-2">ชำระเงิน</div>
          <div className="h-[2px] w-20 bg-gray-300"></div>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">3</div>
          <div className="text-gray-500 font-medium mx-2">คำสั่งซื้อสำเร็จ</div>
        </div>
      </div>

      {/* ส่วนขวา: ปุ่มกลับ */}
      <Link href="/cart" className="flex items-center gap-2 text-[#B86A4B]">
        <ArrowLeft size={20} color="#B86A4B" />
        <span>กลับไปที่รถเข็นของฉัน</span>
      </Link>
    </div>
  </div>
  
        <div className="flex flex-col lg:flex-row gap-6 pb-12">
          {/* ส่วนซ้าย - ข้อมูลที่อยู่และวิธีชำระเงิน */}
          <div className="flex-1">
            {/* ที่อยู่ในการจัดส่ง */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#D6A985] border-opacity-30">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#D6A985] flex items-center justify-center text-white font-bold mr-2">
                    1
                  </div>
                  <h2 className="text-[20px] font-bold text-[#5F6368]">ที่อยู่ในการจัดส่ง</h2>
                </div>
                <button 
                  className="text-[#D6A985] hover:text-[#B86A4B] flex items-center gap-1"
                  onClick={toggleEditAddress}
                >
                  <Edit size={16} />
                  <span>{editingAddress ? 'ยกเลิก' : 'แก้ไขที่อยู่'}</span>
                </button>
              </div>
              
              {!editingAddress ? (
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-[#A6A6A6] mt-1 flex-shrink-0 relative">
                    <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="font-bold text-[#5F6368] mr-2">{addressDetails.name}</span>
                      {addressDetails.isDefault && (
                        <span className="px-3 py-1 bg-[#D6A985] text-white rounded-full text-xs">
                          ที่อยู่ปัจจุบัน
                        </span>
                      )}
                    </div>
                    <div className="text-[#5F6368] mb-1">
                      (+66) {addressDetails.phone}
                    </div>
                    <div className="text-[#5F6368]">
                      {addressDetails.address} {addressDetails.subdistrict} {addressDetails.district} {addressDetails.province} {addressDetails.postalCode}
                    </div>
                  </div>
                </div>
                ) : (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-[#5F6368] mb-4">ข้อมูลผู้รับสินค้า</h3>
                    
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <label className="block text-[#5F6368] mb-2">ชื่อ - นามสกุล</label>
                        <input 
                          type="text" 
                          value={addressDetails.name}
                          onChange={(e) => setAddressDetails({...addressDetails, name: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[#5F6368] mb-2">หมายเลขโทรศัพท์</label>
                        <div className="flex">
                          <span className="bg-gray-100 px-4 py-2 border border-gray-300 border-r-0 rounded-l">+66</span>
                          <input 
                            type="text" 
                            value={addressDetails.phone}
                            onChange={(e) => setAddressDetails({...addressDetails, phone: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-r"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium text-[#5F6368] mb-4">ข้อมูลที่อยู่รับสินค้า</h3>
                    
                    <div className="mb-4">
                      <label className="block text-[#5F6368] mb-2">ระบุประเภทที่อยู่</label>
                      <div className="relative">
                        <select 
                          value={addressDetails.addressType}
                          onChange={(e) => setAddressDetails({...addressDetails, addressType: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded appearance-none"
                        >
                          <option value="บ้าน">ตั้งค่าสถานที่อยู่ของฉัน เช่น บ้าน, ที่ทำงาน เป็นต้น</option>
                          <option value="บ้าน">บ้าน</option>
                          <option value="ที่ทำงาน">ที่ทำงาน</option>
                          <option value="อื่นๆ">อื่นๆ</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-[#5F6368] mb-2">ที่อยู่</label>
                      <input 
                        type="text" 
                        value={addressDetails.address}
                        onChange={(e) => setAddressDetails({...addressDetails, address: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                        placeholder="บ้านเลขที่, หมู่บ้าน, ซอย, อาคาร, ถนน"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[#5F6368] mb-2">รหัสไปรษณีย์</label>
                        <input 
                          type="text" 
                          value={addressDetails.postalCode}
                          onChange={(e) => setAddressDetails({...addressDetails, postalCode: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded"
                          placeholder="รหัสไปรษณีย์ 5 หลัก"
                        />
                      </div>
                      <div>
                        <label className="block text-[#5F6368] mb-2">จังหวัด</label>
                        <div className="relative">
                          <select 
                            value={addressDetails.province}
                            onChange={(e) => setAddressDetails({...addressDetails, province: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded appearance-none"
                          >
                            <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                            <option value="นนทบุรี">นนทบุรี</option>
                            <option value="ปทุมธานี">ปทุมธานี</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <ChevronDown size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[#5F6368] mb-2">อำเภอ/เขต</label>
                        <div className="relative">
                          <select 
                            value={addressDetails.district}
                            onChange={(e) => setAddressDetails({...addressDetails, district: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded appearance-none"
                          >
                            <option value="เลือกอำเภอ/เขต">เลือกอำเภอ/เขต</option>
                            <option value="เขตคลองเตย">เขตคลองเตย</option>
                            <option value="เขตบางรัก">เขตบางรัก</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <ChevronDown size={16} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[#5F6368] mb-2">ตำบล/แขวง</label>
                        <div className="relative">
                          <select 
                            value={addressDetails.subdistrict}
                            onChange={(e) => setAddressDetails({...addressDetails, subdistrict: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded appearance-none"
                          >
                            <option value="เลือกตำบล/แขวง">เลือกตำบล/แขวง</option>
                            <option value="แขวงคลองตัน">แขวงคลองตัน</option>
                            <option value="แขวงคลองเตย">แขวงคลองเตย</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <ChevronDown size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={addressDetails.isDefault}
                          onChange={(e) => setAddressDetails({...addressDetails, isDefault: e.target.checked})}
                          className="sr-only"
                        />
                        <div className="w-4 h-4 border-[2px] border-[#5F6368] mr-3 flex items-center justify-center">
                          {addressDetails.isDefault && (
                            <Check size={16} className="text-[#D6A985]" />
                          )}
                        </div>
                        <span className="text-[#5F6368]">ตั้งค่าที่อยู่ปัจจุบัน</span>
                      </label>
                    </div>
                    
                    <button 
                      className="bg-[#D6A985] text-white px-6 py-2 rounded hover:bg-[#B86A4B] transition-colors"
                      onClick={handleSaveAddress}
                    >
                      บันทึกที่อยู่จัดส่ง
                    </button>
                  </div>
                )}
              </div>
              
              {/* วิธีการจัดส่งสินค้า */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex items-center mb-4 pb-2 border-b border-[#D6A985] border-opacity-30">
                  <div className="w-8 h-8 rounded-full bg-[#D6A985] flex items-center justify-center text-white font-bold mr-2">
                    2
                  </div>
                  <h2 className="text-[20px] font-bold text-[#5F6368]">วิธีการจัดส่งสินค้า</h2>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-[#A6A6A6] mt-1 flex-shrink-0 relative">
                      <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-[#5F6368]">การส่งมาตรฐาน | ฿120</span>
                      </div>
                      <p className="text-gray-500 mt-1">คาดว่าได้รับสินค้าภายใน 29 สิงหาคม - 31 สิงหาคม (4-5 วันหลังจากการสั่งซื้อสำเร็จ)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* ใบกำกับภาษี */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex items-center mb-4 pb-2 border-b border-[#D6A985] border-opacity-30">
                  <div className="w-8 h-8 rounded-full bg-[#D6A985] flex items-center justify-center text-white font-bold mr-2">
                    3
                  </div>
                  <h2 className="text-[20px] font-bold text-[#5F6368]">ใบกำกับภาษี</h2>
                </div>
                
                <div className="mb-4">
                  <div className="mb-3">
                    <label className="flex items-center cursor-pointer mb-3">
                      <input 
                        type="radio" 
                        name="invoiceOption" 
                        checked={!needInvoice}
                        onChange={() => setNeedInvoice(false)}
                        className="sr-only"
                      />
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-2 relative">
                        {!needInvoice && (
                          <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        )}
                      </div>
                      <span className="text-[#5F6368]">ไม่ต้องการใบกำกับภาษี</span>
                    </label>
                    
                    <label className="flex items-start cursor-pointer">
                      <input 
                        type="radio" 
                        name="invoiceOption" 
                        checked={needInvoice}
                        onChange={() => setNeedInvoice(true)}
                        className="sr-only"
                      />
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-2 mt-1 relative">
                        {needInvoice && (
                          <div className="w-3 h-3 rounded-full bg-[#A6A6A6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-[#5F6368]">ต้องการใบกำกับภาษี</span>
                        
                        {needInvoice && (
                          <div className="mt-3 border-t border-gray-200 pt-3">
                            <div className="grid grid-cols-12 text-[#5F6368] mb-2">
                              <div className="col-span-3">ชื่อผู้รับ</div>
                              <div className="col-span-3">ประเภทใบกำกับภาษี</div>
                              <div className="col-span-3">ประเภทที่อยู่อาศัย</div>
                              <div className="col-span-3 text-right">
                                <button 
                                  className="text-[#D6A985] hover:text-[#B86A4B] flex items-center gap-1 float-right"
                                  onClick={() => {}}
                                >
                                  <Edit size={16} />
                                  <span>แก้ไขที่อยู่</span>
                                </button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-12 text-[#5F6368]">
                              <div className="col-span-3">
                                <div>XXXXX XXXXXXXX</div>
                                <div>(+66) 81-123-4567</div>
                                <div>XXXXXXX@gmail.com</div>
                              </div>
                              <div className="col-span-3">
                                <div>ภาษีบุคคลธรรมดา</div>
                                <div>เลขประจำตัวผู้เสียภาษี</div>
                                <div>1-1234-12345-12-3</div>
                              </div>
                              <div className="col-span-6">
                                <div className="flex items-center gap-2">
                                  <span>บ้าน</span>
                                  <span className="px-3 py-1 bg-[#D6A985] text-white rounded-full text-xs">
                                    ที่อยู่ปัจจุบัน
                                  </span>
                                </div>
                                <div>ที่อยู่จัดส่ง</div>
                                <div>8/13 ซอย XXXXX ถนน YYYYYYY แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* วิธีการชำระเงิน */}
              <form onSubmit={handleSubmitOrder} id="orderForm">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                  <div className="flex items-center mb-4 pb-2 border-b border-[#D6A985] border-opacity-30">
                    <div className="w-8 h-8 rounded-full bg-[#D6A985] flex items-center justify-center text-white font-bold mr-2">
                      4
                    </div>
                    <h2 className="text-[20px] font-bold text-[#5F6368]">วิธีการชำระเงิน</h2>
                  </div>
                  
                  <div className="space-y-2">
                    <div 
                      className={`rounded-md transition duration-200 border ${paymentMethod === 'qr' ? 'border-[#D6A985]' : 'border-[#AFB2B6]'} hover:border-[#D6A985] hover:shadow-sm`}
                    >
                      <div 
                        className="flex justify-between items-center p-3 cursor-pointer"
                        onClick={() => setPaymentMethod('qr')}
                      >
                        <div className="flex items-center">
                          <label className="custom-radio w-full cursor-pointer">
                            <input 
                              type="radio" 
                              name="payment" 
                              value="qr"
                              checked={paymentMethod === 'qr'}
                              onChange={() => setPaymentMethod('qr')}
                              className="hidden" 
                            />
                            <span className="radio-mark"></span>
                            <span className="text-gray-700">QR พร้อมเพย์</span>
                          </label>
                        </div>
                        <img src="/images/promptpay.png" alt="PromptPay" className="h-8" />
                      </div>
                      
                      <div 
                        ref={qrDetailsRef}
                        className="overflow-hidden transition-all duration-500 max-h-0 opacity-0 px-3 pb-0"
                      >
                        <div className="border-t border-gray-200 pt-4 pb-3">
                          <h3 className="font-medium mb-3 text-gray-700">วิธีการชำระเงินผ่าน QR พร้อมเพย์</h3>
                          <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-2">
                            <li>กด "บันทึก QR Code" หรือถ่ายภาพหน้าจอ</li>
                            <li>เปิดแอพพลิเคชั่นธนาคารที่ต้องการใช้จ่ายบนอุปกรณ์ของท่าน</li>
                            <li>เลือกเมนู "สแกนเพื่อชำระ" หรือ "ชำระเงินด้วย บันทึก QR Code" และกดเลือกรูปภาพ</li>
                            <li>เลือกรูปภาพ QR Code ที่บันทึกไว้และทำการชำระเงิน โดยโปรดตรวจสอบชื่อบัญชีผู้รับ คือ บริษัท XXXXX จำกัด</li>
                            <li>กดยืนยันการชำระเงิน</li>
                            <li>หลังจากชำระเงินเสร็จสิ้น กรุณาตรวจสอบสถานะการชำระเงินใน "คำสั่งซื้อของคุณ"</li>
                          </ol>
                          <p className="mt-3 text-gray-500">หมายเหตุ: QR Code สามารถสแกนชำระเงินได้ 1 ครั้งต่อ 1 การชำระเงินเท่านั้น</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`rounded-md transition duration-200 border ${paymentMethod === 'credit' ? 'border-[#D6A985]' : 'border-[#AFB2B6]'} hover:border-[#D6A985] hover:shadow-sm`}>
                      <div 
                        className="flex justify-between items-center p-3 cursor-pointer"
                        onClick={() => setPaymentMethod('credit')}
                      >
                        <div className="flex items-center">
                          <label className="custom-radio w-full cursor-pointer">
                            <input 
                              type="radio" 
                              name="payment" 
                              value="credit"
                              checked={paymentMethod === 'credit'}
                              onChange={() => setPaymentMethod('credit')}
                              className="hidden" 
                            />
                            <span className="radio-mark"></span>
                            <span className="text-gray-700">บัตรเครดิต / บัตรเดบิต</span>
                          </label>
                        </div>
                        <div className="flex space-x-1">
                          <img src="/images/image 14.png" alt="Mastercard" className="h-8" />
                          <img src="/images/image 13.png" alt="Visa" className="h-8" />
                        </div>
                      </div>
                      
                      <div 
                        ref={creditFormRef}
                        className="overflow-hidden transition-all duration-500 max-h-0 opacity-0 px-3 pb-0"
                      >
                        <div className="border-t border-gray-200 pt-4 pb-3">
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              หมายเลขบัตร
                            </label>
                            <div className="relative">
                              <input 
                                type="text" 
                                value={cardDetails.cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="0000 0000 0000 0000"
                                maxLength={19}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D6A985] focus:border-[#D6A985]"
                              />
                              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <CreditCard size={16} />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              ชื่อบนบัตร
                            </label>
                            <input 
                              type="text" 
                              value={cardDetails.cardName}
                              onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                              placeholder="ชื่อเจ้า-นามสกุล"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D6A985] focus:border-[#D6A985]"
                            />
                          </div>
                          
                          <div className="flex gap-4 mb-4">
                            <div className="w-1/2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                วันหมดอายุ (MM/YY)
                              </label>
                              <div className="relative">
                                <input 
                                  type="text" 
                                  value={cardDetails.expiry}
                                  onChange={handleExpiryChange}
                                  placeholder="MM/YY"
                                  maxLength={5}
                                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D6A985] focus:border-[#D6A985]"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                  <Calendar size={16} />
                                </div>
                              </div>
                            </div>
                            
                            <div className="w-1/2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <div className="relative">
                                <input 
                                  type="password" 
                                  value={cardDetails.cvv}
                                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                  placeholder="***"
                                  maxLength={3}
                                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D6A985] focus:border-[#D6A985]"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                  <Lock size={16} />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="saveCard" 
                              checked={saveCard}
                              onChange={(e) => setSaveCard(e.target.checked)}
                              className="w-4 h-4 text-[#D6A985] border-gray-300 rounded focus:ring-[#D6A985]"
                            />
                            <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
                              จำบัตรใบนี้
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${paymentMethod === 'banking' ? 'border-[#D6A985]' : 'border-[#AFB2B6]'} hover:border-[#D6A985] hover:shadow-sm transition duration-200`}
                      onClick={() => setPaymentMethod('banking')}
                    >
                      <div className="flex items-center">
                        <label className="custom-radio w-full cursor-pointer">
                          <input 
                            type="radio" 
                            name="payment" 
                            value="banking"
                            checked={paymentMethod === 'banking'}
                            onChange={() => setPaymentMethod('banking')}
                            className="hidden"
                          />
                          <span className="radio-mark"></span>
                          <span className="text-gray-700">ชำระเงินผ่านเคาน์เตอร์</span>
                        </label>
                      </div>
                      <div className="flex space-x-1">
                        <img src="/images/bigC.png" alt="bigC" className="h-8" />
                        <img src="/images/bunterm.png" alt="bunterm" className="h-8" />
                        <img src="/images/cenpay.png" alt="cenpay" className="h-8" />
                        <img src="/images/playpost.png" alt="playpost" className="h-8" />
                        <img src="/images/lotus.png" alt="Lotus's" className="h-8" />
                      </div>
                    </div>
                    
                    <div 
                      className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${paymentMethod === 'mbanking' ? 'border-[#D6A985]' : 'border-[#AFB2B6]'} hover:border-[#D6A985] hover:shadow-sm transition duration-200`}
                      onClick={() => setPaymentMethod('mbanking')}
                    >
                      <div className="flex items-center">
                        <label className="custom-radio w-full cursor-pointer">
                          <input 
                            type="radio" 
                            name="payment" 
                            value="mbanking"
                            checked={paymentMethod === 'mbanking'}
                            onChange={() => setPaymentMethod('mbanking')}
                            className="hidden" 
                          />
                          <span className="radio-mark"></span>
                          <span className="text-gray-700">ชำระเงินผ่าน ATM และ บริการธนาคารทางอินเทอร์เน็ต</span>
                        </label>
                      </div>
                      <div className="flex space-x-1">
                        <img src="/images/Ksikorn.png" alt="Kasikorn" className="h-8" />
                        <img src="/images/scb.png" alt="SCB" className="h-8" />
                        <img src="/images/krungsri.png" alt="Krungsri" className="h-8" />
                        <img src="/images/krungthai.png" alt="KTB" className="h-8" />
                        <img src="/images/bue.png" alt="bue" className="h-8" />
                      </div>
                    </div>
                    
                    <div 
                      className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${paymentMethod === 'truemoney' ? 'border-[#D6A985]' : 'border-[#AFB2B6]'} hover:border-[#D6A985] hover:shadow-sm transition duration-200`}
                      onClick={() => setPaymentMethod('truemoney')}
                    >
                      <div className="flex items-center">
                        <label className="custom-radio w-full cursor-pointer">
                          <input 
                            type="radio" 
                            name="payment" 
                            value="truemoney"
                            checked={paymentMethod === 'truemoney'}
                            onChange={() => setPaymentMethod('truemoney')}
                            className="hidden" 
                          />
                          <span className="radio-mark"></span>
                          <span className="text-gray-700">ชำระเงินผ่าน TrueMoney Wallet</span>
                        </label>
                      </div>
                      <img src="/images/truemoneywallet.png" alt="TrueMoney" className="h-8" />
                    </div>
                    
                    <div 
                      className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${paymentMethod === 'linepay' ? 'border-[#D6A985]' : 'border-[#AFB2B6]'} hover:border-[#D6A985] hover:shadow-sm transition duration-200`}
                      onClick={() => setPaymentMethod('linepay')}
                    >
                      <div className="flex items-center">
                        <label className="custom-radio w-full cursor-pointer">
                          <input 
                            type="radio" 
                            name="payment" 
                            value="linepay"
                            checked={paymentMethod === 'linepay'}
                            onChange={() => setPaymentMethod('linepay')}
                            className="hidden" 
                          />
                          <span className="radio-mark"></span>
                          <span className="text-gray-700">ชำระเงินผ่าน Rabbit LINE Pay</span>
                        </label>
                      </div>
                      <img src="/images/rabbitlinepay.png" alt="LINE Pay" className="h-8" />
                    </div>
                    
                    <div 
                      className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${paymentMethod === 'alipay' ? 'border-[#D6A985]' : 'border-[#AFB2B6]'} hover:border-[#D6A985] hover:shadow-sm transition duration-200`}
                      onClick={() => setPaymentMethod('alipay')}
                    >
                      <div className="flex items-center">
                        <label className="custom-radio w-full cursor-pointer">
                          <input 
                            type="radio" 
                            name="payment" 
                            value="alipay"
                            checked={paymentMethod === 'alipay'}
                            onChange={() => setPaymentMethod('alipay')}
                            className="hidden" 
                          />
                          <span className="radio-mark"></span>
                          <span className="text-gray-700">ชำระเงินผ่าน Alipay</span>
                        </label>
                      </div>
                      <img src="/images/airplay.png" alt="Alipay" className="h-8" />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* ส่วนขวา - สรุปคำสั่งซื้อ */}
            <div className="w-full lg:w-96">
              <div className="bg-[#FFFFFF] rounded-2xl shadow-lg p-6 border border-gray-300 sticky top-4">
                <h2 className="text-2xl font-bold text-[#5F6368] mb-6">สรุปการสั่งซื้อ</h2>
                
                {/* รายการสินค้า */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start border-b border-gray-100 pb-4">
                      <div className="w-20 h-20 border border-gray-200 rounded-md overflow-hidden mr-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-[#5F6368]">{item.name}</h3>
                        <div className="flex justify-between mt-2">
                          <div className="text-gray-500">x{item.quantity}</div>
                          <div className="text-[#E02424] font-medium">฿{item.price * item.quantity}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* สรุปรายการและราคา */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-500">ยอดรวม</span>
                    <span className="font-medium text-gray-800">฿{calculateOriginalTotal()}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-500">ส่วนลดพิเศษสำหรับ KUMA ま FRIEND</span>
                    <span className="font-medium text-[#E02424]">- ฿{totalDiscount}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-500">ค่าจัดส่งสินค้า</span>
                    <span className="font-medium text-gray-800">฿{shippingFee}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-500">KUMA ま Coin (50 coin)</span>
                    <div className="flex items-center">
                      <span className="font-medium text-[#E02424]">- ฿{coinDiscount}</span>
                      <input 
                        type="checkbox" 
                        checked={useCoin} 
                        onChange={toggleUseCoin}
                        className="ml-2 form-checkbox h-5 w-5 text-[#B86A4B] rounded" 
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-lg text-[#B86A4B]">
                    <span>คูปองส่วนลดจาก KUMA ま</span>
                    <span className="underline cursor-pointer" onClick={handleCouponClick}>กดใช้คูปอง</span>
                  </div>
                  
                  {/* ช่องใส่คูปอง */}
                  {showCouponInput && (
                    <div className="mt-2">
                      <div className="flex">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="ใส่รหัสคูปอง"
                          className="border border-gray-300 rounded-l-lg px-3 py-2 w-full"
                        />
                        <button 
                          className="bg-[#D6A985] text-white px-4 py-2 rounded-r-lg hover:bg-[#B86A4B] transition-colors"
                        >
                          ใช้คูปอง
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between font-bold text-xl mb-6">
                    <span className="text-[#5F6368]">ยอดสั่งซื้อ</span>
                    <span className="text-[#5F6368]">฿{grandTotal}</span>
                  </div>
                  
                  <div className="flex justify-center items-center relative">
                    <button 
                      type="submit"
                      form="orderForm"
                      className="w-full bg-[#D6A985] text-white py-4 font-semibold rounded-[12px] border-4 border-white shadow-[0_0_0_2px_#D6A985] relative overflow-hidden text-xl"
                    >
                      <div className="flex justify-center items-center w-full h-full rounded-lg">
                        สั่งซื้อสินค้า
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ConfirmOrderPage