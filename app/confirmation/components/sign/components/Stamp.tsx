import Image from 'next/image';
import { useEffect, useState } from 'react';

function randomFn() {
  return Math.floor(Math.random() * 13) + 1;
}

export default function Stamp({ className }: { className: string }) {
  const [number, setNumber] = useState<number>(1);

  useEffect(() => {
    setNumber(randomFn());
  }, []);

  return (
    <>
      <Image
        src={`/stamp/${number}.svg`}
        alt="서명 스탬프"
        width={200}
        height={200}
        className={`${className} w-[58px] h-[65.296px] shrink-0 `}
      />
    </>
  );
}
