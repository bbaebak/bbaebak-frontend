import '@styles/index.css';
import QueryProvider from 'app/providers/QueryProvider';
import { ReactNode } from 'react';
import KakaoScript from './KakaoScript';

declare global {
  interface Window {
    Kakao: any;
  }
}

import { Toaster } from 'sonner';
import 'app/styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
