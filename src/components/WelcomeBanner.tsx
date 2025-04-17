'use client'

import React from 'react'
import Image from 'next/image'

export default function WelcomeBanner() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row w-full gap-4">
        {/* ส่วนลด 25% banner */}
        <div className="flex-1 h-48 rounded-xl overflow-hidden shadow-md relative">
          <div className="flex h-full">
            <div className="relative w-1/3 h-full flex items-center justify-center p-4">
              {/* SVG ขอบหยัก */}
              <svg className="absolute top-0 left-0 h-full" xmlns="http://www.w3.org/2000/svg" width="211" height="200" viewBox="0 0 211 200" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M1 19.049C10.665 19.049 18.5 11.5871 18.5 2.38235C18.5 1.57382 18.4395 0.778736 18.3227 0.000976562H210.5V200.001H18.493C18.4977 199.843 18.5 199.684 18.5 199.525C18.5 190.32 10.665 182.859 1 182.859C0.832775 182.859 0.666098 182.861 0.5 182.865V169.049C3.26142 169.049 5.5 166.81 5.5 164.049C5.5 161.288 3.26142 159.049 0.5 159.049V149.049C3.26142 149.049 5.5 146.81 5.5 144.049C5.5 141.288 3.26142 139.049 0.5 139.049V129.049C3.26142 129.049 5.5 126.81 5.5 124.049C5.5 121.288 3.26142 119.049 0.5 119.049V109.049C3.26142 109.049 5.5 106.81 5.5 104.049C5.5 101.288 3.26142 99.049 0.5 99.049V89.049C3.26142 89.049 5.5 86.8104 5.5 84.049C5.5 81.2876 3.26142 79.049 0.5 79.049V69.049C3.26142 69.049 5.5 66.8104 5.5 64.049C5.5 61.2876 3.26142 59.049 0.5 59.049V49.049C3.26142 49.049 5.5 46.8104 5.5 44.049C5.5 41.2876 3.26142 39.049 0.5 39.049V19.0423C0.666098 19.0468 0.832775 19.049 1 19.049Z" fill="#D6A985"/>
              </svg>
              
              <div className="relative w-28 h-28 z-10">
                <Image 
                  src="/images/kuma-friend.png" 
                  alt="KUMA Logo" 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center px-6 bg-white">
              <h3 className="text-[#5F6368] text-center text-3xl font-bold mb-1">ครอบครัว KUMA ま</h3>
              <p className="text-[#5F6368] text-center text-xl font-normal mb-2">ส่วนลดในการซื้อครั้งแรก</p>
              <div className="text-[#B86A4B] text-center text-[96px] font-bold leading-[70px] tracking-[-0.408px]">25%</div>
            </div>
          </div>
        </div>

        {/* โปรโมชั่นพิเศษ banner */}
        <div className="flex-1 h-48 rounded-xl overflow-hidden shadow-md relative">
          <Image 
            src="/images/banner2.png" 
            alt="Banner background" 
            fill 
            style={{ objectFit: 'cover' }}
          />
          <div className="flex h-full relative z-10">
            <div className="w-1/3 h-full flex items-center justify-center p-4">
              <div className="relative w-28 h-28">
                <Image 
                  src="/images/kuma-mall-level.png" 
                  alt="KUMA Logo" 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            
            {/* เส้นคั่น */}
            <div className="w-[5px] h-[150px] bg-[#5F6368] self-center mx-4"></div>
            
            <div className="flex-1 flex flex-col justify-center items-center px-6">
              <div className="text-[#B86A4B] text-center text-[78px] font-bold leading-[36px] tracking-[-0.408px]" 
                   style={{ WebkitTextStrokeWidth: '2px', WebkitTextStrokeColor: '#FFF' }}>
                โซนลดราคา
              </div>
              <p className="text-[#B86A4B] text-center text-[50px] font-bold leading-[60px] tracking-[-0.408px] mt-2"
                 style={{ WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: '#FFF' }}>
                รวมดีลเด็ดที่เดียวจบ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}