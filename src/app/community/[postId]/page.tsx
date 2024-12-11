"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Post, Comment } from '@/types/community';
import { dummyPosts } from '@/lib/data/dummyCommunityData';
import { dummyComments } from '@/lib/data/dummyCommentData';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function PostDetailPage() {
  const router = useRouter();
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const currentIndex = dummyPosts.findIndex((p) => p.id === postId);
  const nextPost = dummyPosts[currentIndex + 1];
  const prevPost = dummyPosts[currentIndex - 1];

  useEffect(() => {
    if (postId) {
      const foundPost = dummyPosts.find((p) => p.id === postId);
      setPost(foundPost || null);
      const relatedComments = dummyComments.filter((c) => c.postId === postId);
      setComments(relatedComments);
    }
  }, [postId]);

  const handleLike = () => {
    if (!post) return;
    
    if (isLiked) {
      setPost({ ...post, likes: post.likes - 1 });
      setIsLiked(false);
    } else {
      if (isDisliked) {
        setPost({ ...post, likes: post.likes + 1, dislikes: post.dislikes - 1 });
        setIsDisliked(false);
      } else {
        setPost({ ...post, likes: post.likes + 1 });
      }
      setIsLiked(true);
    }
  };

  const handleDislike = () => {
    if (!post) return;
    
    if (isDisliked) {
      setPost({ ...post, dislikes: post.dislikes - 1 });
      setIsDisliked(false);
    } else {
      if (isLiked) {
        setPost({ ...post, dislikes: post.dislikes + 1, likes: post.likes - 1 });
        setIsLiked(false);
      } else {
        setPost({ ...post, dislikes: post.dislikes + 1 });
      }
      setIsDisliked(true);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <main className="min-h-screen pt-20 px-4 md:px-10">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-4">{post.title}</h1>
        <p className="text-text-secondary mb-2">By {post.author} | {post.createdAt.toLocaleDateString()}</p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1 px-3 py-2 rounded ${
                isLiked ? 'bg-f1-red text-white' : 'bg-gray-500 hover:bg-gray-200'
              }`}
            >
              <ThumbsUp size={18} />
              <span>{post.likes}</span>
            </button>
            <button 
              onClick={handleDislike}
              className={`flex items-center gap-1 px-3 py-2 rounded ${
                isDisliked ? 'bg-gray-800 text-white' : 'bg-gray-500 hover:bg-gray-200'
              }`}
            >
              <ThumbsDown size={18} />
              <span>{post.dislikes}</span>
            </button>
          </div>
          <p className="text-text-secondary">Views: {post.views}</p>
        </div>
        <div className="mb-8">
          <p>{post.content}</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Comments</h2>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <p className="text-text-primary">{comment.content}</p>
              <p className="text-text-secondary text-sm">By {comment.author} | {comment.createdAt.toLocaleDateString()}</p>
            </div>
          ))}
          <form className="mt-4">
            <textarea className="w-full p-2 border rounded mb-2" placeholder="Write a comment..."></textarea>
            <button type="submit" className="bg-f1-red text-white px-4 py-2 rounded">Submit</button>
          </form>
        </div>
        <div className="flex justify-between">
          {prevPost && (
            <button onClick={() => router.push(`/community/${prevPost.id}`)} className="text-f1-red">Previous Post</button>
          )}
          {nextPost && (
            <button onClick={() => router.push(`/community/${nextPost.id}`)} className="text-f1-red">Next Post</button>
          )}
        </div>
      </div>
    </main>
  );
} 