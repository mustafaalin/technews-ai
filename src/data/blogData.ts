import { BlogPost, Category } from '../types/blog';
import allPostsData from './blogPosts.json';
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
  for (const post of allPostsData) {
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
    const jsonPosts: BlogPost[] = allPostsData.map(post => ({
      id: post.id,
      title: post.title,
      summary: post.summary,
      content: post.content,
      category: post.category,
      imageUrl: post.imageUrl,
      sourceUrl: post.sourceUrl,
      publishDate: post.publishDate,
      readTime: post.readTime,
      tags: post.tags || [],
      author: post.author,
      is_published: true
    }));
    
    // Supabase'den yazıları al
    const supabasePosts = await fetchBlogPosts();
    
    // İkisini birleştir ve tarihe göre sırala
    const combinedPosts = [...jsonPosts, ...supabasePosts];
    return combinedPosts.sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    // Hata durumunda sadece JSON verilerini döndür
    return allPostsData.map(post => ({
      id: post.id,
      title: post.title,
      summary: post.summary,
      content: post.content,
      category: post.category,
      imageUrl: post.imageUrl,
      sourceUrl: post.sourceUrl,
      publishDate: post.publishDate,
      readTime: post.readTime,
      tags: post.tags || [],
      author: post.author,
      is_published: true
    }));
  }
};


// Kategoriye göre blog yazılarını çek
export const getBlogPostsByCategory = async (categorySlug: string): Promise<BlogPost[]> => {
  try {
    // JSON dosyasından kategoriye ait yazıları al
    const jsonPosts: BlogPost[] = allPostsData
      .filter(post => post.category === categorySlug)
      .map(post => ({
        id: post.id,
        title: post.title,
        summary: post.summary,
        content: post.content,
        category: post.category,
        imageUrl: post.imageUrl,
        sourceUrl: post.sourceUrl,
        publishDate: post.publishDate,
        readTime: post.readTime,
        tags: post.tags || [],
        author: post.author,
        is_published: true
      }));
    
    // Supabase'den kategoriye ait yazıları al
    const supabasePosts = await fetchBlogPostsByCategory(categorySlug);
    
    // İkisini birleştir ve tarihe göre sırala
    const combinedPosts = [...jsonPosts, ...supabasePosts];
    return combinedPosts.sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    // Hata durumunda sadece JSON verilerini döndür
    return allPostsData
      .filter(post => post.category === categorySlug)
      .map(post => ({
        id: post.id,
        title: post.title,
        summary: post.summary,
        content: post.content,
        category: post.category,
        imageUrl: post.imageUrl,
        sourceUrl: post.sourceUrl,
        publishDate: post.publishDate,
        readTime: post.readTime,
        tags: post.tags || [],
        author: post.author,
        is_published: true
      }));
  }
};

// Backward compatibility için
export const blogPosts: BlogPost[] = allPostsData as BlogPost[];
export const categories: Category[] = baseCategories.map(category => ({
  ...category,
  count: 0, // Bu değer dinamik olarak güncellenecek
}));
