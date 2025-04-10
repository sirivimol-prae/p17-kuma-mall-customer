'use client'

import React, { useState } from 'react';
import { Search, User, History, ShoppingCart, ChevronDown, Menu, X, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { mockOrders } from '../account/myorder/componrnt/MockData';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  
  // ใช้ข้อมูลจาก mockOrders สำหรับ Mini Cart
  const cartItems = mockOrders[0].items;
  
  // คำนวณจำนวนสินค้าในรถเข็น
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // คำนวณราคารวม
  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  // คลิกที่ไอคอนรถเข็นเพื่อเปิด/ปิด Mini Cart
  const toggleMiniCart = () => {
    setIsMiniCartOpen(!isMiniCartOpen);
  };

  // ป้องกันการส่งผ่าน event scroll
  const handleScroll = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Desktop Navigation (>1024px) */}
      <nav className="hidden lg:block" style={{marginTop:"10px", marginBottom:"40px"}}>
        <div style={{marginLeft: "75px", marginRight: "75px"}}>
          <div className='flex w-full justify-end gap-2' style={{marginBottom:"10px",gap:"20px"}}>
            <div className='text-[#5F6368]'>English</div>
            <div className='text-[#5F6368]'>ติดต่อ KUMAま</div>
            <div className='flex items-center gap-1'>
              <User className="w-4 h-4 text-[#5F6368]" />
              <span className='text-[#5F6368]'>ผู้ใช้ XXXXXX</span>
            </div>
            <div className='bg-[#D6A985] px-10 py-[1px] rounded-[7px] text-white'>KUMAま FRIEND</div>
            <div className='text-[#5F6368]'>|</div>
            <div className='flex items-center gap-1'>
              <img src="/images/kumacoin.png" alt='kumacoin' className='w-6 h-auto'/>
              <span className='text-[#5F6368]'>50 Coin</span>
            </div>
          </div>

          <div className='flex justify-between items-center' style={{marginBottom:"10px"}}>
            <div className='flex items-center' style={{gap:"60px"}}>
              <Link href="/" className='w-10 h-auto'>
                <img src="/images/logo.png" alt="logo" />
              </Link>

              <Link href="/product" className='flex items-center gap-1 cursor-pointer'>
                <span className='text-[#5F6368]'>สินค้าทั้งหมด</span>
              </Link>

              <div className='flex items-center gap-1'>
                <span className='text-[#5F6368]'>สินค้า</span>
                <ChevronDown className="w-4 h-4 text-[#5F6368]" />
              </div>
              <Link href="/flashsale" className='flex items-center gap-1 cursor-pointer'>
                <span className='text-[#5F6368]'>โปรโมชั่น</span>
                <ChevronDown className="w-4 h-4 text-[#5F6368]" />
              </Link>
              <Link href="/article" className='flex items-center gap-1 cursor-pointer'>
                <span className='text-[#5F6368]'>บทความ</span>
                <ChevronDown className="w-4 h-4 text-[#5F6368]" />
              </Link>
            </div>

            <div className='flex items-center' style={{gap:"30px"}}>
              <div className='flex'>
                <input
                  type="text"
                  placeholder="ค้นหาสินค้า"
                  className=""
                  style={{border:"1px solid #A6A6A6", padding:"2px 20px", borderRadius:"25px 0px 0px 25px", width:"375px"}}
                />
                <div style={{border:"1px solid #A6A6A6", padding:"2px 10px", borderRadius:"0px 25px 25px 0px", backgroundColor:"#D6A985"}} >
                  <Search style={{width:"21px", height:"auto", color:'white'}}/>
                </div>
              </div>
              <History className="w-6 h-6 text-[#5F6368]" />
              {/* ไอคอนรถเข็นพร้อมจำนวนสินค้า */}
              <div className="relative cursor-pointer" onClick={toggleMiniCart}>
                <ShoppingCart className="w-6 h-6 text-[#5F6368]" />
                {cartItemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-[#B86A4B] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-[#D9D9D9] mb-5"></div>
      </nav>

      {/* Tablet Navigation (768px - 1024px) */}
      <nav className="hidden md:block lg:hidden">
        <div className="px-4 py-2">
          <div className="flex justify-between items-center">
            <Link href="/" className="w-10">
              <img src="/images/logo.png" alt="logo" className="w-full h-auto" />
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="text-sm">ผู้ใช้ XXXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/images/kumacoin.png" className="w-6 h-6" />
                <span className="text-sm">50 Coin</span>
              </div>
              <History className="w-6 h-6" />
              {/* ไอคอนรถเข็นพร้อมจำนวนสินค้า */}
              <div className="relative cursor-pointer" onClick={toggleMiniCart}>
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-[#B86A4B] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tablet Search */}
          <div className="mt-4">
            <div className="flex">
              <input
                type="text"
                placeholder="ค้นหาสินค้า"
                className="flex-1 border border-[#A6A6A6] px-4 py-1 rounded-l-full"
              />
              <div className="border border-[#A6A6A6] px-3 py-1 rounded-r-full bg-[#D6A985]">
                <Search className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Tablet Menu */}
          <div className="mt-4 flex justify-center items-center gap-8">
            <Link href="/product" className="flex items-center gap-1">
              <span>สินค้าทั้งหมด</span>
            </Link>
            <div className="flex items-center gap-1">
              <span>สินค้า</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <Link href="/flashsale" className="flex items-center gap-1">
              <span>โปรโมชั่น</span>
              <ChevronDown className="w-4 h-4" />
            </Link>
            <Link href="/article" className="flex items-center gap-1">
              <span>บทความ</span>
              <ChevronDown className="w-4 h-4" />
            </Link>
            <div>ติดต่อ KUMAま</div>
          </div>
        </div>
        <div className="border-b border-[#D9D9D9] mt-4"></div>
      </nav>

      {/* Mobile Navigation (<768px) */}
      <nav className="block md:hidden">
        <div className="px-4 py-2">
          <div className="flex justify-between items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            
            <Link href="/" className="w-8">
              <img src="/images/logo.png" alt="logo" className="w-full h-auto" />
            </Link>

            <div className="flex items-center gap-4">
              <History className="w-6 h-6" />
              {/* ไอคอนรถเข็นพร้อมจำนวนสินค้า */}
              <div className="relative cursor-pointer" onClick={toggleMiniCart}>
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-[#B86A4B] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-4">
            <div className="flex">
              <input
                type="text"
                placeholder="ค้นหาสินค้า"
                className="flex-1 border border-[#A6A6A6] px-4 py-1 rounded-l-full"
              />
              <div className="border border-[#A6A6A6] px-3 py-1 rounded-r-full bg-[#D6A985]">
                <Search className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mt-4 bg-white">
              <div className="flex items-center gap-2 py-3 border-b border-[#D9D9D9]">
                <User className="w-5 h-5" />
                <span>ผู้ใช้ XXXXXX</span>
              </div>
              <div className="flex items-center gap-2 py-3 border-b border-[#D9D9D9]">
                <img src="/images/kumacoin.png" alt="kumacoin" className="w-6 h-6" />
                <span>50 Coin</span>
              </div>
              <div className="py-3 border-b border-[#D9D9D9]">English</div>
              <div className="py-3 border-b border-[#D9D9D9]">สินค้าทั้งหมด</div>
              <div className="py-3 border-b border-[#D9D9D9]">สินค้า</div>
              <Link href="/flashsale" className="block py-3 border-b border-[#D9D9D9]">
                โปรโมชั่น
              </Link>
              <div className="py-3 border-b border-[#D9D9D9]">บทความ</div>
              <Link href="/article" className="block py-3 border-b border-[#D9D9D9]">
                บทความ
              </Link>
              <div className="py-3 border-b border-[#D9D9D9]">ติดต่อ KUMAま</div>
              <div className="mt-4 py-2 text-center bg-[#D6A985] text-white rounded-lg">
                KUMAま FRIEND
              </div>
            </div>
          )}
        </div>
        <div className="border-b border-[#D9D9D9] mt-4"></div>
      </nav>

      {/* Mini Cart Sidebar - ปรับขนาดเป็น 370*680 และทำ scrolling */}
      <div
        className={`fixed top-0 right-0 h-[680px] bg-white shadow-lg z-50 w-[370px] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMiniCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ maxHeight: '680px', width: '370px' }}
      >
        {/* หัวข้อรถเข็น */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg text-[#5F6368] font-medium">รถเข็นของฉัน</h2>
          <button 
            onClick={toggleMiniCart}
            className="transition-transform duration-200 hover:rotate-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-xl font-medium mb-2 text-[#5F6368]">รถเข็นยังว่าง</h3>
            <p className="text-gray-500">มาเริ่มช้อปกันเลย !</p>
          </div>
        ) : (
          <>
            {/* โปรโมชั่น - ปรับให้เหมือนหน้า cart */}
            <div className="mx-4 my-3">
            <div className="mb-4">
                <div className="flex items-center">
                <span className="bg-[#D6A985] text-white font-medium py-1.5 px-3 rounded-md mr-2 text-sm whitespace-nowrap">
                    โปรโมชั่นKUMAま
                </span>
                <span className="text-[#D6A985] font-medium text-sm">
                    ซื้อครบ 8 รายการ (คละได้ทั้งร้าน)
                </span>
                </div>
                <div className="text-[#D6A985] font-medium text-sm ml-[110px]">
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
                            <div className="font-medium text-[#5F6368] pr-20 truncate whitespace-nowrap overflow-hidden w-full">
                            {item.name}
                            </div>
                            <div className="absolute top-0 right-0">
                            <div className="text-[#E02424] font-medium text-right">฿{item.price}</div>
                            {item.originalPrice > item.price && (
                                <div className="text-gray-400 line-through text-sm text-right">฿{item.originalPrice}</div>
                            )}
                            </div>
                        </div>
                        
                        {/* วาเรียนท์สินค้า */}
                        {item.size && <div className="text-sm text-gray-500">ขนาด : {item.size}</div>}
                        {item.color && <div className="text-sm text-gray-500">สี: {item.color}</div>}
                        {item.type && <div className="text-sm text-gray-500">ประเภท: {item.type}</div>}
                        
                        {/* จำนวนสินค้า */}
                        <div className="flex items-center mt-2">
                            <button className="text-gray-500 rounded-l p-1 w-7 h-7 flex items-center justify-center">
                            <Minus size={14} />
                            </button>
                            <span className="mx-1 px-2 -t h-7 flex items-center text-gray-700 min-w-[30px] justify-center">
                            {item.quantity}
                            </span>
                            <button className="text-gray-500  rounded-r p-1 w-7 h-7 flex items-center justify-center">
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
                <span className="text-gray-700">ยอดสั่งซื้อ</span>
                <span className="text-gray-700">฿{calculateTotal()}</span>
              </div>
              <Link href="/cart">
                <button 
                  className="w-full bg-[#D6A985] text-white py-4 font-semibold rounded-[12px] border-4 border-white shadow-[0_0_0_2px_#D6A985] relative overflow-hidden text-xl"
                  onClick={toggleMiniCart}
                >
                  <div className="flex justify-center items-center w-full h-full rounded-lg">
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
          isMiniCartOpen ? 'opacity-50 z-40' : 'opacity-0 -z-10'
        }`}
        onClick={toggleMiniCart}
      ></div>
    </>
  );
};

export default Navbar;