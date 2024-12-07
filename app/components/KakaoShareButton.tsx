import { useEffect } from 'react';

export default function KakaoShareButton() {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const description = '카카오톡 공유하기 테스트입니다.';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { Kakao } = window;

      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  const handleShare = () => {
    const { Kakao } = window;

    Kakao.Share.sendDefault({
      objectType: 'text',
      text: description,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    });
  };

  return <div onClick={handleShare}> 카카오톡 공유하기</div>;
}
