import { NewsItem } from '@/types/news';

export const dummyNews: NewsItem[] = [
  {
    id: '1',
    title: '레드불, 새로운 에어로 패키지 공개',
    excerpt: '2024 시즌 첫 업데이트로 더욱 강력해진 RB20의 모습이 공개되었습니다.',
    thumbnail: '/images/news/rb20-aero.jpg',
    category: 'technical',
    publishedAt: '2024-03-20T09:00:00Z',
    readingTime: 3
  },
  {
    id: '2',
    title: '페라리, 중국 GP에서 메이저 업그레이드 예고',
    excerpt: 'SF-24의 첫 메이저 업그레이드가 중국 GP에서 공개될 예정입니다.',
    thumbnail: '/images/news/ferrari-upgrade.jpg',
    category: 'team',
    publishedAt: '2024-03-20T08:30:00Z',
    readingTime: 4
  },
  {
    id: '3',
    title: '해밀턴, 페라리 이적 후 첫 인터뷰',
    excerpt: '2025 시즌 페라리 이적을 앞둔 해밀턴의 솔직한 이야기를 들어봅니다.',
    thumbnail: '/images/news/hamilton-interview.jpg',
    category: 'driver',
    publishedAt: '2024-03-20T07:45:00Z',
    readingTime: 5
  }
]; 