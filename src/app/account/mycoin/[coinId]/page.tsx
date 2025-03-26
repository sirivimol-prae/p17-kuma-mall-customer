'use client'

import { useParams } from 'next/navigation'
import SingleCoinCard from '../single-coins-cards/page'

export default function CoinPage() {
  const params = useParams()
  console.log("CoinPage params:", params)
  return <SingleCoinCard params={params} />
}