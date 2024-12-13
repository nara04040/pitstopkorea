import { useState } from 'react';

interface SignupFormData {
  email: string;
  password: string;
  nickname: string;
}

const SignupForm = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    nickname: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '회원가입에 실패했습니다.');
      }
      
      const data = await response.json();
      console.log('회원가입 성공:', data);
      // 성공 시 처리 (예: 로그인 페이지로 리다이렉트)
      
    } catch (error) {
      console.error('Signup error:', error);
      // 에러 메시지 표시 로직 추가
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: SignupFormData) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {/* 다른 입력 필드들... */}
    </form>
  );
};

export default SignupForm; 