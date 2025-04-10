'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import AccountSidebar from '../component/sidebar';
import { coupons, Coupon } from './component/mockData';

export default function Page(): React.ReactElement {
  const [activeTab, setActiveTab] = useState('คูปองที่ใช้ได้');
  const [couponCode, setCouponCode] = useState('');

  const filteredCoupons = useMemo(() => {
    if (activeTab === 'คูปองที่ใช้ได้') {
      return coupons.filter(coupon => !coupon.isExpired && !coupon.isUsed);
    } else {
      return coupons.filter(coupon => coupon.isExpired || coupon.isUsed);
    }
  }, [activeTab]);

  const handleCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };

  const handleAddCoupon = () => {
    if (couponCode.trim()) {
      alert(`เพิ่มคูปอง: ${couponCode}`);
      setCouponCode('');
    }
  };

  return (
    <div>
      <div className="flex items-center text-gray-600">
        <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
          <ArrowLeft color="#5F6368" />
          <span>หน้าแรก</span>
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#D6A985]">คูปองส่วนลดของฉัน</span>
      </div>
      <br />
      <div className="flex gap-6">
        <AccountSidebar />
        <div className="flex-1">
          <div className="w-full bg-white rounded shadow-sm p-6">
            <div className="flex items-center pb-4 mb-6 border-b border-[#D6A985]">
              <div className="w-10 h-10 rounded-full bg-[#D6A985] flex items-center justify-center mr-4">
                <img 
                  src="/images/Paw_icon.png" 
                  alt="Paw_icon" 
                />
              </div>
              <h2 className="text-[28px] font-bold text-[#B86A4B] m-0">คูปองส่วนลดของฉัน</h2>
            </div>

            <div className="border-b mb-6">
            <div className="flex">
                <button 
                className={`py-3 px-8 font-medium text-center text-[18px] ${activeTab === 'คูปองที่ใช้ได้' ? 'border-b-2 border-[#D6A985] text-[#B86A4B]' : 'text-gray-500'}`}
                onClick={() => setActiveTab('คูปองที่ใช้ได้')}
                >
                คูปองที่ใช้ได้
                </button>
                <button 
                className={`py-3 px-8 font-medium text-center text-[18px] ${activeTab === 'คูปองที่ใช้แล้ว / หมดอายุ' ? 'border-b-2 border-[#D6A985] text-[#B86A4B]' : 'text-gray-500'}`}
                onClick={() => setActiveTab('คูปองที่ใช้แล้ว / หมดอายุ')}
                >
                คูปองที่ใช้แล้ว / หมดอายุ
                </button>
            </div>
            </div>

            <div className="bg-gray-100 pt-[17px] pr-[123px] pb-[28px] pl-[123px] rounded-[10px] mb-8">
              <div className="text-left">
                <p className="text-[#5F6368] text-[18px] mb-2" style={{ marginLeft: '20px' }}>เพิ่มคูปองส่วนลด</p>
                <div className="flex items-center justify-center gap-4">
                  <input 
                    type="text" 
                    placeholder="กรอกคูปองส่วนลด" 
                    className="w-[500px] h-[40px] px-4 border border-[#AFB2B6] rounded focus:outline-none"
                    value={couponCode}
                    onChange={handleCouponCodeChange}
                  />
                  <button 
                    className="w-[180px] h-[40px] bg-[#D6A985] text-white rounded font-medium hover:bg-[#c49976]"
                    onClick={handleAddCoupon}
                  >
                    เก็บคูปองส่วนลด
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {filteredCoupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon} />
              ))}
              
              {filteredCoupons.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  ไม่พบคูปองในหมวดหมู่นี้
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CouponCard = ({ coupon }: { coupon: Coupon }) => {
  const [showTerms, setShowTerms] = useState(false);
  
  const getBackgroundImage = () => {
    return coupon.type === 'discount' 
      ? "/images/coupon-bg-beige.png"
      : "/images/coupon-bg-purple.png"; 
  };

  const openTermsPopup = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTerms(true);
    document.body.style.overflow = 'hidden';
  };

  const closeTermsPopup = () => {
    setShowTerms(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className="flex overflow-hidden border border-gray-200 border-l-0 rounded-lg">
        <div 
          className="relative w-56 flex-shrink-0" 
          style={{ 
            backgroundImage: `url(${getBackgroundImage()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="flex justify-center items-center h-full p-4">
            <div className={`rounded-full w-28 h-28 flex items-center justify-center overflow-hidden ${coupon.type === 'shipping' ? 'bg-transparent' : 'bg-white'}`}>
              <img src={coupon.image} alt="Coupon" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 bg-white">
          <div className={`text-${coupon.type === 'discount' ? '[#B86A4B]' : '[#5F6368]'} text-[24px] font-bold`}>
            {coupon.title}
          </div>
          <div className="text-[#5F6368] mt-1 text-[18px]">
            ขั้นต่ำ ฿{coupon.minSpend}
          </div>
          <div className="mt-2">
            <span 
              className="text-[14px] px-2 py-1 rounded border bg-white flex items-center justify-center"
              style={{ 
                color: coupon.tagColor, 
                borderColor: coupon.tagColor,
                width: coupon.tag === 'FIRST ORDER BENEFITS' ? '180px' : '120px',
                height: coupon.tag === 'FIRST ORDER BENEFITS' ? '20px' : '25px'
              }}
            >
              {coupon.tag}
            </span>
          </div>
          <div className="text-[#5F6368] text-[18px] mt-3">
            {coupon.isExpired ? (
              <span className="text-red-500">หมดอายุแล้ว</span>
            ) : (
              <>ใช้ก่อน {coupon.expireDate}</>
            )}
            {' | '}
            <span 
              className="text-[#D6A985] cursor-pointer underline"
              onClick={openTermsPopup}
            >
              เงื่อนไข
            </span>
          </div>
        </div>
      </div>

      {showTerms && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh'
          }}
        >
          <div className="bg-white rounded-lg max-w-xl w-full mx-4 relative">
            <div className="p-4">
              <div className="border-b border-[#D6A985] pb-2">
                <h3 className="text-2xl font-bold text-[#B86A4B]">เงื่อนไขการใช้งาน</h3>
              </div>
              
              <div className="space-y-4 my-4">
                <div className="text-[18px]">
                  <span className="font-bold text-gray-600">คูปอง</span>
                  <span className="text-gray-600"> : {coupon.terms.couponName}</span>
                </div>
                
                <div className="text-[18px]">
                  <span className="font-bold text-gray-600">วันหมดอายุ</span>
                  <span className="text-gray-600"> : {coupon.terms.expireDateTime}</span>
                </div>
                
                <div className="text-[18px]">
                  <span className="font-bold text-gray-600">รายละเอียดเงื่อนไขการใช้งาน</span>
                  <span className="text-gray-600"> :</span>
                  <p className="text-gray-600 whitespace-pre-line mt-2">{coupon.terms.details}</p>
                </div>
              </div>
              
              <div className="flex justify-end mt-6 mb-2">
                <button 
                  onClick={closeTermsPopup}
                  className="bg-[#D6A985] text-white py-2 px-8 rounded-md hover:bg-[#c49976] transition duration-200 text-[18px]"
                >
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};