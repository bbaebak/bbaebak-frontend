import '@styles/index.css';
import QueryProvider from 'app/providers/QueryProvider';
import { LazyMotion, domAnimation } from 'framer-motion';
import { ReactNode } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html>
      <QueryProvider>
        <LazyMotion features={domAnimation}>
          <body>{children}</body>
        </LazyMotion>
      </QueryProvider>
    </html>
  );
}
