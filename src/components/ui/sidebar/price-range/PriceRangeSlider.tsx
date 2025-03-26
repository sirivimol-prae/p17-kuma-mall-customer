'use client'

import React, { useState, useRef, useEffect } from 'react';

interface PriceRangeSliderProps {
  initialMin: number;
  initialMax: number;
  min?: number;
  max?: number;
  onChange: (min: number, max: number) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  initialMin,
  initialMax,
  min = 0,
  max = 999,
  onChange
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialMin, initialMax
  ]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeHandle, setActiveHandle] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleStartDrag = (e: React.MouseEvent, handle: 'min' | 'max') => {
    e.preventDefault();
    setIsDragging(true);
    setActiveHandle(handle);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current || !activeHandle) return;
    
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const sliderWidth = sliderRect.width;
    
    let percentage = Math.max(0, Math.min(100, ((e.clientX - sliderRect.left) / sliderWidth) * 100));
    
    const price = Math.round(min + ((max - min) * percentage / 100));
    
    if (activeHandle === 'min') {
      const newMinPrice = Math.min(price, priceRange[1] - 10); 
      setPriceRange([newMinPrice, priceRange[1]]);
    } else {
      const newMaxPrice = Math.max(price, priceRange[0] + 10); 
      setPriceRange([priceRange[0], newMaxPrice]);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setActiveHandle(null);
      onChange(priceRange[0], priceRange[1]);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, priceRange]);

  const minHandlePosition = `${((priceRange[0] - min) / (max - min)) * 100}%`;
  const maxHandlePosition = `${((priceRange[1] - min) / (max - min)) * 100}%`;
  const rangeWidth = `${((priceRange[1] - priceRange[0]) / (max - min)) * 100}%`;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-[#5F6368] mb-3">ราคา</h3>
      <div className="relative mb-5 mt-4" ref={sliderRef}>
        <div className="h-1 bg-gray-200 rounded-full"></div>

        <div 
          className="absolute h-1 bg-[#D6A985] rounded-full top-0"
          style={{
            left: minHandlePosition,
            width: rangeWidth
          }}
        ></div>
        
        <div 
          className="absolute w-5 h-5 bg-white border-2 border-[#D6A985] rounded-full -mt-2 cursor-pointer"
          style={{ 
            left: minHandlePosition,
            top: "0px",
            zIndex: activeHandle === 'min' ? 20 : 10
          }}
          onMouseDown={(e) => handleStartDrag(e, 'min')}
        ></div>

        <div 
          className="absolute w-5 h-5 bg-white border-2 border-[#D6A985] rounded-full -mt-2 cursor-pointer"
          style={{ 
            left: maxHandlePosition,
            top: "0px",
            zIndex: activeHandle === 'max' ? 20 : 10
          }}
          onMouseDown={(e) => handleStartDrag(e, 'max')}
        ></div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[16px] text-[#D6A985]">฿{priceRange[0]}</span>
        <span className="text-[16px] text-[#D6A985]">฿{priceRange[1]}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;