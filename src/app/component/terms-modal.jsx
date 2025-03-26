'use client'

import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function TermsModal({ isOpen, onClose }) {
  const modalRef = useRef(null)
  const contentRef = useRef(null)
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent scrolling when modal is open
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = '' // Restore scrolling when modal is closed
    }
  }, [isOpen, onClose])
  
  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      // Fade in animation
      modalRef.current.style.opacity = '0'
      contentRef.current.style.transform = 'scale(0.95)'
      
      setTimeout(() => {
        if (modalRef.current) modalRef.current.style.opacity = '1'
      }, 10)
      
      setTimeout(() => {
        if (contentRef.current) contentRef.current.style.transform = 'scale(1)'
      }, 150)
    }
  }, [isOpen])
  
  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      // Fade out animation
      modalRef.current.style.opacity = '0'
      contentRef.current.style.transform = 'scale(0.95)'
      
      setTimeout(() => {
        onClose()
      }, 300)
    } else {
      onClose()
    }
  }
  
  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) {
      handleClose()
    }
  }
  
  if (!isOpen) return null

  return (
    <div 
      ref={modalRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-opacity duration-300 opacity-0"
    >
      <div 
        ref={contentRef}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-transform duration-300 transform"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#B86A4B]">เงื่อนไขการใช้งาน</h2>
            <button 
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition duration-200 rounded-full hover:bg-gray-100 p-1"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold text-[#5F6368] mb-2">คุมอง :</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            
            <h3 className="text-lg font-semibold text-[#5F6368] mt-4 mb-2">วันหมดอายุ :</h3>
            <p>31/12/2025 31 ธ.ค. 2025 เวลา 23:59 น.</p>
            
            <h3 className="text-lg font-semibold text-[#5F6368] mt-4 mb-2">รายละเอียดเงื่อนไขการใช้งาน :</h3>
            <div className="space-y-4 text-gray-600">
              <p>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              
              <p>aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              
              <div className="mt-6">
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li className="animate-fade-in" style={{ animationDelay: '0ms' }}>1 Coin มีมูลค่าเท่ากับ 1 บาท</li>
                  <li className="animate-fade-in" style={{ animationDelay: '100ms' }}>Coin ที่ได้รับไม่สามารถแลกเปลี่ยนเป็นเงินสดได้</li>
                  <li className="animate-fade-in" style={{ animationDelay: '200ms' }}>Coin มีอายุการใช้งาน 1 ปีนับจากวันที่ได้รับ</li>
                  <li className="animate-fade-in" style={{ animationDelay: '300ms' }}>Coin สามารถใช้ได้กับสินค้าทุกประเภทในเว็บไซต์ kuma-mail.com</li>
                  <li className="animate-fade-in" style={{ animationDelay: '400ms' }}>Coin ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นๆ ได้</li>
                  <li className="animate-fade-in" style={{ animationDelay: '500ms' }}>บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขโดยไม่ต้องแจ้งให้ทราบล่วงหน้า</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleClose}
              className="bg-[#D6A985] text-white px-10 py-2 rounded-md font-bold hover:bg-[#B86A4B] transition duration-300 transform hover:scale-105 active:scale-95"
            >
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}