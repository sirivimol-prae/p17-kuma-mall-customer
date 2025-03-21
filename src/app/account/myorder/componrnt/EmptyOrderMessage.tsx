import React from 'react';
import Image from 'next/image';

interface EmptyOrderMessageProps {
  message: string;
}

const EmptyOrderMessage: React.FC<EmptyOrderMessageProps> = ({ message }) => {
  return (
    <div className="text-center py-10 text-[#B86A4B] text-[24px] font-bold">
      <div className="flex justify-center">
        <Image src="/images/kuma-mall-level.png" alt="logo" width={100} height={100} />
      </div>
      <br />
      {message}
    </div>
  );
};

export default EmptyOrderMessage;