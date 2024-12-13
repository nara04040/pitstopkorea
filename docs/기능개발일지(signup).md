회원가입/로그인 기능 개발 과정을 정리하겠습니다.

# PitStopKorea 인증 시스템 개발 기록

## 1. 기능 요구사항 분석

### 1.1 회원가입
```markdown
- 필수 입력 정보
  - 이메일 (유효성 검증)
  - 비밀번호 (8자 이상, 특수문자/숫자 포함)
  - 닉네임 (2-10자, 중복 확인)
- 선택 입력 정보
  - 프로필 이미지
  - 선호 F1 팀
  - 선호 드라이버
```

### 1.2 로그인
```markdown
- 이메일/비밀번호 로그인
- 소셜 로그인 (구글)
- 로그인 상태 유지
- 비밀번호 찾기
```

## 2. 기술 스택 선정

### 2.1 프론트엔드
```markdown
- Next.js 14 (App Router)
- React Hook Form (폼 관리)
- Zod (유효성 검증)
- NextAuth.js (인증)
- Tailwind CSS (스타일링)
```

### 2.2 백엔드
```markdown
- Next.js API Routes
- Prisma (ORM)
- PostgreSQL (데이터베이스)
- bcrypt (비밀번호 암호화)
```

## 3. 데이터베이스 스키마

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  nickname      String    @unique
  profileImage  String?
  favoriteTeam  String?
  favoriteDriver String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

## 4. API 엔드포인트 설계

### 4.1 회원가입 API
```markdown
POST /api/auth/signup
Request:
{
  email: string
  password: string
  nickname: string
  favoriteTeam?: string
  favoriteDriver?: string
}

Response:
{
  success: boolean
  message: string
  user?: {
    id: string
    email: string
    nickname: string
  }
}
```

### 4.2 로그인 API
```markdown
POST /api/auth/login
Request:
{
  email: string
  password: string
}

Response:
{
  success: boolean
  message: string
  token?: string
}
```

## 5. 유효성 검증 규칙

```typescript
const signupSchema = z.object({
  email: z.string()
    .email('유효한 이메일 주소를 입력해주세요')
    .min(1, '이메일은 필수 입력입니다'),
  
  password: z.string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      '영문, 숫자, 특수문자를 모두 포함해야 합니다'
    ),
    
  nickname: z.string()
    .min(2, '닉네임은 2자 이상이어야 합니다')
    .max(10, '닉네임은 10자 이하여야 합니다'),
    
  favoriteTeam: z.string().optional(),
  favoriteDriver: z.string().optional()
});
```

## 6. 보안 고려사항

```markdown
1. 비밀번호 보안
   - bcrypt로 암호화 저장
   - 솔트 라운드: 10

2. API 보안
   - CSRF 토큰 사용
   - Rate Limiting 적용
   - 입력값 검증

3. 세션 관리
   - HttpOnly 쿠키 사용
   - 세션 만료 시간 설정
```

## 7. 에러 처리

```typescript
const errorMessages = {
  EMAIL_EXISTS: '이미 사용중인 이메일입니다',
  NICKNAME_EXISTS: '이미 사용중인 닉네임입니다',
  INVALID_CREDENTIALS: '이메일 또는 비밀번호가 일치하지 않습니다',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요',
  VALIDATION_ERROR: '입력값을 확인해주세요'
};
```

## 8. 향후 개선사항

```markdown
1. 이메일 인증 추가
2. OAuth 소셜 로그인 확장
   - 카카오
   - 네이버
3. 2단계 인증(2FA) 도입
4. 비밀번호 정책 강화
5. 로그인 시도 제한
6. 계정 복구 프로세스
```

이 개발 기록은 프로젝트의 인증 시스템 구현 과정을 문서화한 것입니다. 실제 구현 과정에서 발생하는 이슈와 해결 방법을 지속적으로 업데이트할 예정입니다.
