'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-secondary border-b border-bg-tertiary">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="text-2xl font-bold text-f1-red">
            PitStopKorea
          </Link>

          {/* 메인 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/race-center" className="text-text-primary hover:text-f1-red transition-colors">
              레이스 센터
            </Link>
            <Link href="/news" className="text-text-primary hover:text-f1-red transition-colors">
              뉴스
            </Link>
            <Link href="/community" className="text-text-primary hover:text-f1-red transition-colors">
              커뮤니티
            </Link>
            <Link href="/dictionary" className="text-text-primary hover:text-f1-red transition-colors">
              F1 사전
            </Link>
          </nav>

          {/* 우측 기능 버튼 */}
          <div className="flex items-center space-x-4">
            {/* 다크모드 토글 버튼 */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-bg-tertiary hover:bg-bg-tertiary/80 transition-colors"
              aria-label="테마 변경"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* 로그인 버튼 */}
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-f1-red text-white hover:bg-f1-red/90 transition-colors"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 