'use client';

import React from 'react';
import { Sprout } from 'lucide-react';

const ProductDetails = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-8 text-[#5F6368]">
      <h2 className="text-[34px] font-bold mb-4">รายละเอียดสินค้า</h2>
      <hr className="border-t border-gray-300 mb-4" />
      <div className="text-[20px]">
        <p className="mb-4">KUMAま Official Shop</p>
        <p className="mb-4">อุปกรณ์ของใช้สัตว์เลี้ยง Japanese Minimalism เกรดพรีเมี่ยม</p>
    </div>
    <div  className="text-[20px]">
        <p className="mb-2 flex items-center"><Sprout color="#00e04b" className="mr-1" />สินค้าทุกชิ้นพร้อมส่งทันที (ไม่ต้องรอส่งจากต่างประเทศ)</p>
        <p className="mb-2 flex items-center"><Sprout color="#00e04b" className="mr-1" />จัดส่งสินค้าทุกวัน (จันทร์-เสาร์)</p>
        <p className="mb-2 flex items-center"><Sprout color="#00e04b" className="mr-1" />ออกใบกำกับภาษีได้ทุกคำสั่งซื้อ</p>
        <p className="mb-2 flex items-center"><Sprout color="#00e04b" className="mr-1" />สอบถามเพิ่มเติม ทักแชทได้เลยค่ะ</p>
        <p className="mb-2 flex items-center">------------------------------------------------------------------------------------------------------------</p>
    </div>
      <div  className="text-[20px]">
        <p className="mb-4">KUMAま กรงสุนัขพับได้ XL ใหญ่พิเศษ</p>
        <p className="mb-4">อาณาจักรน้อยๆของน้องๆ</p>
        <p className="mb-2">• พื้นที่กว้างขวาง สามารถใส่ของใช้น้องได้ครบ ทั้งกระบะทราย ชามน้ำ-อาหาร รวมถึงของเล่น และเตียงนอน</p>
        <p className="mb-2">• มุมมองพาโนรามาเห็นน้องได้ตลอดเวลารอบทั้ง 8 ทิศทาง</p>
        <p className="mb-2">• วัสดุเป็นผ้า oxford กันน้ำอย่างหนา เย็บเก็บขอบอย่างดี</p>
        <p className="mb-2">• แข็งแรง ทนทาน ไม่ขาดง่าย มีซิปประตูเปิด-ปิด</p>
        <p className="mb-2">• พับเก็บได้ สะดวกสบาย ประหยัดพื้นที่</p>
        <p className="mb-2">• ระบายลมรอบทิศทาง อากาศถ่ายเทสะดวก</p>
        <p className="mb-2">• พื้นกันน้ำ ล้างความสะอาดง่าย</p>
        <p className="mb-2">• ใช้เป็นบ้านหลางเเจ้ง ในสวนหรือลานได้</p>
        <p className="mb-2">• สามารถใช้เป็นคอกอนุบาลเจ้าตัวน้อย ตอนคลอดลูก และให้นม</p>
        <p className="mb-2">• หรือเป็นคอกพกพาในรถ พกพาไปเที่ยวต่างจังหวัด ปิคนิค</p>
        <p className="mb-2">• ใช้ได้กับทั้งน้องหมาน้องแมว ทุกขนาด ทุกสายพันธุ์</p>
        <p className="mb-2">• มีให้เลือกครบทุกแบบ</p>
      </div>
        <br />
        <div className="text-[20px]">
            <p className="mb-2 flex items-center font-bold">รูปแบบที่ 1 คอกพับได้ 8 เหลี่ยม</p>
            <p className="mb-2 flex items-center">มี 3 ขนาด ได้แก่ M:74*74*45 cm / L:93*93*59 cm / XL:115*115*56 cm</p>
            <p className="mb-2 flex items-center">มีให้เลือก 6 สีคลาสสิค ได้แก่ ขาว-น้ำตาล / ขาว-เทา / ครีม-ชมพู / ดำ-แดง / ดำ-ฟ้า / ดำ-ชมพู</p>
            <img src="/images/product/stall_3.png" alt="คอกพับได้ 8 เหลี่ยม" className="mt-4 w-full max-w-md block mx-auto" />
        </div>
        <br />
        <div className="text-[20px]">
            <p className="mb-2 flex items-center font-bold">รูปแบบที่ 2 คอกแบบกลมพับได้</p>
            <p className="mb-2 flex items-center">มี 3 ขนาด ได้แก่ M:70*70*40 cm / L:90*90*55 cm / XL:110*110*58 cm</p>
            <p className="mb-2 flex items-center">มีให้เลือก 6 สีคลาสสิค ได้แก่ สีพื้น : เหลือง-ครีม / ชมพู-ครีม / น้ำตาล-ครีม</p>
            <p className="mb-2 flex items-center">และ น้ำเงิน-ครีม กราฟฟิค : เขียวมิ้นท์ /ม่วง /เทา</p>
            <img src="/images/product/stall_5.png" alt="คอกแบบกลมพับได้" className="mt-4 w-full max-w-md block mx-auto" />
        </div>
        <br />
        <div className="text-[20px]">
            <p className="mb-2 flex items-center font-bold">รูปแบบที่ 3 คอกแบบสี่เหลี่ยมพับได้เข้ามุม</p>
            <p className="mb-2 flex items-center">มี 3 ขนาด ได้แก่ M:73*57*50 cm. / L:82*62*59 cm. / XL:93*69*60 cm.</p>
            <p className="mb-2 flex items-center">มี 5 สีให้เลือก ได้แก่ ฮันนี่แครอท / พิงค์การ์เด้น / ลาเวนเดอร์ / มิฟฟี่เกรย์ / เทามินิมอล (สีพื้น)</p>
            <img src="/images/product/stall_4.png" alt="คอกแบบสี่เหลี่ยมพับได้เข้ามุม" className="mt-4 w-full max-w-md block mx-auto" />
        </div>
    </div>
  );
};

export default ProductDetails;