// URL helper functions for SEO-friendly URLs

export interface PostForUrl {
  id: string | number;
  title: string;
  category?: string;
  publishDate: string;
}

// Create slug from title
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
};

// Create SEO-friendly URL
export const createSeoUrl = (post: PostForUrl): string => {
  const categorySlug = post.category || 'diger';
  const date = new Date(post.publishDate).toISOString().split('T')[0]; // yyyy-mm-dd
  const titleSlug = createSlug(post.title);
  
  return `/post/${categorySlug}/${date}/${titleSlug}`;
};

// Parse SEO URL to extract components
export const parseSeoUrl = (url: string): { categorySlug: string; date: string; titleSlug: string } | null => {
  const match = url.match(/^\/post\/([^\/]+)\/(\d{4}-\d{2}-\d{2})\/(.+)$/);
  if (!match) return null;
  
  return {
    categorySlug: match[1],
    date: match[2],
    titleSlug: match[3]
  };
};