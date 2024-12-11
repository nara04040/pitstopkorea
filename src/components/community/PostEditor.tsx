'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types/community';
import ImageUploader from './ImageUploader';

interface PostEditorProps {
  onSubmit: (post: Omit<Post, 'id' | 'createdAt' | 'views' | 'likes' | 'dislikes' | 'comments'>) => Promise<void>;
  isSubmitting?: boolean;
  initialData?: Omit<Post, 'id' | 'createdAt' | 'views' | 'likes' | 'dislikes' | 'comments'>;
}

export default function PostEditor({ onSubmit, isSubmitting = false, initialData }: PostEditorProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState(initialData?.category || '자유게시판');
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setCategory(initialData.category);
      setImages(initialData.images);
    }

    console.log(initialData);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    await onSubmit({
      title,
      content,
      author: initialData?.author || {
        id: 'temp-user',
        name: 'Current User',
        image: '/images/default-avatar.png'
      },
      authorId: 'temp-user',
      images,
      category
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-bg-secondary text-text-primary border border-bg-tertiary focus:outline-none"
        >
          <option value="자유게시판">자유게시판</option>
          <option value="팀 게시판">팀 게시판</option>
          <option value="드라이버 게시판">드라이버 게시판</option>
          <option value="기술 토론">기술 토론</option>
        </select>
      </div>

      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full px-4 py-2 rounded-lg bg-bg-secondary text-text-primary border border-bg-tertiary focus:outline-none"
          maxLength={100}
        />
      </div>

      <ImageUploader onImagesChange={setImages} initialImages={images} />

      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          className="w-full h-96 px-4 py-2 rounded-lg bg-bg-secondary text-text-primary border border-bg-tertiary focus:outline-none resize-none"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => history.back()}
          className="px-6 py-2 rounded-lg bg-bg-secondary text-text-primary border border-bg-tertiary hover:bg-bg-tertiary transition-colors"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-f1-red text-white rounded-lg hover:bg-f1-red-dark transition-colors disabled:opacity-50"
        >
          {isSubmitting ? '저장 중...' : (initialData ? '수정 완료' : '작성 완료')}
        </button>
      </div>
    </form>
  );
} 