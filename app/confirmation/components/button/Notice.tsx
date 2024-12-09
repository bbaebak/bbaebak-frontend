import polygon from '@public/polygon.svg';
import Image from 'next/image';

export default function Notice({ status }: { status: string }) {
  return (
    <div className="h-full w-full">
      {status !== 'completed' && (
        <div className="h-full w-full">
          <div className="h-full w-full px-5 flex items-center justify-center rounded-[8px] bg-[#E0DC51] text-[#000] font-suit text-[17px] font-bold">
            이름을 눌러 도장을 찍어주세요!
          </div>
          <div className="flex items-center justify-center">
            <Image alt="도장찍기" src={polygon} />
          </div>
        </div>
      )}
    </div>
  );
}
