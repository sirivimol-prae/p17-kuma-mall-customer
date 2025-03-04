import React from 'react'
import { ChevronDown, ArrowLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Sidebar from './components/Sidebar'

function FlashsaleComponent() {
  // สร้างข้อมูลจำลองสำหรับสินค้า
  const products = [
    {
      id: 1,
      name: 'KUMAま หมอนหนุนน้องหมา',
      price: 880,
      originalPrice: 899,
      rating: 4.8,
      image: './images/Pillow.png'
    },
    {
      id: 2,
      name: 'KUMAま ที่ฝนเล็บน้องแมวรูปโคม',
      price: 880,
      originalPrice: 899,
      rating: 4.8,
      image: './images/bowl.png'
    },
    {
      id: 3,
      name: 'KUMAま อาหารน้องหมาน้องแมว',
      price: 880,
      originalPrice: 899,
      rating: 4.8,
      image: './images/Kaniva.png'
    },
    {
      id: 4,
      name: 'KUMAま ทรายแมวแถวบ้าน',
      price: 880,
      originalPrice: 899,
      rating: 4.8,
      image: './images/kasty.png'
    },
  ];

  return (
    <div>
      
      {/* Breadcrumb */}
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

      {/* Flashsale Header with Timer */}
      <div className="w-full border-t border-b border-gray-200 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            {/* Flashsale Icon and Text */}
            <div className="flex items-center">
              <div className="bg-[#B86A4B] rounded-full p-1 mr-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="white" />
                </svg>
              </div>
              <span className="font-medium text-[#B86A4B] mr-2">FLASHSALES</span>
              <span className="text-[#D6A985] text-sm">(Website Only)</span>
            </div>
            
            {/* Timer Display */}
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
          
          {/* Sort Option */}
          <div className="flex items-center text-[#D6A985]">
            <span className="mr-1">เรียงลำดับ</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-1/5">
            <Sidebar />
          </div>

          {/* Products Grid */}
          <div className="w-4/5">
            <div className="grid grid-cols-4 gap-4">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden relative w-[235px]">
                  {/* Product Image Container */}
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full object-cover w-[235px] h-[235px]" />
                    
                    {/* Discount Badge */}
                    <div className="absolute top-0 right-3">
                    <div className="bg-[#B86A4B] text-white p-2 border-2 border-white flex flex-col items-center justify-center rounded-none rounded-bl-[10px] rounded-br-[10px]" style={{width: '50px', height: '55px'}}>
                        <div className="text-[20px] font-bold">ลด</div>
                        <div className="text-[20px] font-bold">20%</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-3">
                    {/* Product Name */}
                    <div className="mb-1">
                      <div className="flex items-center">
                        <h3 className="font-medium text-[#5F6368] text-[24px]">{product.name}</h3>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-[#B86A4B] text-white text-xs px-2 py-0.5 rounded mr-2">
                          FLASHSALES
                        </div>
                        <span className="text-[#D6A985] text-sm">จำนวนจำกัด !!</span>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center mt-2">
                      <span className="text-[#B86A4B] font-bold text-xl">฿{product.price}</span>
                      <span className="text-[#A6A6A6] line-through ml-2 text-sm">฿{product.originalPrice}</span>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center mt-1">
                    {/* Stars */}
                    <div className="flex text-yellow-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>

                    {/* Rating */}
                    <span className="text-[#A6A6A6] ml-1">| {product.rating}</span>
                    <div className="ml-auto">
                      <button className="relative flex justify-center items-center py-2 px-4 rounded-full bg-[#D6A985] text-white border-4 border-white shadow-[0_0_0_2px_#D6A985] rounded-[12px]"
                      style={{width:"80px", height:"40px"}}>
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlashsaleComponent