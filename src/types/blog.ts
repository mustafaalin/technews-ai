export interface BlogPost {
  id: number;
  title: string;
  summary: string;
  content: string;
  categoryId: number;    
  category?: string;      
  categoryName?: string;   
  imageUrl: string; 
  sourceUrl: string;
  publishDate: string;
  readTime: number;
  tags: string[];
  author: string;
  is_published: boolean;
}


export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}
