'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function PromotionBanner() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 py-6 mb-8">
      <div className="relative w-full rounded-xl overflow-hidden shadow-md">
        <Image 
          src="/images/promotion.png" 
          alt="มาเป็นเพื่อน KUMA ま. รับราคาพิเศษทุกครั้งที่สั่งซื้อ" 
          width={1256}
          height={220}
          priority
          className="rounded-xl w-full h-auto"
        />
        
        <div className="absolute bottom-6 right-6 sm:bottom-6 sm:right-10">
          <Link href="/membership">
          </Link>
        </div>
      </div>
    </div>
  )
}
