import React from 'react';

interface ResetFilterButtonProps {
  onClick: () => void;
}

const ResetFilterButton: React.FC<ResetFilterButtonProps> = ({ onClick }) => {
  return (
    <div className="mb-6 flex justify-center">
      <button
        onClick={onClick}
        className="text-[#D6A985] hover:opacity-80 transition-all duration-200 relative text-[18px]"
      >
        <span>ลบตัวกรองทั้งหมด</span>
        <div className="absolute bottom-0 left-0 w-full border-b border-[#D6A985]"></div>
      </button>
    </div>
  );
};

export default ResetFilterButton;