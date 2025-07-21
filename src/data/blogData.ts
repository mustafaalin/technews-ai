import { BlogPost, Category } from '../types/blog';
import postsFromJson from './blogPosts.json';

const allPosts: BlogPost[] = postsFromJson as any;

export const baseCategories: Omit<Category, 'count'>[] = [
  { id: '1', name: 'AI & Machine Learning', slug: 'ai-ml' },
  { id: '2', name: 'Web Development', slug: 'web-dev' },
  { id: '3', name: 'Mobile Tech', slug: 'mobile' },
  { id: '4', name: 'Cloud Computing', slug: 'cloud' },
  { id: '5', name: 'Cybersecurity', slug: 'security' },
  { id: '6', name: 'Startups', slug: 'startups' },
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

export const blogPosts: BlogPost[] = allPosts;
