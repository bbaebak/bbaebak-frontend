import Image from 'next/image';
import polygon from '@public/polygon.svg';

export default function Notice({ status }) {
  return (
    <div className="flex ">
      {status !== 'completed' && (
        <div className="w-[260px] h-[50px]">
          <div className=" inline-flex p-[8px_24px] justify-center items-center rounded-[8px] bg-[#E0DC51] text-[#000] font-suit text-[17px] font-bold leading-normal">
            이름을 눌러 도장을 찍어주세요!
          </div>
          <div>
            <Image className="w-[20px] h-[20px] flex-shrink-0 " src={polygon} />
          </div>
        </div>
      )}
    </div>
  );
}
