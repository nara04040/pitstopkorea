import { Prisma } from '@prisma/client';

export type UserCreateInput = Prisma.UserCreateInput & {
  provider?: string;
};

export interface User {
  id: string;
  email: string;
  nickname: string;
  password?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  provider: 'email' | 'google';
  favoriteTeam?: string;
  favoriteDriver?: string;
  profileImage?: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
} 