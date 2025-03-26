'use client'

import { useCollectionsData } from '@/hooks/useRemoteData';
import FilterSkeleton from './FilterSkeleton';

interface CollectionFilterProps {
  selectedCollections: number[];
  onChange: (collectionIds: number[]) => void;
}

const CollectionFilter: React.FC<CollectionFilterProps> = ({ selectedCollections, onChange }) => {
  const { data: collections, loading, error } = useCollectionsData();

  const handleCollectionChange = (collectionId: number) => {
    const newSelectedCollections = selectedCollections.includes(collectionId)
      ? selectedCollections.filter(id => id !== collectionId)
      : [...selectedCollections, collectionId];
    
    onChange(newSelectedCollections);
  };

  return (
    <div className="mb-6">
      <h3 className="text-[20px] font-medium text-[#5F6368] mb-3">คอลเลกชั่น</h3>
      {loading ? (
        <FilterSkeleton itemCount={5} />
      ) : error || collections.length === 0 ? (
        <div className="text-[#5F6368] text-[16px]">{error || 'ไม่มีคอลเลคชั่น'}</div>
      ) : (
        <div className="space-y-2">
          {collections.map((collection) => (
            <div key={collection.id} className="flex items-center">
              <input
                type="checkbox"
                id={`collection-${collection.id}`}
                checked={selectedCollections.includes(collection.id)}
                onChange={() => handleCollectionChange(collection.id)}
                className="h-4 w-4 text-[#D6A985] rounded border-gray-300 focus:ring-[#D6A985]"
              />
              <label htmlFor={`collection-${collection.id}`} className="ml-2 text-[16px] text-[#5F6368]">
                {collection.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionFilter;