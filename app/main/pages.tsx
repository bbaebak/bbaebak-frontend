'use client';
import Image from 'next/image';

import { useState } from 'react';
import { toast } from 'sonner';

export default function CertificatePage() {
  const [certificates] = useState([
    { id: 1, title: '증명서 이미지' },
    { id: 2, title: '증명서 이미지' },
    { id: 3, title: '증명서' },
  ]);

  const handleDetailedCreation = () => {
    toast('상세 템플릿 선택하기', {
      description:
        '회사, 학교, 온오프라인 모임까지! 구체적인 템플릿을 준비했어요',
      action: {
        label: '확인',
        onClick: () => console.log('Toast clicked'),
      },
    });
  };

  return (
    <main className="flex flex-col min-h-[932px] w-[430px] bg-white px-4 py-6">
      {/* Main Title */}
      <div className="space-y-2 mb-8">
        <h1 className="text-2xl font-bold leading-tight">
          말로만 만나자는 약속,
          <br />
          진심으로 만나고 싶다면?
        </h1>
        <p className="text-gray-600">빼박으로 가볍게 약속 증명서 만들자!</p>
      </div>

      {/* Blue Card */}
      <div className="bg-sky-400 rounded-xl p-6 text-white mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold mb-1">
            우리 언제
            <br />밥 한번 먹자!
          </h2>
          <p className="text-sm opacity-90">
            언제쯤 누구와 만나는 지만 알려주면
            <br />
            바로 증명서를 만들 수 있어요!
          </p>
        </div>
        {/* <div className="w-16 h-16 bg-red-400 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </div> */}
        <Image src="/rice.svg" alt="밥약" width={80} height={80} />
      </div>

      {/* Light Blue Section */}
      <button
        onClick={handleDetailedCreation}
        className="bg-sky-50 rounded-xl p-6 mb-8 w-full text-left"
      >
        <h2 className="text-xl font-bold mb-2">더 자세한 빼박 만들기</h2>
        <p className="text-gray-600 text-sm">
          회사, 학교, 온오프라인 모임까지!
          <br />
          구체적인 템플릿을 준비했어요
        </p>
      </button>

      {/* Certificate Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          지금까지 총 <span className="text-sky-400 font-bold">4000</span>개의
          빼박 증명서가 만들어졌어요!
        </p>
      </div>

      {/* Certificate Preview Scroll */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {certificates.map(cert => (
            <div
              key={cert.id}
              className="flex-none w-[200px] h-[280px] border border-gray-200 rounded-xl flex items-center justify-center"
            >
              <span className="text-gray-400">{cert.title}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
