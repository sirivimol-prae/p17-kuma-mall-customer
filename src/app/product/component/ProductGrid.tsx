import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
}

const ProductGrid: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: 'KUMAま คอกสุนัขพับได้',
      price: 250,
      originalPrice: 259,
      rating: 4.8,
      image: './images/stall.png'
    },
    {
      id: 2,
      name: 'KUMAま ที่นอนสัตว์เลี้ยง',
      price: 300,
      originalPrice: 379,
      rating: 4.8,
      image: './images/bed2.png'
    },
    {
      id: 3,
      name: 'KUMAま โรลครีมลับเล็บ',
      price: 150,
      originalPrice: 199,
      rating: 4.8,
      image: './images/roll.png'
    },
    {
      id: 4,
      name: 'KUMAま ผ้าปูกันรอยนุ่มนิ่ม',
      price: 450,
      originalPrice: 569,
      rating: 4.8,
      image: './images/bed.png'
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 px-8 mx-4">
      {products.map((product) => (
        <div key={product.id} className="rounded-lg overflow-hidden relative w-[235px] pb-3">
          <div className="relative overflow-hidden rounded-[5px]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="object-cover w-[235px] h-[235px]" 
            />
          </div>
          
          <div className="p-0 mb-1">
            <div className="w-[235px]">
              <div className="flex flex-col w-full mb-0">
                <h3 
                  className="font-medium text-[#5F6368] text-[28px] leading-tight w-full truncate cursor-pointer pl-0 pr-0 ml-0 mr-0 mb-0"
                  title={product.name}
                >
                  {product.name}
                </h3>
                
                <div className="inline-block bg-[#D6A985] text-white text-[18px] px-2 py-0 rounded-md w-fit ml-0">
                  KUMAま FRIEND
                </div>
              </div>
            </div>
            
            <div className="flex items-center mt-0.5">
              <span className="text-[#B86A4B] font-bold text-[30px]">฿{product.price}</span>
              <span className="text-[#A6A6A6] line-through ml-2 text-[22px]">฿{product.originalPrice}</span>
            </div>
            
            <div className="flex items-center mt-0 mb-1">
              <div className="flex text-yellow-400 leading-none text-[22px]">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              <span className="text-[#A6A6A6] ml-1 text-[20px]">| {product.rating}</span>
              <div className="ml-auto pr-1">
              <button 
                className="relative flex justify-center items-center bg-[#D6A985] text-white border-4 border-white shadow-[0_0_0_2px_#D6A985] rounded-[12px]"
                style={{ width: "70px", height: "40px", marginBottom: "0px" }}
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
  );
};

export default ProductGrid;