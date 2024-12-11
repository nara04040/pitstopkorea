import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} bg-bg-primary text-text-primary min-h-screen`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
