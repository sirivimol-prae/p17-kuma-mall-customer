import React from 'react';
import { Metadata } from 'next';
import { getFlashSaleData } from '@/lib/flashsale';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import UniversalProductContainer from '@/components/Universal/UniversalProductContainer';

export const metadata: Metadata = {
  title: 'FLASHSALE! | ลดราคาพิเศษสำหรับสินค้าสัตว์เลี้ยง | KUMAま Mall',
  description: 'โปรโมชันลดราคาพิเศษสำหรับสินค้าสัตว์เลี้ยง ของใช้ อาหาร ของเล่น และอุปกรณ์สำหรับสัตว์เลี้ยงคุณภาพดี ลดสูงสุด 50% จำนวนจำกัด',
  keywords: 'flashsale, โปรโมชัน, ลดราคา, สินค้าสัตว์เลี้ยง, อาหารสัตว์, ของใช้สัตว์เลี้ยง',
  metadataBase: new URL('https://kumamall.com'),
  openGraph: {
    title: 'FLASHSALE! ลดราคาพิเศษสำหรับสินค้าสัตว์เลี้ยง | KUMAま Mall',
    description: 'โปรโมชันลดราคาพิเศษสำหรับสินค้าสัตว์เลี้ยง ลดสูงสุด 50% จำนวนจำกัด',
    images: ['/images/Promotion.png'],
    type: 'website',
  },
};

type SearchParams = {
  page?: string;
  sort?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
};

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const params = await Promise.resolve(searchParams);
  const pageValue = parseInt(params.page || '1');
  const sortValue = params.sort || 'endDate';
  const pageSize = 12;
  const minPriceValue = parseInt(params.minPrice || '0');
  const maxPriceValue = parseInt(params.maxPrice || '999');
  const categoryParamValue = params.category || '';
  const { products, pagination } = await getFlashSaleData({
    page: pageValue, 
    pageSize: pageSize, 
    sort: sortValue, 
    minPrice: minPriceValue, 
    maxPrice: maxPriceValue,
    categoryParam: categoryParamValue
  });

  return (
    <div className="min-h-screen">
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

      <UniversalProductContainer 
        products={products}
        pagination={pagination}
        type="flashsale"
        title="สินค้า Flash Sale"
        initialSort={sortValue}
        showHeader={true}
        showFilter={true}
        showPagination={true}
      />
    </div>
  );
}