import React, { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';

interface TrackingStep {
  title: string;
  subtitle?: string;
  detail?: string;
  status: 'completed' | 'active' | 'pending';
}

interface TrackingEvent {
  date: string;
  message: string;
  detail?: string;
}

interface TrackingInfo {
  id: string;
  trackingNumber: string;
  courier: string;
  recipient: {
    name: string;
    phone: string;
    address: string;
  };
  steps: TrackingStep[];
  timeline: TrackingEvent[];
}

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

interface OrderDetailProps {
  trackingInfo: TrackingInfo;
  order: Order | undefined;
  onBackToOrders: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ trackingInfo, order, onBackToOrders }) => {
  // คำนวณข้อมูลราคา
  const priceInfo = useMemo(() => {
    if (!order) return { itemsTotal: 0, shippingFee: 120, grandTotal: 0 };
    
    const itemsTotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = 120; 
    const grandTotal = itemsTotal + shippingFee;
    
    return {
      itemsTotal,
      shippingFee,
      grandTotal
    };
  }, [order]);

  if (!order) {
    return (
      <div className="flex-1">
        <div className="w-full bg-white rounded shadow-sm p-6">
          <div className="flex mb-6">
            <button onClick={onBackToOrders} className="flex items-center text-[#5F6368] hover:text-[#B86A4B]">
              <ArrowLeft size={18} />
              <span className="ml-1">ย้อนกลับ</span>
            </button>
          </div>
          <div className="text-center py-10">ไม่พบข้อมูลคำสั่งซื้อ</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="w-full bg-white rounded shadow-sm p-6">
        {/* หัวข้อและปุ่มย้อนกลับ */}
        <div className="flex mb-6">
          <button onClick={onBackToOrders} className="flex items-center text-[#5F6368] hover:text-[#B86A4B]">
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
            <div className="text-[#5F6368] font-bold text-[16px]">{trackingInfo.recipient.name}</div>
            <div className="text-[#A6A6A6] text-[16px]">{trackingInfo.recipient.phone}</div>
            <div className="text-[#A6A6A6] text-[16px] max-w-md">{trackingInfo.recipient.address}</div>
          </div>

          <div className="bg-[#A6A6A6]"
          style={{ position: 'absolute', top: '680px', bottom: '0', left: '65%', width: '1px', height: '200px' }}></div>

          {/* คอลัมน์ขวา: ข้อมูลขนส่งและ timeline */}
          <div className="w-1/2">
            <div className="flex justify-end mb-4">
              <div className="text-right">
                <div className="text-[#5F6368] font-bold text-[16px]">{trackingInfo.courier}</div>
                <div className="text-[#5F6368] text-[16px]">{trackingInfo.trackingNumber}</div>
              </div>
            </div>
            
            {/* Timeline แบบใหม่ */}
            <div className="mt-4 grid justify-end">
              {trackingInfo.timeline.map((event, index) => (
                <div key={index} className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center text-white relative mr-3">
                    <img 
                      src={index === 0 ? "/images/car.png" : 
                           index === 1 ? "/images/prepare.png" : 
                           "/images/neworder.png"} 
                      alt={`${index + 1}`} 
                      className="w-6 h-6" 
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-[#5F6368] font-medium text-[16px]">{event.date}</div>
                      <div className="text-[#5F6368] text-[16px]">{event.message}</div>
                    </div>
                    {event.detail && <div className="text-[#A6A6A6] text-[14px]">{event.detail}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* รายการสินค้าที่สั่ง */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <h3 className="text-[24px] text-[#5F6368] font-bold mb-6">คำสั่งซื้อสินค้า</h3>
          
          {order.items.map((item) => (
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
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#5F6368] text-[16px]">ราคาสินค้า</span>
              <span className="text-[#5F6368] text-[16px]">฿{priceInfo.itemsTotal}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#5F6368] text-[16px]">ค่าจัดส่งสินค้า</span>
              <span className="text-[#5F6368] text-[16px]">฿{priceInfo.shippingFee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#5F6368] text-[20px] font-medium">ราคารวม</span>
              <span className="text-[#D6A985] text-[22px] font-medium">฿{priceInfo.grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;