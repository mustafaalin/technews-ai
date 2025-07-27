import { BlogPost, Category } from '../types/blog';
import allPosts from './blogPosts.json';
import { fetchBlogPosts, fetchBlogPostsByCategory } from '../lib/blogService';

export const baseCategories: Omit<Category, 'count'>[] = [
  { id: '1', name: 'Yapay Zeka & Makine Öğrenmesi', slug: 'ai-ml' },
  { id: '2', name: 'Web Geliştirme', slug: 'web-dev' },
  { id: '3', name: 'Mobil Teknoloji', slug: 'mobile' },
  { id: '4', name: 'Bulut Bilişim', slug: 'cloud' },
  { id: '5', name: 'Siber Güvenlik', slug: 'security' },
  { id: '6', name: 'Girişimcilik', slug: 'startups' },
];

// Kategori sayılarını hesapla (hem JSON hem de Supabase verilerini kullanarak)
export const calculateCategoryCounts = async (): Promise<{ [key: string]: number }> => {
  const categoryCounts: { [key: string]: number } = {};
  
  // JSON dosyasından sayıları hesapla
  for (const post of allPosts) {
    if (post.category) {
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    }
  }
  
  // Supabase'den blog yazılarını çek ve sayıları ekle
  try {
    const supabasePosts = await fetchBlogPosts();
    for (const post of supabasePosts) {
      if (post.category) {
        categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
      }
    }
  } catch (error) {
    console.error('Error fetching Supabase posts for category counts:', error);
  }
  
  return categoryCounts;
};

// Kategorileri dinamik olarak oluştur
export const getCategories = async (): Promise<Category[]> => {
  const categoryCounts = await calculateCategoryCounts();
  return baseCategories.map(category => ({
    ...category,
    count: categoryCounts[category.slug] || 0,
  }));
};

// Blog yazılarını hem JSON hem Supabase'den çek
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // JSON dosyasından yazıları al
    const jsonPosts: BlogPost[] = allPosts.map(post => ({
      ...post,
      imageUrl: post.imageUrl || post.image_url,
      sourceUrl: post.sourceUrl || post.source_url,
      publishDate: post.publishDate || post.publish_date,
      readTime: post.readTime || post.read_time
    })) as BlogPost[];
    
    // Supabase'den yazıları al
    const supabasePosts = await fetchBlogPosts();
    
    // İkisini birleştir ve tarihe göre sırala
    const allPosts = [...jsonPosts, ...supabasePosts];
    return allPosts.sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    // Hata durumunda sadece JSON verilerini döndür
    return allPosts.map(post => ({
      ...post,
      imageUrl: post.imageUrl || post.image_url,
      sourceUrl: post.sourceUrl || post.source_url,
      publishDate: post.publishDate || post.publish_date,
      readTime: post.readTime || post.read_time
    })) as BlogPost[];
  }
};

// Kategoriye göre blog yazılarını çek
export const getBlogPostsByCategory = async (categorySlug: string): Promise<BlogPost[]> => {
  try {
    // JSON dosyasından kategoriye ait yazıları al
    const jsonPosts: BlogPost[] = allPosts
      .filter(post => post.category === categorySlug)
      .map(post => ({
        ...post,
        imageUrl: post.imageUrl || post.image_url,
        sourceUrl: post.sourceUrl || post.source_url,
        publishDate: post.publishDate || post.publish_date,
        readTime: post.readTime || post.read_time
      })) as BlogPost[];
    
    // Supabase'den kategoriye ait yazıları al
    const supabasePosts = await fetchBlogPostsByCategory(categorySlug);
    
    // İkisini birleştir ve tarihe göre sırala
    const allPosts = [...jsonPosts, ...supabasePosts];
    return allPosts.sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    // Hata durumunda sadece JSON verilerini döndür
    return allPosts
      .filter(post => post.category === categorySlug)
      .map(post => ({
        ...post,
        imageUrl: post.imageUrl || post.image_url,
        sourceUrl: post.sourceUrl || post.source_url,
        publishDate: post.publishDate || post.publish_date,
        readTime: post.readTime || post.read_time
      })) as BlogPost[];
  }
};

// Backward compatibility için
export const blogPosts: BlogPost[] = allPosts as BlogPost[];
export const categories: Category[] = baseCategories.map(category => ({
  ...category,
  count: 0, // Bu değer dinamik olarak güncellenecek
}));