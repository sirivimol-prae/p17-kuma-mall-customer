'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface BannerImage {
  src: string;
  alt: string;
}

interface BannerSliderProps {
  images: BannerImage[];
  autoSlideInterval?: number;
}

export default function BannerSlider({ 
  images, 
  autoSlideInterval = 3000 
}: BannerSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1))
  }, [images.length])

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [nextSlide, autoSlideInterval])

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-[100%] h-[250px] overflow-hidden mx-auto">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1255px) 100vw, 1255px"
            priority={index === 0}
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-white ${
              index === currentSlide 
                ? 'bg-white'
                : 'bg-transparent hover:bg-white/50'
            }`}
            aria-label={`ไปที่สไลด์ ${index + 1}`}
          />
        ))}
      </div>
      
      {/* ลูกศรซ้าย-ขวา ถ้าต้องการเพิ่ม */}
      {/*
      <button className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      */}
    </div>
  )
}