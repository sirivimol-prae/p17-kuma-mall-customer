'use client'

import React, { useEffect, useState } from 'react'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Sidebar from './components/Sidebar'
import ProductGrid from './components/ProductGrid'
import Pagination from '../product/component/Pagination'
import { FlashSaleProduct, PaginationInfo } from '@/types/product'
import Head from 'next/head'

const FlashSaleSeo = () => {
  return (
    <Head>
      <title>FLASHSALE! | ลดราคาพิเศษสำหรับสินค้าสัตว์เลี้ยง | KUMAま Mall</title>
      <meta name="description" content="โปรโมชันลดราคาพิเศษสำหรับสินค้าสัตว์เลี้ยง ของใช้ อาหาร ของเล่น และอุปกรณ์สำหรับสัตว์เลี้ยงคุณภาพดี ลดสูงสุด 50% จำนวนจำกัด" />
      <meta name="keywords" content="flashsale, โปรโมชัน, ลดราคา, สินค้าสัตว์เลี้ยง, อาหารสัตว์, ของใช้สัตว์เลี้ยง" />
    </Head>
  )
}

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const pageSize = 12;
  
  const [products, setProducts] = useState<FlashSaleProduct[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: currentPage,
    pageSize: pageSize,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'endDate');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  
  const sortOptions = [
    { value: 'endDate', label: 'ใกล้หมดเวลา' },
    { value: 'priceAsc', label: 'ราคาต่ำ - สูง' },
    { value: 'priceDesc', label: 'ราคาสูง - ต่ำ' },
    { value: 'discount', label: 'ส่วนลดมากสุด' }
  ];
  
  const fetchFlashSaleProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = `/api/flashsale?page=${currentPage}&pageSize=${pageSize}`;

      if(sortBy) {
        url += `&sort=${sortBy}`;
      }

      const categoryParam = searchParams.get('category');
      if(categoryParam) {
        url += `&category=${categoryParam}`;
      }
      
      const minPriceParam = searchParams.get('minPrice');
      const maxPriceParam = searchParams.get('maxPrice');
      if(minPriceParam) {
        url += `&minPrice=${minPriceParam}`;
      }
      if(maxPriceParam) {
        url += `&maxPrice=${maxPriceParam}`;
      }
      
      console.log('Fetching from:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
        if (data.pagination) {
          setPagination(data.pagination);
        } else {
          setPagination({
            page: currentPage,
            pageSize: pageSize,
            totalItems: data.data.length,
            totalPages: Math.ceil(data.data.length / pageSize),
            hasNextPage: false,
            hasPrevPage: currentPage > 1
          });
        }
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการดึงข้อมูล');
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching flash sale products:', err);
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashSaleProducts();
  }, [currentPage, sortBy, searchParams]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    
    router.push(`/flashsale?${params.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setIsSortMenuOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    params.set('page', '1');
    
    router.push(`/flashsale?${params.toString()}`);
  };

  return (
    <>
      <FlashSaleSeo />
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

        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Image 
                src="/images/paw_icon.png" 
                alt="Paw Icon" 
                className="w-8 h-8 mr-2"
                width={32}
                height={32}
              />
              <span className="font-medium text-[#B86A4B] text-[24px]">สินค้า Flash Sale</span>
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                className="flex items-center text-[#D6A985] text-[18px]"
              >
                <span className="mr-1">
                  {sortOptions.find(option => option.value === sortBy)?.label || 'เรียงลำดับ'}
                </span>
                <ChevronDown size={16} />
              </button>
              
              {isSortMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                        sortBy === option.value ? 'text-[#D6A985] font-medium' : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="border-b border-[#D6A985] mb-6"></div>
          
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/5 mb-6 md:mb-0">
              <Sidebar />
            </div>
            <div className="w-full md:w-4/5">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D6A985]"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-500 py-8">
                  <p>{error}</p>
                  <button 
                    className="mt-4 px-4 py-2 bg-[#D6A985] text-white rounded"
                    onClick={() => fetchFlashSaleProducts()}
                  >
                    ลองใหม่
                  </button>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#5F6368] text-xl">ไม่พบสินค้า Flash Sale ที่ตรงกับเงื่อนไขในขณะนี้</p>
                </div>
              ) : (
                <>
                  <ProductGrid products={products} />
                  {pagination.totalPages > 1 && (
                    <Pagination 
                      currentPage={pagination.page} 
                      totalPages={pagination.totalPages} 
                      onPageChange={handlePageChange} 
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}