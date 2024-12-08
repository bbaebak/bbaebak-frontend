'use client';

import { useEffect, useState } from 'react';
import Sign from './components/Sign';
// import Stamp from './components/Stamp';

interface SignatureType {
  maker: string;
  mates: {
    id: string;
    name: string;
    isSigned: boolean;
  }[];
  status: string;
}

export default function Signature({ maker, mates, status }: SignatureType) {
  console.log('서명 데이터', maker, mates, status);
  const [onSign, setOnSign] = useState(false);

  const handleClick = (value: string) => {
    console.log('클릭했다', value);
    setOnSign(true);
  };

  return (
    <section className="grid grid-cols-2 p-[12px_16px] justify-center items-end gap-[64px] self-stretch border-t border-b border-[#97D0EC]">
      <Sign
        id={'user'}
        value={maker}
        onClick={() => handleClick}
        isSigned={true}
        className="col-start-2 row-start-3 items-start"
      />
      {Array.isArray(mates) &&
        mates.map((item, index) => {
          let positionClass = '';
          // 각 항목의 위치 설정
          if (index === 0) {
            positionClass = 'col-start-1 row-start-3 items-end'; // 2
          } else if (index === 1) {
            positionClass = 'col-start-2 row-start-2 items-end'; // 4
          } else if (index === 2) {
            positionClass = 'col-start-1 row-start-2 items-start'; // 3
          } else if (index === 3) {
            positionClass = 'col-start-2 row-start-1 items-end'; // 6
          } else if (index === 4) {
            positionClass = 'col-start-1 row-start-1 items-start'; // 5
          }
          return (
            <Sign
              key={item.id}
              id={item.id}
              value={item.name}
              onClick={() => handleClick}
              isSigned={item.isSigned}
              className={positionClass}
            />
          );
        })}
    </section>
  );
}
