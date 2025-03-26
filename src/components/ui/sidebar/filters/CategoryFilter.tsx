'use client'

import { useCategoriesData } from '@/hooks/useRemoteData';
import FilterSkeleton from './FilterSkeleton';

interface CategoryFilterProps {
  selectedCategories: number[];
  onChange: (categoryIds: number[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategories, onChange }) => {
  const { data: categories, loading, error } = useCategoriesData();

  const handleCategoryChange = (categoryId: number) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    onChange(newSelectedCategories);
  };

  return (
    <div className="mb-6">
      <h3 className="text-[20px] font-medium text-[#5F6368] mb-3">หมวดหมู่สินค้า</h3>
      {loading ? (
        <FilterSkeleton itemCount={5} />
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
  );
};

export default CategoryFilter;