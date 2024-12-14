'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary border-b border-bg-secondary">
      <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-f1-red">
          PitStopKorea
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/race-center" 
            className={`transition-colors ${
              isActive('/race-center') 
                ? 'text-f1-red' 
                : 'text-text-primary hover:text-f1-red'
            }`}
          >
            레이스 센터
          </Link>
          <Link 
            href="/news" 
            className={`transition-colors ${
              isActive('/news') 
                ? 'text-f1-red' 
                : 'text-text-primary hover:text-f1-red'
            }`}
          >
            뉴스
          </Link>
          <Link 
            href="/community" 
            className={`transition-colors ${
              isActive('/community') 
                ? 'text-f1-red' 
                : 'text-text-primary hover:text-f1-red'
            }`}
          >
            커뮤니티
          </Link>
          <Link 
            href="/dictionary" 
            className={`transition-colors ${
              isActive('/dictionary') 
                ? 'text-f1-red' 
                : 'text-text-primary hover:text-f1-red'
            }`}
          >
            F1 사전
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-bg-secondary text-text-primary hover:bg-bg-tertiary transition-colors"
            suppressHydrationWarning
          >
            {mounted ? (theme === 'dark' ? '🌞' : '🌙') : <span className="w-4 h-4" />}
          </button>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-text-primary bg-bg-tertiary px-4 py-2 rounded-full">{user.nickname}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-f1-red text-text-primary hover:bg-f1-red-dark transition-colors"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-f1-red text-white hover:bg-f1-red-dark transition-colors"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-lg bg-bg-tertiary text-text-primary hover:bg-bg-secondary transition-colors"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 