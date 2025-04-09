'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarAccount = () => {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const isActive = (path) => {
    return activePath === path;
  };

  return (
    <div className="w-full max-w-xs">
      <div className="mb-6">
        <h2 className="text-gray-700 font-medium text-lg mb-2">บัญชีของฉัน</h2>
        <div className="border-t border-gray-200">
          <div className="py-2">
            <Link 
              href="/account" 
              className={`flex items-center ${isActive('/account') ? 'text-[#D6A985] font-medium' : 'text-gray-600 hover:text-[#D6A985]'}`}
            >
              <span className="text-[#D6A985] mr-1">›</span> ข้อมูลส่วนตัวของฉัน
            </Link>
          </div>
          <div className="py-2">
            <Link 
              href="/account/myaddress" 
              className={`flex items-center ${isActive('/account/myaddress') ? 'text-[#D6A985] font-medium' : 'text-gray-600 hover:text-[#D6A985]'}`}
            >
              <span className="text-[#D6A985] mr-1">›</span> จัดการที่อยู่จัดส่ง
            </Link>
          </div>
          <div className="py-2">
            <Link 
              href="/account/mytax" 
              className={`flex items-center ${isActive('/account/mytax') ? 'text-[#D6A985] font-medium' : 'text-gray-600 hover:text-[#D6A985]'}`}
            >
              <span className="text-[#D6A985] mr-1">›</span> จัดการใบกำกับภาษี
            </Link>
          </div>
        </div>
      </div>


      <div className="mb-6">
        <h2 className="text-gray-700 font-medium text-lg mb-2">การซื้อของฉัน</h2>
        <div className="border-t border-gray-200">
          <div className="py-2">
            <Link 
              href="/account/myorder" 
              className={`flex items-center ${isActive('/account/myorder') ? 'text-[#D6A985] font-medium' : 'text-gray-600 hover:text-[#D6A985]'}`}
            >
              <span className="text-[#D6A985] mr-1">›</span> คำสั่งซื้อของฉัน
            </Link>
          </div>
        </div>
      </div>


      <div className="mb-6">
        <h2 className="text-gray-700 font-medium text-lg mb-2">สมาชิกและสิทธิประโยชน์</h2>
        <div className="border-t border-gray-200">
          <div className="py-2">
            <Link 
              href="/account/member" 
              className={`flex items-center ${isActive('/account/member') ? 'text-[#D6A985] font-medium' : 'text-gray-600 hover:text-[#D6A985]'}`}
            >
              <span className="text-[#D6A985] mr-1">›</span> สถานะสมาชิกและสิทธิประโยชน์
            </Link>
          </div>
          <div className="py-2">
            <Link 
              href="/account/mycoin" 
              className={`flex items-center ${isActive('/account/mycoin') ? 'text-[#D6A985] font-medium' : 'text-gray-600 hover:text-[#D6A985]'}`}
            >
              <span className="text-[#D6A985] mr-1">›</span> KUMAま Coin ของฉัน
            </Link>
          </div>
          <div className="py-2">
            <Link 
              href="/account/coupon" 
              className={`flex items-center ${isActive('/account/coupon') ? 'text-[#D6A985] font-medium' : 'text-gray-600 hover:text-[#D6A985]'}`}
            >
              <span className="text-[#D6A985] mr-1">›</span> คูปองส่วนลดของฉัน
            </Link>
          </div>
          <div className="py-2">
            <Link 
              href="/account/kuma-coin-card" 
              className={`flex items-center ${isActive('/account/kuma-coin-card') ? 'text-[#D6A985] font-medium' : 'text-gray-600 hover:text-[#D6A985]'}`}
            >
              <span className="text-[#D6A985] mr-1">›</span> บัตรเติม KUMAま Coin ของฉัน
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarAccount;