'use client'

import React from 'react';

interface ServiceOption {
  id: string;
  label: string;
}

interface ServiceFilterProps {
  selectedServices: string[];
  onChange: (serviceIds: string[]) => void;
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({ selectedServices, onChange }) => {
  const serviceCategories: ServiceOption[] = [
    { id: 'new', label: 'สินค้าเข้าใหม่' },
    { id: 'sale', label: 'Flash Sale!' },
    { id: 'discount', label: 'สินค้าลดราคา' },
    { id: 'bundle', label: 'กล่องสุ่ม/Box Set' },
    { id: 'set', label: 'เซ็ตสินค้า' },
  ];

  const handleServiceChange = (serviceId: string) => {
    const newSelectedServices = selectedServices.includes(serviceId)
      ? selectedServices.filter(id => id !== serviceId)
      : [...selectedServices, serviceId];
    
    onChange(newSelectedServices);
  };

  return (
    <div className="mb-6">
      <h3 className="text-[20px] font-medium text-[#5F6368] mb-3">บริการและโปรโมชั่น</h3>
      <div className="space-y-2">
        {serviceCategories.map((service) => (
          <div key={service.id} className="flex items-center">
            <input
              type="checkbox"
              id={service.id}
              checked={selectedServices.includes(service.id)}
              onChange={() => handleServiceChange(service.id)}
              className="h-4 w-4 text-[#D6A985] rounded border-gray-300 focus:ring-[#D6A985]"
            />
            <label htmlFor={service.id} className="ml-2 text-[16px] text-[#5F6368]">
              {service.label}
            </label>
          </div>
        ))}
      </div>
      </div>
  );
};

export default ServiceFilter;