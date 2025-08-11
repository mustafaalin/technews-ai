// URL helper functions for SEO-friendly URLs
import type { Language } from '../context/LanguageContext';

export interface PostForUrl {
  id: string | number;
  title: string;
  title_en?: string;
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
  // Map category slugs based on language
  const categoryMappings = {
    // Turkish to English mappings
    'yapay-zeka-ml': language === 'en' ? 'ai-ml' : 'yapay-zeka-ml',
    'web-gelistirme': language === 'en' ? 'web-development' : 'web-gelistirme', 
    'mobil-teknoloji': language === 'en' ? 'mobile-technology' : 'mobil-teknoloji',
    'bulut-bilisim': language === 'en' ? 'cloud-computing' : 'bulut-bilisim',
    'siber-guvenlik': language === 'en' ? 'cybersecurity' : 'siber-guvenlik',
    'girisimcilik': language === 'en' ? 'startups' : 'girisimcilik',
    'diger': language === 'en' ? 'other' : 'diger',
    
    // English to Turkish mappings (reverse)
    'ai-ml': language === 'en' ? 'ai-ml' : 'yapay-zeka-ml',
    'web-development': language === 'en' ? 'web-development' : 'web-gelistirme',
    'web-dev': language === 'en' ? 'web-development' : 'web-gelistirme', // Legacy support
    'mobile-technology': language === 'en' ? 'mobile-technology' : 'mobil-teknoloji',
    'mobile': language === 'en' ? 'mobile-technology' : 'mobil-teknoloji', // Legacy support
    'cloud-computing': language === 'en' ? 'cloud-computing' : 'bulut-bilisim',
    'cloud': language === 'en' ? 'cloud-computing' : 'bulut-bilisim', // Legacy support
    'cybersecurity': language === 'en' ? 'cybersecurity' : 'siber-guvenlik',
    'security': language === 'en' ? 'cybersecurity' : 'siber-guvenlik', // Legacy support
    'startups': language === 'en' ? 'startups' : 'girisimcilik',
    'other': language === 'en' ? 'other' : 'diger'
  };
  
  const categorySlug = categoryMappings[post.category || 'diger'] || (language === 'en' ? 'other' : 'diger');
  
  const date = new Date(post.publishDate).toISOString().split('T')[0]; // yyyy-mm-dd
  
  // Use the appropriate title based on language
  const titleToUse = language === 'en' && post.title_en ? post.title_en : post.title;
  const titleSlug = createSlug(titleToUse);
  
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