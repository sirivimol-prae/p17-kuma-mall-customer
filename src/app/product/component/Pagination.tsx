import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
      else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
      else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mx-1 w-8 h-8 flex items-center justify-center rounded-full ${
          currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#D6A985] border border-[#D6A985] hover:bg-[#D6A985] hover:text-white'
        }`}
      >
        <ChevronLeft size={18} />
      </button>
      {pageNumbers.map((page, index) => (
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="mx-1">...</span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(Number(page))}
            className={`mx-1 w-8 h-8 rounded-full ${
              currentPage === page 
                ? 'bg-[#D6A985] text-white' 
                : 'text-[#5F6368] border border-gray-300 hover:border-[#D6A985]'
            }`}
          >
            {page}
          </button>
        )
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`mx-1 w-8 h-8 flex items-center justify-center rounded-full ${
          currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[#D6A985] border border-[#D6A985] hover:bg-[#D6A985] hover:text-white'
        }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;