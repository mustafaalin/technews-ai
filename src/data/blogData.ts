import { BlogPost, Category } from '../types/blog';
import { fetchBlogPosts, fetchBlogPostsByCategory, fetchBlogPostById } from '../lib/blogService';
import allPostsData from './blogPosts.json';

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
    // Önce Supabase'den dene
    const supabasePosts = await fetchBlogPosts();
    
    if (supabasePosts.length > 0) {
      console.log(`✅ Supabase'den ${supabasePosts.length} haber yüklendi`);
      return supabasePosts;
    }
    
    // Supabase'de veri yoksa JSON'dan al
    console.log('⚠️ Supabase'de veri bulunamadı, JSON verilerini kullanıyor');
    )
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
    
    // Tarihe göre sırala
    return jsonPosts.sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    console.log('🔄 Hata nedeniyle JSON verilerine geçiliyor');
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
    // Önce Supabase'den dene
    const supabasePosts = await fetchBlogPostsByCategory(categorySlug);
    
    if (supabasePosts.length > 0) {
      console.log(`✅ Supabase'den ${categorySlug} kategorisinde ${supabasePosts.length} haber yüklendi`);
      return supabasePosts;
    }
    
    // Supabase'de veri yoksa JSON'dan al
    console.log(`⚠️ Supabase'de ${categorySlug} kategorisinde veri bulunamadı, JSON verilerini kullanıyor`);
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
    
    // Tarihe göre sırala
    return jsonPosts.sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    console.log(`🔄 Hata nedeniyle ${categorySlug} kategorisi için JSON verilerine geçiliyor`);
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
