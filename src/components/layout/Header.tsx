'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/common/ThemeToggle/ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-bg-tertiary">
      <div className="mx-auto px-10 max-w-screen-2xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-f1-red">PitStopKorea</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
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

          {/* Auth & Theme Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg text-text-primary hover:bg-bg-secondary dark:bg-[var(--login-button-bg)] dark:text-[var(--login-button-text)] dark:hover:bg-[var(--login-button-bg)]/80 transition-colors"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-f1-red text-white hover:bg-f1-red-dark transition-colors"
            >
              회원가입
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-bg-secondary transition-colors"
            aria-label="메뉴"
          >
            <svg
              className="h-6 w-6 text-text-primary"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/race-center"
                className="block px-3 py-2 rounded-lg text-text-primary hover:bg-bg-secondary transition-colors"
              >
                레이스 센터
              </Link>
              <Link
                href="/news"
                className="block px-3 py-2 rounded-lg text-text-primary hover:bg-bg-secondary transition-colors"
              >
                뉴스
              </Link>
              <Link
                href="/community"
                className="block px-3 py-2 rounded-lg text-text-primary hover:bg-bg-secondary transition-colors"
              >
                커뮤니티
              </Link>
              <Link
                href="/dictionary"
                className="block px-3 py-2 rounded-lg text-text-primary hover:bg-bg-secondary transition-colors"
              >
                F1 사전
              </Link>
              <div className="flex items-center space-x-2 px-3 py-2">
                <ThemeToggle />
                <Link
                  href="/login"
                  className="flex-1 px-4 py-2 text-center rounded-lg text-text-primary hover:bg-bg-secondary dark:bg-[var(--login-button-bg)] dark:text-[var(--login-button-text)] dark:hover:bg-[var(--login-button-bg)]/80 transition-colors"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 px-4 py-2 text-center rounded-lg bg-f1-red text-white hover:bg-f1-red-dark transition-colors"
                >
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 