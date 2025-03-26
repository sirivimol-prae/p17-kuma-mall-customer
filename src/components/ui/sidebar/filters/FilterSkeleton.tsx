import React from 'react';

interface FilterSkeletonProps {
  itemCount?: number;
}

/**
 * Skeleton loader สำหรับแสดงขณะรอโหลดข้อมูลตัวกรอง
 */
const FilterSkeleton: React.FC<FilterSkeletonProps> = ({ itemCount = 5 }) => {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} className="flex items-center">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded ml-2"></div>
        </div>
      ))}
    </div>
  );
};

export default FilterSkeleton;