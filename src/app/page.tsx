import React from 'react';
import BannerSlider from '@/components/BannerSlider';
import HomepageFlashSale from '@/components/HomepageFlashSale';
import { getFlashSaleData } from '@/lib/flashsale';

export default async function Page() {
  const bannerImages = [
    { src: '/images/slider1.png', alt: 'ชามอาหารทรงสูง' },
    { src: '/images/slider2.png', alt: 'ชามอาหารสีพาสเทล' },
  ];
  
  const { products } = await getFlashSaleData({
    page: 1,
    pageSize: 10,
    sort: 'endDate',
    minPrice: 0,
    maxPrice: 999,
    categoryParam: ''
  });
  
  return (
    <main>
      
      <BannerSlider 
        images={bannerImages}
        autoSlideInterval={5000}
      />
      <HomepageFlashSale products={products} />

    </main>
  );
}