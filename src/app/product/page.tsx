import React from 'react'
import Sidebar from './component/sidebar'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import ProductGrid from './component/ProductGrid'

export default function Page() {
  return (
    <div>
      <div className="container mx-auto py-3">
        <div className="flex items-center text-gray-600">
          <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
            <ArrowLeft color="#5F6368" />
            <span>หน้าแรก</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#B86A4B]">สินค้าทั้งหมด</span>
        </div>
      </div>

      <div className="mb-4">
        <img 
          src="./images/Promotion.png" 
          alt="Background" 
          className="w-[1255px] h-[220px] mx-auto"
        />
      </div>

      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img src="/images/paw_icon.png" alt="Paw Icon" className="w-8 h-8 mr-2" />
            <span className="font-medium text-[#B86A4B] text-[24px]">สินค้าทั้งหมด</span>
          </div>
          <div className="flex items-center text-[#D6A985] text-[18px]">
            <span className="mr-1">เรียงลำดับ</span>
            <ChevronDown size={16} />
          </div>
        </div>
        
        <div className="border-b border-[#D6A985] mb-6"></div>
        
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  )
}