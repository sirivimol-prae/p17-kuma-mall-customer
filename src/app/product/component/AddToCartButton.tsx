'use client'

import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  productId: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const handleAddToCart = () => {
    console.log(`เพิ่มสินค้า ID: ${productId} ลงตะกร้าแล้ว`);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="relative flex justify-center items-center bg-[#D6A985] text-white border-4 border-white shadow-[0_0_0_2px_#D6A985] rounded-[12px]"
      style={{ width: "70px", height: "40px", marginBottom: "0px" }}
    >
      <div className="flex justify-center items-center w-full h-full bg-[#cfa580] rounded-lg">
        <ShoppingCart size={18} className="text-white" />
      </div>
    </button>
  );
};

export default AddToCartButton;