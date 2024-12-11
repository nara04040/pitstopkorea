"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/types/community';
import { getPost, deletePost } from '@/lib/services/postService';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function PostDetailPage({ params }: { params: { postId: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleLike = () => {
    if (!post) return;
    
    if (isLiked) {
      setPost({ ...post, likes: post.likes - 1 });
      setIsLiked(false);
    } else {
      if (isDisliked) {
        setPost({ ...post, likes: post.likes + 1, dislikes: post.dislikes - 1 });
        setIsDisliked(false);
      } else {
        setPost({ ...post, likes: post.likes + 1 });
      }
      setIsLiked(true);
    }
  };

  const handleDislike = () => {
    if (!post) return;
    
    if (isDisliked) {
      setPost({ ...post, dislikes: post.dislikes - 1 });
      setIsDisliked(false);
    } else {
      if (isLiked) {
        setPost({ ...post, dislikes: post.dislikes + 1, likes: post.likes - 1 });
        setIsLiked(false);
      } else {
        setPost({ ...post, dislikes: post.dislikes + 1 });
      }
      setIsDisliked(true);
    }
  };

  const handleEdit = () => {
    router.push(`/community/edit/${params.postId}`);
  };

  const handleDelete = async () => {
    if (!confirm('정말 이 게시글을 삭제하시겠습니까?')) return;

    try {
      setIsDeleting(true);
      await deletePost(params.postId);
      router.push('/community');
      router.refresh();
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('게시글 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!post) {
    return <div className="min-h-screen pt-20 px-4 md:px-10">로딩중...</div>;
  }

  return (
    <main className="min-h-screen pt-20 px-4 md:px-10">
      <div className="max-w-screen-lg mx-auto">
        <div className="bg-bg-secondary rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-text-primary">{post.title}</h1>
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-bg-tertiary text-text-primary rounded hover:bg-opacity-80"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-f1-red text-white rounded hover:bg-opacity-80 disabled:opacity-50"
              >
                {isDeleting ? '삭제중...' : '삭제'}
              </button>
            </div>
          </div>
          
          <div className="flex items-center text-text-secondary mb-4">
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.createdAt.toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{post.category}</span>
          </div>

          {post.images.length > 0 && (
            <div className="mb-6">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`게시글 이미지 ${index + 1}`}
                  className="max-w-full rounded-lg mb-4"
                />
              ))}
            </div>
          )}

          <div className="text-text-primary whitespace-pre-wrap mb-8">
            {post.content}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                isLiked ? 'bg-f1-red text-white' : 'bg-bg-tertiary text-text-primary'
              }`}
            >
              <ThumbsUp size={18} />
              <span>{post.likes}</span>
            </button>
            <button
              onClick={handleDislike}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                isDisliked ? 'bg-f1-red text-white' : 'bg-bg-tertiary text-text-primary'
              }`}
            >
              <ThumbsDown size={18} />
              <span>{post.dislikes}</span>
            </button>
          </div>
          <p className="text-text-secondary">Views: {post.views}</p>
        </div>

        {/* 댓글 섹션은 별도 컴포넌트로 분리 예정 */}
      </div>
    </main>
  );
} 