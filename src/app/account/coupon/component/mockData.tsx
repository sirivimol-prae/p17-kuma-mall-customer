export interface Coupon {
    id: string;
    type: 'discount' | 'shipping';
    backgroundColor: string;
    image: string;
    title: string;
    minSpend: number;
    tag: string;
    tagColor: string;
    expireDate: string;
    isExpired: boolean;
    isUsed: boolean;
    // เพิ่มข้อมูลสำหรับเงื่อนไข
    terms: {
      couponName: string;
      expireDateTime: string;
      details: string;
    }
  }
  
  export const coupons: Coupon[] = [
    {
      id: 'coupon-1',
      type: 'discount',
      backgroundColor: '#D6A985',
      image: '/images/kuma-mall-level.png',
      title: 'ส่วนลด 25% สูงสุด ฿50',
      minSpend: 200,
      tag: 'FIRST ORDER BENEFITS',
      tagColor: '#D6A985',
      expireDate: '31/12/2024',
      isExpired: false,
      isUsed: false,
      terms: {
        couponName: 'Lorem ipsum dolor sit amet,',
        expireDateTime: '31/12/2025 31 ธ.ค. 2025 เวลา 23:59 น.',
        details: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\naliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    },
    {
      id: 'coupon-2',
      type: 'shipping',
      backgroundColor: '#7987D2',
      image: '/images/free.png',
      title: 'คูปองส่งฟรี',
      minSpend: 200,
      tag: 'KUMAま MALL',
      tagColor: '#D6A985',
      expireDate: '31/12/2024',
      isExpired: false,
      isUsed: false,
      terms: {
        couponName: 'Lorem ipsum dolor sit amet,',
        expireDateTime: '31/12/2025 31 ธ.ค. 2025 เวลา 23:59 น.',
        details: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\naliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    },
    {
      id: 'coupon-3',
      type: 'discount',
      backgroundColor: '#D6A985',
      image: '/images/kuma-mall-level.png',
      title: 'ส่วนลด 10% สูงสุด ฿30',
      minSpend: 150,
      tag: 'PROMOTION',
      tagColor: '#D6A985',
      expireDate: '15/12/2023',
      isExpired: true,
      isUsed: true,
      terms: {
        couponName: 'Lorem ipsum dolor sit amet,',
        expireDateTime: '31/12/2025 31 ธ.ค. 2025 เวลา 23:59 น.',
        details: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\naliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    },
    {
      id: 'coupon-4',
      type: 'shipping',
      backgroundColor: '#7987D2',
      image: '/images/free.png',
      title: 'คูปองส่งฟรี',
      minSpend: 150,
      tag: 'KUMAま MALL',
      tagColor: '#D6A985',
      expireDate: '01/01/2024',
      isExpired: true,
      isUsed: false,
      terms: {
        couponName: 'Lorem ipsum dolor sit amet,',
        expireDateTime: '31/12/2025 31 ธ.ค. 2025 เวลา 23:59 น.',
        details: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\naliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    }
  ];