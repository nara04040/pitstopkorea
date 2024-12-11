'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Post } from '@/types/community';
import { getPost, updatePost } from '@/lib/services/postService';

const PostEditor = dynamic(() => import('@/components/community/PostEditor'), {
  loading: () => <p>로딩중...</p>
});

export default function EditPage({ params }: { params: { postId: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(params.postId);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        alert('게시글을 불러오는데 실패했습니다.');
        router.push('/community');
      }
    };
    fetchPost();
  }, [params.postId, router]);

  const handleSubmit = async (updateData: Omit<Post, 'id' | 'createdAt' | 'views' | 'likes' | 'dislikes' | 'comments'>) => {
    if (!post) return;

    try {
      setIsSubmitting(true);
      await updatePost(post.id, updateData);
      router.push(`/community/${post.id}`);
      router.refresh();
    } catch (error) {
      console.error('Failed to update post:', error);
      alert('게시글 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!post) {
    return <div className="min-h-screen pt-20 px-4 md:px-10">로딩중...</div>;
  }

  return (
    <main className="min-h-screen pt-20 px-4 md:px-10">
      <div className="max-w-screen-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">게시글 수정</h1>
          <p className="text-text-secondary">게시글 내용을 수정해보세요</p>
        </div>
        <PostEditor
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          initialData={{
            title: post.title,
            content: post.content,
            category: post.category,
            images: post.images,
            author: post.author
          }}
        />
      </div>
    </main>
  );
} 