'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import AccountSidebar from '../component/sidebar';
import { useSearchParams } from 'next/navigation';

import OrderTabs from './component/OrderTabs';
import EmptyOrderMessage from './component/EmptyOrderMessage';
import OrderItem from './component/OrderItem';
import OrderDetail from './component/OrderDetail';

import { mockOrders, trackingInfo } from './component/MockData';

interface OrderItem {
  id: number;
  name: string;
  image: string;
  size?: string;
  color?: string;
  type?: string;
  quantity: number;
  originalPrice: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  status: string;
}

interface OrderCounts {
  all: number;
  payment: number;
  shipping: number;
  receiving: number;
  completed: number;
  cancelled: number;
}

const Page: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const [showOrderDetail, setShowOrderDetail] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const searchParams = useSearchParams();
    
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['all', 'payment', 'shipping', 'receiving', 'completed', 'cancelled'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]); 

  const getFilteredOrders = (): Order[] => {
    switch (activeTab) {
      case 'all':
        return orders;
      case 'payment':
        return orders.filter(order => order.status === 'รอชำระเงิน');
      case 'shipping':
        return orders.filter(order => order.status === 'รอจัดส่ง');
      case 'receiving':
        return orders.filter(order => order.status === 'รอรับสินค้า');
      case 'completed':
        return orders.filter(order => order.status === 'เสร็จสิ้น');
      case 'cancelled':
        return orders.filter(order => order.status === 'ยกเลิก');
      default:
        return orders;
    }
  };

  const getOrderCounts = (): OrderCounts => {
    const allCount = orders.length;
    const paymentCount = orders.filter(order => order.status === 'รอชำระเงิน').length;
    const shippingCount = orders.filter(order => order.status === 'รอจัดส่ง').length;
    const receivingCount = orders.filter(order => order.status === 'รอรับสินค้า').length;
    const completedCount = orders.filter(order => order.status === 'เสร็จสิ้น').length;
    const cancelledCount = orders.filter(order => order.status === 'ยกเลิก').length;

    return {
      all: allCount,
      payment: paymentCount,
      shipping: shippingCount,
      receiving: receivingCount,
      completed: completedCount,
      cancelled: cancelledCount
    };
  };

  const handleViewOrderTracking = (orderId: string): void => {
    setSelectedOrderId(orderId);
    setShowOrderDetail(true);
  };

  const handleBackToOrders = (): void => {
    setShowOrderDetail(false);
  };

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
  };

  const orderCounts = getOrderCounts();
  const filteredOrders = getFilteredOrders();

  const getEmptyMessage = (): string => {
    switch (activeTab) {
      case 'payment':
        return "ตอนนี้ ฉันยังไม่มีสินค้าที่ต้องชำระ";
      case 'receiving':
        return "ตอนนี้ ฉันยังไม่มีสินค้าที่ต้องได้รับ";
      case 'completed':
        return "ตอนนี้ ฉันยังไม่มีคำสั่งซื้อที่สำเร็จแล้ว";
      case 'cancelled':
        return "ตอนนี้ ฉันยังไม่มีคำสั่งซื้อที่ยกเลิก";
      default:
        return "คุณยังไม่มีรายการในหมวดนี้";
    }
  };

  if (showOrderDetail) {
    return (
      <div>
        <div className="flex items-center text-gray-600">
          <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
            <ArrowLeft color="#5F6368" />
            <span>หน้าแรก</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#D6A985]">คำสั่งซื้อของฉัน</span>
        </div>
        <br />
        <div className="flex gap-6">
          <AccountSidebar />
          <OrderDetail 
            trackingInfo={trackingInfo} 
            order={orders.find(order => order.id === selectedOrderId)} 
            onBackToOrders={handleBackToOrders} 
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center text-gray-600">
        <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
          <ArrowLeft color="#5F6368" />
          <span>หน้าแรก</span>
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#D6A985]">คำสั่งซื้อของฉัน</span>
      </div>
      <br />
      <div className="flex gap-6">
        <AccountSidebar />
        <div className="flex-1">
          <div className="w-full bg-white rounded shadow-sm p-6">
            <div className="flex items-center pb-4 mb-6 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#D6A985] flex items-center justify-center mr-4">
                <img src="/images/Paw_icon.png" alt="Paw_icon" />
              </div>
              <h2 className="text-[28px] font-bold text-[#B86A4B] m-0">คำสั่งซื้อของฉัน</h2>
            </div>

            <OrderTabs 
              activeTab={activeTab} 
              orderCounts={orderCounts} 
              handleTabChange={handleTabChange} 
            />

            {filteredOrders.length === 0 || 
             (activeTab === 'payment' || activeTab === 'receiving' || 
              activeTab === 'completed' || activeTab === 'cancelled') ? (
              <EmptyOrderMessage message={getEmptyMessage()} />
            ) : activeTab === 'shipping' ? (
              filteredOrders.map((order) => (
                <OrderItem 
                  key={order.id} 
                  order={order} 
                  onViewTracking={handleViewOrderTracking} 
                  isClickable={false} 
                />
              ))
            ) : (
              filteredOrders.map((order) => (
                <OrderItem 
                  key={order.id} 
                  order={order} 
                  onViewTracking={handleViewOrderTracking} 
                  isClickable={true} 
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;