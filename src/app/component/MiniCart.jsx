'use client'

import React from 'react';
import Link from 'next/link';
import { X, Plus, Minus } from 'lucide-react';

const MiniCart = ({ isOpen, onClose, cartItems }) => {
  // คำนวณราคารวม
  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  // ป้องกันการส่งผ่าน event scroll
  const handleScroll = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Mini Cart Sidebar - ปรับขนาดเป็น 370*680 และทำ scrolling */}
      <div
        className={`fixed top-0 right-0 h-[680px] bg-white shadow-lg z-50 w-[370px] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ maxHeight: '680px', width: '370px' }}
      >
        {/* หัวข้อรถเข็น */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-[24px] text-[#5F6368] font-medium">รถเข็นของฉัน</h2>
          <button 
            onClick={onClose}
            className="transition-transform duration-200 hover:rotate-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-[30px] font-bold mb-2 text-[#5F6368]">รถเข็นยังว่าง</h3>
            <p className="text-[#5F6368] text-[26px]">มาเริ่มช้อปกันเลย !</p>
          </div>
        ) : (
          <>
            {/* โปรโมชั่น - ปรับให้เหมือนหน้า cart */}
            <div className="mx-4 my-3">
              <div className="mb-4">
                <div className="flex items-center">
                  <span className="bg-[#D6A985] text-white font-medium py-1.5 px-3 rounded-[20px] mr-2 text-[14px] whitespace-nowrap">
                    โปรโมชั่น KUMA ま
                  </span>
                  <span className="text-[#D6A985] font-medium text-[16px]">
                    ซื้อครบ 8 รายการ (คละได้ทั้งร้าน)
                  </span>
                </div>
                <div className="text-[#D6A985] font-medium text-[16px] ml-[125px]">
                  รับส่วนลด 15%
                </div>
              </div>
            </div>

            {/* รายการสินค้า - แก้ไขให้สามารถ scroll ได้โดยไม่ถูกบังด้วยส่วนด้านล่าง */}
            <div 
              className="flex-1 overflow-y-auto overflow-x-hidden px-4"
              style={{ paddingBottom: "100px" }}
              onScroll={handleScroll}
            >
              {cartItems.map((item) => (
                <div key={item.id} className="mb-4 border-b pb-3">
                  <div className="flex justify-between">
                    <div className="flex-shrink-0 mr-3" style={{ width: '105px', height: '105px' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover border border-gray-200 rounded-md"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <div className="flex items-start">
                        <div className="font-medium text-[#5F6368] text-[16px] pr-20 truncate whitespace-nowrap overflow-hidden w-full">
                          {item.name}
                        </div>
                        <div className="absolute top-0 right-0">
                          <div className="text-[#C85353] font-medium text-right">฿{item.price}</div>
                          {item.originalPrice > item.price && (
                            <div className="text-[#5F6368] line-through text-[14px] text-right">฿{item.originalPrice}</div>
                          )}
                        </div>
                      </div>
                      
                      {/* วาเรียนท์สินค้า */}
                      {item.size && <div className="text-[16px] text-[#A6A6A6]">ขนาด : {item.size}</div>}
                      {item.color && <div className="text-[16px] text-[#A6A6A6]">สี: {item.color}</div>}
                      {item.type && <div className="text-[16px] text-[#A6A6A6]">ประเภท: {item.type}</div>}
                      
                      {/* จำนวนสินค้า */}
                      <div className="flex items-center mt-2">
                        <button className="text-[#5F6368] rounded-l p-1 w-7 h-7 flex items-center justify-center">
                          <Minus size={14} />
                        </button>
                        <span className="mx-1 px-2 -t h-7 flex items-center text-[#5F6368] min-w-[30px] justify-center">
                          {item.quantity}
                        </span>
                        <button className="text-[#5F6368] rounded-r p-1 w-7 h-7 flex items-center justify-center">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ยอดรวมและปุ่มสั่งซื้อสินค้า - ปรับให้ fixed อยู่ด้านล่าง */}
            <div className="bg-white p-4 border-t w-full">
              <div className="flex justify-between font-medium text-lg mb-3">
                <span className="text-[#5F6368]">ยอดสั่งซื้อ</span>
                <span className="text-[#5F6368]">฿{calculateTotal()}</span>
              </div>
              <Link href="/cart">
                <button 
                  className="w-full bg-[#D6A985] text-white py-4 font-semibold rounded-[12px] border-4 border-white shadow-[0_0_0_2px_#D6A985] relative overflow-hidden text-xl"
                  onClick={onClose}
                >
                  <div className="flex justify-center items-center w-full h-full rounded-lg font-medium text-[24px]">
                    สั่งซื้อสินค้า
                  </div>
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Overlay เมื่อ Mini Cart เปิด - ใช้ opacity และ transition สำหรับอนิเมชัน */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-50 z-40' : 'opacity-0 -z-10'
        }`}
        onClick={onClose}
      ></div>
    </>
  );
};

export default MiniCart;