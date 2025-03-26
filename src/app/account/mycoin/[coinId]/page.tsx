'use client'

// File path: src\app\account\mycoin\[coinId]\page.tsx
import SingleCoinCard from '../single-coins-cards/page'

export default function CoinPage({ params }) {
  return <SingleCoinCard params={params} />
}