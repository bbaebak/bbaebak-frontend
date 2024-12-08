'use client';
import Stamp from 'app/confirmation/components/sign/components/Stamp';

interface SignProps {
  maker: string;
  mates: string[];
  isSigned: boolean;
  onClick: (id: string, mateName: string) => void;
}

export default function Sign({ maker, mates, isSigned, onClick }: SignProps) {
  const allNames = [maker, ...mates];
  const totalNames = allNames.length;

  return (
    <div className="grid grid-cols-2 gap-6 justify-items-center items-center text-center text-[18px] font-light text-[#5e5e5e] h-full relative">
      {allNames.map((name, index) => {
        const reversedIndex = totalNames - 1 - index;
        const gridColumn =
          reversedIndex % 2 === 0 ? 'col-start-2' : 'col-start-1';
        const gridRow = Math.floor(reversedIndex / 2) + 1;

        return (
          <div
            key={name}
            className={`relative mb-2 flex flex-col items-center ${gridColumn} row-start-${gridRow}`}
          >
            <p
              className="cursor-pointer text-[#5e5e5e]"
              onClick={() => name === maker && onClick('user', name)}
            >
              {name}
              <span
                className={`ml-2 ${
                  name === maker ? 'text-[#E1505F] font-bold' : 'text-[#5e5e5e]'
                }`}
              >
                (인)
              </span>
            </p>
            {isSigned && name === maker && (
              <Stamp className="absolute left-1/2 transform -translate-x-1/2 -top-6" />
            )}
          </div>
        );
      })}
    </div>
  );
}
