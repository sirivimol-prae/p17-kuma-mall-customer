'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import AccountSidebar from '../component/sidebar';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

//MockData
export default function page() {
  const [orders, setOrders] = useState([
    {
      id: 'XXXX-0131082024',
      items: [
        {
          id: 1,
          name: 'KUMA ま ที่ฝนเล็บน้องแมวรูปโคม',
          image: '/images/bowl.png',
          size: 'M : 74*74*45 CM',
          color: 'น้ำเงิน-ครีม',
          quantity: 1,
          originalPrice: 250,
          price: 239
        },
        {
          id: 2,
          name: 'KUMA ま KUMAま หมอนหนุนน้องหมา',
          image: '/images/Pillow.png',
          size: 'M : 74*74*45 CM',
          color: 'ขาว-น้ำตาล',
          quantity: 1,
          originalPrice: 80,
          price: 59
        },
        {
          id: 3,
          name: 'KUMA ま ทรายแมวแถวบ้าน',
          image: '/images/kasty.png',
          type: 'Urinary ลดนิ่ว',
          quantity: 10,
          originalPrice: 150,
          price: 139
        }
      ],
      totalPrice: 437,
      status: 'รอจัดส่ง'
    }
  ]);

  // สถานะเพื่อควบคุมการแสดงรายละเอียดการจัดส่ง
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  
  // สถานะเพื่อควบคุมแท็บที่เลือก
  const [activeTab, setActiveTab] = useState('all');
  
  const searchParams = useSearchParams();
    
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['all', 'payment', 'shipping', 'receiving', 'completed', 'cancelled'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]); 

  // ข้อมูลสำหรับการติดตามการจัดส่ง
  const trackingInfo = {
    id: 'XXXX-0131082024',
    trackingNumber: '11G31234567890',
    courier: 'SPX Express',
    recipient: {
      name: 'XXXXX XXXXXXXX',
      phone: '(+66) 81-123-4567',
      address: '8/13 ซอย XXXXX ถนน YYYYYYY แขวงคลองจั่น เขตบางกะปิ กรุงเทพมหานคร 10110'
    },
    steps: [
      {
        title: 'คำสั่งซื้อใหม่',
        subtitle: '30/08/2024',
        detail: '30/08/2024 | 18:07',
        status: 'completed'
      },
      {
        title: 'คำสั่งซื้อชำระเงินแล้ว',
        subtitle: '30/08/2024',
        detail: '30/08/2024 | 18:07',
        status: 'completed'
      },
      {
        title: 'คำสั่งซื้อขนส่งกำลังจัดส่งสินค้า',
        subtitle: 'อยู่ระหว่างการจัดส่ง',
        status: 'active'
      },
      {
        title: 'ได้รับสินค้าแล้ว',
        status: 'pending'
      },
      {
        title: 'คำสั่งซื้อเสร็จสิ้น',
        status: 'pending'
      }
    ],
    timeline: [
      {
        date: '31/08/2024 | 17:47',
        message: 'บริษัทขนส่งเข้ารับพัสดุเรียบร้อยแล้ว'
      },
      {
        date: '31/08/2024 | 13:47',
        message: 'กำลังเตรียมพัสดุ',
        detail: 'อยู่ที่ศูนย์เตรียมพัสดุ'
      },
      {
        date: '30/08/2024 | 18:07',
        message: 'คำสั่งซื้อใหม่',
        detail: 'คำสั่งซื้อเข้าสู่ระบบ'
      }
    ]
  };

  // ฟังก์ชันเพื่อกรองคำสั่งซื้อตามแท็บ
  const getFilteredOrders = () => {
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

  // นับจำนวนคำสั่งซื้อในแต่ละสถานะ
  const getOrderCounts = () => {
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

  // ฟังก์ชันเพื่อเปิดรายละเอียดการจัดส่ง
  const handleViewOrderTracking = (orderId) => {
    setSelectedOrderId(orderId);
    setShowOrderDetail(true);
  };

  // ฟังก์ชันเพื่อกลับไปยังรายการคำสั่งซื้อ
  const handleBackToOrders = () => {
    setShowOrderDetail(false);
  };

  // ฟังก์ชันเพื่อเปลี่ยนแท็บ
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // คำนวณจำนวนคำสั่งซื้อในแต่ละสถานะ
  const orderCounts = getOrderCounts();
  const filteredOrders = getFilteredOrders();

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
          <div className="flex-1">
            <div className="w-full bg-white rounded shadow-sm p-6">
              {/* หัวข้อและปุ่มย้อนกลับ */}
              <div className="flex mb-6">
                <button onClick={handleBackToOrders} className="flex items-center text-[#5F6368] hover:text-[#B86A4B]">
                  <ArrowLeft size={18} />
                  <span className="ml-1">ย้อนกลับ</span>
                </button>
              </div>
              
              <div className="flex justify-between mb-2">
                <div className="text-[#5F6368] text-[16px]">คำสั่งซื้อ : {trackingInfo.id} | <span className="text-[#D6A985]">สถานะสินค้า : อยู่ระหว่างการจัดส่ง</span></div>
              </div>
              
              {/* แสดงแผนภูมิขั้นตอนการจัดส่ง */}
              <div className="my-10">
                <div className="relative flex justify-between items-start max-w-3xl mx-auto">
                  {/* ขั้นตอนที่ 1: คำสั่งซื้อใหม่ */}
                  <div className="flex flex-col items-center z-10 w-[100px]">
                    <div className="w-[70px] h-[70px] rounded-full border-[4px] border-[#D6A985] bg-white flex items-center justify-center">
                      <img src="/images/Frame-1.png" alt="Order" className="w-8 h-8" />
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-[#5F6368] text-[16px]">คำสั่งซื้อใหม่</div>
                      <div className="text-[#A6A6A6] text-[14px]">30/08/2024</div>
                      <div className="text-[#A6A6A6] text-[14px]">18:07</div>
                    </div>
                  </div>
                  
                  {/* ขั้นตอนที่ 2: คำสั่งซื้อชำระเงินแล้ว */}
                  <div className="flex flex-col items-center z-10 w-[100px]">
                    <div className="w-[70px] h-[70px] rounded-full border-[4px] border-[#D6A985] bg-white flex items-center justify-center">
                      <img src="/images/Frame-2.png" alt="Payment" className="w-8 h-8" />
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-[#5F6368] text-[16px]">คำสั่งซื้อที่</div>
                      <div className="text-[#5F6368] text-[16px]">ชำระเงินแล้ว</div>
                      <div className="text-[#A6A6A6] text-[14px]">30/08/2024</div>
                      <div className="text-[#A6A6A6] text-[14px]">19:07</div>
                    </div>
                  </div>
                  
                  {/* ขั้นตอนที่ 3: กำลังจัดส่งสินค้า */}
                  <div className="flex flex-col items-center z-10 w-[120px]">
                    <div className="w-[70px] h-[70px] rounded-full border-[4px] border-[#D6A985] bg-white flex items-center justify-center">
                      <img src="/images/Frame-3.png" alt="Shipping" className="w-8 h-8" />
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-[#5F6368] text-[16px]">คำสั่งซื้อที่ได้</div>
                      <div className="text-[#5F6368] text-[16px]">กำลังจัดส่งสินค้า</div>
                      <div className="text-[#A6A6A6] text-[14px]">อยู่ระหว่างการจัดส่ง</div>
                    </div>
                  </div>
                  
                  {/* ขั้นตอนที่ 4: ได้รับสินค้าแล้ว */}
                  <div className="flex flex-col items-center z-10 w-[100px]">
                    <div className="w-[70px] h-[70px] rounded-full bg-white border-[4px] border-[#A6A6A6] flex items-center justify-center">
                      <img src="/images/Frame-4.png" alt="Delivered" className="w-8 h-8" />
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-[#5F6368] text-[16px]">ได้รับสินค้าแล้ว</div>
                    </div>
                  </div>
                  
                  {/* ขั้นตอนที่ 5: คำสั่งซื้อเสร็จสิ้น */}
                  <div className="flex flex-col items-center z-10 w-[100px]">
                    <div className="w-[70px] h-[70px] rounded-full bg-white border-[4px] border-[#A6A6A6] flex items-center justify-center">
                      <img src="/images/Frame-5.png" alt="Completed" className="w-8 h-8" />
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-[#5F6368] text-[16px]">คำสั่งซื้อเสร็จสิ้น</div>
                    </div>
                  </div>
                  
                  {/* เส้นเชื่อมระหว่างขั้นตอน (เส้นพื้นหลัง) */}
                  {/* <div className="absolute top-[35px] left-[35px] right-[35px] h-[2px] bg-gray-300"></div> */}
                  
                  {/* เส้นเชื่อมระหว่างขั้นตอน (เส้นความคืบหน้า) */}
                  <div className="absolute top-[35px] left-[35px] w-[50%] h-[4px] bg-[#D6A985]"></div>
                  
                  {/* เส้นประสำหรับส่วนที่ยังไม่ดำเนินการ */}
                  <div className="absolute top-[35px] left-[calc(50%+35px)] right-[35px] h-[4px] " 
                       style={{ 
                            backgroundImage: 'repeating-linear-gradient(to right, #ccc, #ccc 5px, transparent 5px, transparent 10px)',
                            backgroundSize: '10px 2px',
                            backgroundRepeat: 'repeat-x'
                        }}>
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <button className="px-6 py-2 border border-[#D9D9D9] rounded-md text-[#A6A6A6] mr-3">ยกเลิกสินค้า</button>
                  <button className="px-6 py-2 bg-[#D9D9D9] text-white rounded-md">ยืนยันการจัดส่ง</button>
                </div>
              </div>
                  
              <h3 className="text-[18px] font-bold mb-4 text-[#5F6368]">ที่อยู่ในการจัดส่ง</h3>

              <div className="flex mb-8">
                {/* คอลัมน์ซ้าย: ข้อมูลที่อยู่ */}
                <div className="w-1/2">
                  <div className="text-[#5F6368] font-bold text-[16px]">XXXXX XXXXXXXX</div>
                  <div className="text-[#A6A6A6] text-[16px]">(+66) 81-123-4567</div>
                  <div className="text-[#A6A6A6] text-[16px] max-w-md">8/13 ซอย XXXXX ถนน YYYYYYY แขวงคลองจั่น เขตบางกะปิ กรุงเทพมหานคร 10110</div>
                </div>

                <div className="bg-[#A6A6A6]"
                style={{ position: 'absolute', top: '680px', bottom: '0', left: '65%', width: '1px', height: '200px' }}></div>

                {/* คอลัมน์ขวา: ข้อมูลขนส่งและ timeline */}
                <div className="w-1/2">
                  <div className="flex justify-end mb-4">
                    <div className="text-right">
                      <div className="text-[#5F6368] font-bold text-[16px]">SPX Express</div>
                      <div className="text-[#5F6368] text-[16px]">11G31234567890</div>
                    </div>
                  </div>
                  
                  {/* Timeline แบบใหม่ */}
                  <div className="mt-4 grid justify-end">
                    {/* Event 1 */}
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center text-white relative mr-3">
                        <img src="/images/car.png" alt="1" className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-[#5F6368] font-medium text-[16px]">31/08/2024 | 17:47</div>
                        <div className="text-[#5F6368] text-[16px]">บริษัทขนส่งเข้ารับพัสดุเรียบร้อยแล้ว</div>
                      </div>
                    </div>
                    
                    {/* Event 2 */}
                    <div className="flex mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center text-[#5F6368] relative mr-3">
                        <img src="/images/prepare.png" alt="2" className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-[#5F6368] font-medium text-[16px]">31/08/2024 | 13:47</div>
                          <div className="text-[#5F6368] text-[16px]">กำลังเตรียมพัสดุ</div>
                        </div>
                        <div className="text-[#A6A6A6] text-[14px]">อยู่ที่ศูนย์เตรียมพัสดุ</div>
                      </div>
                    </div>
                    
                    {/* Event 3 */}
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center text-[#5F6368] relative mr-3">
                        <img src="/images/neworder.png" alt="3" className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-[#5F6368] font-medium text-[16px]">30/08/2024 | 18:07</div>
                          <div className="text-[#5F6368] text-[16px]">คำสั่งซื้อใหม่</div>
                        </div>
                        <div className="text-[#A6A6A6] text-[14px]">คำสั่งซื้อเข้าสู่ระบบ</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* รายการสินค้าที่สั่ง */}
              <div className="mt-10 border-t border-gray-200 pt-6">
                <h3 className="text-[24px] text-[#5F6368] font-bold mb-6">คำสั่งซื้อสินค้า</h3>
                
                {orders.find(order => order.id === selectedOrderId)?.items.map((item) => (
                  <div key={item.id} className="flex items-center border-gray-200 p-4 mb-2">
                    <div className="flex items-center w-40 h-40 mr-4">
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
                      <div className="text-[#5F6368] text-[18px] line-through">฿{item.originalPrice}</div>
                      <div className="text-[#D6A985] text-[18px]">฿{item.price}</div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 pt-4">
                  <div className="flex justify-between items-center text-[16px] ">
                    <span className="text-[#5F6368] text-[18px]">ราคารวม</span>
                    <span className="text-[#D6A985] text-[18px]">฿557</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  <img 
                    src="/images/Paw_icon.png" 
                    alt="Paw_icon" 
                  />
                </div>
                <h2 className="text-[28px] font-bold text-[#B86A4B] m-0">คำสั่งซื้อของฉัน</h2>
              </div>

              <div className="mb-6">
                <div className="flex space-x-2 mb-4">
                <div 
                    className={`px-4 py-2 ${activeTab === 'all' ? 'border-b-2 border-[#D6A985] text-[#5F6368] font-medium' : 'text-[#5F6368]'} cursor-pointer`}
                    onClick={() => handleTabChange('all')}
                  >
                    คำสั่งซื้อทั้งหมด (<span className="text-[#D6A985]">{orderCounts.all}</span>)
                  </div>
                  <div 
                    className={`px-4 py-2 ${activeTab === 'payment' ? 'border-b-2 border-[#D6A985] text-[#5F6368] font-medium' : 'text-[#5F6368]'} cursor-pointer`}
                    onClick={() => handleTabChange('payment')}
                  >
                    สินค้าที่ต้องชำระ{orderCounts.payment > 0 ? ` (<span className="text-[#D6A985]">${orderCounts.payment}</span>)` : ''}
                  </div>
                  <div 
                    className={`px-4 py-2 ${activeTab === 'shipping' ? 'border-b-2 border-[#D6A985] text-[#5F6368] font-medium' : 'text-[#5F6368]'} cursor-pointer`}
                    onClick={() => handleTabChange('shipping')}
                  >
                    สินค้าที่ต้องจัดส่ง (<span className="text-[#D6A985]">{orderCounts.shipping}</span>)
                  </div>
                  <div 
                    className={`px-4 py-2 ${activeTab === 'receiving' ? 'border-b-2 border-[#D6A985] text-[#5F6368] font-medium' : 'text-[#5F6368]'} cursor-pointer`}
                    onClick={() => handleTabChange('receiving')}
                  >
                    สินค้าที่ต้องได้รับ{orderCounts.receiving > 0 ? ` (<span className="text-[#D6A985]">${orderCounts.receiving}</span>)` : ''}
                  </div>
                  <div 
                    className={`px-4 py-2 ${activeTab === 'completed' ? 'border-b-2 border-[#D6A985] text-[#5F6368] font-medium' : 'text-[#5F6368]'} cursor-pointer`}
                    onClick={() => handleTabChange('completed')}
                  >
                    คำสั่งซื้อที่สำเร็จแล้ว{orderCounts.completed > 0 ? ` (<span className="text-[#D6A985]">${orderCounts.completed}</span>)` : ''}
                  </div>
                  <div 
                    className={`px-4 py-2 ${activeTab === 'cancelled' ? 'border-b-2 border-[#D6A985] text-[#5F6368] font-medium' : 'text-[#5F6368]'} cursor-pointer`}
                    onClick={() => handleTabChange('cancelled')}
                  >
                    คำสั่งซื้อที่ยกเลิก{orderCounts.cancelled > 0 ? ` (<span className="text-[#D6A985]">${orderCounts.cancelled}</span>)` : ''}
                  </div>
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="text-center py-10 text-[#B86A4B] text-[24px] font-bold">
                <div className="flex justify-center">
                  <Image src="/images/kuma-mall-level.png" alt="logo" width={100} height={100} />
                </div>
                <br />
                  คุณยังไม่มีรายการในหมวดนี้
                  </div>
              ) : (
                filteredOrders.map((order) => (
                  <div key={order.id} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-[#5F6368] text-[16px]">คำสั่งซื้อ : {order.id}</div>
                      <div className="flex items-center gap-[10px]">
                        <img src="/images/shipping.png" alt="Delivery" className="w-[34px] h-[34px]" />
                        <span className="text-[#5F6368] text-[16px]">พัสดุออกจากศูนย์คัดแยกสินค้า | </span>
                        <span className="text-[#D6A985] text-[16px]">สถานะสินค้า : อยู่ระหว่างการจัดส่ง</span>
                      </div>
                    </div>

                    {order.items.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-center border-y border-gray-200 p-4 mb-2 h-[170px] cursor-pointer hover:bg-gray-50"
                        onClick={() => handleViewOrderTracking(order.id)}
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
                ))
              )}
            </div>
          </div>
        </div>
    </div>
  )
}