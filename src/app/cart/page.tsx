'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockOrders } from '../account/myorder/component/MockData';
import { ArrowLeft } from 'lucide-react';

const CartPage = () => {
  const cartItems = mockOrders[0].items;
  const [quantities, setQuantities] = useState(
    cartItems.map(item => item.quantity)
  );

  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item, index) => acc + item.price * quantities[index],
      0
    );
  };

  const calculateOriginalTotal = () => {
    return cartItems.reduce(
      (acc, item, index) => acc + item.originalPrice * quantities[index],
      0
    );
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity > 0) {
      const newQuantities = [...quantities];
      newQuantities[index] = newQuantity;
      setQuantities(newQuantities);
    }
  };

  const totalDiscount = calculateOriginalTotal() - calculateTotal();

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto py-3">
        <div className="flex items-center text-gray-600 text-lg">
          <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
            <ArrowLeft size={24} color="#5F6368" />
            <span>หน้าแรก</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#B86A4B]">รถเข็นของฉัน</span>
        </div>
      </div>

      <div className="container mx-auto pb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ส่วนรายการสินค้า */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 mr-3 relative">
                  <Image
                    src="/images/paw_icon.png"
                    alt="Paw Icon"
                    width={48}
                    height={48}
                    objectFit="contain"
                  />
                </div>
                <h2 className="text-2xl font-bold text-[#5F6368]">รถเข็นของฉัน</h2>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="text-[#B86A4B] font-medium mb-4 text-lg">
                  KUMA ま Note : อุ่นใจได้ พัสดุทุกกล่องไม่แสดงชื่อสินค้า 100%
                </div>
                
                {/* โปรโมชั่น KUMA ま ในบรรทัดเดียวกัน */}
                <div className="flex items-center mb-6">
                  <span className="bg-[#D6A985] text-white font-medium py-1.5 px-3 rounded-md mr-2 text-lg">
                    โปรโมชั่น KUMA ま
                  </span>
                  <span className="text-[#D6A985] font-medium text-lg">
                    ซื้ออีก 8 รายการ (คละได้ทั้งร้าน) รับส่วนลด 15%
                  </span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 text-[#5F6368] font-bold text-xl">สินค้า</th>
                        <th className="text-right py-3 text-[#5F6368] font-bold text-xl">ราคา</th>
                        <th className="text-center py-3 text-[#5F6368] font-bold text-xl">จำนวน</th>
                        <th className="text-right py-3 text-[#5F6368] font-bold text-xl">ราคารวม</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="py-4">
                            <div className="flex items-start">
                              <div className="w-24 h-24 border border-gray-200 rounded-md overflow-hidden mr-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-bold text-[#5F6368] text-xl">{item.name}</h3>
                                {item.size && <p className="text-base text-gray-500 mt-1">ขนาด: {item.size}</p>}
                                {item.color && <p className="text-base text-gray-500">สี: {item.color}</p>}
                                {item.type && <p className="text-base text-gray-500">ประเภท: {item.type}</p>}
                                <button className="text-[#B86A4B] text-base mt-2 flex items-center">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                    <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="text-right align-top pt-4">
                            <div className="text-[#E02424] font-medium text-xl">฿{item.price}</div>
                            {item.originalPrice > item.price && (
                              <div className="text-gray-400 line-through text-lg">฿{item.originalPrice}</div>
                            )}
                            <div className="text-gray-400 text-base mt-1">ราคาลดแล้ว</div>
                          </td>
                          <td className="align-top pt-4">
                            <div className="flex items-center justify-center">
                              <button
                                className="border border-gray-300 rounded-l w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-xl"
                                onClick={() => handleQuantityChange(index, quantities[index] - 1)}
                              >
                                −
                              </button>
                              <input
                                type="text"
                                className="border-t border-b border-gray-300 w-12 h-10 text-center text-gray-800 text-xl"
                                value={quantities[index]}
                                readOnly
                              />
                              <button
                                className="border border-gray-300 rounded-r w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-xl"
                                onClick={() => handleQuantityChange(index, quantities[index] + 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="text-right align-top pt-4">
                            <div className="text-[#E02424] font-medium text-xl">฿{item.price * quantities[index]}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* ส่วนสรุปคำสั่งซื้อ */}
          <div className="w-full lg:w-96">
            <div className="bg-[#FFFFFF] rounded-2xl shadow-lg p-6 border border-gray-300 sticky top-4">
              <h2 className="text-2xl font-bold text-[#5F6368] mb-6">สรุปการสั่งซื้อ</h2>
              
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
                  <span className="font-medium text-gray-800">฿120</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-500">KUMA ま Coin (50 coin)</span>
                  <div className="flex items-center">
                    <span className="font-medium text-[#E02424]">- ฿50</span>
                    <input type="checkbox" className="ml-2 form-checkbox h-5 w-5 text-[#B86A4B] rounded" />
                  </div>
                </div>
                <div className="flex justify-between text-lg text-[#B86A4B]">
                  <span>คูปองส่วนลดจาก KUMA ま</span>
                  <span className="underline cursor-pointer">กดใช้คูปอง</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between font-bold text-xl mb-6">
                  <span className="text-[#5F6368]">ยอดสั่งซื้อ</span>
                  <span className="text-[#5F6368]">฿{calculateTotal() + 120}</span>
                </div>
                
                <div className="flex justify-center items-center relative">
                  <button className="w-full bg-[#D6A985] text-white py-4 font-semibold rounded-[12px] border-4 border-white shadow-[0_0_0_2px_#D6A985] relative overflow-hidden text-xl">
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
    </div>
  );
};

export default CartPage;