import { BlogPost, Category } from '../types/blog';
import path from 'path';
import { promises as fs } from 'fs';

// Kategorilerin temel tanımını burada tutuyoruz.
// "count" alanı dinamik olarak hesaplanacağı için buradan kaldırılabilir veya 0 olarak başlatılabilir.
export const baseCategories: Omit<Category, 'count'>[] = [
  { id: '1', name: 'AI & Machine Learning', slug: 'ai-ml' },
  { id: '2', name: 'Web Development', slug: 'web-dev' },
  { id: '3', name: 'Mobile Tech', slug: 'mobile' },
  { id: '4', name: 'Cloud Computing', slug: 'cloud' },
  { id: '5', name: 'Cybersecurity', slug: 'security' },
  { id: '6', name: 'Startups', slug: 'startups' },
];

/**
 * Bu fonksiyon, blog verilerini JSON dosyasından okur,
 * kategori sayılarını dinamik olarak hesaplar ve tüm veriyi döndürür.
 * Next.js gibi framework'lerde `getStaticProps` içinde sunucu tarafında çalışır.
 */
export async function getBlogData(): Promise<{ posts: BlogPost[]; categories: Category[] }> {
  // 1. Projenin ana dizinindeki `src/data/blogPosts.json` dosyasının yolunu belirle.
  const jsonDirectory = path.join(process.cwd(), 'src', 'data');
  const fileContents = await fs.readFile(path.join(jsonDirectory, 'blogPosts.json'), 'utf8');
  
  // 2. JSON içeriğini parse ederek post dizisini elde et.
  const posts: BlogPost[] = JSON.parse(fileContents);

  // 3. Postları analiz ederek her kategoride kaç yazı olduğunu hesapla.
  const categoryCounts: { [key: string]: number } = {};
  for (const post of posts) {
    if (post.category) {
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    }
  }

  // 4. Temel kategori bilgilerini, hesaplanan post sayıları ile birleştir.
  const categories: Category[] = baseCategories.map(category => ({
    ...category,
    count: categoryCounts[category.slug] || 0,
  }));

  return { posts, categories };
}
