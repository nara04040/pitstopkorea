export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  images: string[];
  createdAt: Date;
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  category: string;
}

export interface CommunityListProps {
  category: string;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: Date;
  likes: number;
  parentId?: string; // 대댓글인 경우 부모 댓글 ID
} 