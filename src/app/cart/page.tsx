'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockOrders } from '../account/myorder/component/MockData';
import { ArrowLeft, Pencil, Plus, Minus, Check } from 'lucide-react';
import { EditCartItemModal } from './component/EditCartItemModal';

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

interface CartItemEditData {
  name: string;
  quantity: number;
  size?: string;
  color?: string;
  type?: string;
}

const CartPage = () => {
  const cartItems = mockOrders[0].items as CartItem[];
  const [quantities, setQuantities] = useState(
    cartItems.map(item => item.quantity)
  );

  const [isUsingCoins, setIsUsingCoins] = useState(false);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<CartItem | null>(null);

  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item, index) => acc + item.price * quantities[index],
      0
    );
  };

  const calculateOriginalTotal = () => {
    return cartItems.reduce(
      (acc, item, index) => acc + item.originalPrice * quantities[index],
      0
    );
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity > 0) {
      const newQuantities = [...quantities];
      newQuantities[index] = newQuantity;
      setQuantities(newQuantities);
    }
  };
  
  const handleEditItem = (item: CartItem) => {
    setCurrentEditItem(item);
    setIsEditModalOpen(true);
  };
  
  const handleSaveEdit = (updatedItemData: CartItemEditData) => {
    const newCartItems = [...cartItems];
    
    if (currentEditItem) {
      const itemIndex = cartItems.findIndex(item => item.id === currentEditItem.id);
      
      if (itemIndex !== -1) {
        newCartItems[itemIndex] = {
          ...newCartItems[itemIndex],
          quantity: updatedItemData.quantity
        };
        
        if ('size' in newCartItems[itemIndex]) {
          newCartItems[itemIndex].size = updatedItemData.size;
        }
        
        if ('color' in newCartItems[itemIndex]) {
          newCartItems[itemIndex].color = updatedItemData.color;
        }
        
        if ('type' in newCartItems[itemIndex]) {
          newCartItems[itemIndex].type = updatedItemData.type;
        }
        
        const newQuantities = [...quantities];
        newQuantities[itemIndex] = updatedItemData.quantity;
        setQuantities(newQuantities);
      }
    }
  };

  const totalDiscount = calculateOriginalTotal() - calculateTotal();

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto py-3">
        <div className="flex items-center text-gray-600 text-lg">
          <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
            <ArrowLeft size={24} color="#5F6368" />
            <span>หน้าแรก</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#B86A4B]">รถเข็นของฉัน</span>
        </div>
      </div>

      <div className="container mx-auto pb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
              <div className="flex items-center mb-1">
                <div className="w-12 h-12 relative">
                  <Image
                    src="/images/paw_icon.png"
                    alt="Paw Icon"
                    width={40}
                    height={40}
                    objectFit="contain"
                  />
                </div>
                <h2 className="text-[28px] font-bold text-[#B86A4B]">รถเข็นของฉัน</h2>
              </div>
              
              <div className="border-t border-[#D6A985] pt-4">
                <div className="text-[#B86A4B] font-medium mb-4 text-[20px]">
                  KUMA ま Note : อุ่นใจได้ พัสดุทุกกล่องไม่แสดงชื่อสินค้า 100%
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#D9D9D9]">
                        <th className="text-left py-3 text-[#5F6368] font-bold text-xl">สินค้า</th>
                        <th className="text-right py-3 text-[#5F6368] font-bold text-xl">ราคา</th>
                        <th className="text-center py-3 text-[#5F6368] font-bold text-xl">จำนวน</th>
                        <th className="text-right py-3 text-[#5F6368] font-bold text-xl">ราคารวม</th>
                      </tr>
                    </thead>
                    
                    {/* โปรโมชั่น KUMA ま ย้ายมาอยู่ตรงนี้ ใต้หัวตาราง */}
                    <tbody>
                      {/* <tr>
                        <td colSpan={4} className="py-3">
                          <div className="flex items-center">
                            <span className="bg-[#D6A985] text-white font-medium py-1.5 px-3 rounded-[20px] mr-2 text-[18px] inline-flex items-center justify-center min-w-[120px] h-[40px]">
                              โปรโมชั่น KUMA ま
                            </span>
                            <span className="text-[#D6A985] font-medium text-lg">
                              ซื้ออีก 8 รายการ (คละได้ทั้งร้าน) รับส่วนลด 15%
                            </span>
                          </div>
                        </td>
                      </tr> */}
                      
                      {cartItems.map((item, index) => (
                        <tr key={item.id} className="border-b border-[#D9D9D9]">
                          <td className="py-4">
                            <div className="flex">
                              <div className="w-[120px] h-[120px] border border-gray-200 rounded-md overflow-hidden mr-4 self-center">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-[120px] h-[120px] object-cover"
                                />
                              </div>
                              <div className="flex flex-col justify-center">
                                <div className="flex items-center">
                                  <h3 className="font-bold text-[#5F6368] text-[24px]">{item.name}</h3>
                                  <button 
                                    className="ml-2 text-[#B86A4B] flex items-center"
                                    onClick={() => handleEditItem(item)}
                                  >
                                    <Pencil size={16} className="text-[#D6A985]" />
                                  </button>
                                </div>
                                {item.size && <p className="text-[20px] text-[#A6A6A6] mt-1">ขนาด: {item.size}</p>}
                                {item.color && <p className="text-[20px] text-[#A6A6A6]">สี: {item.color}</p>}
                                {item.type && <p className="text-[20px] text-[#A6A6A6]">ประเภท: {item.type}</p>}
                              </div>
                            </div>
                          </td>
                          <td className="text-right align-middle">
                          {item.originalPrice > item.price && (
                              <div className="text-[#5F6368] line-through text-lg">฿{item.originalPrice}</div>
                            )}
                            <div className="text-[#C85353] font-medium text-xl">฿{item.price}</div>
                            
                            <div className="text-[#C85353] text-[16px] mt-1">ราคาลดแล้ว</div>
                          </td>
                          <td className="align-middle">
                            <div className="flex items-center justify-center">
                              <button
                                className="border border-[#D9D9D9] rounded-l w-10 h-10 flex items-center justify-center text-[#5F6368] hover:bg-gray-50 text-xl"
                                onClick={() => handleQuantityChange(index, quantities[index] - 1)}
                              >
                                <Minus />
                              </button>
                              <input
                                type="text"
                                className="border-t border-b border-[#D9D9D9] w-12 h-10 text-center text-[#5F6368] text-[20px]"
                                value={quantities[index]}
                                readOnly
                              />
                              <button
                                className="border border-[#D9D9D9] rounded-r w-10 h-10 flex items-center justify-center text-[#5F6368] hover:bg-gray-50 text-xl"
                                onClick={() => handleQuantityChange(index, quantities[index] + 1)}
                              >
                                <Plus />
                              </button>
                            </div>
                          </td>
                          <td className="text-right align-middle">
                            <div className="text-[#B86A4B] font-medium text-xl">฿{item.price * quantities[index]}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[405px] h-[370px]">
            <div className="bg-[#D9D9D94D] rounded-2xl p-6">
            <h2 className="text-[24px] font-bold text-[#5F6368] mb-6 border-b border-[#D9D9D9] pb-5">สรุปการสั่งซื้อ</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[20px]">
                  <span className="text-[#5F6368]">ยอดรวม</span>
                  <span className="font-medium text-[#5F6368]">฿{calculateOriginalTotal()}</span>
                </div>
                <div className="flex justify-between text-[20px]">
                  <span className="text-[#5F6368]">ส่วนลดพิเศษสำหรับ KUMA ま FRIEND</span>
                  <span className="font-medium text-[#5F6368]">- ฿{totalDiscount}</span>
                </div>
                <div className="flex justify-between text-[20px]">
                  <span className="text-[#5F6368]">ค่าจัดส่งสินค้า</span>
                  <span className="font-medium text-[#5F6368]">฿120</span>
                </div>
                <div className="flex justify-between text-[20px]">
                  <span className="text-[#5F6368]">KUMA ま Coin (50 coin)</span>
                  <div className="flex items-center">
                    <span className="font-medium text-[#5F6368]">- ฿50</span>
                    <label className="inline-flex items-center ml-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isUsingCoins}
                        onChange={() => setIsUsingCoins(!isUsingCoins)}
                      />
                      <div
                        className={`h-5 w-5 flex items-center justify-center rounded-[3px] border-2 border-[#5F6368]`}
                      >
                        {isUsingCoins && <Check size={16} color="#D6A985" strokeWidth={3} />}
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex justify-between text-[20px] ">
                  <span className='text-[#5F6368]'>คูปองส่วนลดจาก KUMA ま</span>
                  <span className="underline cursor-pointer text-[#D6A985]">กดใช้คูปอง</span>
                </div>
              </div>
              
              <div className="border-t border-[#D9D9D9] pt-4">
                <div className="flex justify-between font-bold text-[24px] mb-6">
                  <span className="text-[#5F6368]">ยอดสั่งซื้อ</span>
                  <span className="text-[#5F6368]">฿{calculateTotal() + 120 - (isUsingCoins ? 50 : 0)}</span>
                </div>
                
                <div className="flex justify-center items-center relative">
                <Link href="/confirm-order">
                  <button className="w-[365px] h-[55px] bg-[#D6A985] text-white py-4 font-medium rounded-[12px] border-4 border-white shadow-[0_0_0_2px_#D6A985] relative overflow-hidden text-[24px]">
                    <div className="flex justify-center items-center w-full h-full rounded-lg">
                      สั่งซื้อสินค้า
                    </div>
                  </button>
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <EditCartItemModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        item={currentEditItem}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default CartPage;