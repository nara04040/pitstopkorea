import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Comment } from '@/types/community';

// API 함수들
const fetchComments = async (postId: string): Promise<Comment[]> => {
  const response = await fetch(`/api/posts/${postId}/comments`);
  if (!response.ok) throw new Error('댓글을 불러오는데 실패했습니다.');
  return response.json();
};

const createComment = async ({
  postId,
  content,
  authorId,
}: {
  postId: string;
  content: string;
  authorId: string;
}): Promise<Comment> => {
  const response = await fetch(`/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, authorId }),
  });
  if (!response.ok) throw new Error('댓글 작성에 실패했습니다.');
  return response.json();
};

// 커스텀 훅
export function useComments(postId: string) {
  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
    },
  });

  return {
    comments: comments ?? [],
    isLoading,
    error,
    createComment: createCommentMutation.mutate,
    isCreating: createCommentMutation.isPending,
  };
} 