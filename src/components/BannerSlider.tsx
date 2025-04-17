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
    <div className="relative w-full max-w-[1440px] h-[680px] overflow-hidden mx-auto p-0 m-0">
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
            sizes="(max-width: 1440px) 100vw, 1440px"
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
    </div>
  )
}