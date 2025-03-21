import React from 'react'
import { ChevronDown, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Sidebar from './components/Sidebar'
import { FlashSaleProduct } from '@/types/product'
import { PrismaClient } from '@prisma/client'
import { Metadata } from 'next'
import ProductGrid from './components/ProductGrid'
import FilterProvider from './components/FilterProvider'

export const metadata: Metadata = {
  title: 'FLASHSALE! | ลดราคาพิเศษสำหรับสินค้าสัตว์เลี้ยง | KUMAま Mall',
  description: 'โปรโมชันลดราคาพิเศษสำหรับสินค้าสัตว์เลี้ยง ของใช้ อาหาร ของเล่น และอุปกรณ์สำหรับสัตว์เลี้ยงคุณภาพดี ลดสูงสุด 50% จำนวนจำกัด',
  keywords: 'flashsale, โปรโมชัน, ลดราคา, สินค้าสัตว์เลี้ยง, อาหารสัตว์, ของใช้สัตว์เลี้ยง',
};

async function FlashsaleComponent() {
  const prisma = new PrismaClient();
  let flashSaleProducts: FlashSaleProduct[] = [];
  let isError = false;
  let errorMessage = '';
  
  try {
    console.log("กำลังดึงข้อมูล FlashSale...");

    const items = await prisma.flash_sale.findMany({
      where: {
        status: 'active',
        quantity: {
          gt: 0
        },
        end_date: {
          gt: new Date()
        }
      },
      include: {
        product: {
          include: {
            product_group: {
              include: {
                group: {
                  include: {
                    group_categories: {
                      include: {
                        category: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        end_date: 'asc',
      },
    });

    console.log("จำนวนสินค้า FlashSale ที่พบ:", items.length);
    console.log("ข้อมูลสินค้า:", JSON.stringify(items.slice(0, 1)));
    if (items.length === 0) {
      console.log("ไม่พบสินค้า FlashSale ในฐานข้อมูล");
      
      flashSaleProducts = [
        {
          id: 1,
          sku: 'FS001',
          title: 'KUMAま หมอนหนุนน้องหมา',
          price: 880,
          originalPrice: 899,
          discount: 20,
          quantity: 10,
          image: './images/Pillow.png',
          endDate: new Date(Date.now() + 86400000).toISOString(),
          categories: [{ id: 1, name: 'บ้านและที่นอน' }]
        },
        {
          id: 2,
          sku: 'FS002',
          title: 'KUMAま ที่ฝนเล็บน้องแมวรูปโคม',
          price: 880,
          originalPrice: 899,
          discount: 5,
          quantity: 15,
          image: './images/bowl.png',
          endDate: new Date(Date.now() + 172800000).toISOString(),
          categories: [{ id: 5, name: 'ของเล่นสัตว์เลี้ยง' }]
        },
        {
          id: 3,
          sku: 'FS003',
          title: 'KUMAま อาหารน้องหมาน้องแมว',
          price: 880,
          originalPrice: 899,
          discount: 5,
          quantity: 20,
          image: './images/Kaniva.png',
          endDate: new Date(Date.now() + 259200000).toISOString(),
          categories: [{ id: 2, name: 'อาหารสัตว์เลี้ยง' }]
        },
        {
          id: 4,
          sku: 'FS004',
          title: 'KUMAま ทรายแมวแถวบ้าน',
          price: 880,
          originalPrice: 899,
          discount: 5,
          quantity: 8,
          image: './images/kasty.png',
          endDate: new Date(Date.now() + 345600000).toISOString(),
          categories: [{ id: 7, name: 'กระบะสัตว์เลี้ยง' }]
        }
      ];
    } else {
      flashSaleProducts = items.map(item => {
        try {
          const categories = item.product.product_group.flatMap(pg => {
            try {
              return pg.group.group_categories.map(gc => ({
                id: gc.category.id,
                name: gc.category.name
              }));
            } catch (error) {
              console.error("Error mapping categories:", error);
              return [];
            }
          });
          
          return {
            id: item.id,
            sku: item.sku,
            title: item.product.name_sku || `สินค้า Flash Sale ${item.id}`,
            price: item.flash_sale_price,
            originalPrice: item.price_origin,
            discount: item.flash_sale_per,
            quantity: item.quantity,
            image: item.product.img_url || `/images/product-${item.id % 4 + 1}.png`,
            endDate: item.end_date.toISOString(),
            categories: categories
          };
        } catch (error) {
          console.error("Error mapping product:", error);
          return null;
        }
      }).filter(Boolean) as FlashSaleProduct[];
    }
    
    console.log("จำนวนสินค้าที่แสดงผล:", flashSaleProducts.length);
  } catch (error) {
    console.error('Error fetching flash sale products:', error);
    isError = true;
    errorMessage = `เกิดข้อผิดพลาดในการดึงข้อมูล: ${error instanceof Error ? error.message : 'Unknown error'}`;
  } finally {
    await prisma.$disconnect();
  }

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
        <img 
          src="./images/Promotion.png" 
          alt="Background" 
          className="w-[1255px] h-[220px] mx-auto"
        />
      </div>

      <div className="w-full border-t border-b border-gray-200 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="bg-[#B86A4B] rounded-full p-1 mr-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="white" />
                </svg>
              </div>
              <span className="font-medium text-[#B86A4B] mr-2">FLASHSALES</span>
              <span className="text-[#D6A985] text-sm">(Website Only)</span>
            </div>

            <div className="flex items-center ml-4">
              <div className="bg-[#B86A4B] text-white px-2 rounded mx-1">
                01
              </div>
              <span className="text-[#B86A4B]">:</span>
              <div className="bg-[#B86A4B] text-white px-2 rounded mx-1">
                59
              </div>
              <span className="text-[#B86A4B]">:</span>
              <div className="bg-[#B86A4B] text-white px-2 rounded mx-1">
                59
              </div>
            </div>
          </div>

          <div className="flex items-center text-[#D6A985]">
            <span className="mr-1">เรียงลำดับ</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {isError ? (
        <div className="container mx-auto py-12 text-center">
          <p className="text-lg text-red-600 mb-2">ขออภัย ไม่สามารถโหลดข้อมูลสินค้าได้</p>
          {errorMessage && <p className="text-sm text-gray-600">{errorMessage}</p>}
          <p className="text-base text-gray-700 mt-4">โปรดลองใหม่อีกครั้งในภายหลัง</p>
        </div>
      ) : (
        <FilterProvider>
          <div className="container mx-auto py-6">
            <div className="flex gap-6">
              <div className="w-1/5">
                <Sidebar />
              </div>

              <div className="w-4/5">
                {flashSaleProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">ไม่พบสินค้า Flash Sale ในขณะนี้</p>
                    <p className="text-sm text-gray-400 mt-2">โปรดกลับมาตรวจสอบในภายหลัง</p>
                  </div>
                ) : (
                  <ProductGrid products={flashSaleProducts} key={Date.now()} />
                )}

                <div className="mt-8 p-4 border border-gray-200 rounded bg-gray-50 text-xs text-gray-500">
                  <p>จำนวนสินค้าที่พบ: {flashSaleProducts.length}</p>
                  <p>สถานะ: {isError ? 'มีข้อผิดพลาด' : 'สำเร็จ'}</p>
                </div>
              </div>
            </div>
          </div>
        </FilterProvider>
      )}
    </div>
  );
}

export default FlashsaleComponent;