// กำหนด Type สำหรับข้อมูลสินค้า
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
  
  // กำหนด Type สำหรับข้อมูลคำสั่งซื้อ
  interface Order {
    id: string;
    items: OrderItem[];
    totalPrice: number;
    status: string;
  }
  
  // กำหนด Type สำหรับขั้นตอนการติดตาม
  interface TrackingStep {
    title: string;
    subtitle?: string;
    detail?: string;
    status: 'completed' | 'active' | 'pending';
  }
  
  // กำหนด Type สำหรับไทม์ไลน์การขนส่ง
  interface TrackingEvent {
    date: string;
    message: string;
    detail?: string;
  }
  
  // กำหนด Type สำหรับข้อมูลการติดตามการจัดส่ง
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
  
  // Mock data สำหรับคำสั่งซื้อ
  export const mockOrders: Order[] = [
    {
      id: 'XXXX-0131082024',
      items: [
        {
          id: 1,
          name: 'KUMAま คอกสุนัขพับได้',
          image: '/images/stall.png',
          size: 'M : 74*74*45 CM',
          color: 'น้ำเงิน-ครีม',
          quantity: 1,
          originalPrice: 250,
          price: 239
        },
        {
          id: 2,
          name: 'KUMAま ที่นอนสัตว์เลี้ยง',
          image: '/images/bed2.png',
          size: 'M : 74*74*45 CM',
          color: 'ขาว-น้ำตาล',
          quantity: 1,
          originalPrice: 80,
          price: 59
        },
        {
          id: 3,
          name: 'KUMAま โรลครีมลับเล็บ',
          image: '/images/bed.png',
          type: 'น้ำตาล',
          quantity: 1,
          originalPrice: 150,
          price: 139
        }
      ],
      totalPrice: 437,
      status: 'รอจัดส่ง'
    }
  ];
  
  // Mock data สำหรับข้อมูลการติดตามการจัดส่ง
  export const trackingInfo: TrackingInfo = {
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