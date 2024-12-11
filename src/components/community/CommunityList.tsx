'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Post, CommunityListProps } from '@/types/community';
import { dummyPosts } from '@/lib/data/dummyCommunityData';

export default function CommunityList({ category }: CommunityListProps) {
  const [posts] = useState<Post[]>(dummyPosts);

  return (
    <div className="space-y-4">
      {/* 글쓰기 버튼 */}
      <div className="flex justify-end mb-4">
        <Link
          href="/community/write"
          className="px-4 py-2 bg-f1-red text-white rounded-lg hover:bg-f1-red-dark transition-colors"
        >
          글쓰기
        </Link>
      </div>

      {/* 게시글 목록 */}
      <div className="bg-bg-secondary rounded-lg overflow-hidden">
        <div className="min-w-full divide-y divide-bg-tertiary">
          {/* 테이블 헤더 */}
          <div className="bg-bg-tertiary">
            <div className="grid grid-cols-12 px-6 py-3 text-sm font-medium text-text-secondary">
              <div className="col-span-6">제목</div>
              <div className="col-span-2 text-center">작성자</div>
              <div className="col-span-2 text-center">작성일</div>
              <div className="col-span-1 text-center">조회</div>
              <div className="col-span-1 text-center">추천</div>
            </div>
          </div>

          {/* 게시글 목록 */}
          <div className="divide-y divide-bg-tertiary">
            {posts.map((post) => (
              <div
                key={post.id}
                className="grid grid-cols-12 px-6 py-4 hover:bg-bg-tertiary/50 transition-colors"
              >
                <div className="col-span-6">
                  <Link href={`/community/${post.id}`} className="hover:text-f1-red">
                    <span className="text-text-primary">{post.title}</span>
                    {post.comments > 0 && (
                      <span className="ml-2 text-f1-red">[{post.comments}]</span>
                    )}
                  </Link>
                </div>
                <div className="col-span-2 text-center text-text-secondary">{post.author}</div>
                <div className="col-span-2 text-center text-text-secondary">
                  {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: ko })}
                </div>
                <div className="col-span-1 text-center text-text-secondary">{post.views}</div>
                <div className="col-span-1 text-center text-text-secondary">{post.likes}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 