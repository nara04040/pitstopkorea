'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Post } from '@/types/community';

// 동적 임포트로 컴포넌트 로드
const PostEditor = dynamic(() => import('@/components/community/PostEditor'), {
  loading: () => <p>로딩중...</p>
});

export default function WritePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (post: Omit<Post, 'id' | 'createdAt' | 'views' | 'likes' | 'comments'>) => {
    try {
      setIsSubmitting(true);
      // TODO: API 연동 후 실제 게시글 저장 로직 구현
      console.log('Submitting post:', post);
      router.push('/community');
    } catch (error) {
      console.error('Failed to submit post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 px-4 md:px-10">
      <div className="max-w-screen-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">게시글 작성</h1>
          <p className="text-text-secondary">F1 팬들과 공유하고 싶은 이야기를 작성해보세요</p>
        </div>
        <PostEditor onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </main>
  );
} 