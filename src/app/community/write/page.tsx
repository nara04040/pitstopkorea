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
      console.log('Submitting post data:', postData);
      
      // 필수 필드 검증
      if (!postData.title?.trim()) {
        alert('제목을 입력해주세요.');
        return;
      }
      if (!postData.content?.trim()) {
        alert('내용을 입력해주세요.');
        return;
      }
      if (!postData.category?.trim()) {
        alert('카테고리를 선택해주세요.');
        return;
      }

      // 임시 사용자 ID 사용 (실제 구현 시에는 인증 시스템으로 대체)
      const tempUserId = 'clsqw8i890000ml08pxg4lc3h';
      
      const postPayload = {
        title: postData.title.trim(),
        content: postData.content.trim(),
        category: postData.category.trim(),
        authorId: tempUserId,
        images: postData.images || [],
      };
      
      console.log('Final payload:', postPayload);
      await createPost(postPayload);
      
      // 성공 시 커뮤니티 페이지로 이동
      router.push('/community');
    } catch (error) {
      console.error('Failed to submit post:', error);
      alert(error instanceof Error ? error.message : '게시글 작성에 실패했습니다.');
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