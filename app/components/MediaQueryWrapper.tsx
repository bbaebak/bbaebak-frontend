'use client';
import { useMediaQuery } from '@hooks/useMediaQuery';
import githubIcon from '@public/github.svg';
import logoIcon from '@public/logo.svg';
import Image from 'next/image';
import { ReactNode } from 'react';

interface MediaQueryWrapperProps {
  children: ReactNode;
}

export const MediaQueryWrapper = ({ children }: MediaQueryWrapperProps) => {
  const isWeb = useMediaQuery(730);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#F6F5F2] gap-[4px] overflow-hidden">
      {isWeb && (
        <div className="flex flex-col justify-between items-center h-[60%]">
          <Image
            src={logoIcon}
            alt="logo"
            width={270}
            height={320}
            className="ml-[80px]"
          />
          <Image src={githubIcon} alt="github" width={190} height={177} />
        </div>
      )}
      <div
        className={`relative flex flex-col items-center w-full h-full bg-white ${
          isWeb
            ? 'max-w-[390px] max-h-[690px] ml-[100px] rounded-[40px] border-4 border-[#DCEFF9]'
            : 'max-w-[430px]'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
