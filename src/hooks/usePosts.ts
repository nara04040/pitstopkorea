import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Post } from '@/types/community';

interface PostsResponse {
  posts: Post[];
  total: number;
  totalPages: number;
  currentPage: number;
}

interface PostFilters {
  category?: string;
  page?: number;
  limit?: number;
}

// API 함수들
const fetchPosts = async (filters: PostFilters = {}): Promise<PostsResponse> => {
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());

  const response = await fetch(`/api/posts?${params.toString()}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '게시글을 불러오는데 실패했습니다.');
  }
  return response.json();
};

const fetchPost = async (postId: string): Promise<Post> => {
  const response = await fetch(`/api/posts/${postId}`);
  if (!response.ok) throw new Error('게시글을 불러오는데 실패했습니다.');
  return response.json();
};

const createPost = async (postData: Omit<Post, 'id' | 'createdAt' | 'views' | 'likes' | 'dislikes' | 'comments' | 'author'>): Promise<Post> => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '게시글 작성에 실패했습니다.');
  }

  return response.json();
};

const updatePost = async ({ id, ...data }: Partial<Post> & { id: string }): Promise<Post> => {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '게시글 수정에 실패했습니다.');
  }

  return response.json();
};

const deletePost = async (id: string): Promise<void> => {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '게시글 삭제에 실패했습니다.');
  }
};

// 커스텀 훅
export function usePosts(filters: PostFilters = {}) {
  const queryClient = useQueryClient();

  const {
    data: postsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', filters],
    queryFn: () => fetchPosts(filters),
  });

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return {
    posts: postsData?.posts ?? [],
    total: postsData?.total ?? 0,
    totalPages: postsData?.totalPages ?? 0,
    currentPage: postsData?.currentPage ?? 1,
    isLoading,
    error,
    createPost: createPostMutation.mutate,
    updatePost: updatePostMutation.mutate,
    deletePost: deletePostMutation.mutate,
    isCreating: createPostMutation.isPending,
    isUpdating: updatePostMutation.isPending,
    isDeleting: deletePostMutation.isPending,
  };
}

// 단일 게시글 조회 훅
export function usePost(postId: string) {
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => fetchPost(postId),
  });

  return {
    post,
    isLoading,
    error,
  };
} 