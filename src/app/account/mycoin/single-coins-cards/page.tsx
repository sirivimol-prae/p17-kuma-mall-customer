'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Calendar, Lock } from 'lucide-react'
import AccountSidebar from '@/app/account/component/sidebar'
import TermsModal from '@/app/component/terms-modal'

interface PageProps {
  params: {
    coinId: string;
  };
}

export default function SingleCoinCard({ params }: PageProps) {
  const router = useRouter()
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [selectedRecipient, setSelectedRecipient] = useState('self')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [saveCard, setSaveCard] = useState(false)
  const [recipientEmail, setRecipientEmail] = useState('')
  const [giftMessage, setGiftMessage] = useState('')
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  })
  
  const giftFormRef = useRef<HTMLDivElement>(null)
  const creditFormRef = useRef<HTMLDivElement>(null)
  const coinData: { [key: string]: { image: string; title: string; price: string; discount: string | null } } = {
    '1000coin': {
      image: '/images/card1.png',
      title: 'บัตรเติม 1000 Coin',
      price: '990',
      discount: null
    },
    '3000coin': {
      image: '/images/card2.png',
      title: 'บัตรเติม 3000 Coin',
      price: '2950',
      discount: null
    },
    '5000coin': {
      image: '/images/card3.png',
      title: 'บัตรเติม 5000 Coin',
      price: '4850',
      discount: null
    },
    '10000coin': {
      image: '/images/card4.png',
      title: 'บัตรเติม 10000 Coin',
      price: '9500',
      discount: null
    },
    '15000coin': {
      image: '/images/card5.png',
      title: 'บัตรเติม 15000 Coin',
      price: '13900',
      discount: '5% DISCOUNT FRIEND ONLY'
    },
    '25000coin': {
      image: '/images/card6.png',
      title: 'บัตรเติม 25000 Coin',
      price: '22900',
      discount: null
    },
    '35000coin': {
      image: '/images/card7.png',
      title: 'บัตรเติม 35000 Coin',
      price: '31900',
      discount: '7% DISCOUNT BEST FRIEND ONLY'
    }
  }

  const coinId = params?.coinId || '1000coin'
  console.log("SingleCoinCard received coinId:", coinId)

  const coin = coinId in coinData ? coinData[coinId] : coinData['1000coin']
  
  interface FormSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  interface CardDetails {
    cardNumber: string;
    cardName: string;
    expiry: string;
    cvv: string;
  }

  interface SubmitData {
    coin: {
        image: string;
        title: string;
        price: string;
        discount: string | null;
    };
    selectedRecipient: string;
    paymentMethod: string;
    recipientEmail?: string;
    giftMessage?: string;
    cardDetails?: CardDetails;
    saveCard?: boolean;
  }

  const handleSubmit = (e: FormSubmitEvent): void => {
    e.preventDefault()
    const submitData: SubmitData = {
        coin,
        selectedRecipient,
        paymentMethod,
        ...(selectedRecipient === 'gift' && { recipientEmail, giftMessage }),
        ...(paymentMethod === 'credit' && { cardDetails, saveCard })
    }
    console.log('ซื้อสินค้า:', submitData)
    
    if (selectedRecipient === 'self') {
      router.push(`/account/mycoin/success?coinId=${coinId}&price=${coin.price}&title=${encodeURIComponent(coin.title)}&image=${encodeURIComponent(coin.image)}`)
    } else {
      router.push(`/account/mycoin/success-gift?email=${encodeURIComponent(recipientEmail)}`)
    }
  }

  useEffect(() => {
    if (giftFormRef.current) {
      if (selectedRecipient === 'gift') {
        giftFormRef.current.style.maxHeight = `${giftFormRef.current.scrollHeight}px`
        giftFormRef.current.style.opacity = '1'
      } else {
        giftFormRef.current.style.maxHeight = '0'
        giftFormRef.current.style.opacity = '0'
      }
    }
  }, [selectedRecipient])

  useEffect(() => {
    if (creditFormRef.current) {
      if (paymentMethod === 'credit') {
        creditFormRef.current.style.maxHeight = `${creditFormRef.current.scrollHeight}px`
        creditFormRef.current.style.opacity = '1'
      } else {
        creditFormRef.current.style.maxHeight = '0'
        creditFormRef.current.style.opacity = '0'
      }
    }
  }, [paymentMethod])

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts: string[] = []
    
    for (let i = 0; i < match.length; i += 4) {
        parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
        return parts.join(' ')
    } else {
        return value
    }
  }

  const formatExpiryDate = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
        return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formatted = formatCardNumber(e.target.value)
    setCardDetails({ ...cardDetails, cardNumber: formatted })
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formatted = formatExpiryDate(e.target.value)
    setCardDetails({ ...cardDetails, expiry: formatted })
  }

  return (
    <div>
      <div className="flex items-center text-gray-600 mb-4">
        <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
          <ArrowLeft color="#5F6368" />
          <span>หน้าแรก</span>
        </Link>
        <span className="mx-2">/</span>
        <Link href="/account/mycoin" className="text-[#D6A985] hover:underline">KUMAま Coin ของฉัน</Link>
        <span className="mx-2">/</span>
        <span className="text-[#D6A985]">เติม KUMAま Coin ของฉัน</span>
      </div>

      <div className="flex gap-6">
        <AccountSidebar />
        
        <div className="flex-1">
          <div className="w-full bg-white rounded shadow-sm p-6">
            <div className="flex items-center pb-3 mb-4 border-b border-gray-100 h-[60px]">
              <div className="w-10 h-10 rounded-full bg-[#D6A985] flex items-center justify-center mr-4">
                <img 
                  src="/images/Paw_icon.png" 
                  alt="Paw_icon" 
                />
              </div>
              <h2 className="text-[28px] font-bold text-[#B86A4B] m-0">เติม KUMAま Coin ของฉัน</h2>
            </div>

            <div className="h-[260px] mb-6">
              <div className="flex items-start">
                <div className="mr-6">
                  <div className="w-[220px] h-[220px] border-[2px] border-[#D6A985] rounded-lg flex items-center justify-center">
                    <img 
                      src={coin.image} 
                      alt={coin.title}
                      className="w-[180px] h-[110px]" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-[22px] font-bold text-[#5F6368]">
                    {coin.title} <img src="/images/kumacoin.png" alt="Coin Icon" className="w-6 h-6 ml-1" />
                  </div>
                  <div className="text-[32px] font-bold text-[#B86A4B] mt-1">฿ {coin.price}</div>
                  <div className="text-[16px] text-gray-500 mt-1">
                    ใช้ได้ก่อน 31/12/2025 | 
                    <span 
                      className="text-[#D6A985] cursor-pointer hover:underline ml-1 transition-all duration-300 hover:text-[#B86A4B]" 
                      onClick={() => setIsTermsModalOpen(true)}
                    >
                      เงื่อนไข
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-8">
                <div className="flex items-center mb-4 pb-2 border-b border-[#D6A985] border-opacity-30">
                    <div className="w-8 h-8 rounded-full bg-[#D6A985] flex items-center justify-center text-white font-bold mr-2">
                    1
                    </div>
                    <h2 className="text-[20px] font-bold text-[#5F6368]">เลือกผู้รับ</h2>
                </div>
                
                <div className="space-y-2">
                    <div 
                    className={`block rounded-md p-3 transition duration-200 cursor-pointer border ${selectedRecipient === 'self' ? 'border-[#D6A985] shadow-sm' : 'border-[#AFB2B6] hover:border-[#D6A985] hover:shadow-sm'}`}
                    onClick={() => setSelectedRecipient('self')}
                    >
                    <label className="custom-radio block cursor-pointer">
                        <input 
                        type="radio" 
                        name="recipient" 
                        value="self" 
                        checked={selectedRecipient === 'self'}
                        onChange={() => setSelectedRecipient('self')}
                        className="hidden" 
                        />
                        <span className="radio-mark"></span>
                        <span className="text-gray-700">สำหรับตัวเอง</span>
                    </label>
                    </div>
                  
                    <div className={`block rounded-md transition duration-200 border ${selectedRecipient === 'gift' ? 'border-[#D6A985] shadow-sm' : 'border-[#AFB2B6] hover:border-[#D6A985] hover:shadow-sm'}`}>
                    <div 
                        className="p-3 cursor-pointer"
                        onClick={() => setSelectedRecipient('gift')}
                    >
                        <label className="custom-radio block cursor-pointer">
                        <input 
                            type="radio" 
                            name="recipient" 
                            value="gift"
                            checked={selectedRecipient === 'gift'}
                            onChange={() => setSelectedRecipient('gift')}
                            className="hidden" 
                        />
                        <span className="radio-mark"></span>
                        <span className="text-gray-700">ส่งเป็นของขวัญ</span>
                        </label>
                    </div>
                    
                    <div 
                        ref={giftFormRef}
                        className="overflow-hidden transition-all duration-500 max-h-0 opacity-0 px-3 pb-0"
                    >
                        <div className="border-t border-gray-200 pt-4 pl-7 pb-3">
                        <div className="text-[#E74C3C] text-sm mb-3">
                            คำเตือน : กรุณาตรวจสอบข้อมูลผู้รับของขวัญให้ถูกต้องทุกครั้ง ทางบริษัทฯ ขอสงวนสิทธิ์ในการแก้ไขการส่งของขวัญ หลังจากคำสั่งซื้อเสร็จสิ้น
                        </div>
                        
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            อีเมลผู้รับ
                            </label>
                            <input 
                              type="email" 
                              placeholder="อีเมลผู้รับ"
                              value={recipientEmail}
                              onChange={(e) => setRecipientEmail(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D6A985] focus:border-[#D6A985]"
                              required={selectedRecipient === 'gift'}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            ข้อความแนบของขวัญ (ถ้ามี)
                            </label>
                            <textarea 
                              placeholder="ข้อความแนบของขวัญ (ถ้ามี)"
                              value={giftMessage}
                              onChange={(e) => setGiftMessage(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D6A985] focus:border-[#D6A985] min-h-[80px]"
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="mb-8">
                <div className="flex items-center mb-4 pb-2 border-b border-[#D6A985] border-opacity-30">
                    <div className="w-8 h-8 rounded-full bg-[#D6A985] flex items-center justify-center text-white font-bold mr-2">
                    2
                    </div>
                    <h2 className="text-[20px] font-bold text-[#5F6368]">วิธีการชำระเงิน</h2>
                </div>
                
                <div className="space-y-2">
                    <div 
                    className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${paymentMethod === 'qr' || paymentMethod === '' ? 'border-[#D6A985]' : 'border-[#AFB2B6]'} hover:border-[#D6A985] hover:shadow-sm transition duration-200`}
                    onClick={() => setPaymentMethod('qr')}
                    >
                    <div className="flex items-center">
                        <label className="custom-radio w-full cursor-pointer">
                        <input 
                            type="radio" 
                            name="payment" 
                            value="qr"
                            checked={paymentMethod === 'qr' || paymentMethod === ''}
                            onChange={() => setPaymentMethod('qr')}
                            className="hidden" 
                        />
                        <span className="radio-mark"></span>
                        <span className="text-gray-700">QR พร้อมเพย์</span>
                        </label>
                    </div>
                    <img src="/images/promptpay.png" alt="PromptPay" className="h-8" />
                    </div>
                    
                    <div className={`rounded-md transition duration-200 border ${paymentMethod === 'credit' ? 'border-[#D6A985]' : 'border-[#AFB2B6]'} hover:border-[#D6A985] hover:shadow-sm`}>
                    <div 
                        className="flex justify-between items-center p-3 cursor-pointer"
                        onClick={() => setPaymentMethod('credit')}
                    >
                        <div className="flex items-center">
                        <label className="custom-radio w-full cursor-pointer">
                            <input 
                            type="radio" 
                            name="payment" 
                            value="credit"
                            checked={paymentMethod === 'credit'}
                            onChange={() => setPaymentMethod('credit')}
                            className="hidden" 
                            />
                            <span className="radio-mark"></span>
                            <span className="text-gray-700">บัตรเครดิต / บัตรเดบิต</span>
                        </label>
                        </div>
                        <div className="flex space-x-1">
                        <img src="/images/image 14.png" alt="Mastercard" className="h-8" />
                        <img src="/images/image 13.png" alt="Visa" className="h-8" />
                        </div>
                    </div>
                    
                    <div 
                        ref={creditFormRef}
                        className="overflow-hidden transition-all duration-500 max-h-0 opacity-0 px-3 pb-0"
                    >
                        <div className="border-t border-gray-200 pt-4 pb-3">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            หมายเลขบัตร
                            </label>
                            <div className="relative">
                            <input 
                                type="text" 
                                value={cardDetails.cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="0000 0000 0000 0000"
                                maxLength={19}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D6A985] focus:border-[#D6A985]"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <CreditCard size={16} />
                            </div>
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            ชื่อบนบัตร
                            </label>
                            <input 
                            type="text" 
                            value={cardDetails.cardName}
                            onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                            placeholder="ชื่อเจ้า-นามสกุล"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D6A985] focus:border-[#D6A985]"
                            />
                        </div>
                        
                        <div className="flex gap-4 mb-4">
                            <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                วันหมดอายุ (MM/YY)
                            </label>
                            <div className="relative">
                                <input 
                                type="text" 
                                value={cardDetails.expiry}
                                onChange={handleExpiryChange}
                                placeholder="MM/YY"
                                maxLength={5}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D6A985] focus:border-[#D6A985]"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Calendar size={16} />
                                </div>
                            </div>
                            </div>
                            
                            <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                            </label>
                            <div className="relative">
                                <input 
                                type="password" 
                                value={cardDetails.cvv}
                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                placeholder="***"
                                maxLength={3}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D6A985] focus:border-[#D6A985]"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Lock size={16} />
                                </div>
                            </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center">
                            <input 
                            type="checkbox" 
                            id="saveCard" 
                            checked={saveCard}
                            onChange={(e) => setSaveCard(e.target.checked)}
                            className="w-4 h-4 text-[#D6A985] border-gray-300 rounded focus:ring-[#D6A985]"
                            />
                            <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
                            จำบัตรใบนี้
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                    <div 
                    className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${paymentMethod === 'banking' ? 'border-[#D6A985]' : 'border-[#AFB2B6]'} hover:border-[#D6A985] hover:shadow-sm transition duration-200`}
                    onClick={() => setPaymentMethod('banking')}
                    >
                    <div className="flex items-center">
                        <label className="custom-radio w-full cursor-pointer">
                        <input 
                            type="radio" 
                            name="payment" 
                            value="banking"
                            checked={paymentMethod === 'banking'}
                            onChange={() => setPaymentMethod('banking')}
                            className="hidden"
                        />
                        <span className="radio-mark"></span>
                        <span className="text-gray-700">ชำระเงินผ่านเคาน์เตอร์</span>
                        </label>
                    </div>
                    <div className="flex space-x-1">
                        <img src="/images/bigC.png" alt="bigC" className="h-8" />
                        <img src="/images/bunterm.png" alt="bunterm" className="h-8" />
                        <img src="/images/cenpay.png" alt="cenpay" className="h-8" />
                        <img src="/images/playpost.png" alt="playpost" className="h-8" />
                        <img src="/images/lotus.png" alt="Lotus's" className="h-8" />
                    </div>
                    </div>
                    
                    <div 
                    className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${paymentMethod === 'mbanking' ? 'border-[#D6A985]' : 'border-[#AFB2B6]'} hover:border-[#D6A985] hover:shadow-sm transition duration-200`}
                    onClick={() => setPaymentMethod('mbanking')}
                    >
                    <div className="flex items-center">
                        <label className="custom-radio w-full cursor-pointer">
                        <input 
                            type="radio" 
                            name="payment" 
                            value="mbanking"
                            checked={paymentMethod === 'mbanking'}
                            onChange={() => setPaymentMethod('mbanking')}
                            className="hidden" 
                        />
                        <span className="radio-mark"></span>
                        <span className="text-gray-700">ชำระเงินผ่าน ATM และ บริการธนาคารทางอินเทอร์เน็ต</span>
                        </label>
                    </div>
                    <div className="flex space-x-1">
                        <img src="/images/Ksikorn.png" alt="Kasikorn" className="h-8" />
                        <img src="/images/scb.png" alt="SCB" className="h-8" />
                        <img src="/images/krungsri.png" alt="Krungsri" className="h-8" />
                        <img src="/images/krungthai.png" alt="KTB" className="h-8" />
                        <img src="/images/bue.png" alt="bue" className="h-8" />
                    </div>
                    </div>
                    
                    <div 
                    className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${paymentMethod === 'truemoney' ? 'border-[#D6A985]' : 'border-[#AFB2B6]'} hover:border-[#D6A985] hover:shadow-sm transition duration-200`}
                    onClick={() => setPaymentMethod('truemoney')}
                    >
                    <div className="flex items-center">
                        <label className="custom-radio w-full cursor-pointer">
                        <input 
                            type="radio" 
                            name="payment" 
                            value="truemoney"
                            checked={paymentMethod === 'truemoney'}
                            onChange={() => setPaymentMethod('truemoney')}
                            className="hidden" 
                        />
                        <span className="radio-mark"></span>
                        <span className="text-gray-700">ชำระเงินผ่าน TrueMoney Wallet</span>
                        </label>
                    </div>
                    <img src="/images/truemoneywallet.png" alt="TrueMoney" className="h-8" />
                    </div>
                    
                    <div 
                    className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${paymentMethod === 'linepay' ? 'border-[#D6A985]' : 'border-[#AFB2B6]'} hover:border-[#D6A985] hover:shadow-sm transition duration-200`}
                    onClick={() => setPaymentMethod('linepay')}
                    >
                    <div className="flex items-center">
                        <label className="custom-radio w-full cursor-pointer">
                        <input 
                            type="radio" 
                            name="payment" 
                            value="linepay"
                            checked={paymentMethod === 'linepay'}
                            onChange={() => setPaymentMethod('linepay')}
                            className="hidden" 
                        />
                        <span className="radio-mark"></span>
                        <span className="text-gray-700">ชำระเงินผ่าน Rabbit LINE Pay</span>
                        </label>
                    </div>
                    <img src="/images/rabbitlinepay.png" alt="LINE Pay" className="h-8" />
                    </div>
                    
                    <div 
                    className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${paymentMethod === 'alipay' ? 'border-[#D6A985]' : 'border-[#AFB2B6]'} hover:border-[#D6A985] hover:shadow-sm transition duration-200`}
                    onClick={() => setPaymentMethod('alipay')}
                    >
                    <div className="flex items-center">
                        <label className="custom-radio w-full cursor-pointer">
                        <input 
                            type="radio" 
                            name="payment" 
                            value="alipay"
                            checked={paymentMethod === 'alipay'}
                            onChange={() => setPaymentMethod('alipay')}
                            className="hidden" 
                        />
                        <span className="radio-mark"></span>
                        <span className="text-gray-700">ชำระเงินผ่าน Alipay</span>
                        </label>
                    </div>
                    <img src="/images/airplay.png" alt="Alipay" className="h-8" />
                    </div>
                </div>
                </div>
                <div className="relative border-4 border-[#D6A985] rounded-xl p-[2px]">
                    <div className="absolute inset-0 border-2 border-white rounded-lg m-[4px]"></div>
                    <button 
                        type="submit"
                        className="bg-[#D6A985] text-white w-full py-3 rounded-lg font-bold text-lg hover:bg-[#C39874] transition duration-300 relative z-10"
                    >
                        สั่งซื้อสินค้า
                    </button>
                  </div>
            </form>
          </div>
        </div>
      </div>
      
      <TermsModal 
        isOpen={isTermsModalOpen} 
        onClose={() => setIsTermsModalOpen(false)} 
      />
    </div>
  )
}
                