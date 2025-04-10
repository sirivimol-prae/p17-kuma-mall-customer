'use client'

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CategoryFilter from './filters/CategoryFilter';
import CollectionFilter from './filters/CollectionFilter';
import ServiceFilter from './filters/ServiceFilter';
import PriceRangeSlider from './price-range/PriceRangeSlider';
import ResetFilterButton from './ResetFilterButton';

export interface FilterOptions {
  categories?: number[];
  collections?: number[];
  services?: string[];
  priceRange: [number, number];
}

interface UnifiedSidebarProps {
  type: 'product' | 'flashsale' | 'all';
  onFilterChange?: (filters: FilterOptions) => void;
  showCategories?: boolean;
  showCollections?: boolean;
  showServices?: boolean;
  showPriceRange?: boolean;
}

/**
 * รวม sidebar สำหรับการกรองข้อมูลทั้งหน้า product และ flashsale
 * ใช้ type เพื่อกำหนดว่ากำลังใช้กับหน้าไหน และแสดงฟิลเตอร์ตามความเหมาะสม
 */
const UnifiedSidebar: React.FC<UnifiedSidebarProps> = ({ 
  type,
  onFilterChange,
  showCategories = true,
  showCollections = type === 'product',
  showServices = type === 'product',
  showPriceRange = true
}) => {
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
  const collectionParam = searchParams.get('collection');
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    categoryParam ? categoryParam.split(',').map(id => parseInt(id)) : []
  );
  
  const [selectedCollections, setSelectedCollections] = useState<number[]>(
    collectionParam ? collectionParam.split(',').map(id => parseInt(id)) : []
  );
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPriceParam ? parseInt(minPriceParam) : 0,
    maxPriceParam ? parseInt(maxPriceParam) : 999
  ]);

  const handleCategoryChange = (categoryIds: number[]) => {
    setSelectedCategories(categoryIds);
    
    const queryParams: Record<string, string | null> = {};
    if (categoryIds.length > 0) {
      queryParams.category = categoryIds.join(',');
    } else {
      queryParams.category = null;
    }
    
    if (type === 'product' && selectedCollections.length > 0) {
      queryParams.collection = selectedCollections.join(',');
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
        collections: selectedCollections,
        services: selectedServices,
        priceRange: priceRange
      });
    }
  };

  const handleCollectionChange = (collectionIds: number[]) => {
    setSelectedCollections(collectionIds);
    
    const queryParams: Record<string, string | null> = {};
    if (type === 'flashsale' && selectedCategories.length > 0) {
      queryParams.category = selectedCategories.join(',');
    }
    
    if (collectionIds.length > 0) {
      queryParams.collection = collectionIds.join(',');
    } else {
      queryParams.collection = null;
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
        collections: collectionIds,
        services: selectedServices,
        priceRange: priceRange
      });
    }
  };

  const handleServiceChange = (serviceIds: string[]) => {
    setSelectedServices(serviceIds);
 
    if (onFilterChange) {
      onFilterChange({
        categories: selectedCategories,
        collections: selectedCollections,
        services: serviceIds,
        priceRange: priceRange
      });
    }
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    
    const queryParams: Record<string, string | null> = {};
    
    if (type === 'flashsale' && selectedCategories.length > 0) {
      queryParams.category = selectedCategories.join(',');
    }
    
    if (type === 'product' && selectedCollections.length > 0) {
      queryParams.collection = selectedCollections.join(',');
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
        collections: selectedCollections,
        services: selectedServices,
        priceRange: [min, max]
      });
    }
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedCollections([]);
    setSelectedServices([]);
    setPriceRange([0, 999]);
    
    const sortParam = searchParams.get('sort');
    const queryParams: Record<string, string | null> = {
      category: null,
      collection: null,
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
        collections: [],
        services: [],
        priceRange: [0, 999]
      });
    }
  };
  
  return (
    <div className="w-full max-w-[180px]">
      {showCategories && (
        <CategoryFilter 
          selectedCategories={selectedCategories} 
          onChange={handleCategoryChange} 
        />
      )}
      
      {showPriceRange && (
        <PriceRangeSlider 
          initialMin={priceRange[0]} 
          initialMax={priceRange[1]} 
          onChange={handlePriceChange} 
        />
      )}
      
      {showCollections && (
        <CollectionFilter 
          selectedCollections={selectedCollections} 
          onChange={handleCollectionChange} 
        />
      )}
      
      {showServices && (
        <ServiceFilter 
          selectedServices={selectedServices} 
          onChange={handleServiceChange} 
        />
      )}
      
      <ResetFilterButton onClick={handleReset} />
    </div>
  );
};

export default UnifiedSidebar;