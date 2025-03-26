import React from 'react';
import { Metadata } from 'next';
import { getProductsData } from '@/lib/products';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductContainer } from '@/components/Product';
export const metadata: Metadata = {
  title: 'สินค้าทั้งหมด | KUMAま Mall - ของใช้และอาหารสัตว์เลี้ยงคุณภาพดี',
  description: 'เลือกซื้อสินค้าสำหรับสัตว์เลี้ยงคุณภาพดี ทั้งของใช้ อาหาร ของเล่น และอุปกรณ์อื่นๆ สำหรับสุนัขและแมว ส่งฟรีทั่วประเทศเมื่อซื้อครบตามเงื่อนไข',
  keywords: 'สินค้าสัตว์เลี้ยง, อาหารสัตว์, ของใช้สัตว์เลี้ยง, ของเล่นสัตว์, ที่นอนสัตว์เลี้ยง',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'สินค้าสัตว์เลี้ยงคุณภาพ | KUMAま Mall',
    description: 'เลือกซื้อสินค้าสำหรับสัตว์เลี้ยงคุณภาพดี สำหรับสุนัขและแมว',
    images: ['/images/Promotion.png'],
    type: 'website',
  },
};

type SearchParams = {
  page?: string;
  sort?: string;
  collection?: string;
  minPrice?: string;
  maxPrice?: string;
};

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const page = parseInt(searchParams.page || '1');
  const sort = searchParams.sort || 'latest';
  const pageSize = 12;
  const minPrice = parseInt(searchParams.minPrice || '0');
  const maxPrice = parseInt(searchParams.maxPrice || '999');
  const collectionParam = searchParams.collection || '';
  
  const { products, pagination, flashSaleCount } = await getProductsData({
    page, 
    pageSize, 
    sort, 
    minPrice, 
    maxPrice,
    collectionParam
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
          <span className="text-[#B86A4B]">สินค้าทั้งหมด</span>
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

      <ProductContainer 
        products={products}
        pagination={pagination}
        flashSaleCount={flashSaleCount}
        initialSort={sort}
        showHeader={true}
        showFilter={true}
        showPagination={true}
      />
    </div>
  );
}
