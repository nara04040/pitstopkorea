'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);

  // 클라이언트 사이드 마운트 확인
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} bg-bg-primary text-text-primary min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider client={queryClient}>
            <Header />
            <main className="pt-16">
              {children}
            </main>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
