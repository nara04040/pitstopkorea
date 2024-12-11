import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 댓글 목록 조회
export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: params.postId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return NextResponse.json(
      { error: '댓글을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 댓글 작성
export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const json = await request.json();
    const { content, authorId } = json;

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId,
        postId: params.postId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Failed to create comment:', error);
    return NextResponse.json(
      { error: '댓글 작성에 실패했습니다.' },
      { status: 500 }
    );
  }
} 