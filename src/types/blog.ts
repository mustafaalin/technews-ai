export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string;
  sourceUrl: string;
  publishDate: string;
  readTime: number;
  tags: string[];
  author: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}
