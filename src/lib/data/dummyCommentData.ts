import { Comment } from '@/types/community';

export const dummyComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    content: '일본 GP 직관 정말 부럽네요! 사진 더 공유해주실 수 있나요?',
    author: 'F1매니아',
    createdAt: new Date(Date.now() - 3600000), // 1시간 전
    likes: 5
  },
  {
    id: '2',
    postId: '1',
    content: '스즈카 서킷 현장 분위기가 정말 대단했겠어요',
    author: '모터스포츠팬',
    createdAt: new Date(Date.now() - 7200000), // 2시간 전
    likes: 3
  },
  {
    id: '3',
    postId: '1',
    parentId: '1',
    content: '네! 추가 사진 올려드리겠습니다 :)',
    author: 'F1팬',
    createdAt: new Date(Date.now() - 1800000), // 30분 전
    likes: 2
  }
]; 