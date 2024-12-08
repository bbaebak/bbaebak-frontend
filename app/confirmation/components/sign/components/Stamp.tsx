import Image from 'next/image';

export default function Stamp({ className }: { className: string }) {
  const randomNum = Math.floor(Math.random() * 13) + 1;
  return (
    <>
      <Image
        src={`/stamp/${randomNum}.svg`}
        alt="서명 스탬프"
        width={200}
        height={200}
        className={`${className} w-[58px] h-[65.296px] shrink-0 `}
      />
    </>
  );
}
