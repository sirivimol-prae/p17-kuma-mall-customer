'use client'

import React, { useState, useEffect } from 'react';

interface FlashSaleCountdownProps {
  endDate: string | Date;
  size?: 'small' | 'medium' | 'large';
  showLabels?: boolean;
  onComplete?: () => void;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

/**
 * คอมโพเนนต์นับถอยหลังสำหรับสินค้า Flash Sale
 * สามารถปรับขนาดและการแสดงผลได้
 */
const FlashSaleCountdown: React.FC<FlashSaleCountdownProps> = ({
  endDate,
  size = 'medium',
  showLabels = true,
  onComplete,
  className = '',
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ 
    days: 0, 
    hours: 0, 
    minutes: 0, 
    seconds: 0,
    isComplete: false
  });

  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(endDate).getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isComplete: true
      };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isComplete: false
    };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (newTimeLeft.isComplete && onComplete) {
        onComplete();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onComplete]);

  const formatNumber = (num: number): string => {
    return String(num).padStart(2, '0');
  };

  const sizeClasses = {
    small: {
      container: 'text-sm',
      digit: 'w-5 h-5 text-xs',
    },
    medium: {
      container: 'text-base',
      digit: 'w-7 h-7 text-sm',
    },
    large: {
      container: 'text-lg',
      digit: 'w-10 h-10 text-base',
    },
  };

  const { container, digit } = sizeClasses[size];

  return (
    <div className={`flex items-center justify-center ${container} ${className}`}>
      {timeLeft.days > 0 && (
        <>
          <div className="flex flex-col items-center">
            <div className={`bg-gray-700 text-white ${digit} flex items-center justify-center rounded`}>
              {formatNumber(timeLeft.days)}
            </div>
            {showLabels && <span className="text-xs text-gray-500 mt-1">วัน</span>}
          </div>
          <span className="mx-1 text-gray-700">:</span>
        </>
      )}

      <div className="flex flex-col items-center">
        <div className={`bg-gray-700 text-white ${digit} flex items-center justify-center rounded`}>
          {formatNumber(timeLeft.hours)}
        </div>
        {showLabels && <span className="text-xs text-gray-500 mt-1">ชม.</span>}
      </div>
      <span className="mx-1 text-gray-700">:</span>
      <div className="flex flex-col items-center">
        <div className={`bg-gray-700 text-white ${digit} flex items-center justify-center rounded`}>
          {formatNumber(timeLeft.minutes)}
        </div>
        {showLabels && <span className="text-xs text-gray-500 mt-1">นาที</span>}
      </div>
      <span className="mx-1 text-gray-700">:</span>
      <div className="flex flex-col items-center">
        <div className={`bg-gray-700 text-white ${digit} flex items-center justify-center rounded`}>
          {formatNumber(timeLeft.seconds)}
        </div>
        {showLabels && <span className="text-xs text-gray-500 mt-1">วินาที</span>}
      </div>

      {timeLeft.isComplete && (
        <div className="ml-2 text-red-500">หมดเวลา!</div>
      )}
    </div>
  );
};

export default FlashSaleCountdown;