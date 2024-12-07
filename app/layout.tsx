import { Toaster } from 'sonner';
import 'app/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="flex justify-center min-h-screen bg-gray-100">
          {children}
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
