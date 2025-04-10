'use client'

import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'

interface SuccessPageProps {
  isGift?: boolean;
  recipientEmail?: string;
}

export default function SuccessPage({ isGift = false, recipientEmail = '' }: SuccessPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-2">
        <div className="w-full bg-white rounded shadow-sm p-6">
          <div className="mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#D6A985] flex items-center justify-center mr-4">
                <img src="/images/Paw_icon.png" alt="Paw Icon" className="w-9 h-9" />
              </div>
              <h1 className="text-[28px] font-bold text-[#B86A4B]">คำสั่งซื้อสำเร็จ</h1>
            </div>
            <div className="mt-3 border-b border-[#D6A985] border-opacity-50"></div>
          </div>
            <div className="text-[28px] text-[#D6A985] font-semibold mb-4 text-center">
              การชำระเงินสำเร็จ !
            </div>

          <div className="max-w-xl mx-auto text-center">
            <div className="w-36 h-36 mx-auto mb-6 rounded-full border-[8px] border-[#85C27C] flex items-center justify-center">
                <Check className="w-24 h-24 text-[#85C27C] stroke-[2]" />
            </div>

            <div className="mb-6">
              <h2 className="text-[24px] text-[#5F6368] mb-4">
                {isGift 
                  ? 'คุณชำระเงินสำเร็จ และ' 
                  : 'คุณชำระเงินสำเร็จ และสามารถตรวจสอบบัตรเติม KUMAま Coin'}
              </h2>
              {isGift ? (
                <p className="text-[20px] text-[#5F6368]">
                  ทำการส่งบัตรให้ {recipientEmail} แล้ว
                </p>
              ) : (
                <p className="text-[20px] text-[#5F6368]">
                  ได้ใน "บัตรเติม KUMAま Coin"
                </p>
              )}
            </div>

            <div className="mb-6">
            <Link href={isGift ? "/account/mycoin" : "/account/kuma-coin-card"}>
                <button className="bg-[#D6A985] text-white px-6 py-3 rounded-md transition-colors duration-300 w-[350px] h-[55px] text-[20px]">
                {isGift ? 'กลับไปที่ KUMAま Coin ของฉัน' : 'ดูบัตรเติม KUMAま Coin ของฉัน'}
                </button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}