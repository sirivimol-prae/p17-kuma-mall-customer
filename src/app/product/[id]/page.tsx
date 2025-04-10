'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import RecommendedProducts from '../component/RecommendedProducts';
import CoinSidebar from '../component/CoinSidebar';
import ProductDetails from '../component/ProductDetails';

const ProductDetail = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState(''); 
  const [selectedType, setSelectedType] = useState(''); 

  const productImages = [
    '/images/product/stall_main.png',
    '/images/product/stall_1.png',
    '/images/product/stall_2.png',
  ];

  const sizes = [
    { id: 'M', label: 'M : 74*74*45 CM' },
    { id: 'L', label: 'L : 93*93*59 CM' },
    { id: 'XL', label: 'XL : 105*115*56 CM' },
  ];

  const types = [
    { id: 'type1', label: '(แบบกลม 1) น้ำเงิน-ครีม' },
    { id: 'type2', label: '(3 เหลี่ยม) น้ำตาลขาว' },
    { id: 'type3', label: '(A+) เหลืองมัสตาร์ด' },
    { id: 'type4', label: '(4 เหลี่ยม) เทาพิมพ์ลาย' },
  ];

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId === selectedSize ? '' : sizeId); 
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId === selectedType ? '' : typeId); 
  };

  const handleImageClick = (index: number) => {
    setActiveImage(index);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveImage(prev => (prev > 0 ? prev - 1 : productImages.length - 1));
    } else {
      setActiveImage(prev => (prev < productImages.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center text-gray-600 mb-6">
        <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
          <ArrowLeft color="#5F6368" />
          <span>หน้าแรก</span>
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#D6A985]">KUMAま คอกสุนัขพับได้ XL ไซส์พิเศษ</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="md:w-1/2">
          <div className="relative w-full h-[400px] mb-4 rounded-lg overflow-hidden">
            <Image
              src={productImages[activeImage]}
              alt="KUMA คอกสุนัขพับได้ XLไซส์พิเศษ"
              fill
              className="object-contain"
              priority
            />
            <button 
              className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-white/70 w-8 h-8 rounded-full flex items-center justify-center"
              onClick={() => navigateImage('prev')}
            >
              <ChevronLeft />
            </button>
            <button 
              className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-white/70 w-8 h-8 rounded-full flex items-center justify-center"
              onClick={() => navigateImage('next')}
            >
              <ChevronRight />
            </button>
          </div>
          <div className="flex space-x-2 justify-center">
            {productImages.map((image, index) => (
              <div 
                key={index}
                className={`relative w-[130px] h-[130px] cursor-pointer rounded-lg overflow-hidden ${activeImage === index ? 'border-2 border-[#D6A985]' : 'border border-gray-200'}`}
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={image}
                  alt={`KUMA คอกสุนัขพับได้ ภาพที่ ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-medium text-[#5F6368] mb-2">KUMAま คอกสุนัขพับได้ XL ไซส์พิเศษ</h1>
          <p className="text-[#5F6368] text-xl mb-4">คอกสุนัข คอกสัตว์เลี้ยง มีซิปรูดเปิด-ปิดได้ เต็นท์8เหลี่ยม ที่นอนสุนัขพกพา คอกแมว</p>

          <div className="flex items-center mb-4">
            <span className="text-[#5F6368] line-through text-xl">฿749</span>
            <span className="text-[#B86A4B] font-bold text-3xl mx-3">฿720</span>
            <div className="inline-block bg-[#D6A985] text-white px-3 py-1 rounded-md">
              KUMAま FRIEND
            </div>
          </div>

          <div className="mb-6">
            <div className="flex">
              <span className="text-gray-700 w-24 text-[18px] pt-2">ขนาด</span>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size.id}
                    className={`border px-4 py-2 rounded-md w-[160px] h-[40px] text-center ${
                      selectedSize === size.id 
                        ? 'border-[#D6A985] text-[#D6A985]' 
                        : 'border-gray-300 text-gray-600'
                    }`}
                    onClick={() => handleSizeSelect(size.id)}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex">
              <span className="text-gray-700 w-24 text-[18px] pt-2">ประเภท</span>
              <div>
                <div className="flex flex-wrap gap-2">
                  {types.slice(0, 3).map(type => (
                    <button
                      key={type.id}
                      className={`border px-4 py-2 rounded-md w-[180px] h-[40px] text-center ${
                        selectedType === type.id 
                          ? 'border-[#D6A985] text-[#D6A985]' 
                          : 'border-gray-300 text-gray-600'
                      }`}
                      onClick={() => handleTypeSelect(type.id)}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {types.slice(3).map(type => (
                    <button
                      key={type.id}
                      className={`border px-4 py-2 rounded-md w-[180px] h-[40px] text-center ${
                        selectedType === type.id 
                          ? 'border-[#D6A985] text-[#D6A985]' 
                          : 'border-gray-300 text-gray-600'
                      }`}
                      onClick={() => handleTypeSelect(type.id)}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex">
              <span className="text-gray-700 w-24 text-[18px] pt-2">จำนวน</span>
              <div className="flex items-center">
                <button 
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-l-md"
                  onClick={handleDecreaseQuantity}
                >
                  <Minus size={18} />
                </button>
                <div className="w-14 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                  {quantity}
                </div>
                <button 
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-r-md"
                  onClick={handleIncreaseQuantity}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="px-4 py-3 border-[3px] border-[#D6A985] w-[210px] h-[60px] bg-white text-[#D6A985] text-[20px] rounded-[10px] font-medium flex items-center justify-center">
              <ShoppingCart className="mr-2" size={20} />
              เพิ่มไปยังรถเข็น
            </button>
            <button className="relative px-4 py-3 bg-[#D6A985] w-[210px] h-[60px] text-white rounded-[10px] font-medium text-[20px]">
              <span className="relative z-10">สั่งซื้อสินค้า</span>
              <div className="absolute inset-[3px] border-2 border-white rounded-[10px] z-0"></div>
            </button>
          </div>
        </div>
      </div>

      <RecommendedProducts />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4">
          <ProductDetails />
        </div>

        <div className="lg:w-1/4">
          <CoinSidebar />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;