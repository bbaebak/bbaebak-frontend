'use client';

import { use, useEffect, useState } from 'react';
import Sign from './components/Sign';
import { postBbaebak, postMateSign } from 'app/api/apiList';
// import Stamp from './components/Stamp';

interface SignatureType {
  maker: string;
  mates: MatesType[];
  status: string;
}

interface MatesType {
  id: string;
  name: string;
  isSigned: boolean;
}
[];

export default function Signature({ maker, mates, status }: SignatureType) {
  console.log('서명 데이터', maker, mates, status);
  const [matesData, setMatesData] = useState<MatesType[]>([]);
  // const [onSign, setOnSign] = useState<MatesType[]>([]);
  const [onSignEdit, setOnSignEdit] = useState(true);

  const handleClick = (value: string) => {
    console.log('클릭했다', value);
    setOnSignEdit(false);
    // 메이트 서명
    // const handleFetch = async () => {
    //   try {
    //     const res = await postMateSign();
    //     // const res = await postBbaebak();
    //     const data = res.data.data.id;
    //   } catch (error) {
    //     console.log('에러', error);
    //   }
    // };
    // handleFetch();
  };

  // useEffect(() => {
  //   if (mates.length > 0) {
  //     setOnSignEdit([...mates]);
  //   }

  //   console.log('온사인 유즈스테이트', onSignEdit);
  // }, [mates]);

  return (
    <section className="grid grid-cols-2 p-[12px_16px] justify-center items-end gap-[24px] self-stretch border-t border-b border-[#97D0EC] mt-[12px]">
      <Sign
        id={'user'}
        name={maker}
        onClick={() => handleClick}
        isSigned={true}
        onEdit={onSignEdit}
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
              name={item.name}
              onClick={() => handleClick}
              isSigned={item.isSigned}
              className={positionClass}
              onEdit={onSignEdit}
            />
          );
        })}
    </section>
  );
}
