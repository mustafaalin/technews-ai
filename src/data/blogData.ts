import { BlogPost, Category } from '../types/blog';
import { fetchBlogPosts, fetchBlogPostsByCategory, fetchCategories } from '../lib/blogService';

export const baseCategories: Omit<Category, 'count'>[] = [
  { id: '1', name: 'Yapay Zeka & Makine Öğrenmesi', slug: 'ai-ml' },
  { id: '2', name: 'Web Geliştirme', slug: 'web-dev' },
  { id: '3', name: 'Mobil Teknoloji', slug: 'mobile' },
  { id: '4', name: 'Bulut Bilişim', slug: 'cloud' },
  { id: '5', name: 'Siber Güvenlik', slug: 'security' },
  { id: '6', name: 'Girişimcilik', slug: 'startups' },
  { id: '99', name: 'Diğer', slug: 'diger' },
];

// Supabase verisine göre kategori sayıları
export const getCategories = async (): Promise<Category[]> => {
  try {
    // Supabase'den kategorileri ve post sayılarını çek
    const categories = await fetchCategories();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback olarak base kategorileri döndür
    return baseCategories.map((category) => ({
      ...category,
      count: 0,
    }));
  }
};

// Tüm blog yazılarını Supabase'den çek
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const supabasePosts = await fetchBlogPosts();
    return supabasePosts.sort(
      (a, b) =>
        new Date(b.publish_date).getTime() -
        new Date(a.publish_date).getTime()
    );
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

// Kategoriye göre blog yazılarını çek
export const getBlogPostsByCategory = async (
  categorySlug: string
): Promise<BlogPost[]> => {
  try {
    const supabasePosts = await fetchBlogPostsByCategory(categorySlug);
    return supabasePosts.sort(
      (a, b) =>
        new Date(b.publish_date).getTime() -
        new Date(a.publish_date).getTime()
    );
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
};
export const categories: Category[] = baseCategories.map((category) => ({
  ...category,
  count: 0
}));
