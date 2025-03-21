'use client'

import React, { useState, useRef, useEffect, createContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Category {
  id: number;
  name: string;
  uuid: string;
}

export interface FilterOptions {
  categories: number[];
  priceRange: [number, number];
}

export const FilterContext = createContext<{
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
}>({
  filters: { categories: [], priceRange: [0, 9999] },
  setFilters: () => {},
});

interface SidebarProps {
  onFilterChange?: (filters: FilterOptions) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPriceParam ? parseInt(minPriceParam) : 0,
    maxPriceParam ? parseInt(maxPriceParam) : 9999
  ]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    categoryParam ? categoryParam.split(',').map(id => parseInt(id)) : []
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeHandle, setActiveHandle] = useState<'min' | 'max' | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const minPrice = 0;
  const maxPrice = 9999; 
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch('/api/categories');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
          setCategories(data.data);
        } else {
          setError(true);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(true);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories(prev => {
      let newCategories;
      if (prev.includes(categoryId)) {
        newCategories = prev.filter(id => id !== categoryId);
      } else {
        newCategories = [...prev, categoryId];
      }

      updateUrlWithFilters(newCategories, priceRange);

      if (onFilterChange) {
        onFilterChange({
          categories: newCategories,
          priceRange: priceRange
        });
      }
      
      return newCategories;
    });
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
    } else {
      const newMaxPrice = Math.max(price, priceRange[0] + 10); 
      setPriceRange([priceRange[0], newMaxPrice]);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveHandle(null);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      updateUrlWithFilters(selectedCategories, priceRange);

      if (onFilterChange) {
        onFilterChange({
          categories: selectedCategories,
          priceRange: priceRange
        });
      }
    }, 500);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isDragging, priceRange, selectedCategories]);

  const updateUrlWithFilters = (categories: number[], prices: [number, number]) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', '1');

    if (categories.length > 0) {
      params.set('category', categories.join(','));
    } else {
      params.delete('category');
    }

    params.set('minPrice', prices[0].toString());
    params.set('maxPrice', prices[1].toString());

    const sortBy = searchParams.get('sort');
    if (sortBy) {
      params.set('sort', sortBy);
    }

    router.push(`/flashsale?${params.toString()}`);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);

    const params = new URLSearchParams();
    params.set('page', '1');

    const sortBy = searchParams.get('sort');
    if (sortBy) {
      params.set('sort', sortBy);
    }

    router.push(`/flashsale?${params.toString()}`);

    if (onFilterChange) {
      onFilterChange({
        categories: [],
        priceRange: [minPrice, maxPrice]
      });
    }
  };

  const minHandlePosition = `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`;
  const maxHandlePosition = `${((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`;
  const rangeWidth = `${((priceRange[1] - priceRange[0]) / (maxPrice - minPrice)) * 100}%`;

  return (
    <div className="w-full max-w-[180px]">
      <div className="mb-6">
        <h3 className="text-[20px] font-medium text-[#5F6368] mb-3">หมวดหมู่สินค้า</h3>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded ml-2"></div>
              </div>
            ))}
          </div>
        ) : error || categories.length === 0 ? (
          <div className="text-[#5F6368] text-[16px]">ไม่มีหมวดหมู่</div>
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
                <label htmlFor={`category-${category.id}`} className="ml-2 text-[16px] text-[#5F6368]">
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        )}
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