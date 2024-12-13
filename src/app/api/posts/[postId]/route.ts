import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 게시글 조회
export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;
    
    if (!postId) {
      return NextResponse.json(
        { error: '게시글 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
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

    // 조회수 증가 (에러가 발생해도 게시글 조회는 성공으로 처리)
    try {
      await prisma.post.update({
        where: { id: postId },
        data: { views: { increment: 1 } },
      });
    } catch (error) {
      console.error('Failed to increment view count:', error);
    }

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
    const { postId } = params;
    const json = await request.json();
    const { title, content, category, images } = json;

    const post = await prisma.post.update({
      where: { id: postId },
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
    const { postId } = params;
    
    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ message: '게시글이 삭제되었습니다.' });
  } catch (error) {
    console.error('Failed to delete post:', error);
    return NextResponse.json(
      { error: '게시글 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
} 