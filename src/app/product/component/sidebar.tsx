'use client'

import React, { useState, useRef, useEffect } from 'react';

interface Category {
  id: string;
  label: string;
}

interface FilterValues {
  categories: string[];
  priceRange: [number, number];
}

interface SidebarProps {
  onFilterChange?: (filters: FilterValues) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([160, 780]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeHandle, setActiveHandle] = useState<'min' | 'max' | null>(null);
  
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const categories: Category[] = [
    { id: 'dog', label: 'คอกสุนัข' },
    { id: 'cat', label: 'แปลแมว' },
    { id: 'pet', label: 'ที่นอน' },
  ];

  const serviceCategories: Category[] = [
    { id: 'new', label: 'สินค้าเข้าใหม่' },
    { id: 'sale', label: 'Flash Sale!' },
    { id: 'discount', label: 'สินค้าลดราคา' },
    { id: 'bundle', label: 'กล่องสุ่ม/Box Set' },
    { id: 'set', label: 'เซ็ตสินค้า' },
  ];

  const minPrice = 160;
  const maxPrice = 780; 

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
    
    if (onFilterChange) {
      const newCategories = selectedCategories.includes(categoryId) 
        ? selectedCategories.filter(id => id !== categoryId)
        : [...selectedCategories, categoryId];
        
      onFilterChange({
        categories: newCategories,
        priceRange: priceRange
      });
    }
  };

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
    
    const price = Math.round(minPrice + ((maxPrice - minPrice) * percentage / 100));
    
    if (activeHandle === 'min') {
      const newMinPrice = Math.min(price, priceRange[1] - 10); 
      setPriceRange([newMinPrice, priceRange[1]]);
      
      if (onFilterChange) {
        onFilterChange({
          categories: selectedCategories,
          priceRange: [newMinPrice, priceRange[1]]
        });
      }
    } else {
      const newMaxPrice = Math.max(price, priceRange[0] + 10); 
      setPriceRange([priceRange[0], newMaxPrice]);
      
      if (onFilterChange) {
        onFilterChange({
          categories: selectedCategories,
          priceRange: [priceRange[0], newMaxPrice]
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveHandle(null);
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

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange([160, 780]);
    
    if (onFilterChange) {
      onFilterChange({
        categories: [],
        priceRange: [160, 780]
      });
    }
  };

  const minHandlePosition = `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`;
  const maxHandlePosition = `${((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`;
  const rangeWidth = `${((priceRange[1] - priceRange[0]) / (maxPrice - minPrice)) * 100}%`;

  return (
    <div className="w-full max-w-[180px]">
      <div className="mb-6">
        <h3 className="text-[20px] font-medium text-[#5F6368] mb-3">สินค้าทั้งหมด</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="checkbox"
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="h-4 w-4 text-[#D6A985] rounded border-gray-300 focus:ring-[#D6A985]"
              />
              <label htmlFor={category.id} className="ml-2 text-[16px] text-[#5F6368]">
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

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

      <div className="mb-6">
        <h3 className="text-[20px] font-medium text-[#5F6368] mb-3">บริการและโปรโมชั่น</h3>
        <div className="space-y-2">
          {serviceCategories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="checkbox"
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="h-4 w-4 text-[#D6A985] rounded border-gray-300 focus:ring-[#D6A985]"
              />
              <label htmlFor={category.id} className="ml-2 text-[16px] text-[#5F6368]">
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 flex justify-center">
        <button
          onClick={handleReset}
          className="text-[#D6A985] hover:opacity-80 transition-all duration-200 relative text-[18px]"
        >
          <span>ลบตัวกรองทั้งหมด</span>
          <div className="absolute bottom-0 left-0 w-full border-b border-[#D6A985]"></div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;