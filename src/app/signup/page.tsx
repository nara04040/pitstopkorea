'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: ''
    };

    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요';
      isValid = false;
    }

    // 비밀번호 검증 (8자 이상, 특수문자/숫자 포함)
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = '비밀번호는 8자 이상이며, 특수문자와 숫자를 포함해야 합니다';
      isValid = false;
    }

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
      isValid = false;
    }

    // 닉네임 검증 (2자 이상 10자 이하)
    if (formData.nickname.length < 2 || formData.nickname.length > 10) {
      newErrors.nickname = '닉네임은 2자 이상 10자 이하여야 합니다';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          nickname: formData.nickname
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || '회원가입에 실패했습니다.');
      }

      router.push('/login?signup=success');
    } catch (error) {
      alert(error instanceof Error ? error.message : '회원가입에 실패했습니다.');
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
          <h1 className="text-3xl font-bold text-text-primary mb-2">회원가입</h1>
          <p className="text-text-secondary">PitStopKorea의 회원이 되어주세요</p>
        </div>

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
            {errors.email && <p className="mt-1 text-sm text-f1-red">{errors.email}</p>}
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
              placeholder="8자 이상, 특수문자와 숫자 포함"
              required
            />
            {errors.password && <p className="mt-1 text-sm text-f1-red">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-1">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-bg-secondary border border-bg-tertiary text-text-primary focus:outline-none focus:border-f1-red"
              placeholder="비밀번호를 다시 입력해주세요"
              required
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-f1-red">{errors.confirmPassword}</p>}
          </div>

          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-text-primary mb-1">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-bg-secondary border border-bg-tertiary text-text-primary focus:outline-none focus:border-f1-red"
              placeholder="2-10자 사이로 입력해주세요"
              required
            />
            {errors.nickname && <p className="mt-1 text-sm text-f1-red">{errors.nickname}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-f1-red text-white rounded-lg font-medium hover:bg-f1-red-dark transition-colors disabled:opacity-50"
          >
            {isSubmitting ? '처리중...' : '회원가입'}
          </button>
        </form>

        <p className="mt-6 text-center text-text-secondary">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-f1-red hover:text-f1-red-dark">
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
} 