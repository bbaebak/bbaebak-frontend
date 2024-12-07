'use client';

import { useState } from 'react';

export default function Sign({ value, id, isSigned, className, onClick }) {
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
      className={`${onSign ? 'text-red-500' : 'text-black'} flex justify-end items-start gap-[24px] ${className}`}
      onClick={handleClick}
    >
      <p>{value}</p>
      <p>인</p>
    </div>
  );
}
