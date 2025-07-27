export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image_url: string;
  source_url: string;
  publish_date: string;
  read_time: number;
  tags: string[];
  author: string;
  is_published?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}
