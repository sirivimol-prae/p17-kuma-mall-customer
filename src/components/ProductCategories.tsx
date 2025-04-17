'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

interface CategoryItem {
  icon: string;
  label: string;
  href: string;
}

export default function ProductCategories() {
  const categories: CategoryItem[] = [
    {
      icon: '/images/บ้านและที่นอน.png',
      label: 'บ้านและที่นอน',
      href: '/category/house'
    },
    {
      icon: '/images/อาหารสัตว์เลี้ยง.svg',
      label: 'อาหารสัตว์เลี้ยง',
      href: '/category/food'
    },
    {
      icon: '/images/สายจูงปลอกคอและเสื้อผ้า.png',
      label: 'สายจูง ปลอกคอ\nและเสื้อผ้า',
      href: '/category/accessories'
    },
    {
      icon: '/images/ชามอาหารและน้ำ.png',
      label: 'ชามอาหารและน้ำ',
      href: '/category/bowls'
    },
    {
      icon: '/images/ของเล่นสัตว์เลี้ยง.png',
      label: 'ของเล่นเลี้ยงสัตว์',
      href: '/category/toys'
    },
    {
      icon: '/images/ทรายแมวและอุปกรณ์.png',
      label: 'ทรายแมว และอุปกรณ์',
      href: '/category/litter'
    },
    {
      icon: '/images/กระเป๋าสัตว์เลี้ยง.png',
      label: 'กระเป๋าสัตว์เลี้ยง',
      href: '/category/bags'
    },
    {
      icon: '/images/อุปกรณ์ดูแลขน.png',
      label: 'อุปกรณ์ดูแลขน',
      href: '/category/grooming'
    },
    {
      icon: '/images/อุปกรณ์ทำความสะอาด.png',
      label: 'อุปกรณ์ทำ ความสะอาด',
      href: '/category/cleaning'
    },
    {
      icon: '/images/โอบิและห้องน้ำสุนัข.png',
      label: 'โอบิ และ ห้องน้ำสุนัข',
      href: '/category/toilet'
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-2 mb-6">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D6A985] rounded-full flex items-center justify-center">
              <Image src="/images/paw_icon.png" alt="Paw Icon" width={20} height={20} className="w-5 h-5" />
            </div>
            <span className="text-[#B86A4B] font-medium text-[24px]">หมวดหมู่สินค้า</span>
          </div>
          
          <Link href="/category" className="text-[#B86A4B] flex items-center gap-1 text-[24px]">
            ดูทั้งหมด
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="border-b border-[#D6A985] mb-4"></div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.slice(0, 10).map((category, index) => (
              <Link 
              key={index} 
              href={category.href}
              className="flex flex-col items-center justify-between h-[235px] w-full max-w-[235px] mx-auto py-4 px-2 hover:bg-white hover:shadow-xl hover:scale-105 rounded-lg transition-all duration-300 group border-2 border-transparent hover:border-[#EDEDED]"
            >
              <div className="flex-grow flex items-center justify-center pt-4">
                <div className="w-16 h-16 transition-transform duration-300 group-hover:scale-110">
                  <Image 
                    src={category.icon}
                    alt={category.label}
                    width={64}
                    height={64}
                    style={{ objectFit: 'contain' }}
                    className="group-hover:filter group-hover:brightness-90"
                  />
                </div>
              </div>
              <div className="mt-auto mb-4 h-[80px] flex items-center justify-center">
                <span className="text-center text-[22px] text-[#B86A4B] leading-tight px-2 whitespace-pre-line group-hover:font-bold group-hover:text-[#B86A4B]">{category.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}