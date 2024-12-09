'use client';
import KakaoShareButton from '@components/KakaoShareButton';

export default function ShareButton() {
  const handleClick = () => {
    console.log('');
  };
  return (
    <button
      onClick={handleClick}
      className="flex p-4 justify-center items-center flex-1 rounded-lg bg-[#F8F8F8] text-[#5E5E5E] font-suit text-[17px] font-bold"
    >
      증명서 공유하기
      {/* <KakaoShareButton /> */}
    </button>
  );
}
