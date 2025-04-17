'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface ProductSetItem {
  id: string;
  title: string;
  image: string;
  link: string;
}

export default function ProductSetBanner() {
  const productSets: ProductSetItem[] = [
    {
      id: '1',
      title: 'มือใหม่หัดเลี้ยง',
      image: '/images/product-sets/มือใหม่หัดเลี้ยง.png',
      link: '/product-set/beginner'
    },
    {
      id: '2',
      title: 'แต่งบ้านมินิมอล',
      image: '/images/product-sets/แต่งบ้านมินิมอล.png',
      link: '/product-set/minimal'
    },
    {
      id: '3',
      title: 'อาบน้ำป๋อมแป๋ม',
      image: '/images/product-sets/อาบน้ำป๋อมแป๋ม.png',
      link: '/product-set/bath'
    },
    {
      id: '4',
      title: 'ของขวัญพิเศษ',
      image: '/images/product-sets/ของขวัญวันพิเศษ.png',
      link: '/product-set/gift'
    },
    {
      id: '5',
      title: 'พาน้องไปเที่ยว',
      image: '/images/product-sets/พาน้องไปเที่ยว.png',
      link: '/product-set/travel'
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-3 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#D6A985] rounded-full flex items-center justify-center">
            <Image src="/images/paw_icon.png" alt="Paw Icon" width={20} height={20} className="w-5 h-5" />
          </div>
          <span className="text-[#B86A4B] font-medium text-[24px]">เซ็ตสินค้า</span>
        </div>
        
        <Link href="/product-set" className="text-[#B86A4B] flex items-center gap-1 text-[24px]">
          ดูทั้งหมด
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="border-b border-[#D6A985] mb-4"></div>

      <div className="grid grid-cols-5 gap-4">
        {productSets.map((set) => (
          <Link key={set.id} href={set.link} className="block">
            <div className="relative w-full rounded-xl overflow-hidden border-2 border-[#D6A985] aspect-square">
              <Image 
                src={set.image} 
                alt={set.title} 
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-center text-[#B86A4B] font-medium text-xl mt-2">{set.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}