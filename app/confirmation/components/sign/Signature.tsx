'use client';

import { use, useEffect, useState } from 'react';
import Sign from './components/Sign';
import { postBbaebak, postMateSign } from 'app/api/apiList';
import StampModal from 'app/common_components/StampModal';
// import Stamp from './components/Stamp';

interface SignatureType {
  maker: string;
  mates: MatesType[];
  status: string;
  id: string;
}

interface MatesType {
  id: string;
  name: string;
  isSigned: boolean;
}

export default function Signature({ id, maker, mates, status }: SignatureType) {
  console.log('서명 데이터', maker, mates, status);
  const [matesData, setMatesData] = useState({
    id: '',
    mateId: '',
    isSigned: false,
  });
  // const [onSign, setOnSign] = useState<MatesType[]>([]);
  const [onSignEdit, setOnSignEdit] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [yesBbaeback, setYesBbaeback] = useState(false);

  const handleClick = async (mateId: string) => {
    setMatesData({
      id: id,
      mateId: mateId,
      isSigned: true,
    });
    setIsModal(true);
    console.log('클릭했다', mateId);
    setOnSignEdit(false);
  };
  // useEffect(() => {
  //   if (mates.length > 0) {
  //     setOnSignEdit([...mates]);
  //   }

  //   console.log('온사인 유즈스테이트', onSignEdit);
  // }, [mates]);

  const handleModalClose = () => {
    setIsModal(false);
  };

  const handleModalOk = async () => {
    try {
      const res = await postMateSign(matesData);
      // const res = await postBbaebak();
      const data = res;
      console.log('받은 res', res);
    } catch (error) {
      console.log('에러', error);
    }
  };

  return (
    <section className="grid grid-cols-2 p-[12px_16px] justify-center items-end gap-[24px] self-stretch border-t border-b border-[#97D0EC] mt-[12px]">
      <Sign
        id={'user'}
        name={maker}
        maker={maker}
        onClick={handleClick}
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
              maker={maker}
              onClick={handleClick}
              isSigned={item.isSigned}
              className={positionClass}
              onEdit={onSignEdit}
            />
          );
        })}
      {/* <StampModal
        isVisible={isModal}
        name={maker}
        onClose={handleModalClose}
        onClick={handleModalOk}
      /> */}
    </section>
  );
}
