'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Post } from '@/types/community';
import { usePosts } from '@/hooks/usePosts';

// 동적 임포트로 컴포넌트 로드
const PostEditor = dynamic(() => import('@/components/community/PostEditor'), {
  loading: () => <p>로딩중...</p>
});

export default function WritePage() {
  const router = useRouter();
  const { createPost, isCreating } = usePosts();

  const handleSubmit = async (postData: Omit<Post, 'id' | 'createdAt' | 'views' | 'likes' | 'dislikes' | 'comments' | 'author' | 'authorId'>) => {
    try {
      // 임시로 작성자 ID 설정 (실제로는 인증된 사용자의 ID를 사용해야 함)
      const tempAuthorId = 'temp-user-id';
      
      await createPost(
        {
          ...postData,
          authorId: tempAuthorId,
          images: postData.images || [],
        },
        {
          onSuccess: () => {
            router.push('/community');
          },
          onError: (error: Error) => {
            console.error('Failed to create post:', error);
            alert(error.message || '게시글 작성에 실패했습니다.');
          },
        }
      );
    } catch (error) {
      console.error('Failed to submit post:', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  return (
    <main className="min-h-screen pt-20 px-4 md:px-10">
      <div className="max-w-screen-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">게시글 작성</h1>
          <p className="text-text-secondary">F1 팬들과 공유하고 싶은 이야기를 작성해보세요</p>
        </div>
        <PostEditor onSubmit={handleSubmit} isSubmitting={isCreating} />
      </div>
    </main>
  );
} 