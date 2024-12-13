export function generateVerificationToken(): string {
  // 32자리 랜덤 문자열 생성
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
} 