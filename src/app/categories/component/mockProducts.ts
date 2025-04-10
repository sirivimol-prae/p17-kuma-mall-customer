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
      name: 'KUMAま คอกพับได้ XL',
      price: 720,
      originalPrice: 760,
      image: '/images/stall.png',
      hasDiscount: true,
      isFlashSale: false,
      discount: 5
    },
    {
      id: 2,
      name: 'KUMAま ที่นอนสัตว์เลี้ยง',
      price: 440,
      originalPrice: 480,
      image: '/images/bed2.png',
      hasDiscount: true,
      isFlashSale: false,
      discount: 8
    },
    {
      id: 3,
      name: 'KUMAま โรลครีมลับเล็บ',
      price: 409,
      originalPrice: 459,
      image: '/images/roll.png',
      hasDiscount: true,
      isFlashSale: false,
      discount: 10
    },
    {
      id: 4,
      name: 'KUMAま ผ้าปูกันรอยนุ่มนิ่ม',
      price: 580,
      originalPrice: 619,
      image: '/images/bed.png',
      hasDiscount: true,
      isFlashSale: false,
      discount: 6
    },
    {
      id: 5,
      name: 'KUMAま Test',
      price: 570,
      originalPrice: 689,
      image: '/images/bed2.png',
      hasDiscount: true,
      isFlashSale: false,
      discount: 6
    },
    {
      id: 6,
      name: 'KUMAま Test',
      price: 409,
      originalPrice: 459,
      image: '/images/roll.png',
      hasDiscount: true,
      isFlashSale: false,
      discount: 10
    },
    {
      id: 7,
      name: 'KUMAま Test',
      price: 440,
      originalPrice: 480,
      image: '/images/bed2.png',
      hasDiscount: true,
      isFlashSale: false,
      discount: 8
    }
  ];