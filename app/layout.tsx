import '@styles/index.css';
import QueryProvider from 'app/providers/QueryProvider';
import { ReactNode } from 'react';

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
          <div className="flex flex-col items-center w-full h-full max-w-[430px] bg-white">
            {children}
          </div>
        </body>
      </QueryProvider>
    </html>
  );
}
