'use client';

import { useState } from 'react';
import Stamp from './Stamp';

interface SignProps {
  value: string;
  id: string;
  isSigned: boolean;
  className: string;
  onClick: (id: string) => void;
}

export default function Sign({
  value,
  id,
  isSigned,
  className,
  onClick,
}: SignProps) {
  const [onSign, setOnSign] = useState(isSigned);
  const handleClick = () => {
    if (onSign) {
      return;
    }
    onClick(id);
    setOnSign(true);
  };
  return (
    <div
      className={`${onSign ? 'text-red-500' : 'text-black'} flex fle-col  gap-[24px] ${className}`}
      onClick={handleClick}
    >
      <p>{value}</p>
      <div className="relative inline-block">
        <p className="inline">인</p>
        {onSign && (
          <Stamp
            className={
              'absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            }
          />
        )}
      </div>
    </div>
  );
}
