'use client';

import { useState } from 'react';

export default function Sign({ value, id, onClick }) {
  const [onSign, setOnSign] = useState(false);
  const handleClick = () => {
    onClick(id);
    setOnSign(true);
  };
  return (
    <div
      className={`flex ${onSign ? 'text-red-500' : 'text-black'}`}
      onClick={handleClick}
    >
      <p>{value}</p>
      <p>인</p>
    </div>
  );
}
