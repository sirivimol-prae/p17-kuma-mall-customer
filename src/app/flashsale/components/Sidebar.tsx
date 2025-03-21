'use client'

import React, { useState, useEffect, useContext, createContext } from 'react';
import { Category } from '@/types/product';
import { getCategories } from '@/utils/api';

export interface FilterOptions {
  categories: number[];
  priceRange: [number, number];
}

export const FilterContext = createContext<{
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
}>({
  filters: { categories: [], priceRange: [824, 8350] },
  setFilters: () => {},
});

interface SidebarProps {
  onFilterChange?: (filters: FilterOptions) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange }) => {
  const { filters, setFilters } = useContext(FilterContext);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([824, 8350]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await getCategories();
        
        if (response.success) {
          setCategories(response.data);
        } else {
          console.error('Failed to fetch categories:', response.error);
          setCategories([
            { id: 1, uuid: '', name: 'บ้านและที่นอน', create_Date: '' },
            { id: 2, uuid: '', name: 'อาหารสัตว์เลี้ยง', create_Date: '' },
            { id: 3, uuid: '', name: 'สายจูง ปลอกคอ และเสื้อผ้า', create_Date: '' },
            { id: 4, uuid: '', name: 'ชามอาหารและน้ำ', create_Date: '' },
            { id: 5, uuid: '', name: 'ของเล่นสัตว์เลี้ยง', create_Date: '' },
            { id: 6, uuid: '', name: 'กรงแมวและอุปกรณ์', create_Date: '' },
            { id: 7, uuid: '', name: 'กระบะสัตว์เลี้ยง', create_Date: '' },
            { id: 8, uuid: '', name: 'อุปกรณ์ดูแลขน', create_Date: '' },
            { id: 9, uuid: '', name: 'อุปกรณ์ทำความสะอาด', create_Date: '' },
            { id: 10, uuid: '', name: 'โถและห้องน้ำสัตว์', create_Date: '' },
          ]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([
          { id: 1, uuid: '', name: 'บ้านและที่นอน', create_Date: '' },
          { id: 2, uuid: '', name: 'อาหารสัตว์เลี้ยง', create_Date: '' },
          { id: 3, uuid: '', name: 'สายจูง ปลอกคอ และเสื้อผ้า', create_Date: '' },
          { id: 4, uuid: '', name: 'ชามอาหารและน้ำ', create_Date: '' },
          { id: 5, uuid: '', name: 'ของเล่นสัตว์เลี้ยง', create_Date: '' },
          { id: 6, uuid: '', name: 'กรงแมวและอุปกรณ์', create_Date: '' },
          { id: 7, uuid: '', name: 'กระบะสัตว์เลี้ยง', create_Date: '' },
          { id: 8, uuid: '', name: 'อุปกรณ์ดูแลขน', create_Date: '' },
          { id: 9, uuid: '', name: 'อุปกรณ์ทำความสะอาด', create_Date: '' },
          { id: 10, uuid: '', name: 'โถและห้องน้ำสัตว์', create_Date: '' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId];
      setFilters({
        ...filters,
        categories: newCategories
      });
      
      return newCategories;
    });
  };

  const handlePriceChange = (value: number, isMax = false) => {
    const newRange: [number, number] = isMax 
      ? [priceRange[0], value]
      : [value, priceRange[1]];
      
    setPriceRange(newRange);

    setFilters({
      ...filters,
      priceRange: newRange
    });
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange([824, 8350]);

    setFilters({
      categories: [],
      priceRange: [824, 8350]
    });
  };

  return (
    <div className="w-full max-w-[180px]">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">หมวดหมู่สินค้า</h3>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <div key={idx} className="flex items-center">
                <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="h-4 w-4 text-[#D6A985] rounded border-gray-300 focus:ring-[#D6A985]"
                />
                <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ราคา - ตามรูปแบบต้นฉบับ */}
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