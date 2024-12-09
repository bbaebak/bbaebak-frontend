import Image from 'next/image';
import { useMemo } from 'react';

export default function Stamp({ className }: { className: string }) {
  const randomNum = useMemo(() => Math.floor(Math.random() * 13) + 1, []);

  return (
    <div className={`${className} w-[58px] h-[65.296px] shrink-0`}>
      <Image
        src={`/stamp/${randomNum}.svg`}
        alt="서명 스탬프"
        width={100}
        height={100}
      />
    </div>
  );
}
