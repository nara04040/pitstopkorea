export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  thumbnail?: string;
  category: 'general' | 'technical' | 'race' | 'driver' | 'team';
  publishedAt: string;
  readingTime: number;
} 