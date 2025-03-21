import React from 'react';

interface OrderCountsProps {
  all: number;
  payment: number;
  shipping: number;
  receiving: number;
  completed: number;
  cancelled: number;
}

interface OrderTabsProps {
  activeTab: string;
  orderCounts: OrderCountsProps;
  handleTabChange: (tab: string) => void;
}

const OrderTabs: React.FC<OrderTabsProps> = ({ activeTab, orderCounts, handleTabChange }) => {
  return (
    <div className="mb-6">
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        <div 
          className={`px-4 py-2 ${activeTab === 'all' ? 'border-b-2 border-[#D6A985] text-[#5F6368] font-medium' : 'text-[#5F6368]'} cursor-pointer whitespace-nowrap`}
          onClick={() => handleTabChange('all')}
        >
          คำสั่งซื้อทั้งหมด (<span className="text-[#D6A985]">{orderCounts.all}</span>)
        </div>
        <div 
          className={`px-4 py-2 ${activeTab === 'payment' ? 'border-b-2 border-[#D6A985] text-[#5F6368] font-medium' : 'text-[#5F6368]'} cursor-pointer whitespace-nowrap`}
          onClick={() => handleTabChange('payment')}
        >
          สินค้าที่ต้องชำระ
          {orderCounts.payment > 0 && (
            <>
              {" "}(<span className="text-[#D6A985]">{orderCounts.payment}</span>)
            </>
          )}
        </div>
        <div 
          className={`px-4 py-2 ${activeTab === 'shipping' ? 'border-b-2 border-[#D6A985] text-[#5F6368] font-medium' : 'text-[#5F6368]'} cursor-pointer whitespace-nowrap`}
          onClick={() => handleTabChange('shipping')}
        >
          สินค้าที่ต้องจัดส่ง (<span className="text-[#D6A985]">{orderCounts.shipping}</span>)
        </div>
        <div 
          className={`px-4 py-2 ${activeTab === 'receiving' ? 'border-b-2 border-[#D6A985] text-[#5F6368] font-medium' : 'text-[#5F6368]'} cursor-pointer whitespace-nowrap`}
          onClick={() => handleTabChange('receiving')}
        >
          สินค้าที่ต้องได้รับ
          {orderCounts.receiving > 0 && (
            <>
              {" "}(<span className="text-[#D6A985]">{orderCounts.receiving}</span>)
            </>
          )}
        </div>
        <div 
          className={`px-4 py-2 ${activeTab === 'completed' ? 'border-b-2 border-[#D6A985] text-[#5F6368] font-medium' : 'text-[#5F6368]'} cursor-pointer whitespace-nowrap`}
          onClick={() => handleTabChange('completed')}
        >
          คำสั่งซื้อที่สำเร็จแล้ว
          {orderCounts.completed > 0 && (
            <>
              {" "}(<span className="text-[#D6A985]">{orderCounts.completed}</span>)
            </>
          )}
        </div>
        <div 
          className={`px-4 py-2 ${activeTab === 'cancelled' ? 'border-b-2 border-[#D6A985] text-[#5F6368] font-medium' : 'text-[#5F6368]'} cursor-pointer whitespace-nowrap`}
          onClick={() => handleTabChange('cancelled')}
        >
          คำสั่งซื้อที่ยกเลิก
          {orderCounts.cancelled > 0 && (
            <>
              {" "}(<span className="text-[#D6A985]">{orderCounts.cancelled}</span>)
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTabs;