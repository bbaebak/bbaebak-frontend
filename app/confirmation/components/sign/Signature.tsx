'use client';

import { useEffect, useState } from 'react';
import Sign from './components/Sign';

export default function Signature({ maker, mates, status }) {
  console.log('서명 데이터', maker, mates, status);
  const [onSign, setOnSign] = useState([]);

  const handleClick = value => {
    console.log('클릭했다', value);
    setOnSign(true);
  };

  return (
    <section className="grid grid-cols-2 p-[12px_16px] justify-center items-end gap-[64px] self-stretch border-t border-b border-[#97D0EC]">
      <Sign
        id={'user'}
        value={maker}
        onClick={handleClick}
        onSign={true}
        className="col-start-2 row-start-3"
      />
      {Array.isArray(mates) &&
        mates.map((item, index) => {
          let positionClass = '';
          // 각 항목의 위치 설정
          if (index === 0) {
            positionClass = 'col-start-1 row-start-3'; // 2
          } else if (index === 1) {
            positionClass = 'col-start-2 row-start-2'; // 4
          } else if (index === 2) {
            positionClass = 'col-start-1 row-start-2'; // 3
          } else if (index === 3) {
            positionClass = 'col-start-2 row-start-1'; // 6
          } else if (index === 4) {
            positionClass = 'col-start-1 row-start-1'; // 5
          }
          return (
            <Sign
              key={item.id}
              id={item.id}
              value={item.name}
              onClick={handleClick}
              isSigned={item.isSigned}
              className={positionClass}
            />
          );
        })}
    </section>
  );
}
