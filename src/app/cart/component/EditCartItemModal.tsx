'use client';

import React, { useState, useEffect } from 'react';
import { X, Minus, Plus } from 'lucide-react';

interface CartItem {
  id: number | string;
  name: string;
  quantity: number;
  price: number;
  originalPrice: number;
  image: string;
  size?: string;
  color?: string;
  type?: string;
}

interface EditCartItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CartItem | null;
  onSave: (data: CartItemEditData) => void;
}

interface CartItemEditData {
  name: string;
  quantity: number;
  size: string;
  color: string;
  type: string;
}

export const EditCartItemModal: React.FC<EditCartItemModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
}) => {

  const [itemData, setItemData] = useState<CartItemEditData>({
    name: '',
    quantity: 1,
    size: 'M',
    color: '',
    type: '(แบบคอน 1) น้ำเงิน-ครีม'
  });
  
  useEffect(() => {
    if (item) {
      console.log('รับข้อมูล item:', item);
      setItemData({
        name: item.name || '',
        quantity: item.quantity || 1,
        size: item.size || 'M',
        color: item.color || '',
        type: item.type || '(แบบคอน 1) น้ำเงิน-ครีม' 
      });
    }
  }, [item, isOpen]);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = itemData.quantity + amount;
    if (newQuantity > 0) {
      setItemData({...itemData, quantity: newQuantity});
    }
  };

  const handleSizeChange = (newSize: string) => {
    setItemData({...itemData, size: newSize});
  };

  const handleTypeChange = (newType: string) => {
    setItemData({...itemData, type: newType});
  };

  const handleColorChange = (newColor: string) => {
    setItemData({...itemData, color: newColor});
  };

  const handleSave = () => {
    onSave(itemData);
    onClose();
  };
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-[1085px] h-[620px] rounded-[20px] overflow-hidden flex p-8">
        <div className="w-[400px] flex flex-col">
          <div className="mb-4">
            <div className="w-[400px] h-[400px] mx-auto">
              <img
                src={item?.image || "/images/default-product.png"}
                alt={item?.name || "สินค้า"}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-[130px] h-[130px] mr-2">
              <img
                src={item?.image || "/images/default-product.png"}
                alt="thumbnail"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mx-4"></div>

        <div className="flex-1 relative flex flex-col justify-between">
          <div>
            <button 
              onClick={onClose}
              className="absolute top-0 right-0 text-[#5F6368] hover:text-gray-700"
            >
              <X size={28} />
            </button>
            
            <div>
              <h2 className="text-[34px] font-bold text-[#5F6368] mb-1">KUMA ま คอกสุนัขพับได้ XL ใหญ่พิเศษ</h2>
              <p className="text-[18px] text-[#5F6368] mb-4">คอกสุนัข คอกสัตว์เลี้ยง มีซิปรูดเปิด-ปิดได้ เต็นท์8เหลี่ยม ที่นอนสุนัข...</p>
              
              <div className="flex items-center mb-8">
                <span className="text-[#5F6368] line-through text-[24px] mr-2">฿749</span>
                <span className="text-[#B86A4B] text-[28px] font-bold mr-2">฿720</span>
                <span className="w-[130px] h-[25px] bg-[#D6A985] text-white px-3 rounded-md text-[16px] text-center">KUMAま FRIEND</span>
              </div>
              
              <div className="pl-4">
                <div className="mb-6">
                  <div className="grid grid-cols-[90px_1fr]">
                    <span className="text-[20px] font-medium text-[#5F6368]">ขนาด</span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: 'M : 74*74*45 CM', value: 'M' },
                        { label: 'L : 93*93*59 CM', value: 'L' },
                        { label: 'XL : 105*115*56 CM', value: 'XL' }
                      ].map((size) => {
                        
                        return (
                          <button
                            key={size.value}
                            onClick={() => handleSizeChange(size.value)}
                            className={`px-4 py-2 rounded-md border ${
                              itemData.size === size.value
                                ? 'bg-[#D6A985] text-white border-[#D6A985]'
                                : 'border-gray-300 text-[#5F6368]'
                            }`}
                          >
                            {size.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="grid grid-cols-[90px_1fr]">
                    <span className="text-[20px] font-medium text-[#5F6368]">ประเภท</span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: '(แบบคอน 1) น้ำเงิน-ครีม', value: '(แบบคอน 1) น้ำเงิน-ครีม' },
                        { label: '(8 เหลี่ยม) น้ำตาลขาว', value: '(8 เหลี่ยม) น้ำตาลขาว' },
                        { label: '(A+) เหลืองมีลาตาล', value: '(A+) เหลืองมีลาตาล' },
                        { label: '(4 เหลี่ยม) เทาเนื้อบอล', value: '(4 เหลี่ยม) เทาเนื้อบอล' }
                      ].map((type) => (
                        <button
                          key={type.value}
                          onClick={() => handleTypeChange(type.value)}
                          className={`px-4 py-2 rounded-md border ${
                            itemData.type === type.value
                              ? 'bg-[#D6A985] text-white border-[#D6A985]'
                              : 'border-gray-300 text-[#5F6368]'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="grid grid-cols-[90px_1fr]">
                    <span className="text-[20px] font-medium text-[#5F6368]">จำนวน</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="border border-gray-300 rounded-l-md w-10 h-10 flex items-center justify-center"
                      >
                        <Minus size={20} />
                      </button>
                      <input
                        type="text"
                        value={itemData.quantity}
                        readOnly
                        className="border-t border-b border-gray-300 w-14 h-10 text-center"
                      />
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="border border-gray-300 rounded-r-md w-10 h-10 flex items-center justify-center"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSave}
              className="bg-[#D6A985] text-white font-medium py-3 rounded-[8px] border-4 border-white shadow-[0_0_0_2px_#D6A985] w-[210px] h-[60px] text-[22px]"
            >
              บันทึกการแก้ไข
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};