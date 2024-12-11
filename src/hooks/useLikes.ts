import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// API 함수들
const checkLikeStatus = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}): Promise<{ liked: boolean }> => {
  const response = await fetch(`/api/posts/${postId}/likes?userId=${userId}`);
  if (!response.ok) throw new Error('좋아요 상태 확인에 실패했습니다.');
  return response.json();
};

const toggleLike = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}): Promise<{ liked: boolean }> => {
  const response = await fetch(`/api/posts/${postId}/likes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) throw new Error('좋아요 처리에 실패했습니다.');
  return response.json();
};

// 커스텀 훅
export function useLikes(postId: string, userId: string) {
  const queryClient = useQueryClient();

  const {
    data: likeStatus,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['likes', postId, userId],
    queryFn: () => checkLikeStatus({ postId, userId }),
    enabled: !!userId,
  });

  const toggleLikeMutation = useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', postId, userId] });
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
    },
  });

  return {
    liked: likeStatus?.liked ?? false,
    isLoading,
    error,
    toggleLike: () => toggleLikeMutation.mutate({ postId, userId }),
    isToggling: toggleLikeMutation.isPending,
  };
} 