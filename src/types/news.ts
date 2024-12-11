export interface NewsPost {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content?: string;
  author?: string;
  thumbnail?: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  description?: string;
  subcategories?: string[];
}

export type NewsCategoryMap = {
  [key: string]: NewsPost[];
}; 