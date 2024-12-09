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
  const [matesData, setMatesData] = useState<MatesType[]>([]);
  const [editData, setEditData] = useState({
    id: '',
    mateId: '',
    isSigned: false,
  });
  // const [onSign, setOnSign] = useState<MatesType[]>([]);
  const [onSignEdit, setOnSignEdit] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [yesBbaeback, setYesBbaeback] = useState(false);

  const handleClick = async (mateId: string) => {
    setEditData({
      id: id,
      mateId: mateId,
      isSigned: true,
    });
    setIsModal(true);
  };

  const handleModalClose = () => {
    setIsModal(false);
  };

  const handleSignOk = async () => {
    setOnSignEdit(false);
    console.log('서명했다');

    try {
      const res = await postMateSign(editData);
      const data = res;
      console.log('받은 res', res);
    } catch (error) {
      console.log('에러', error);
    }
    const newData = matesData.map(item =>
      item.id === editData.mateId ? { ...item, isSigned: true } : { ...item }
    );

    setMatesData([...newData]);
    handleModalClose();
  };

  // console.log('mates 값들)
  // useEffect(() => {
  //   console.log('현재 도장찍을애들22222', mates);
  //   if (Array.isArray(mates)) {
  //     return;
  //   }
  //   setMatesData([...mates]);
  // }, []);

  useEffect(() => {
    if (mates && mates.length > 0) {
      setMatesData(mates);
    }
  }, [mates]);

  console.log('현재 도장찍을애들 사인컴ㅍㄷㄷ', mates);
  console.log('현재 도장찍을애들', matesData);
  return (
    <section className="grid grid-cols-2 p-[12px_16px] justify-center items-end gap-[12px] self-stretch border-t border-b border-[#97D0EC] ">
      <Sign
        key={id}
        id={'user'}
        name={maker}
        maker={maker}
        onClick={handleClick}
        isSigned={true}
        onEdit={onSignEdit}
        className="col-start-2 row-start-3 items-start"
      />
      {Array.isArray(matesData) &&
        matesData.map((item, index) => {
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
      <StampModal
        isVisible={isModal}
        name={maker}
        onClose={handleModalClose}
        onClick={handleSignOk}
      />
    </section>
  );
}
