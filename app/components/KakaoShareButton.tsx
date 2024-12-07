'use client';

import Image from 'next/image';
import kakaoIcon from '@public/kakaoIcon.svg';

export default function KakaoShareButton() {
  const handleShearToKakao = () => {
    const { Kakao, location } = window;
    Kakao.Share.sendScrap({
      requestUrl: location.href,
    });
  };
  // const handleShare = () => {
  //   if (typeof window !== 'undefined' && window.Kakao) {
  //     const { Kakao } = window;

  //     Kakao.Share.sendDefault({
  //       objectType: 'text',
  //       text: description,
  //       link: {
  //         mobileWebUrl: shareUrl,
  //         webUrl: shareUrl,
  //       },
  //     });
  //   } else {
  //     console.log('Kakao SDK가 로드되지 않았습니다.');
  //   }
  // };

  return (
    <div
      className="flex w-[63px] h-[60px] justify-center items-center rounded-full bg-[#FFEB00]"
      onClick={handleShearToKakao}
    >
      <Image src={kakaoIcon} alt="카카오 공유하기" className="w-6 h-6" />
    </div>
  );
}
