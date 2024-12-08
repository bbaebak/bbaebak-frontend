// import './styles/globals.css';
import '@styles/index.css';
import QueryProvider from 'app/providers/QueryProvider';
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
    <html>
      <QueryProvider>
        <body className="flex flex-row items-center justify-center w-screen h-screen bg-[#e0e2e6]">
          {/* <AboutService /> */}
          <div className="relative flex flex-col items-center w-full h-full max-w-[430px] bg-white">
            <KakaoScript />
            <Suspense fallback={<p>Loading</p>}>{children}</Suspense>
          </div>
        </body>
      </QueryProvider>
    </html>
  );
}
