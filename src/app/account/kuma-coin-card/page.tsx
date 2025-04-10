'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import AccountSidebar from '@/app/account/component/sidebar'
import TermsModal from '@/app/component/terms-modal'

interface CoinCard {
  id: string;
  image: string;
  title: string;
  price: string;
  date: string;
  status: 'active' | 'used';
  purchaseDate: string;
}

export default function KumaCoinCardPage() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false)
  const [cards, setCards] = useState<CoinCard[]>([])
  const [selectedCardTitle, setSelectedCardTitle] = useState('')
  const [selectedCardId, setSelectedCardId] = useState('')
  
  useEffect(() => {
    const savedCards = localStorage.getItem('userCoinCards')
    let existingCards: CoinCard[] = []
    
    if (savedCards) {
      try {
        existingCards = JSON.parse(savedCards)
        setCards(existingCards)
      } catch (e) {
        console.error("Error parsing saved cards:", e)
        existingCards = []
      }
    }

    const newPurchase = sessionStorage.getItem('newCoinPurchase')
    if (newPurchase) {
      try {
        const purchaseData = JSON.parse(newPurchase)
        
        const newCard: CoinCard = {
          id: Date.now().toString(),
          image: purchaseData.image || `/images/card${purchaseData.coinId.replace('coin', '')}.png`,
          title: purchaseData.title || `บัตรเติม ${purchaseData.coinId.replace('coin', '')} Coin`,
          price: purchaseData.price || getDefaultPrice(purchaseData.coinId),
          date: '31/12/2025',
          status: 'active',
          purchaseDate: new Date().toLocaleDateString('th-TH')
        }
        
        const updatedCards = [newCard, ...existingCards]
        setCards(updatedCards)
        
        localStorage.setItem('userCoinCards', JSON.stringify(updatedCards))
        
        sessionStorage.removeItem('newCoinPurchase')
      } catch (e) {
        console.error("Error processing new purchase:", e)
      }
    }
  }, [])
  
  function getDefaultPrice(coinId: string): string {
    const prices: {[key: string]: string} = {
      '1000coin': '990',
      '3000coin': '2950', 
      '5000coin': '4850',
      '10000coin': '9500',
      '15000coin': '13900',
      '25000coin': '22900',
      '35000coin': '31900'
    }
    return prices[coinId] || '990'
  }
  
  const showUseCardConfirmation = (cardId: string) => {
    const selectedCard = cards.find(card => card.id === cardId)
    if (selectedCard) {
      setSelectedCardTitle(selectedCard.title)
      setSelectedCardId(cardId)
      setIsSuccessPopupOpen(true)
    }
  }
  const confirmUseCard = () => {
    try {
      if (selectedCardId) {
        const updatedCards = cards.map(card => {
          if (card.id === selectedCardId) {
            return { ...card, status: 'used' as const }
          }
          return card
        })
        setCards(updatedCards)
        localStorage.setItem('userCoinCards', JSON.stringify(updatedCards))
        setIsSuccessPopupOpen(false)
      }
    } catch (error) {
      console.error('Error updating card:', error)
      setIsSuccessPopupOpen(false)
    }
  }
  
  const cancelUseCard = () => {
    setIsSuccessPopupOpen(false)
  }

  return (
    <div>
      <div className="flex items-center text-gray-600 mb-4">
        <Link href="/" className="flex items-center gap-2 hover:text-[#B86A4B]">
          <ArrowLeft color="#5F6368" />
          <span>หน้าแรก</span>
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#D6A985]">บัตรเติม KUMAま Coin ของฉัน</span>
      </div>

      <div className="flex gap-6">
        <AccountSidebar />
        
        <div className="flex-1">
          <div className="w-full bg-white rounded shadow-sm p-6">
            <div className="flex items-center pb-3 mb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#D6A985] flex items-center justify-center mr-4">
                <img 
                  src="/images/Paw_icon.png" 
                  alt="Paw_icon" 
                />
              </div>
              <h2 className="text-[28px] font-bold text-[#B86A4B] m-0">บัตรเติม KUMAま Coin ของฉัน</h2>
            </div>

            {cards.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-[#5F6368] text-[24px]">คุณยังไม่มีบัตรเติม KUMAま Coin</p>
                <Link href="/account/mycoin">
                  <button className="mt-4 bg-[#D6A985] text-white px-6 py-2 rounded transition-colors">
                    ซื้อบัตรเติม KUMAま Coin
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cards.map((card) => (
                  <div key={card.id} className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="mr-6">
                        <div className="border-[2px] border-[#D6A985] rounded-lg p-2 w-[180px] h-[140px] flex items-center justify-center">
                          <img src={card.image} alt={card.title} className="w-[150px] h-auto" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[24px] font-bold text-[#5F6368]">
                              {card.title} <img src="/images/kumacoin.png" alt="Coin" className="inline-block ml-1 w-5 h-5" />
                            </div>
                            <div className="text-[24px] font-bold text-[#B86A4B] mt-1">฿{card.price}</div>
                            <div className="text-gray-500 text-[18px] mt-1">ใช้ได้ก่อน {card.date} | 
                              <span 
                                className="text-[#D6A985] cursor-pointer hover:underline ml-1" 
                                onClick={() => setIsTermsModalOpen(true)}
                              >
                                เงื่อนไข
                              </span>
                            </div>
                            <div className="text-gray-500 text-[18px] mt-1">
                              วันที่ซื้อ: {card.purchaseDate}
                            </div>
                          </div>
                          <div className="flex justify-start">
                            {card.status === "active" ? (
                                <button
                                onClick={() => showUseCardConfirmation(card.id)}
                                className="bg-[#D6A985] rounded-[30px] text-white px-4 py-2 hover:bg-[#C39874] transition-colors w-[130px] h-[50px] ml-auto text-[18px]"
                                >
                                ใช้บัตร
                                </button>
                            ) : (
                                <div className="px-4 py-2 bg-gray-200 text-gray-500 rounded-[30px] w-[130px] h-[50px] flex items-center justify-center text-[18px]">
                                ใช้แล้ว
                                </div>
                            )}
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <TermsModal 
        isOpen={isTermsModalOpen} 
        onClose={() => setIsTermsModalOpen(false)} 
      />

      {isSuccessPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <h3 className="text-[24px] font-semibold text-[#D6A985] text-left">คุณต้องการใช้บัตรหรือไม่ ?</h3>
              <p className="mb-6 text-[#5F6368] text-[20px] text-left">คุณต้องการใช้{selectedCardTitle}</p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={confirmUseCard} 
                  className="bg-[#D6A985] text-white px-12 py-3 rounded transition-colors w-1/2"
                >
                  ใช่
                </button>
                <button 
                  onClick={cancelUseCard} 
                  className="border border-gray-300 text-gray-700 px-12 py-3 rounded transition-colors w-1/2"
                >
                  ไม่
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}