import { Post } from '@/types/community';
import { dummyPosts } from '@/lib/data/dummyCommunityData';

// 메모리에 게시글 데이터 저장 (임시)
let posts = [...dummyPosts];

// 게시글 생성
export const createPost = async (post: Omit<Post, 'id' | 'createdAt' | 'views' | 'likes' | 'dislikes' | 'comments'>): Promise<Post> => {
  const newPost: Post = {
    ...post,
    id: String(posts.length + 1),
    createdAt: new Date(),
    views: 0,
    likes: 0,
    dislikes: 0,
    comments: 0
  };
  posts = [newPost, ...posts];
  return newPost;
};

// 게시글 수정
export const updatePost = async (id: string, updateData: Partial<Post>): Promise<Post> => {
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) {
    throw new Error('게시글을 찾을 수 없습니다.');
  }
  
  posts[index] = { ...posts[index], ...updateData };
  return posts[index];
};

// 게시글 삭제
export const deletePost = async (id: string): Promise<void> => {
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) {
    throw new Error('게시글을 찾을 수 없습니다.');
  }
  
  posts = posts.filter(post => post.id !== id);
};

// 게시글 조회
export const getPost = async (id: string): Promise<Post> => {
  const post = posts.find(post => post.id === id);
  if (!post) {
    throw new Error('게시글을 찾을 수 없습니다.');
  }
  return post;
};

// 게시글 목록 조회
export const getPosts = async (): Promise<Post[]> => {
  return posts;
}; 