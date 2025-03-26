'use client'

import React, { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  uuid: string;
}

interface CategoryFilterProps {
  selectedCategories: number[];
  onChange: (categoryIds: number[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategories, onChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  );
};

export default CategoryFilter;