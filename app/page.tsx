'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function App() {
  const [certificates] = useState([
    { id: 1, title: '증명서 이미지' },
    { id: 2, title: '증명서 이미지' },
    { id: 3, title: '증명서 이미지' },
  ]);

  const handleDetailedCreation = () => {
    toast(
      <div className="flex items-center gap-2">
        <Image src="/warning.svg" alt="준비중" width={24} height={21} />
        <span>아직 준비중이에요!</span>
      </div>
    );
  };

  return (
    <main className="flex flex-col min-h-[932px] w-[430px] bg-white px-4 py-6 ">
      {/* Main Title */}
      <div className="space-y-2 mb-8 ">
        <h1 className="text-black text-[28px] ml-6 font-semibold font-['SUIT']">
          말로만 만나자는 약속,
          <br />
          진심으로 만나고 싶다면?
        </h1>
        <div className="text-zinc-700 text-[18px] ml-6 font-medium font-['SUIT']">
          빼박으로 가볍게 약속 증명서 만들자!
        </div>
      </div>

      {/* Blue Card */}

      <Link href="/bbaebakCreate">
        {' '}
        {/* Link로 감싸기 */}
        <div className="bg-blue-400 rounded-lg p-6 ml-6 mr-6 text-white mb-4 flex justify-between items-center cursor-pointer">
          <div>
            <h2 className="self-stretch text-white text-[22px] font-bold leading-[29px]">
              우리 언제
              <br />밥 한번 먹자!
            </h2>
            <div className="text-sky-100 mt-4 font-custom-16 text-base font-medium">
              언제쯤 누구와 만나는 지만 알려주면 <br />
              바로 증명서를 만들 수 있어요!
            </div>
          </div>
          <div className="w-20 h-20 relative">
            <div className="w-[69.75px] h-[69.53px] left-[5px] top-[5.49px] absolute"></div>
          </div>
          <Image src="/rice.svg" alt="밥약" width={80} height={80} />
        </div>
      </Link>

      {/* Light Blue Section */}

      <div
        className="h-[111px] ml-6 mr-6 p-6 mb-8 bg-sky-100 rounded-lg flex-col justify-start items-start gap-2 inline-flex"
        onClick={handleDetailedCreation}
      >
        <div className="self-stretch  text-zinc-700 text-[22px] font-bold font-['SUIT'] mb-8 leading-[29px]">
          더 자세한 빼박 만들기
        </div>
        <div className=" self-stretch text-blue-400 text-base font-medium font-['SUIT']">
          회사, 학교, 온오프라인 모임까지!
          <br />
          구체적인 템플릿을 준비했어요
        </div>
      </div>

      {/* Certificate Count */}
      <div className="mb-4">
        <p className="text-gray-600 ml-6 mr-6">
          지금까지 총 <span className="text-sky-400 font-bold">4000</span>개의
          빼박 증명서가 만들어졌어요!
        </p>
      </div>

      {/* Certificate Preview Scroll */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide ml-6 mr-6">
          {certificates.map(cert => (
            <div
              key={cert.id}
              className="
              w-[159px] h-[250px] py-[99px] bg-white rounded-lg border border-neutral-200 flex-col justify-center items-center inline-flex"
              // className="flex-none w-[200px] h-[280px] border border-gray-200 rounded-xl flex items-center justify-center"
            >
              <span className="w-[159px] h-[250px] self-stretch text-center text-black text-2xl font-bold font-['Inter'">
                {cert.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
