import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 좋아요 토글
export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const json = await request.json();
    const { userId } = json;

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: params.postId,
        },
      },
    });

    if (existingLike) {
      // 좋아요 취소
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId: params.postId,
          },
        },
      });

      return NextResponse.json({ liked: false });
    } else {
      // 좋아요 추가
      await prisma.like.create({
        data: {
          userId,
          postId: params.postId,
        },
      });

      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Failed to toggle like:', error);
    return NextResponse.json(
      { error: '좋아요 처리에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 좋아요 상태 확인
export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: params.postId,
        },
      },
    });

    return NextResponse.json({ liked: !!like });
  } catch (error) {
    console.error('Failed to check like status:', error);
    return NextResponse.json(
      { error: '좋아요 상태 확인에 실패했습니다.' },
      { status: 500 }
    );
  }
} 