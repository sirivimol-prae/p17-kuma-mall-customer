'use client'

import React, { useState } from 'react';

const Sidebar = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([824, 8350]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const categories = [
    { id: 'home', label: 'บ้านและที่นอน' },
    { id: 'petFood', label: 'อาหารสัตว์เลี้ยง' },
    { id: 'toys', label: 'สายจูง ปลอกคอ และเสื้อผ้า' },
    { id: 'bowls', label: 'ชามอาหารและน้ำ' },
    { id: 'snacks', label: 'ของเล่นสัตว์เลี้ยง' },
    { id: 'grooming', label: 'กรงแมวและอุปกรณ์' },
    { id: 'litter', label: 'กระบะสัตว์เลี้ยง' },
    { id: 'transport', label: 'อุปกรณ์ดูแลขน' },
    { id: 'cleaning', label: 'อุปกรณ์ทำความสะอาด' },
    { id: 'health', label: 'โถและห้องน้ำสัตว์' },
  ];

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
    
    if (onFilterChange) {
      onFilterChange({
        categories: selectedCategories,
        priceRange: priceRange
      });
    }
  };

  const handlePriceChange = (value, isMax = false) => {
    if (isMax) {
      setPriceRange([priceRange[0], Number(value)]);
    } else {
      setPriceRange([Number(value), priceRange[1]]);
    }
    
    if (onFilterChange) {
      onFilterChange({
        categories: selectedCategories,
        priceRange: isMax ? [priceRange[0], Number(value)] : [Number(value), priceRange[1]]
      });
    }
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange([824, 8350]);
    
    if (onFilterChange) {
      onFilterChange({
        categories: [],
        priceRange: [824, 8350]
      });
    }
  };

  return (
    <div className="w-full max-w-[180px]">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">หมวดหมู่สินค้า</h3>
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
              <label htmlFor={category.id} className="ml-2 text-sm text-gray-700">
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* ราคา */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">ราคา</h3>
        <div className="relative mb-5 mt-4">
          <div className="h-1 bg-gray-200 rounded-full">
            <div
              className="absolute h-1 bg-[#D6A985] rounded-full"
              style={{
                left: `${((priceRange[0] - 824) / (8350 - 824)) * 100}%`,
                right: `${100 - ((priceRange[1] - 824) / (8350 - 824)) * 100}%`,
              }}
            ></div>
          </div>
          <div className="absolute w-5 h-5 bg-white border-2 border-[#D6A985] rounded-full -mt-2"
               style={{ left: `${((priceRange[0] - 824) / (8350 - 824)) * 100}%` }}></div>
          <div className="absolute w-5 h-5 bg-white border-2 border-[#D6A985] rounded-full -mt-2"
               style={{ left: `${((priceRange[1] - 824) / (8350 - 824)) * 100}%` }}></div>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-[#D6A985]">{priceRange[0]}</span>
          <span className="text-sm text-[#D6A985]">{priceRange[1]}</span>
        </div>
      </div>

      {/* ปุ่มลบตัวกรองทั้งหมด */}
      <button
        onClick={handleReset}
        className="w-full py-2 px-4 text-[#D6A985] hover:bg-opacity-30 transition-all duration-200"
      >
        ลบตัวกรองทั้งหมด
      </button>
    </div>
  );
};

export default Sidebar;