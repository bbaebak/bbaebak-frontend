'use client';

import { useEffect } from 'react';

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

  return <div onClick={handleShearToKakao}> 카카오톡 공유하기</div>;
}
