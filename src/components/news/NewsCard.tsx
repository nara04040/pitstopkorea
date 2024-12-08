import { NewsItem } from '@/types/news';
import { formatTimeAgo } from '@/lib/utils/dateUtils';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  news: NewsItem;
  priority?: boolean;
}

export function NewsCard({ news, priority = false }: NewsCardProps) {
  return (
    <Link href={`/news/${news.id}`}>
      <article className="group h-full">
        <div className="aspect-video bg-bg-tertiary overflow-hidden rounded-t-lg">
          {news.thumbnail && (
            <Image
              src={news.thumbnail}
              alt={news.title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              priority={priority}
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-text-primary group-hover:text-f1-red transition-colors">
            {news.title}
          </h3>
          <p className="text-text-secondary text-sm mb-4">
            {news.excerpt}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-tertiary">
              {formatTimeAgo(news.publishedAt)}
            </span>
            <span className="text-sm text-f1-red">자세히 보기 →</span>
          </div>
        </div>
      </article>
    </Link>
  );
} 