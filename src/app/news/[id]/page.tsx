'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { NewsPost } from '@/types/news';

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = params.id as string;

  // 임시 데이터 (추후 실제 데이터로 대체)
  const newsData: NewsPost = {
    id: Number(newsId),
    title: '2024 F1 일본 GP 프리뷰',
    date: '2024-03-20',
    category: '주요 뉴스',
    excerpt: '스즈카 서킷에서 펼쳐질 2024 시즌 네 번째 레이스를 앞두고 각 팀의 전략과 예상 성적을 분석합니다.',
    content: `
      스즈카 서킷은 F1 캘린더에서 가장 기술적인 트랙 중 하나로 손꼽힙니다. 
      고속 코너의 연속 구간과 정밀한 차량 컨트롤이 요구되는 구간이 조화롭게 구성되어 있어, 
      드라이버의 실력과 머신의 성능이 모두 중요한 역할을 합니다.

      특히 1섹터의 고속 S자 커브는 이 트랙의 상징적인 구간으로, 
      다운포스 셋업과 섀시 밸런스가 좋은 차량이 큰 이점을 가질 수 있습니다.

      올해는 레드불 레이싱이 강력한 우승 후보로 꼽히고 있으며, 
      특히 맥스 베르스타펜은 이 트랙에서 좋은 기록을 보유하고 있습니다.
      
      페라리와 맥라렌도 최근 경기에서 좋은 모습을 보여주고 있어, 
      흥미진진한 경쟁이 예상됩니다.
    `,
    author: '김피트',
    thumbnail: '/images/news/placeholder.webp'
  };

  const formattedDate = format(new Date(newsData.date), 'PPP', { locale: ko });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 카테고리 */}
      <div className="mb-4">
        <span className="inline-block bg-f1-red text-white text-sm px-3 py-1 rounded-full">
          {newsData.category}
        </span>
      </div>

      {/* 제목 */}
      <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
        {newsData.title}
      </h1>

      {/* 메타 정보 */}
      <div className="flex items-center text-text-secondary text-sm mb-8">
        <time dateTime={newsData.date}>{formattedDate}</time>
        {newsData.author && (
          <>
            <span className="mx-2">•</span>
            <span className="flex items-center">
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
              {newsData.author}
            </span>
          </>
        )}
      </div>

      {/* 썸네일 이미지 */}
      {newsData.thumbnail && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={newsData.thumbnail}
            alt={newsData.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      {/* 본문 내용 */}
      <div className="prose prose-lg max-w-none">
        {newsData.content?.split('\n').map((paragraph, index) => (
          <p key={index} className="text-text-primary mb-4">
            {paragraph.trim()}
          </p>
        ))}
      </div>

      {/* 추후: 관련 뉴스 추천 섹션 추가 */}
    </article>
  );
} 