export interface ProductGroup {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    discount?: number;
    isFlashSale?: boolean;
    hasDiscount?: boolean;
  }
  
  export const mockProducts: ProductGroup[] = [
    {
      id: 1,
      name: 'KUMAま กล่องสุ่มที่นอน',
      price: 400,
      originalPrice: 499,
      image: '/images/Mystery_Box1.png',
      hasDiscount: true,
      isFlashSale: false,
      discount: 5
    },
    {
      id: 2,
      name: 'KUMAま กล่องสุ่มอาหาร',
      price: 400,
      originalPrice: 499,
      image: '/images/Mystery_Box2.png',
      hasDiscount: true,
      isFlashSale: false,
      discount: 8
    },
    {
      id: 3,
      name: 'KUMAま กล่องสุ่มสายจูง',
      price: 400,
      originalPrice: 499,
      image: '/images/Mystery_Box3.png',
      hasDiscount: true,
      isFlashSale: false,
      discount: 10
    },
    {
      id: 4,
      name: 'KUMAま กล่องสุ่มชาม',
      price: 400,
      originalPrice: 499,
      image: '/images/Mystery_Box4.png',
      hasDiscount: true,
      isFlashSale: false,
      discount: 6
    },
    {
        id: 5,
        name: 'KUMAま กล่องสุ่มกระเป๋า',
        price: 400,
        originalPrice: 499,
        image: '/images/Mystery_Box5.png',
        hasDiscount: true,
        isFlashSale: false,
        discount: 6
      },
      {
        id: 6,
        name: 'KUMAま กล่องสุ่มอุปกรณ์',
        price: 400,
        originalPrice: 499,
        image: '/images/Mystery_Box6.png',
        hasDiscount: true,
        isFlashSale: false,
        discount: 6
      },
      {
        id: 7,
        name: 'KUMAま กล่องสุ่มห้องน้ำ',
        price: 400,
        originalPrice: 499,
        image: '/images/Mystery_Box7.png',
        hasDiscount: true,
        isFlashSale: false,
        discount: 6
      },
  ];