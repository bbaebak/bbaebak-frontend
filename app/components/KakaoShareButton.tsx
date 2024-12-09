'use client';

import Image from 'next/image';
import kakaoIcon from '@public/kakaoIcon.svg';

export default function KakaoShareButton({ userName }: any) {
  const handleShearToKakao = () => {
    const { Kakao, location } = window;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '나랑 빼박할거지????????????????!!!!!!!!!!!!!!!!',
        description: `${userName}님이 빼박 약속을 요청하였어요!`,
        imageUrl: '/thumbnail_home.png',
        imageWidth: 100,
        imageHeight: 100,

        link: {
          mobileWebUrl: location.href,
          webUrl: location.href,
        },
      },
      buttons: [
        {
          title: '빼박 바로가기',
          link: {
            mobileWebUrl: location.href,
            webUrl: location.href,
          },
        },
      ],
    });
  };

  return (
    <div
      className="flex w-[40px] h-[40px] justify-center items-center rounded-full bg-[#FFEB00] cursor-pointer"
      onClick={handleShearToKakao}
    >
      <Image src={kakaoIcon} alt="카카오 공유하기" className="w-6 h-6" />
    </div>
  );
}
