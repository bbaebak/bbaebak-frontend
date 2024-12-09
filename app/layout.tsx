'use client';
import { MediaQueryWrapper } from '@components/MediaQueryWrapper';
import '@styles/index.css';
import QueryProvider from 'app/providers/QueryProvider';
import { LazyMotion, domAnimation } from 'framer-motion';
import { ReactNode, Suspense } from 'react';
import KakaoScript from './KakaoScript';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className="overflow-hidden">
      <QueryProvider>
        <body className="flex items-center justify-center w-screen h-screen bg-[#F6F5F2] gap-[4px] overflow-hidden">
          <MediaQueryWrapper>
            <KakaoScript />
            <Suspense fallback={<p>Loading</p>}>
              <LazyMotion features={domAnimation}>{children}</LazyMotion>
            </Suspense>
          </MediaQueryWrapper>
        </body>
      </QueryProvider>
    </html>
  );
}
