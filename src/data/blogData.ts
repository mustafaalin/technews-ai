// blogData.ts
import fs from 'fs';
import path from 'path';
import { BlogPost, Category } from '../types/blog';

export const categories: Category[] = [ ... ];

export const blogPosts: BlogPost[] = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'src/data/blogPosts.json'), 'utf8')
);
