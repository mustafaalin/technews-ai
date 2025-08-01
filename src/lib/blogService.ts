import { supabase, isSupabaseAvailable } from './supabase';
import { BlogPost, SupabaseBlogPost, Category } from "../types/blog";

// Kategorileri çek
export const fetchCategories = async (): Promise<Category[]> => {
  if (!isSupabaseAvailable()) {
    console.log('⚠️ Supabase mevcut değil, boş array döndürülüyor');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        slug,
        blog_posts!blog_posts_category_id_fkey(count)
      `)
      .order('id');

    if (error) {
      console.error('Categories fetch error:', error);
      return [];
    }

    return data.map((category: any) => ({
      id: category.id.toString(),
      name: category.name,
      slug: category.slug,
      count: category.blog_posts?.length || 0,
    }));
  } catch (error) {
    console.error('Unexpected error fetching categories:', error);
    return [];
  }
};

// Supabase'den blog yazılarını çek
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  if (!isSupabaseAvailable()) {
    console.log('⚠️ Supabase mevcut değil, boş array döndürülüyor');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
    id, title, summary, content, image_url, source_url, publish_date, read_time, tags, author, is_published,category_id,
    categories (id, name, slug)
  `)
      .eq("is_published", true)
      .order("publish_date", { ascending: false });

    if (error) {
      console.error('Blog posts fetch error:', error);
      return [];
    }

    // Supabase field names'lerini frontend format'ına çevir
    return data.map((post) => ({
      id: post.id,
      title: post.title,
      summary: post.summary,
      content: post.content,
      categoryId: post.category_id,
      category: post.categories?.slug || "diger",
      categoryName: post.categories?.name || "Diğer",
      imageUrl: post.image_url,
      sourceUrl: post.source_url,
      publishDate: post.publish_date,
      readTime: post.read_time,
      tags: post.tags || [],
      author: post.author,
      is_published: post.is_published,
    }));


  } catch (error) {
    console.error('Unexpected error fetching blog posts:', error);
    return [];
  }
};

// Kategoriye göre blog yazılarını çek
export const fetchBlogPostsByCategory = async (categorySlug: string): Promise<BlogPost[]> => {
  if (!isSupabaseAvailable()) {
    console.log("⚠️ Supabase mevcut değil, boş array döndürülüyor");
    return [];
  }
  
  try {
    // 1️⃣ Önce category_id'yi bul
    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();

    if (categoryError || !categoryData) {
      console.error("Kategori bulunamadı:", categoryError);
      return [];
    }

       const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        id, title, summary, content, image_url, source_url, publish_date, read_time, tags, author, is_published,category_id,
        categories (id, name, slug)
      `)
      .eq("is_published", true)
      .eq("category_id", categoryData.id) // ✅ artık category_id üzerinden filtreleme
      .order("publish_date", { ascending: false });

    if (error) {
      console.error('Blog posts by category fetch error:', error);
      return [];
    }

    return (data as SupabaseBlogPost[]).map((post) => ({
      id: post.id,
      title: post.title,
      summary: post.summary,
      content: post.content,
      categoryId: post.category_id,
      category: post.categories?.slug || "diger",
      categoryName: post.categories?.name || "Diğer",
      imageUrl: post.image_url,
      sourceUrl: post.source_url,
      publishDate: post.publish_date,
      readTime: post.read_time,
      tags: post.tags || [],
      author: post.author,
      is_published: post.is_published,
    }));
  } catch (error) {
    console.error('Unexpected error fetching blog posts by category:', error);
    return [];
  }
};

// ID'ye göre tek blog yazısı çek
export const fetchBlogPostById = async (id: string): Promise<BlogPost | null> => {
  if (!isSupabaseAvailable()) {
    return null;
  }
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        id, title, summary, content, image_url, source_url, publish_date, read_time, tags, author, is_published,category_id,
        categories (id, name, slug)
      `)
      .eq("id", id)
      .eq("is_published", true)
      .single();

    if (error) {
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      summary: data.summary,
      content: data.content,
      categoryId: data.category_id,
      category: data.categories?.slug || "diger",
      categoryName: data.categories?.name || "Diğer",
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
export const createBlogPost = async (
  post: Omit<BlogPost, "id" | "created_at" | "updated_at">
): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert([
        {
          title: post.title,
          summary: post.summary,
          content: post.content,
          category_id: post.categoryId ?? 99, // ✅ slug değil id kullanıyoruz (eşleşmezse 99 → Diğer)
          image_url: post.imageUrl,
          source_url: post.sourceUrl,
          publish_date: post.publishDate,
          read_time: post.readTime,
          tags: post.tags,
          author: post.author,
          is_published: post.is_published ?? true,
        },
      ])
      .select(
        `
        id, title, summary, content, image_url, source_url, publish_date, read_time, tags, author, is_published,category_id,
        categories (id, name, slug)
      `
      )
      .single();

    if (error) {
      console.error("Blog post creation error:", error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      summary: data.summary,
      content: data.content,
      categoryId: data.category_id,
      category: data.categories?.slug || "diger",
      categoryName: data.categories?.name || "Diğer",
      imageUrl: data.image_url,
      sourceUrl: data.source_url,
      publishDate: data.publish_date,
      readTime: data.read_time,
      tags: data.tags || [],
      author: data.author,
      is_published: data.is_published,
    };
  } catch (error) {
    console.error("Unexpected error creating blog post:", error);
    return null;
  }
};


// Blog yazısını güncelle
export const updateBlogPost = async (
  id: string,
  updates: Partial<BlogPost>
): Promise<BlogPost | null> => {
  try {
    const updateData: any = {};

    if (updates.title) updateData.title = updates.title;
    if (updates.summary) updateData.summary = updates.summary;
    if (updates.content) updateData.content = updates.content;
    if (updates.categoryId) updateData.category_id = updates.categoryId; // ✅ Değişiklik burada
    if (updates.imageUrl) updateData.image_url = updates.imageUrl;
    if (updates.sourceUrl) updateData.source_url = updates.sourceUrl;
    if (updates.publishDate) updateData.publish_date = updates.publishDate;
    if (updates.readTime) updateData.read_time = updates.readTime;
    if (updates.tags) updateData.tags = updates.tags;
    if (updates.author) updateData.author = updates.author;
    if (updates.is_published !== undefined)
      updateData.is_published = updates.is_published;

    const { data, error } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("id", id)
      .select(
        `
        id, title, summary, content, image_url, source_url, publish_date, read_time, tags, author, is_published,category_id,
        categories (id, name, slug)
      `
      )
      .single();

    if (error) {
      console.error("Blog post update error:", error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      summary: data.summary,
      content: data.content,
      categoryId: data.category_id,
      category: data.categories?.slug || "diger",
      categoryName: data.categories?.name || "Diğer",
      imageUrl: data.image_url,
      sourceUrl: data.source_url,
      publishDate: data.publish_date,
      readTime: data.read_time,
      tags: data.tags || [],
      author: data.author,
      is_published: data.is_published,
    };
  } catch (error) {
    console.error("Unexpected error updating blog post:", error);
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
  if (!isSupabaseAvailable()) {
    console.log("⚠️ Supabase mevcut değil, boş array döndürülüyor");
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        id, title, summary, content, image_url, source_url, publish_date, read_time, tags, author, is_published,category_id,
        categories (id, name, slug)
      `) // ✅ categories join edildi
      .eq("is_published", true)
      .or(
        `title.ilike.%${query}%,summary.ilike.%${query}%,content.ilike.%${query}%`
      )
      .order("publish_date", { ascending: false });

    if (error) {
      console.error("Blog posts search error:", error);
      return [];
    }

    return data.map((post) => ({
      id: post.id,
      title: post.title,
      summary: post.summary,
      content: post.content,
      categoryId: post.category_id,
      category: post.categories?.slug || "diger",
      categoryName: post.categories?.name || "Diğer",
      imageUrl: post.image_url,
      sourceUrl: post.source_url,
      publishDate: post.publish_date,
      readTime: post.read_time,
      tags: post.tags || [],
      author: post.author,
      is_published: post.is_published,
    }));
  } catch (error) {
    console.error("Unexpected error searching blog posts:", error);
    return [];
  }
};
