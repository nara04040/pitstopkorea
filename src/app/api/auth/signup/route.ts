import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, nickname } = body;

    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: '이미 사용중인 이메일입니다.' },
        { status: 400 }
      );
    }

    // 닉네임 중복 확인
    const existingNickname = await prisma.user.findUnique({
      where: { nickname }
    });

    if (existingNickname) {
      return NextResponse.json(
        { error: '이미 사용중인 닉네임입니다.' },
        { status: 400 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nickname
      }
    });

    return NextResponse.json({ 
      message: '회원가입이 완료되었습니다.',
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: '회원가입 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 