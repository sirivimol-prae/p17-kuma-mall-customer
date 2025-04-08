import React from 'react';

interface DiscountRibbonProps {
  isActive: boolean;
  discount: string;
  isCurrent: boolean;
}

const DiscountRibbon: React.FC<DiscountRibbonProps> = ({ isActive, discount, isCurrent }) => {
  const bgColor = isCurrent ? '#B86A4B' : isActive ? '#D6A985' : '#A6A6A6';

  // SVG is needed because it has to change color depending on the level
  return (
    <div className="relative w-full flex justify-center items-center py-2">
      <div className="relative inline-block">
        <div className="absolute left-0 -top-1 z-0 transform -translate-x-[40%]">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 50 40" fill="none">
            <rect width="50" height="40" transform="translate(50 40) rotate(-180)" fill="white"/>
            <path d="M50 38C50 39.1046 49.1046 40 48 40L3.45705 40C1.91902 40 0.956577 38.3364 1.72324 37.0031L10.9268 20.9969C11.2817 20.3797 11.2817 19.6203 10.9268 19.0031L1.72324 2.99694C0.956581 1.6636 1.91903 -4.20337e-06 3.45706 -4.06891e-06L48 -1.74846e-07C49.1046 -7.82811e-08 50 0.895432 50 2L50 38Z" fill={bgColor}/>
            <rect x="50" y="3.5" width="50" height="1.5" transform="rotate(-180 50 3.5)" fill="white"/>
            <rect x="50" y="38" width="50" height="1.5" transform="rotate(-180 50 38)" fill="white"/>
          </svg>
        </div>
        
        <div className={`relative px-6 py-2 rounded-md text-[18px] text-center overflow-hidden z-10 ${
          isCurrent ? 'bg-[#B86A4B]' : isActive ? 'bg-[#D6A985]' : 'bg-[#A6A6A6]'
        } text-white min-w-[180px]`}>
          <div className="absolute inset-[2px] rounded-[5px] border-2 border-white opacity-100 pointer-events-none"></div>
          <span className="relative z-10">{discount}</span>
        </div>
        
        <div className="absolute right-0 -bottom-1 z-0 transform translate-x-[40%]">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 50 40" fill="none">
            <path d="M0 2C0 0.895431 0.895431 0 2 0H46.5429C48.081 0 49.0434 1.66361 48.2768 2.99694L39.0732 19.0031C38.7183 19.6203 38.7183 20.3797 39.0732 20.9969L48.2768 37.0031C49.0434 38.3364 48.081 40 46.5429 40H2C0.895432 40 0 39.1046 0 38V2Z" fill={bgColor}/>
            <rect y="36.5" width="50" height="1.5" fill="white"/>
            <rect y="2" width="50" height="1.5" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DiscountRibbon;