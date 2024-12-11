import { Post } from '@/types/community';

export const dummyPosts: Post[] = [
  {
    id: '1',
    title: '2024 일본 GP 직관 후기',
    content: '일본 GP 현장에서 직접 본 생생한 후기입니다...',
    author: 'F1팬',
    images: [],
    createdAt: new Date(),
    views: 128,
    likes: 23,
    dislikes: 2,
    comments: 15,
    category: '자유게시판'
  },
  {
    id: '2',
    title: '페라리의 새로운 에어로 패키지 분석',
    content: '페라리의 최신 업데이트를 분석해보았습니다...',
    author: '테크니컬_매니아',
    images: [],
    createdAt: new Date(Date.now() - 86400000),
    views: 256,
    likes: 45,
    dislikes: 3,
    comments: 28,
    category: '기술 토론'
  },
  {
    id: '3',
    title: '베르스타펜 vs 해밀턴: 역대 최고의 라이벌',
    content: '베르스타펜과 해밀턴의 라이벌 관계를 분석해보았습니다...',
    author: 'F1_히스토리',
    images: [],
    createdAt: new Date(Date.now() - 172800000),
    views: 512,
    likes: 89,
    dislikes: 5,
    comments: 67,
    category: '팬 토론'
  }
]; 