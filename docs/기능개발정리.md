# 기능개발일지(2024.12.08)

1. **기본 프로젝트 설정**
   - WHY: F1 한국 팬들을 위한 정보 허브 웹사이트 구축을 위해
   - WHAT: Next.js 프로젝트 초기 설정
   - HOW: Next.js 13 App Router + TypeScript + Tailwind CSS 조합으로 구성
   - FILES:
     ```
     ├── package.json              # 프로젝트 의존성 관리
     ├── tsconfig.json            # TypeScript 설정
     ├── tailwind.config.ts       # Tailwind CSS 설정
     ├── postcss.config.mjs       # PostCSS 설정
     └── next.config.ts           # Next.js 설정
     ```

2. **디자인 시스템 구축**
   - WHY: 일관된 UI/UX 경험을 제공하기 위해
   - WHAT: 글로벌 스타일과 테마 시스템
   - HOW: CSS 변수를 활용한 테마 설정, Tailwind 커스텀 설정
   - FILES:
     ```
     ├── src/
     │   ├── styles/
     │   │   └── globals.css      # 글로벌 스타일 정의
     ├── tailwind.config.ts       # 커스텀 색상과 타이포그래피 정의
     ```

3. **다크모드 구현**
   - WHY: 사용자의 선호도와 가독성을 고려한 테마 지원을 위해
   - WHAT: 라이트/다크 테마 전환 기능
   - HOW: next-themes 패키지를 활용한 테마 관리
   - FILES:
     ```
     ├── src/
     │   ├── providers/
     │   │   └── ThemeProvider.tsx  # 테마 관리 Provider
     │   └── styles/
     │       └── globals.css        # 테마별 CSS 변수 정의
     ```

4. **레이아웃 구성**
   - WHY: 일관된 사용자 경험과 네비게이션을 제공하기 위해
   - WHAT: 기본 레이아웃 구조 구현
   - HOW: App Router의 레이아웃 시스템 활용
   - FILES:
     ```
     ├── src/
     │   ├── app/
     │   │   └── layout.tsx       # 루트 레이아웃 정의
     │   └── components/
     │       └── layout/
     │           └── Header.tsx   # 헤더 컴포넌트
     ```

5. **공통 컴포넌트 개발**
   - WHY: 재사용 가능한 UI 컴포넌트 제공을 위해
   - WHAT: Card, ThemeToggle 등 기본 컴포넌트
   - HOW: Tailwind 클래스를 활용한 스타일링
   - FILES:
     ```
     ├── src/
     │   └── components/
     │       └── common/
     │           ├── Card/
     │           │   └── Card.tsx
     │           └── ThemeToggle/
     │               └── ThemeToggle.tsx
     ```

6. **로그인 버튼 스타일링**
   - WHY: 다크모드에서 로그인 버튼의 가시성 향상을 위해
   - WHAT: 다크모드 전용 로그인 버튼 스타일
   - HOW: CSS 변수와 Tailwind 클래스 조합
   - FILES:
     ```
     ├── src/
     │   ├── styles/
     │   │   └── globals.css      # 로그인 버튼 CSS 변수
     │   └── components/
     │       └── layout/
     │           └── Header.tsx   # 로그인 버튼 컴포넌트
     ```

7. **폰트 시스템 구축**
   - WHY: 최적화된 타이포그래피 제공을 위해
   - WHAT: Geist 폰트 패밀리 적용
   - HOW: Next.js의 local-font 기능 활용
   - FILES:
     ```
     ├── src/
     │   └── app/
     │       ├── fonts/          # 폰트 파일 디렉토리
     │       └── layout.tsx      # 폰트 적용 설정
     ```

