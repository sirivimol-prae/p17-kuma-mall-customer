'use client'

import { useState, useEffect } from 'react';

interface DataItem {
  id: number;
  name: string;
  [key: string]: string | number | boolean | null | undefined;
}

interface FetchState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook สำหรับดึงข้อมูลจาก API และแคชไว้
 * ใช้งานร่วมกันได้ทั้ง category และ collection
 */
export function useRemoteData<T extends DataItem>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: [],
    loading: true,
    error: null
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
          setState({
            data: data.data,
            loading: false,
            error: null
          });
        } else {
          setState({
            data: [],
            loading: false,
            error: data.error || `ไม่สามารถโหลดข้อมูลจาก ${url} ได้`
          });
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        setState({
          data: [],
          loading: false,
          error: error instanceof Error ? error.message : `เกิดข้อผิดพลาดในการโหลดข้อมูลจาก ${url}`
        });
      }
    };

    fetchData();
  }, [url]);

  return state;
}

export function useCategoriesData() {
  return useRemoteData('/api/categories');
}

export function useCollectionsData() {
  return useRemoteData('/api/collections');
}