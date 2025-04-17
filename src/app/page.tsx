import React from 'react';
import BannerSlider from '@/components/BannerSlider';
import HomepageFlashSale from '@/components/HomepageFlashSale';
import HomepageProducts from '@/components/Product/HomepageProducts';
import { getFlashSaleData } from '@/lib/flashsale';
import { getProductsData } from '@/lib/products';

export default async function Page() {
  const bannerImages = [
    { src: '/images/slider1.png', alt: 'ชามอาหารทรงสูง' },
    { src: '/images/slider2.png', alt: 'ชามอาหารสีพาสเทล' },
  ];

  const { products: flashSaleProducts } = await getFlashSaleData({
    page: 1,
    pageSize: 10,
    sort: 'endDate',
    minPrice: 0,
    maxPrice: 999,
    categoryParam: ''
  });

  const { products: regularProducts } = await getProductsData({
    page: 1,
    pageSize: 10,
    sort: 'latest',
    minPrice: 0,
    maxPrice: 999,
    collectionParam: '',
    excludeFlashSale: true
  });
  
  return (
    <main className="p-0 m-0">
      <div className="w-full p-0 m-0">
        <BannerSlider 
          images={bannerImages}
          autoSlideInterval={5000}
        />
      </div>
      <div className="mt-0">
        <HomepageFlashSale products={flashSaleProducts} />
        <HomepageProducts products={regularProducts} />
      </div>
    </main>
  );
}