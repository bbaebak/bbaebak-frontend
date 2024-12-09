'use client';

import { useState } from 'react';
import Stamp from './Stamp';

interface SignProps {
  name: string;
  id: string;
  isSigned: boolean;
  className: string;
  onEdit: boolean;
  onClick: (id: string) => void;
}

export default function Sign({
  name,
  id,
  isSigned,
  className,
  onEdit,
  onClick,
}: SignProps) {
  const [onSign, setOnSign] = useState(isSigned);
  const handleClick = () => {
    if (onSign) {
      return;
    }
    if (onEdit) {
      onClick(id);
      setOnSign(true);
    }
    console.log('클릭했다ㅏㅏㅏ');
  };
  return (
    <div
      className={`flex justify-center items-center text-[#454545] font-suit text-[18px] font-medium leading-normal ${className}`}
      onClick={handleClick}
    >
      <div className="min-w-[60px] text-right">{name}</div>
      <div className="relative w-[200px] flex items-center justify-center ">
        <p className="absolute z-0">(인)</p>
        {onSign && (
          <Stamp
            className={
              'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'
            }
          />
        )}
      </div>
    </div>
    // <div
    //   className={`${onSign ? 'text-red-500' : 'text-black'} flex fle-col  gap-[24px] text-gray-4 font-suit text-[18px] font-medium leading-normal ${className}`}
    //   onClick={handleClick}
    // >
    //   <p>{value}</p>
    //   <div className="relative inline-block">
    //     <p className="absolute inline z-0">(인)</p>
    //     {onSign && (
    //       <Stamp
    //         className={
    //           'absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    //         }
    //       />
    //     )}
    //   </div>
    // </div>
  );
}
