'use client';

import { useState } from 'react';
import Stamp from './Stamp';
import StampModal from 'app/common_components/StampModal';

interface SignProps {
  name: string;
  id: string;
  maker: string;
  isSigned: boolean;
  className: string;
  onEdit: boolean;
  onClick: (id: string) => void;
}

export default function Sign({
  name,
  id,
  maker,
  isSigned,
  className,
  onEdit,
  onClick,
}: SignProps) {
  // const [onSign, setOnSign] = useState(isSigned);
  // const [isModal, setIsModal] = useState(false);

  const handleClick = async () => {
    if (isSigned) {
      return;
    }
    console.log('클릭했다???');

    if (onEdit) {
      onClick(id);
    }

    // const sign = await onEdit()

    // setOnSign(true);
  };

  return (
    <div
      className={`flex justify-center items-center text-[#454545] font-suit text-[18px] font-medium leading-normal cursor-pointer ${className}`}
      onClick={handleClick}
      z-index
    >
      <div className="min-w-[60px] text-right">{name}</div>
      <div className="relative w-[200px] flex items-center justify-center ">
        <p className="absolute z-0">(인)</p>
        {isSigned && (
          <Stamp
            className={
              'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'
            }
          />
        )}
      </div>
      {/* <StampModal
        isVisible={isModal}
        name={maker}
        onClose={handleModalClose}
        onClick={handleSignOk}
      /> */}
    </div>
  );
}
