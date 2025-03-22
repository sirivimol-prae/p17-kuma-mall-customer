'use client'

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Category {
  id: number;
  name: string;
  uuid: string;
}

export interface FilterOptions {
  categories: number[];
  priceRange: [number, number];
}

interface SidebarProps {
  onFilterChange?: (filters: FilterOptions) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = (params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });
    
    return newSearchParams.toString();
  };
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeHandle, setActiveHandle] = useState<'min' | 'max' | null>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const minPrice = 0;
  const maxPrice = 9999;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categories');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
          setCategories(data.data);
        } else {
          setError(data.error || 'ไม่สามารถโหลดหมวดหมู่ได้');
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการโหลดหมวดหมู่');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const applyFilters = () => {
    let queryParams: Record<string, string | null> = {};

    if (selectedCategories.length > 0) {
      queryParams.category = selectedCategories.join(',');
    } else {
      queryParams.category = null;
    }
    
    queryParams.minPrice = priceRange[0].toString();
    queryParams.maxPrice = priceRange[1].toString();

    queryParams.page = '1';
    
    const sortParam = searchParams.get('sort');
    if (sortParam) {
      queryParams.sort = sortParam;
    }

    const queryString = createQueryString(queryParams);
    router.push(`${pathname}?${queryString}`);

    if (onFilterChange) {
      onFilterChange({
        categories: selectedCategories,
        priceRange: priceRange
      });
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId];

      setTimeout(() => {
        const newSelectedCategories = prev.includes(categoryId)
          ? prev.filter(id => id !== categoryId)
          : [...prev, categoryId];
          
        let queryParams: Record<string, string | null> = {};
        if (newSelectedCategories.length > 0) {
          queryParams.category = newSelectedCategories.join(',');
        } else {
          queryParams.category = null;
        }
        queryParams.minPrice = priceRange[0].toString();
        queryParams.maxPrice = priceRange[1].toString();
        queryParams.page = '1';
        
        const sortParam = searchParams.get('sort');
        if (sortParam) {
          queryParams.sort = sortParam;
        }
        
        const queryString = createQueryString(queryParams);
        router.push(`${pathname}?${queryString}`);
        
        if (onFilterChange) {
          onFilterChange({
            categories: newSelectedCategories,
            priceRange: priceRange
          });
        }
      }, 0);
      
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
    if (isDragging) {
      setIsDragging(false);
      setActiveHandle(null);
      
      setTimeout(() => {
        applyFilters();
      }, 100);
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

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);

    setTimeout(() => {
      const sortParam = searchParams.get('sort');
      const queryParams: Record<string, string | null> = {
        category: null,
        minPrice: minPrice.toString(),
        maxPrice: maxPrice.toString(),
        page: '1'
      };
      
      if (sortParam) {
        queryParams.sort = sortParam;
      }
      
      const queryString = createQueryString(queryParams);
      router.push(`${pathname}?${queryString}`);
      
      if (onFilterChange) {
        onFilterChange({
          categories: [],
          priceRange: [minPrice, maxPrice]
        });
      }
    }, 0);
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
          <div className="text-[#5F6368] text-[16px]">{error || 'ไม่มีหมวดหมู่'}</div>
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