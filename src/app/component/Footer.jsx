// components/Footer.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full">
      <div>
      <div className="max-w-[1440px] mx-auto px-4 flex flex-wrap justify-between items-center py-3 border-b border-gray-300">
        <div className="flex items-center space-x-2 px-3 h-12">
            <Image src="/images/shipping.png" alt="ส่งสินค้าวันนี้ - เสาร์" width={35} height={35} />
            <span className="text-[#5F6368] text-[16px] font-medium">ส่งสินค้าจันทร์ - เสาร์</span>
        </div>
        
        <div className="flex items-center space-x-2 px-3 h-12 border-l-2 border-gray-300">
            <Image src="/images/contract.png" alt="ใบแสดงซื้อสินค้า 100%" width={35} height={35} />
            <span className="text-[#5F6368] text-[16px] font-medium">ไม่แสดงซื้อสินค้า 100%</span>
        </div>
        
        <div className="flex items-center space-x-2 px-3 h-12 border-l-2 border-gray-300">
            <Image src="/images/description.png" alt="ออกใบกำกับภาษีได้" width={35} height={35} />
            <span className="text-[#5F6368] text-[16px] font-medium">ออกใบกำกับภาษีได้</span>
        </div>
        
        <div className="flex items-center space-x-2 px-3 h-12 border-l-2 border-gray-300">
            <Image src="/images/credit_card.png" alt="ชำระเงินด้วยบัตรเครดิต" width={35} height={35} />
            <span className="text-[#5F6368] text-[16px] font-medium">ชำระเงินด้วยบัตรเครดิต</span>
        </div>
        
        <div className="flex items-center space-x-2 px-3 h-12 border-l-2 border-gray-300">
            <Image src="/images/loyalty.png" alt="สิทธิพิเศษสำหรับสมาชิก" width={35} height={35} />
            <span className="text-[#5F6368] text-[16px] font-medium">สิทธิพิเศษสำหรับสมาชิก</span>
        </div>
        </div>
      </div>
      
      <div className="bg-[#D6A985] py-6 text-white">
        <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <h3 className="text-[24px] font-medium">KUMA ま Official Shop</h3>
            <p className="text-[18px] leading-tight">ของใช้และอาหารสัตว์เลี้ยง</p>
            <p className="text-[18px] leading-tight">Japanese Minimalism เกรดพรีเมี่ยม</p>
            
            <div className="flex space-x-3 pt-2">
              <Link href="#" className="w-50 h-50 rounded-full flex items-center justify-center">
                <Image src="/images/facebook.png" alt="Facebook" width={35} height={35} />
              </Link>
              <Link href="#" className="w-50 h-50 rounded-full flex items-center justify-center">
                <Image src="/images/line.png" alt="Line" width={35} height={35} />
              </Link>
              <Link href="#" className="w-50 h-50 rounded-full flex items-center justify-center">
                <Image src="/images/ig.png" alt="Instagram" width={35} height={35} />
              </Link>
            </div>
            
            <div className="pt-2">
              <p className="text-[18px] leading-tight">โทร : 099-999-9999</p>
              <p className="text-[18px] leading-tight">E-Mail : kuma.mall@gmail.com</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-[20px] font-medium">คำสั่งซื้อของฉัน</h3>
            <ul className="space-y-1">
              <li><Link href="/account/myorder?tab=all" className="text-[16px] hover:underline leading-tight">คำสั่งซื้อสินค้า</Link></li>
              <li><Link href="/account/myorder?tab=payment" className="text-[16px] hover:underline leading-tight">การชำระเงิน</Link></li>
              <li><Link href="/account/myorder?tab=shipping" className="text-[16px] hover:underline leading-tight">สถานะการจัดส่ง</Link></li>
              <li><Link href="#" className="text-[16px] hover:underline leading-tight">นโยบายการเปลี่ยน/คืนสินค้า</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-[20px] font-medium">ระบบสมาชิก</h3>
            <ul className="space-y-1">
              <li><Link href="/account" className="text-[16px] hover:underline leading-tight">บัญชีของฉัน</Link></li>
              <li><Link href="#" className="text-[16px] hover:underline leading-tight">การสมัครสมาชิก</Link></li>
              <li><Link href="/account/member" className="text-[16px] hover:underline leading-tight">สิทธิประโยชน์สมาชิก</Link></li>
              <li><Link href="/account/mycoin" className="text-[16px] hover:underline leading-tight">KUMA ま Coin ของฉัน</Link></li>
              <li><Link href="#" className="text-[16px] hover:underline leading-tight">คูปองส่วนลดของฉัน</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-[20px] font-medium">โปรโมชั่นสินค้า</h3>
            <ul className="space-y-1">
              <li><Link href="#" className="text-[16px] hover:underline leading-tight">สินค้าเข้าใหม่</Link></li>
              <li><Link href="/flashsale" className="text-[16px] hover:underline leading-tight">Flash Sale!</Link></li>
              <li><Link href="#" className="text-[16px] hover:underline leading-tight">โบนัสสินค้าลดราคา</Link></li>
              <li><Link href="#" className="text-[16px] hover:underline leading-tight">กล่องสุ่ม/Box Set</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;