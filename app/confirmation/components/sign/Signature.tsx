'use client';

import { useEffect, useState } from 'react';
import Sign from './components/Sign';

export default function Signature({ maker, mate, stamp }) {
  console.log('서명 데이터', maker, mate, stamp);
  const [onSign, setOnSign] = useState([]);

  const handleClick = value => {
    console.log('클릭했다', value);
    setOnSign(true);
  };

  let id = 2;

  return (
    <section>
      <Sign id={1} value={maker} onClick={handleClick} onSign={onSign} />
      {Array.isArray(mate) &&
        mate.map(item => (
          <Sign
            key={item}
            id={id++}
            value={item}
            onClick={handleClick}
            onSign={onSign}
          />
        ))}
    </section>
  );
}
