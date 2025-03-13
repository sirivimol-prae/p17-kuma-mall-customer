'use client'

import React, { useState, ReactNode } from 'react';
import { FilterContext, FilterOptions } from './Sidebar';

interface FilterProviderProps {
  children: ReactNode;
}

const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [824, 8350],
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;