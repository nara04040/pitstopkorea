import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 게시글 목록 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const where = category ? { category } : {};

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json(
      { error: '게시글을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 게시글 생성
export async function POST(request: Request) {
  try {
    console.log('Request received:', request);
    const payload = await request.json();
    console.log('Received payload:', payload);

    // Validate required fields
    if (!payload || typeof payload !== 'object') {
      console.error('Invalid payload:', payload);
      return NextResponse.json(
        { success: false, error: '잘못된 요청 데이터입니다.' },
        { status: 400 }
      );
    }

    if (!payload.title || !payload.content || !payload.category || !payload.authorId) {
      return NextResponse.json(
        { success: false, error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    try {
      // 개발 환경에서는 임시 사용자 생성 또는 조회
      let user = await prisma.user.findUnique({
        where: {
          id: payload.authorId
        }
      });

      // 개발 환경에서 사용자가 없으면 임시 사용자 생성
      if (!user && process.env.NODE_ENV === 'development') {
        user = await prisma.user.create({
          data: {
            id: payload.authorId,
            name: '임시 사용자',
            email: 'temp@example.com',
          }
        });
      }

      if (!user) {
        return NextResponse.json(
          { success: false, error: '존재하지 않는 사용자입니다.' },
          { status: 400 }
        );
      }

      const post = await prisma.post.create({
        data: {
          title: payload.title,
          content: payload.content,
          category: payload.category,
          images: payload.images || [],
          authorId: payload.authorId,
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

      return NextResponse.json({ success: true, data: post });
    } catch (prismaError) {
      console.error('Prisma error:', prismaError);
      // Prisma 에러의 상세 정보 로깅
      if (prismaError instanceof Error) {
        console.error('Error name:', prismaError.name);
        console.error('Error message:', prismaError.message);
      }
      return NextResponse.json(
        { success: false, error: '데이터베이스 작업 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { success: false, error: '게시��� 작성에 실패했습니다.' },
      { status: 500 }
    );
  }
} 