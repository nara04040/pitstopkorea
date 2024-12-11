import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 게시글 조회
export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.postId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        comments: {
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
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 조회수 증가
    await prisma.post.update({
      where: { id: params.postId },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return NextResponse.json(
      { error: '게시글을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 게시글 수정
export async function PATCH(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const json = await request.json();
    const { title, content, category, images } = json;

    const post = await prisma.post.update({
      where: { id: params.postId },
      data: {
        title,
        content,
        category,
        images,
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

    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to update post:', error);
    return NextResponse.json(
      { error: '게시글 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 게시글 삭제
export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    await prisma.post.delete({
      where: { id: params.postId },
    });

    return NextResponse.json({ message: '게시���이 삭제되었습니다.' });
  } catch (error) {
    console.error('Failed to delete post:', error);
    return NextResponse.json(
      { error: '게시글 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
} 