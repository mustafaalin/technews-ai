// blogData.ts
import fs from 'fs';
import path from 'path';
import { BlogPost, Category } from '../types/blog';

export const categories: Category[] = [
  { id: '1', name: 'AI & Machine Learning', slug: 'ai-ml', count: 3 },
  { id: '2', name: 'Web Development', slug: 'web-dev', count: 1 },
  { id: '3', name: 'Mobile Tech', slug: 'mobile', count: 1 },
  { id: '4', name: 'Cloud Computing', slug: 'cloud', count: 1 },
  { id: '5', name: 'Cybersecurity', slug: 'security', count: 1 },
  { id: '6', name: 'Startups', slug: 'startups', count: 0 },
];

export const blogPosts: BlogPost[] = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'src/data/blogPosts.json'), 'utf8')
);
