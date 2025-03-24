import React from 'react';
import { Metadata } from 'next';
import { getFlashSaleData } from '@/lib/flashsale';
import FlashSalePageClient from './components/FlashSalePageClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'FLASHSALE! | ลดราคาพิเศษสำหรับสินค้าสัตว์เลี้ยง | KUMAま Mall',
  description: 'โปรโมชันลดราคาพิเศษสำหรับสินค้าสัตว์เลี้ยง ของใช้ อาหาร ของเล่น และอุปกรณ์สำหรับสัตว์เลี้ยงคุณภาพดี ลดสูงสุด 50% จำนวนจำกัด',
  keywords: 'flashsale, โปรโมชัน, ลดราคา, สินค้าสัตว์เลี้ยง, อาหารสัตว์, ของใช้สัตว์เลี้ยง',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'FLASHSALE! ลดราคาพิเศษสำหรับสินค้าสัตว์เลี้ยง | KUMAま Mall',
    description: 'โปรโมชันลดราคาพิเศษสำหรับสินค้าสัตว์เลี้ยง ลดสูงสุด 50% จำนวนจำกัด',
    images: ['/images/Promotion.png'],
    type: 'website',
  },
};

export default async function Page(props: any) {
  const pageValue = 1;
  const sortValue = 'endDate';
  const pageSize = 12;
  const minPriceValue = 0;
  const maxPriceValue = 999;
  const categoryParamValue = '';
  const { products, pagination } = await getFlashSaleData({
    page: pageValue, 
    pageSize: pageSize, 
    sort: sortValue, 
    minPrice: minPriceValue, 
    maxPrice: maxPriceValue,
    categoryParam: categoryParamValue
  });

  return (
    <div>
      <div className="container mx-auto py-3">
        <div className="flex items-center text-gray-600">
          <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
            <ArrowLeft color="#5F6368" />
            <span>หน้าแรก</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#B86A4B]">FLASHSALES!</span>
        </div>
      </div>

      <div className="mb-4">
        <Image 
          src="/images/Promotion.png" 
          alt="โปรโมชันสินค้าสัตว์เลี้ยง KUMAま Mall" 
          className="w-full max-w-[1255px] h-auto mx-auto"
          width={1255}
          height={220}
          priority
        />
      </div>
      <FlashSalePageClient 
        initialProducts={products} 
        initialPagination={pagination}
        initialSort={sortValue}
      />
    </div>
  );
}