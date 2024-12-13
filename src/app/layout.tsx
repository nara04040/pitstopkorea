import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PitStopKorea',
  description: '한국의 F1 팬들을 위한 커뮤니티',
  openGraph: {
    title: 'PitStopKorea',
    description: '한국의 F1 팬들을 위한 커뮤니티',
    url: 'https://pitstopkorea.com',
    siteName: 'PitStopKorea',
    images: [
      {
        url: '/images/og-image.png',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const title = metadata.title?.toString() ?? 'PitStopKorea';
  const description = metadata.description?.toString() ?? '한국의 F1 팬들을 위한 커뮤니티';
  const ogTitle = metadata.openGraph?.title?.toString() ?? title;
  const ogDescription = metadata.openGraph?.description?.toString() ?? description;
  const ogUrl = metadata.openGraph?.url?.toString() ?? 'https://pitstopkorea.com';
  const ogSiteName = metadata.openGraph?.siteName?.toString() ?? 'PitStopKorea';
  const ogImage = Array.isArray(metadata.openGraph?.images) 
    ? (metadata.openGraph.images[0] as { url: string })?.url 
    : '/images/og-image.png';

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:site_name" content={ogSiteName} />
        <meta property="og:image" content={ogImage} />
      </head>
      <body className={`${inter.className} bg-bg-primary text-text-primary min-h-screen`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
