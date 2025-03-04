import './globals.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Kuma-Mall',
  description: 'Kuma mall',
  // keywords: 'dog food'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Navbar />
        <main style={{marginLeft: "75px", marginRight: "75px"}}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}