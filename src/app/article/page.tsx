import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  image: string;
  url: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: '5 ที่พักสัตว์เลี้ยงเข้าพักได้ เอาใจเจ้านายแสนซน',
    image: '/images/Rectangle_66.png',
    url: '/articles/pet-friendly-hotel'
  },
  {
    id: 2,
    title: 'ทริปนี้ สี่ขาขอแจม ...5 ไอเทมสัตว์เลี้ยงที่ต้องมีติดรถ!!',
    image: '/images/Rectangle_67.png',
    url: '/articles/pet-car-items'
  },
  {
    id: 3,
    title: '3 ไอเทมคลายร้อนสัตว์เลี้ยงที่คุณห้ามพลาด',
    image: '/images/Rectangle_68.png',
    url: '/articles/pet-cooling-items'
  },
  {
    id: 4,
    title: '"HEAT STROKE" ภัยความร้อนใกล้ตัวที่ไม่ควรมองข้าม',
    image: '/images/Rectangle_69.png',
    url: '/articles/pet-heat-stroke'
  },
  {
    id: 5,
    title: '3 วิธีดูแลขนน้องหมาแมวให้สวยปังในทุกฤดู',
    image: '/images/Rectangle_70.png',
    url: '/articles/pet-fur-care'
  }
];

const ArticleGrid: React.FC = () => {
  return (
    <div className="max-w-[1255px] mx-auto px-4 py-8">
        <div className="container mx-auto py-3">
        <div className="flex items-center text-gray-600">
        <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
          <ArrowLeft color="#5F6368" />
          <span>หน้าแรก</span>
        </Link>
          <span className="mx-2">/</span>
          <span className="text-[#B86A4B]">บทความ</span>
        </div>
      </div>
        <div className="mb-4">
        <img 
          src="./images/Promotion.png" 
          alt="Background" 
          className="w-[1255px] h-[220px] mx-auto"
        />
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#D6A985] rounded-full flex items-center justify-center mr-2">
            <Image src="/images/paw_icon.png" alt="Paw Icon" width={40} height={40} />
          </div>
          <h2 className="text-[#B86A4B] text-2xl font-bold">บทความทั้งหมด</h2>
        </div>
        <div className="text-[#D6A985]">
          <Link href="/articles" className="flex items-center">
            เรียงล่าสุด
            <ChevronDown className="h-5 w-5 ml-1" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={article.url} className="block group">
            <div className="relative overflow-hidden rounded-lg mb-2 aspect-[4/3]" style={{width: "406px", height: "250px"}}>
              <Image 
                src={article.image} 
                alt={article.title}
                width={406}
                height={250}
                className="group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            
            <h3 className="text-[26px] font-normal text-[#B86A4B] group-hover:text-[#D6A985] transition-colors duration-300">
              {article.title}
            </h3>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center mt-10 space-x-4">
        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full">
          <ChevronLeft className="h-5 w-5 text-gray-500" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-[#D6A985] text-white rounded-full">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full">
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default ArticleGrid;