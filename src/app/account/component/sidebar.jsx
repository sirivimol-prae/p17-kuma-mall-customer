import React from 'react';

const SidebarAccount = () => {
  return (
    <div className="w-full max-w-xs">
      {/* บัญชีของฉัน */}
      <div className="mb-6">
        <h2 className="text-gray-700 font-medium text-lg mb-2">บัญชีของฉัน</h2>
        <div className="border-t border-gray-200">
          <div className="py-2">
            <a href="/account" className="text-gray-600 hover:text-[#D6A985] flex items-center">
              <span className="text-[#D6A985] mr-1">›</span> ข้อมูลส่วนตัวของฉัน
            </a>
          </div>
          <div className="py-2">
            <a href="/myaddress" className="text-gray-600 hover:text-[#D6A985] flex items-center">
              <span className="text-[#D6A985] mr-1">›</span> จัดการที่อยู่จัดส่ง
            </a>
          </div>
          <div className="py-2">
            <a href="/mytax" className="text-gray-600 hover:text-[#D6A985] flex items-center">
              <span className="text-[#D6A985] mr-1">›</span> จัดการใบกำกับภาษี
            </a>
          </div>
        </div>
      </div>

      {/* การซื้อของฉัน */}
      <div className="mb-6">
        <h2 className="text-gray-700 font-medium text-lg mb-2">การซื้อของฉัน</h2>
        <div className="border-t border-gray-200">
          <div className="py-2">
            <a href="#" className="text-gray-600 hover:text-[#D6A985] flex items-center">
              <span className="text-[#D6A985] mr-1">›</span> คำสั่งซื้อของฉัน
            </a>
          </div>
        </div>
      </div>

      {/* สมาชิกและสิทธิประโยชน์ */}
      <div className="mb-6">
        <h2 className="text-gray-700 font-medium text-lg mb-2">สมาชิกและสิทธิประโยชน์</h2>
        <div className="border-t border-gray-200">
          <div className="py-2">
            <a href="#" className="text-gray-600 hover:text-[#D6A985] flex items-center">
              <span className="text-[#D6A985] mr-1">›</span> สถานะสมาชิกและสิทธิประโยชน์
            </a>
          </div>
          <div className="py-2">
            <a href="#" className="text-gray-600 hover:text-[#D6A985] flex items-center">
              <span className="text-[#D6A985] mr-1">›</span> KUMAま Coin ของฉัน
            </a>
          </div>
          <div className="py-2">
            <a href="#" className="text-gray-600 hover:text-[#D6A985] flex items-center">
              <span className="text-[#D6A985] mr-1">›</span> คูปองส่วนลดของฉัน
            </a>
          </div>
          <div className="py-2">
            <a href="#" className="text-gray-600 hover:text-[#D6A985] flex items-center">
              <span className="text-[#D6A985] mr-1">›</span> บัตรเติม KUMAま Coin ของฉัน
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarAccount;