'use client'

import React, { useState, useEffect } from 'react';

interface Collection {
  id: number;
  name: string;
  uuid: string;
}

interface CollectionFilterProps {
  selectedCollections: number[];
  onChange: (collectionIds: number[]) => void;
}

const CollectionFilter: React.FC<CollectionFilterProps> = ({ selectedCollections, onChange }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/collections');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
          setCollections(data.data);
        } else {
          setError(data.error || 'ไม่สามารถโหลดคอลเลคชั่นได้');
          setCollections([]);
        }
      } catch (error) {
        console.error('Error fetching collections:', error);
        setError(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการโหลดคอลเลคชั่น');
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

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
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded ml-2"></div>
            </div>
          ))}
        </div>
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