'use client'

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PriceRangeSlider from '@/components/ui/sidebar/price-range/PriceRangeSlider';
import CategoryFilter from '@/components/ui/sidebar/filters/CategoryFilter';
import ResetFilterButton from '@/components/ui/sidebar/ResetFilterButton';

interface FlashSaleSidebarProps {
  onFilterChange?: (filters: any) => void;
}

const FlashSaleSidebar: React.FC<FlashSaleSidebarProps> = ({ onFilterChange }) => {
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
  
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    categoryParam ? categoryParam.split(',').map(id => parseInt(id)) : []
  );
  
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPriceParam ? parseInt(minPriceParam) : 0,
    maxPriceParam ? parseInt(maxPriceParam) : 999
  ]);
  
  const handleCategoryChange = (categoryIds: number[]) => {
    setSelectedCategories(categoryIds);
    
    let queryParams: Record<string, string | null> = {};
    if (categoryIds.length > 0) {
      queryParams.category = categoryIds.join(',');
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
        categories: categoryIds,
        priceRange: priceRange
      });
    }
  };
  
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    
    let queryParams: Record<string, string | null> = {};
    if (selectedCategories.length > 0) {
      queryParams.category = selectedCategories.join(',');
    } else {
      queryParams.category = null;
    }
    queryParams.minPrice = min.toString();
    queryParams.maxPrice = max.toString();
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
        priceRange: [min, max]
      });
    }
  };
  
  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange([0, 999]);
    
    const sortParam = searchParams.get('sort');
    let queryParams: Record<string, string | null> = {
      category: null,
      minPrice: '0',
      maxPrice: '999',
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
        priceRange: [0, 999]
      });
    }
  };
  
  return (
    <div className="w-full max-w-[180px]">
      <CategoryFilter 
        selectedCategories={selectedCategories} 
        onChange={handleCategoryChange} 
      />
      
      <PriceRangeSlider 
        initialMin={priceRange[0]} 
        initialMax={priceRange[1]} 
        onChange={handlePriceChange} 
      />
      
      <ResetFilterButton onClick={handleReset} />
    </div>
  );
};

export default FlashSaleSidebar;