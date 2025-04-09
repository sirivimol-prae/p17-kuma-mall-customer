import React from 'react'
import Sidebar from '../new_arrival/component/sidebar'
import { ArrowLeft, ChevronDown, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link';
import Image from 'next/image';
import { mockProducts } from '../categories/component/mockProducts'

const page = () => {
  return (
    <div className="container mx-auto px-4 py-6">
        <div className="flex items-center text-gray-600 mb-6">
          <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
            <ArrowLeft color="#5F6368" />
            <span>หน้าแรก</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#D6A985]">โซนสินค้าลดราคา</span>
        </div>
        
        <div className="mb-2">
          <Image 
            src="/images/Promotion.png" 
            alt="โปรโมชันสินค้าสัตว์เลี้ยง KUMAま Mall" 
            className="w-full max-w-[1255px] h-auto mx-auto"
            width={1255}
            height={220}
            priority
          />
        </div>
        <br />

        <div className="mb-4">
          <div className="flex items-center px-2 mb-3">
            <div className="w-8 h-8 mr-3">
              <Image 
                src="/images/paw_icon.png" 
                alt="Paw Icon" 
                width={32}
                height={32}
                className="w-full h-full"
              />
            </div>
            <span className="text-[#B86A4B] font-bold text-[28px]">โซนสินค้าลดราคา</span>
            <div className="ml-auto">
              <span className="text-[#D6A985] text-[18px] flex items-center gap-1">
                เรียงลำดับ <ChevronDown />
              </span>
            </div>
          </div>
          <div className="h-[0.5px] w-full bg-[#D6A985]"></div>
        </div>

        <div className="flex flex-row gap-6">
          <div className="w-1/4">
            <Sidebar />
          </div>
          <div className="w-3/4">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockProducts.map((product) => (
                <div key={product.id} className="rounded-lg relative w-full max-w-[235px] pb-3">
                  <Link href={`/product/${product.id}`}>
                    <div className="relative rounded-[5px] w-[235px] h-[235px]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="235px"
                        className="object-contain rounded-[5px]"
                        priority={false}
                      />
                    </div>
                  </Link>
                  
                  <div className="p-0 mb-1">
                    <div className="w-full">
                      <div className="flex flex-col w-full mb-0">
                        <Link href={`/product/${product.id}`}>
                          <h3 
                            className="font-medium text-[#5F6368] text-[24px] leading-tight w-full truncate cursor-pointer pl-0 pr-0 ml-0 mr-0 mb-0"
                            title={product.name}
                          >
                            {product.name}
                          </h3>
                        </Link>
                        
                        <div className="inline-block bg-[#D6A985] text-white text-[16px] px-2 py-0 rounded-md w-fit ml-0">
                          KUMAま FRIEND
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-0.5">
                      <span className="text-[#B86A4B] font-bold text-[28px]">฿{product.price.toLocaleString()}</span>
                      {product.hasDiscount && (
                        <span className="text-[#A6A6A6] line-through ml-2 text-[18px]">
                          ฿{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center mt-0 mb-1">
                      <div className="flex text-yellow-400 leading-none text-[22px]">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>

                      <span className="text-[#A6A6A6] ml-1 text-[20px]">| 4.8</span>
                      <div className="ml-auto pr-1">
                        <button 
                          className="relative flex justify-center items-center bg-[#D6A985] text-white border-4 border-white shadow-[0_0_0_2px_#D6A985] rounded-[12px]"
                          style={{ 
                            width: "70px", 
                            height: "40px", 
                            marginBottom: "0px" 
                          }}
                        >
                          <div className="flex justify-center items-center w-full h-full bg-[#cfa580] rounded-lg">
                            <ShoppingCart size={18} className="text-white" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination UI */}
            <div className="flex justify-center items-center mt-8 mb-4">
              <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#B86A4B]">
                <ChevronLeft size={24} />
              </button>
              
              <div className="w-10 h-10 rounded-full bg-[#D6A985] flex items-center justify-center mx-2 text-white font-medium">
                1
              </div>
              
              <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#B86A4B]">
                <ChevronRight size={24} />
              </button>
            </div>
            
          </div>
        </div>
    </div>
  )
}

export default page