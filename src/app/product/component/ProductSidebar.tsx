'use client'

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PriceRangeSlider from '@/components/ui/sidebar/price-range/PriceRangeSlider';
import CollectionFilter from '@/components/ui/sidebar/filters/CollectionFilter';
import ServiceFilter from '@/components/ui/sidebar/filters/ServiceFilter';
import ResetFilterButton from '@/components/ui/sidebar/ResetFilterButton';

interface ProductSidebarProps {
  onFilterChange?: (filters: any) => void;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({ onFilterChange }) => {
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
  
  const collectionParam = searchParams.get('collection');
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  
  const [selectedCollections, setSelectedCollections] = useState<number[]>(
    collectionParam ? collectionParam.split(',').map(id => parseInt(id)) : []
  );
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPriceParam ? parseInt(minPriceParam) : 0,
    maxPriceParam ? parseInt(maxPriceParam) : 999
  ]);
  
  const handleCollectionChange = (collectionIds: number[]) => {
    setSelectedCollections(collectionIds);
    
    let queryParams: Record<string, string | null> = {};
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
        collections: collectionIds,
        priceRange: priceRange,
        services: selectedServices
      });
    }
  };
  
  const handleServiceChange = (serviceIds: string[]) => {
    setSelectedServices(serviceIds);
 
    if (onFilterChange) {
      onFilterChange({
        collections: selectedCollections,
        priceRange: priceRange,
        services: serviceIds
      });
    }
  };
  
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    
    let queryParams: Record<string, string | null> = {};
    if (selectedCollections.length > 0) {
      queryParams.collection = selectedCollections.join(',');
    } else {
      queryParams.collection = null;
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
        collections: selectedCollections,
        priceRange: [min, max],
        services: selectedServices
      });
    }
  };
  
  const handleReset = () => {
    setSelectedCollections([]);
    setSelectedServices([]);
    setPriceRange([0, 999]);
    
    const sortParam = searchParams.get('sort');
    let queryParams: Record<string, string | null> = {
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
        collections: [],
        priceRange: [0, 999],
        services: []
      });
    }
  };
  
  return (
    <div className="w-full max-w-[180px]">
      <CollectionFilter 
        selectedCollections={selectedCollections} 
        onChange={handleCollectionChange} 
      />
      
      <PriceRangeSlider 
        initialMin={priceRange[0]} 
        initialMax={priceRange[1]} 
        onChange={handlePriceChange} 
      />
      
      <ServiceFilter 
        selectedServices={selectedServices} 
        onChange={handleServiceChange} 
      />
      
      <ResetFilterButton onClick={handleReset} />
    </div>
  );
};

export default ProductSidebar;