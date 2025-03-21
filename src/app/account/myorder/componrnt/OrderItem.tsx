import React from 'react';

interface OrderItemProps {
  order: {
    id: string;
    items: Array<{
      id: number;
      name: string;
      image: string;
      size?: string;
      color?: string;
      type?: string;
      quantity: number;
      originalPrice: number;
      price: number;
    }>;
    totalPrice: number;
    status: string;
  };
  onViewTracking: (orderId: string) => void;
  isClickable?: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onViewTracking, isClickable = true }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="text-[#5F6368] text-[16px]">คำสั่งซื้อ : {order.id}</div>
        <div className="flex items-center gap-[10px]">
          <img src="/images/shipping.png" alt="Delivery" className="w-[34px] h-[34px]" />
          <span className="text-[#5F6368] text-[16px]">พัสดุออกจากศูนย์คัดแยกสินค้า | </span>
          <span className="text-[#D6A985] text-[16px]">สถานะสินค้า : {order.status}</span>
        </div>
      </div>

      {order.items.map((item) => (
        <div 
          key={item.id} 
          className={`flex items-center border-y border-gray-200 p-4 mb-2 h-[170px] ${isClickable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
          onClick={isClickable ? () => onViewTracking(order.id) : undefined}
        >
          <div className="flex items-center w-[140px] h-[140px] mr-4">
            <img src={item.image} alt={item.name} className="object-contain" />
          </div>
          <div className="flex-1">
            <div className="text-[#5F6368] font-bold text-[18px]">{item.name}</div>
            {item.size && <div className="text-[16px] text-[#A6A6A6]">ขนาด : {item.size}</div>}
            {item.color && <div className="text-[16px] text-[#A6A6A6]">ประเภท : {item.color}</div>}
            {item.type && <div className="text-[16px] text-[#A6A6A6]">สูตร : {item.type}</div>}
            <div className="text-[16px] text-[#A6A6A6]">จำนวน : {item.quantity} ชิ้น</div>
          </div>
          <div className="text-right">
            <div className="text-[#5F6368] line-through text-[18px]">฿{item.originalPrice}</div>
            <div className="text-[#D6A985] text-[18px]">฿{item.price}</div>
          </div>
        </div>
      ))}

      <div className="text-right mt-4">
        <div className="text-[#5F6368] mb-2 text-[18px]">ราคารวมการสั่งซื้อ : <span className="text-[#D6A985] text-xl font-medium">฿{order.totalPrice}</span></div>
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 border border-[#A6A6A6] rounded-md text-[#A6A6A6]">ยกเลิกสินค้า</button>
          <button className="px-6 py-2 bg-[#D9D9D9] text-white rounded-md">ยืนยันการจัดส่ง</button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;