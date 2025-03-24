'use client'

import React, { useState, createContext, useContext, ReactNode } from 'react';

export interface FilterOptions {
  categories: number[];
  priceRange: [number, number];
}

interface FilterContextType {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
}

interface FilterProviderProps {
  children: ReactNode;
}

const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 999],
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;