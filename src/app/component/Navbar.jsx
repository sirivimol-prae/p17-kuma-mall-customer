'use client'

import React, { useState } from 'react';
import { Search, User, History, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { mockOrders } from '../account/myorder/component/MockData';
import MiniCart from './MiniCart';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  
  const cartItems = mockOrders[0].items;
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMiniCart = () => {
    setIsMiniCartOpen(!isMiniCartOpen);
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
              <Link href="/history">
                <History className="w-6 h-6 text-[#5F6368] cursor-pointer hover:text-[#B86A4B] transition-colors duration-200" />
              </Link>
              {/* ไอคอนรถเข็นพร้อมจำนวนสินค้า */}
              <div className="relative cursor-pointer" onClick={toggleMiniCart}>
                <ShoppingCart className="w-6 h-6 text-[#5F6368] hover:text-[#B86A4B] transition-colors duration-200" />
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
              <Link href="/history">
                <History className="w-6 h-6 text-[#5F6368] cursor-pointer hover:text-[#B86A4B] transition-colors duration-200" />
              </Link>
              {/* ไอคอนรถเข็นพร้อมจำนวนสินค้า */}
              <div className="relative cursor-pointer" onClick={toggleMiniCart}>
                <ShoppingCart className="w-6 h-6 hover:text-[#B86A4B] transition-colors duration-200" />
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
              <Link href="/history">
                <History className="w-6 h-6 text-[#5F6368] cursor-pointer hover:text-[#B86A4B] transition-colors duration-200" />
              </Link>
              {/* ไอคอนรถเข็นพร้อมจำนวนสินค้า */}
              <div className="relative cursor-pointer" onClick={toggleMiniCart}>
                <ShoppingCart className="w-6 h-6 hover:text-[#B86A4B] transition-colors duration-200" />
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

      {/* แยก MiniCart ออกมาเป็น Component แยก */}
      <MiniCart 
        isOpen={isMiniCartOpen} 
        onClose={toggleMiniCart} 
        cartItems={cartItems} 
      />
    </>
  );
};

export default Navbar;