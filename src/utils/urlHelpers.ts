// URL helper functions for SEO-friendly URLs
import type { Language } from '../context/LanguageContext';

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
export const createSeoUrl = (post: PostForUrl, language: Language = 'tr'): string => {
  // Kategori slug'ını dile göre ayarla
  let categorySlug = post.category || 'diger';
  
  // Eğer İngilizce ise ve Türkçe slug varsa, İngilizce karşılığını bul
  if (language === 'en') {
    const slugMapping: {[key: string]: string} = {
      'yapay-zeka-ml': 'ai-ml',
      'web-gelistirme': 'web-development',
      'mobil-teknoloji': 'mobile-technology',
      'bulut-bilisim': 'cloud-computing',
      'siber-guvenlik': 'cybersecurity',
      'girisimcilik': 'startups',
      'diger': 'other'
    };
    categorySlug = slugMapping[categorySlug] || categorySlug;
  }
  
  const date = new Date(post.publishDate).toISOString().split('T')[0]; // yyyy-mm-dd
  const titleSlug = createSlug(post.title);
  
  return `/${language}/post/${categorySlug}/${date}/${titleSlug}`;
};

// Parse SEO URL to extract components
export const parseSeoUrl = (url: string): { language: Language; categorySlug: string; date: string; titleSlug: string } | null => {
  const match = url.match(/^\/(tr|en)\/post\/([^\/]+)\/(\d{4}-\d{2}-\d{2})\/(.+)$/);
  if (!match) return null;
  
  return {
    language: match[1] as Language,
    categorySlug: match[2],
    date: match[3],
    titleSlug: match[4]
  };
};