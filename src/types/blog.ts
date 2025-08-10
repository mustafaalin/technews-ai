export interface BlogPost {
  id: number;
  title: string;
  title_en?: string;
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

export interface SupabaseBlogPost {
  id: number;
  title: string;
  summary: string;
  content: string;
  image_url: string;
  source_url: string;
  publish_date: string;
  read_time: number;
  tags: string[];
  author: string;
  is_published: boolean;
  category_id: number;
  categories?: {
    id: number;
    name: string;
    slug: string;
  } | null;
}
