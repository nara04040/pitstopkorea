export interface Author {
  id: string;
  name: string;
  image?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string | { name: string };
  createdAt: string;
  updatedAt?: string;
  category: string;
  likes: number;
  dislikes: number;
  views: number;
  images: string[];
}

export interface CommunityListProps {
  category: string;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: Author;
  authorId: string;
  createdAt: Date;
  likes: number;
  parentId?: string; // 대댓글인 경우 부모 댓글 ID
} 