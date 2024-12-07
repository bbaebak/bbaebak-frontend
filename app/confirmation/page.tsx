// 'use client';

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
import SignAlarm from './components/button/Notice';
import Notice from './components/button/Notice';
import stamp1 from '@public/stamp/1.svg';
import Stamp from './components/sign/components/Stamp';
// import { useParams } from 'next/navigation';

const URL = 'https://port-0-bbaebak-nestjs-m4eg5ca3338e8c5c.sel4.cloudtype.app';
const id = '1'; // 약속 아이디

// async function getData() {
//   const params = useParams();
//   const res = await fetch(`${URL}/bbaebak/${params.id}`);
//   const json = await res.json();
//   return json;
// }

export default async function Confirmation() {
  // const data = await getData();
  const data = await mockData;
  const currentData = data.filter(item => String(item.id) === String(id));

  const { maker, date, desc, status, mates, createdAt, updatedAt } =
    currentData[0];

  console.log('약속한 사람들', mates);
  return (
    <div className="flex flex-col w-[430px] h-[817px] ">
      <section className="signDocument">
        <section className="flex items-center pt-[34px] pb-[24px]">
          <Title status={status} />
        </section>
        <section className=" flex p-[24px] flex-col justify-center items-center gap-[12px] self-stretch rounded-[2px] bg-[#F6F5F2]">
          <Date value={createdAt} />
          <Contents {...currentData[0]} />
          <Notice status={status} />

          <Signature maker={maker} mates={mates} status={status} />
        </section>
      </section>
      <section>
        <div className="flex items-start gap-4 self-stretch mt-[24px]">
          <SaveImageButton />
          <ShareButton />
        </div>
        <NewButton />
      </section>
      <RefreshButton />
      {/* {status !== '완료' && (
          <section className="flex w-[260px] h-[50px]">
            <div className="inline-flex p-[8px_24px] justify-center items-center rounded-[8px] bg-[#E0DC51]">
              <p className="text-[#000] font-suit text-[17px] font-bold leading-normal">
                이름을 눌러 도장을 찍어주세요
              </p>
            </div>
            <Image className="w-[20px] h-[20px] flex-shrink-0 " src={polygon} />
          </section>
        )} */}
    </div>
  );
}

// [공통 언어]

// 약속: bbaebak
// 약속하는 사람: maker
// 약속할 상대: mate
// 도장(=서명): stamp
