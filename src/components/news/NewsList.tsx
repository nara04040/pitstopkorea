'use client';

import { NewsPost } from '@/types/news';
import NewsCard from './NewsCard';

interface NewsListProps {
  posts: NewsPost[];
}

export default function NewsList({ posts }: NewsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <NewsCard key={post.id} post={post} />
      ))}
    </div>
  );
} 