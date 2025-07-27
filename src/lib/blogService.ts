import { supabase } from './supabase';
import { BlogPost } from '../types/blog';

// Supabase'den blog yazılarını çek
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('publish_date', { ascending: false });

    if (error) {
      console.error('Blog posts fetch error:', error);
      return [];
    }

    // Supabase field names'lerini frontend format'ına çevir
    return data.map(post => ({
      id: post.id,
      title: post.title,
      summary: post.summary,
      content: post.content,
      category: post.category,
      imageUrl: post.image_url,
      sourceUrl: post.source_url,
      publishDate: post.publish_date,
      readTime: post.read_time,
      tags: post.tags || [],
      author: post.author,
      is_published: post.is_published
    }));
  } catch (error) {
    console.error('Unexpected error fetching blog posts:', error);
    return [];
  }
};

// Kategoriye göre blog yazılarını çek
export const fetchBlogPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .eq('is_published', true)
      .order('publish_date', { ascending: false });

    if (error) {
      console.error('Blog posts by category fetch error:', error);
      return [];
    }

    return data.map(post => ({
      id: post.id,
      title: post.title,
      summary: post.summary,
      content: post.content,
      category: post.category,
      imageUrl: post.image_url,
      sourceUrl: post.source_url,
      publishDate: post.publish_date,
      readTime: post.read_time,
      tags: post.tags || [],
      author: post.author,
      is_published: post.is_published
    }));
  } catch (error) {
    console.error('Unexpected error fetching blog posts by category:', error);
    return [];
  }
};

// ID'ye göre tek blog yazısı çek
export const fetchBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error) {
      console.error('Blog post by ID fetch error:', error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      summary: data.summary,
      content: data.content,
      category: data.category,
      imageUrl: data.image_url,
      sourceUrl: data.source_url,
      publishDate: data.publish_date,
      readTime: data.read_time,
      tags: data.tags || [],
      author: data.author,
      is_published: data.is_published
    };
  } catch (error) {
    console.error('Unexpected error fetching blog post by ID:', error);
    return null;
  }
};

// Yeni blog yazısı ekle
export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{
        title: post.title,
        summary: post.summary,
        content: post.content,
        category: post.category,
        image_url: post.imageUrl,
        source_url: post.sourceUrl,
        publish_date: post.publishDate,
        read_time: post.readTime,
        tags: post.tags,
        author: post.author,
        is_published: post.is_published ?? true
      }])
      .select()
      .single();

    if (error) {
      console.error('Blog post creation error:', error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      summary: data.summary,
      content: data.content,
      category: data.category,
      imageUrl: data.image_url,
      sourceUrl: data.source_url,
      publishDate: data.publish_date,
      readTime: data.read_time,
      tags: data.tags || [],
      author: data.author,
      is_published: data.is_published
    };
  } catch (error) {
    console.error('Unexpected error creating blog post:', error);
    return null;
  }
};

// Blog yazısını güncelle
export const updateBlogPost = async (id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
  try {
    const updateData: any = {};
    
    if (updates.title) updateData.title = updates.title;
    if (updates.summary) updateData.summary = updates.summary;
    if (updates.content) updateData.content = updates.content;
    if (updates.category) updateData.category = updates.category;
    if (updates.imageUrl) updateData.image_url = updates.imageUrl;
    if (updates.sourceUrl) updateData.source_url = updates.sourceUrl;
    if (updates.publishDate) updateData.publish_date = updates.publishDate;
    if (updates.readTime) updateData.read_time = updates.readTime;
    if (updates.tags) updateData.tags = updates.tags;
    if (updates.author) updateData.author = updates.author;
    if (updates.is_published !== undefined) updateData.is_published = updates.is_published;

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Blog post update error:', error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      summary: data.summary,
      content: data.content,
      category: data.category,
      imageUrl: data.image_url,
      sourceUrl: data.source_url,
      publishDate: data.publish_date,
      readTime: data.read_time,
      tags: data.tags || [],
      author: data.author,
      is_published: data.is_published
    };
  } catch (error) {
    console.error('Unexpected error updating blog post:', error);
    return null;
  }
};

// Blog yazısını sil
export const deleteBlogPost = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Blog post deletion error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error deleting blog post:', error);
    return false;
  }
};

// Arama fonksiyonu
export const searchBlogPosts = async (query: string): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .or(`title.ilike.%${query}%,summary.ilike.%${query}%,content.ilike.%${query}%`)
      .order('publish_date', { ascending: false });

    if (error) {
      console.error('Blog posts search error:', error);
      return [];
    }

    return data.map(post => ({
      id: post.id,
      title: post.title,
      summary: post.summary,
      content: post.content,
      category: post.category,
      imageUrl: post.image_url,
      sourceUrl: post.source_url,
      publishDate: post.publish_date,
      readTime: post.read_time,
      tags: post.tags || [],
      author: post.author,
      is_published: post.is_published
    }));
  } catch (error) {
    console.error('Unexpected error searching blog posts:', error);
    return [];
  }
};