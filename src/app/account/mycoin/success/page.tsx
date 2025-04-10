'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SuccessPage from '../success-page'

export default function CoinSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const coinId = searchParams.get('coinId') || '1000coin'
  const price = searchParams.get('price') || '990'
  const title = searchParams.get('title') || 'บัตรเติม 1000 Coin'
  const image = searchParams.get('image') || '/images/card1.png'
  
  useEffect(() => {
    const purchaseData = {
      coinId,
      price,
      title,
      image
    }
    sessionStorage.setItem('newCoinPurchase', JSON.stringify(purchaseData))
  }, [coinId, price, title, image])
  
  return <SuccessPage isGift={false} />
}