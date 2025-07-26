import { BlogPost, Category } from '../types/blog';
import allPosts from './blogPosts.json';

export const baseCategories: Omit<Category, 'count'>[] = [
  { id: '1', name: 'Yapay Zeka & Makine Öğrenmesi', slug: 'ai-ml' },
  { id: '2', name: 'Web Geliştirme', slug: 'web-dev' },
  { id: '3', name: 'Mobil Teknoloji', slug: 'mobile' },
  { id: '4', name: 'Bulut Bilişim', slug: 'cloud' },
  { id: '5', name: 'Siber Güvenlik', slug: 'security' },
  { id: '6', name: 'Girişimcilik', slug: 'startups' },
];

const categoryCounts: { [key: string]: number } = {};
for (const post of allPosts) {
  if (post.category) {
    categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
  }
}

export const categories: Category[] = baseCategories.map(category => ({
  ...category,
  count: categoryCounts[category.slug] || 0,
}));

export const blogPosts: BlogPost[] = allPosts as BlogPost[];
