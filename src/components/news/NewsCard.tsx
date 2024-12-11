'use client';

import { NewsPost } from '@/types/news';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  post: NewsPost;
  priority?: boolean;
}

export default function NewsCard({ post, priority = false }: NewsCardProps) {
  return (
    <div className="bg-bg-secondary rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full bg-gray-200">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            priority={priority}
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400">이미지 없음</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs font-medium text-gray-500">{post.date}</span>
          <span className="text-xs text-gray-300">•</span>
          <span className="text-xs font-medium text-f1-red">{post.category}</span>
        </div>
        <Link href={`/news/${post.id}`} className="block group">
          <h3 className="text-lg font-bold mb-2 group-hover:text-f1-red transition-colors duration-200">
            {post.title}
          </h3>
          <p className="text-text-secondary text-sm mb-4 line-clamp-2">{post.excerpt}</p>
        </Link>
        {post.author && (
          <div className="flex items-center text-sm text-gray-500">
            <svg 
              className="w-4 h-4 mr-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
            {post.author}
          </div>
        )}
      </div>
    </div>
  );
} 