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
        <body>{children}</body>
      </QueryProvider>
    </html>
  );
}
