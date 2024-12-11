'use client';

import { Tab } from '@headlessui/react';
import NewsList from '@/components/news/NewsList';
import { NewsPost, NewsCategoryMap } from '@/types/news';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// 임시 데이터
const dummyNews: NewsCategoryMap = {
  '최신 뉴스': [
    {
      id: 1,
      title: '2024 F1 일본 GP 프리뷰',
      date: '2024-03-20',
      category: '주요 뉴스',
      excerpt: '스즈카 서킷에서 펼쳐질 2024 시즌 네 번째 레이스를 앞두고 각 팀의 전략과 예상 성적을 분석합니다.',
      author: '김피트',
      thumbnail: '/images/news/placeholder.webp'
    },
    {
      id: 2,
      title: '호주 GP 하이라이트: 사인즈의 극적인 우승',
      date: '2024-03-18',
      category: '속보',
      excerpt: '페라리의 카를로스 사인즈가 멜버른에서 시즌 첫 우승을 차지했습니다.',
      author: '이레이스',
      thumbnail: '/images/news/placeholder.webp'
    },
  ],
  '팀/드라이버': [
    {
      id: 3,
      title: '페라리, 2024 머신 개발 방향 공개',
      date: '2024-03-19',
      category: '팀 소식',
      excerpt: '프레드 바서 팀 대표가 밝힌 SF-24의 개발 계획과 향후 업데이트 일정을 소개합니다.',
      author: '박포뮬러',
      thumbnail: '/images/news/placeholder.webp'
    },
    {
      id: 4,
      title: '해밀턴, 페라리 이적 후 첫 인터뷰',
      date: '2024-03-17',
      category: '드라이버 동향',
      excerpt: '2025 시즌 페라리 이적을 앞둔 루이스 해밀턴의 특별 인터뷰 내용을 공개합니다.',
      author: '최그리드',
      thumbnail: '/images/news/placeholder.webp'
    },
  ],
  '기술 분석': [
    {
      id: 5,
      title: 'RB20의 혁신적인 사이드포드 디자인 분석',
      date: '2024-03-18',
      category: '기술 분석',
      excerpt: '레드불의 2024년 머신이 보여주는 공기역학적 혁신과 그 효과를 상세히 분석합니다.',
      author: '정엔지니어',
      thumbnail: '/images/news/placeholder.webp'
    },
    {
      id: 6,
      title: '2024 파워유닛 성능 비교',
      date: '2024-03-16',
      category: '기술 규정',
      excerpt: '각 제조사별 파워유닛의 성능과 신뢰성을 비교 분석한 기술 리포트입니다.',
      author: '한테크',
      thumbnail: '/images/news/placeholder.webp'
    },
  ],
};

export default function NewsPage() {
  const categories = Object.keys(dummyNews);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">F1 뉴스</h1>
        <p className="mt-2 text-lg text-text-secondary">
          F1의 최신 소식과 분석을 한눈에 확인하세요
        </p>
      </div>
      
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-bg-tertiary p-1 mb-6">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-white/60',
                  selected
                    ? 'bg-white text-f1-red shadow'
                    : 'text-text-secondary hover:bg-white/[0.12] hover:text-f1-red'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {categories.map((category) => (
            <Tab.Panel
              key={category}
              className={classNames(
                'focus:outline-none ring-offset-2 ring-offset-f1-red ring-white/60'
              )}
            >
              <NewsList posts={dummyNews[category]} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
} 