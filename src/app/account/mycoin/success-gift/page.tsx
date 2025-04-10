'use client'

import { useSearchParams } from 'next/navigation'
import SuccessPage from '../success-page'

export default function CoinSuccessGiftPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'null'
  
  return <SuccessPage isGift={true} recipientEmail={email} />
}