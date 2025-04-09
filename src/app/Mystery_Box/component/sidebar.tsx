'use client';

import React, { useState } from 'react';
import { Circle, Check } from 'lucide-react';

interface PriceRange {
  min: number;
  max: number;
}

interface SidebarProps {
  initialCategories?: string[];
  initialPriceRange?: PriceRange;
}

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Sidebar: React.FC<SidebarProps> = ({
  initialCategories = [],
  initialPriceRange = { min: 400, max: 400 }
}) => {
  const categories = [
    'กล่องสุ่ม'
  ];
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  
  const [sliderPosition, setSliderPosition] = useState({ minPos: 0, maxPos: 100 });
  
  const priceRange = { min: 400, max: 400 };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSliderPosition({ minPos: 0, maxPos: 100 });
  };

  const handleMinThumbMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const startX = e.clientX;
    const startMinPos = sliderPosition.minPos;
    const parentWidth = e.currentTarget.parentElement?.clientWidth || 0;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaPercent = (deltaX / parentWidth) * 100;
      let newMinPos = startMinPos + deltaPercent;
      
      newMinPos = Math.max(0, newMinPos);
      newMinPos = Math.min(newMinPos, sliderPosition.maxPos - 10);
      
      setSliderPosition({...sliderPosition, minPos: newMinPos});
    };
    
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMinThumbTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startMinPos = sliderPosition.minPos;
    const parentWidth = e.currentTarget.parentElement?.clientWidth || 0;
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const deltaX = moveEvent.touches[0].clientX - startX;
      const deltaPercent = (deltaX / parentWidth) * 100;
      let newMinPos = startMinPos + deltaPercent;
      
      newMinPos = Math.max(0, newMinPos);
      newMinPos = Math.min(newMinPos, sliderPosition.maxPos - 10);
      
      setSliderPosition({...sliderPosition, minPos: newMinPos});
    };
    
    const handleTouchEnd = () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
    
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  const handleMaxThumbMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const startX = e.clientX;
    const startMaxPos = sliderPosition.maxPos;
    const parentWidth = e.currentTarget.parentElement?.clientWidth || 0;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaPercent = (deltaX / parentWidth) * 100;
      let newMaxPos = startMaxPos + deltaPercent;
      
      newMaxPos = Math.min(100, newMaxPos);
      newMaxPos = Math.max(newMaxPos, sliderPosition.minPos + 10);
      
      setSliderPosition({...sliderPosition, maxPos: newMaxPos});
    };
    
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMaxThumbTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startMaxPos = sliderPosition.maxPos;
    const parentWidth = e.currentTarget.parentElement?.clientWidth || 0;
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const deltaX = moveEvent.touches[0].clientX - startX;
      const deltaPercent = (deltaX / parentWidth) * 100;
      let newMaxPos = startMaxPos + deltaPercent;
      
      newMaxPos = Math.min(100, newMaxPos);
      newMaxPos = Math.max(newMaxPos, sliderPosition.minPos + 10);
      
      setSliderPosition({...sliderPosition, maxPos: newMaxPos});
    };
    
    const handleTouchEnd = () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
    
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  const minThumbPosition = sliderPosition.minPos;
  const maxThumbPosition = sliderPosition.maxPos;
  const selectedRangeWidth = sliderPosition.maxPos - sliderPosition.minPos;

  return (
    <aside className="w-[235px] bg-white p-4" aria-label="ตัวกรองสินค้า">
      <div className="mb-6">
        <h2 className="text-[20px] font-medium text-[#5F6368] mb-3 flex items-center">
          หมวดหมู่สินค้า
        </h2>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <label key={index} className="flex items-center relative cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="sr-only peer"
                  aria-label={`กรองหมวดหมู่ ${category}`}
                />
                <div className="flex-shrink-0 w-[18px] h-[18px] border-[2px] border-[#5F6368] inline-block mr-3 relative peer-checked:border-[#D6A985]">
                  {selectedCategories.includes(category) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#D6A985]" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </div>
              <span className="text-[16px] text-[#5F6368] ml-1">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-[20px] font-medium text-[#5F6368] mb-3">ราคา</h2>
        <div className="mt-2">
          <div className="relative h-10 mb-2">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 rounded-full transform -translate-y-1/2"></div>
            
            <div 
              className="absolute top-1/2 h-0.5 bg-[#D6A985] rounded-full transform -translate-y-1/2"
              style={{ 
                left: `${minThumbPosition}%`,
                width: `${selectedRangeWidth}%`
              }}
            ></div>
            
            <div 
              className="absolute cursor-pointer"
              style={{ 
                left: `${minThumbPosition}%`, 
                top: '50%', 
                transform: 'translate(-50%, -50%)', 
                zIndex: 20,
                touchAction: 'none'
              }}
              onMouseDown={handleMinThumbMouseDown}
              onTouchStart={handleMinThumbTouchStart}
            >
              <Circle color="#D6A985" fill="white" size={20} strokeWidth={2} />
            </div>
            
            <div 
              className="absolute cursor-pointer"
              style={{ 
                left: `${maxThumbPosition}%`, 
                top: '50%', 
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                touchAction: 'none'
              }}
              onMouseDown={handleMaxThumbMouseDown}
              onTouchStart={handleMaxThumbTouchStart}
            >
              <Circle color="#D6A985" fill="white" size={20} strokeWidth={2} />
            </div>
          </div>
          
          <div className="flex justify-between text-[16px] text-[#5F6368] mt-2">
            <span>฿{formatPrice(priceRange.min)}</span>
            <span>฿{formatPrice(priceRange.max)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
            onClick={clearAllFilters}
            className="text-[#D6A985] text-[18px] underline hover:text-[#D6A985] transition-colors"
            aria-label="ลบตัวกรองทั้งหมด"
        >
            ลบตัวกรองทั้งหมด
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;