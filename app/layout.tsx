// import './styles/globals.css';
import '@styles/index.css';
import QueryProvider from 'app/providers/QueryProvider';
import { ReactNode, Suspense } from 'react';
import KakaoScript from './KakaoScript';
import { Toaster } from 'sonner';
import { Metadata } from 'next';

declare global {
  interface Window {
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: '빼박',
  description: '약속은 빼도 박도 못하니까, 확실하게 만나보세요',
  openGraph: {
    title: '빼박 약속',
    description: '약속은 빼도 박도 못하니까, 확실하게 만나보세요',
    images: [
      {
        url: '/thumbnail_home.png',
        width: 1200, // 실제 이미지 크기
        height: 630, // 실제 이미지 크기
        alt: '빼박 서비스 대표 이미지',
      },
    ],
    type: 'website',
    locale: 'ko_KR',
    siteName: '빼박',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <QueryProvider>
        <body className=" ml-6 mr-6 flex flex-row items-center justify-center w-screen h-screen bg-[#e0e2e6] ">
          {/* <AboutService /> */}
          <div className="relative flex flex-col items-center w-full h-full max-w-[430px] bg-white ">
            {/* <KakaoScript />  활성화시 오류 */}
            <Suspense fallback={<p>Loading</p>}>{children}</Suspense>
            <Toaster
              position="top-center"
              // 추가 옵션들
              className="top-0" // 상단에 고정
              toastOptions={{
                style: {
                  top: '20px', // 상단에서 20px 떨어진 위치
                  width: '397px', // 고정된 너비
                },
              }}
            />
          </div>
        </body>
      </QueryProvider>
    </html>
  );
}
