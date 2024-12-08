'use client';

import Contents from './components/contents/Contents';
import Date from './components/contents/Date';
import NewButton from './components/button/NewButton';
import RefreshButton from './components/button/RefreshButton';
import SaveImageButton from './components/button/SaveImageButton';
import ShareButton from './components/button/ShareButton';
import Signature from './components/sign/Signature';
import mockData from './mockData.json';
import Title from './components/contents/Title';
import Image from 'next/image';
import polygon from '@public/polygon.svg';
import Notice from './components/button/Notice';
import stamp1 from '@public/stamp/1.svg';
import Stamp from './components/sign/components/Stamp';
import { instance } from 'app/api';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { getBbaebakDetail, postBbaebak } from 'app/api/apiList';
import ShareModal from 'app/common_components/ShareModal';
import axios from 'axios';
import { useEffect, useState } from 'react';

const URL = 'https://port-0-bbaebak-nestjs-m4eg5ca3338e8c5c.sel4.cloudtype.app';
const ID = 'd512b9ac-4d30-4fee-ae0f-444533555cd5'; // 약속 아이디

// async function getData() {
//   const params = useParams();
//   const res = await getBbaebakDetail(id);
//   console.log('res 정보', res);
//   return res;
//   // const res = await fetch(`${URL}/bbaebak/${params.id}`);
//   // const json = await res.json();
//   // return json;
// }
interface fetchDataType {
  id: string;
  maker: string;
  date: string;
  desc: string;
  status: string;
  mates: {
    id: string;
    name: string;
    isSigned: boolean;
  }[];
  createdAt: any;
  updatedAt: any;
}

export default function Confirmation() {
  const [data, setData] = useState<fetchDataType>({
    id: '',
    maker: '',
    date: '',
    desc: '',
    status: '',
    mates: [],
    createdAt: '',
    updatedAt: '',
  });

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await getBbaebakDetail(ID);
        console.log('데이터 정보다', res.data.data);
        const data = res.data.data;
        setData({
          ...data,
        });
      } catch (error) {
        console.error('데이터 조회 에러', error);
      }
    };
    handleFetch();
  }, [ID]);

  const { id, maker, date, desc, status, mates, createdAt, updatedAt } = data;

  return (
    <div className="flex flex-col w-[430px] h-[932px] ">
      <header className="inline-flex justify-center items-center py-0 px-[93.5px] relative mt-[34px] mb-[24px]">
        <Title status={status} />
        <RefreshButton />
      </header>
      <section
        id="signDocument"
        className=" flex p-[24px] flex-col justify-center items-center gap-[12px] self-stretch rounded-[2px] bg-[#F6F5F2]"
      >
        <Date value={createdAt} />
        <Contents {...data} />
        <Notice status={status} />

        <Signature maker={maker} mates={mates} status={status} />
      </section>

      <section>
        <div className="flex items-start gap-4 self-stretch mt-[24px]">
          <SaveImageButton />
          <ShareButton />
          {/* <ShareModal isVisible={true} /> */}
        </div>
        <NewButton />
      </section>
    </div>
  );
}

// [공통 언어]

// 약속: bbaebak
// 약속하는 사람: maker
// 약속할 상대: mate
// 도장(=서명): stamp
