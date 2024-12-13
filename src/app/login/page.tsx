'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const signupSuccess = searchParams.get('signup') === 'success';
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || '로그인에 실패했습니다.');
      }

      // 로그인 성공 시 메인 페이지로 이동
      router.push('/');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : '로그인에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="min-h-screen pt-20 px-4 bg-bg-primary">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">로그인</h1>
          <p className="text-text-secondary">PitStopKorea에 오신 것을 환영합니다</p>
        </div>

        {signupSuccess && (
          <div className="mb-6 p-4 bg-drs-green bg-opacity-10 border border-drs-green rounded-lg">
            <p className="text-drs-green text-center">
              회원가입이 완료되었습니다. 로그인해주세요.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-f1-red bg-opacity-10 border border-f1-red rounded-lg">
            <p className="text-f1-red text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-bg-secondary border border-bg-tertiary text-text-primary focus:outline-none focus:border-f1-red"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-bg-secondary border border-bg-tertiary text-text-primary focus:outline-none focus:border-f1-red"
              placeholder="비밀번호를 입력해주세요"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-f1-red border-bg-tertiary rounded focus:ring-f1-red"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-text-secondary">
                로그인 상태 유지
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-f1-red hover:text-f1-red-dark">
              비밀번호 찾기
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-f1-red text-white rounded-lg font-medium hover:bg-f1-red-dark transition-colors disabled:opacity-50"
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-bg-tertiary"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-bg-primary text-text-secondary">또는</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-3 px-4 bg-bg-secondary text-text-primary rounded-lg font-medium hover:bg-bg-tertiary transition-colors flex items-center justify-center gap-2"
          >
            <img src="/images/google.svg" alt="Google" className="w-5 h-5" />
            Google로 로그인
          </button>
        </div>

        <p className="mt-6 text-center text-text-secondary">
          아직 계정이 없으신가요?{' '}
          <Link href="/signup" className="text-f1-red hover:text-f1-red-dark">
            회원가입
          </Link>
        </p>
      </div>
    </main>
  );
} 