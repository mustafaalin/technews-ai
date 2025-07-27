import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import allPostsData from '../src/data/blogPosts.json';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

async function migratePosts() {
  for (const post of allPostsData) {
    const { error } = await supabase.from('blog_posts').insert({
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
      is_published: true,
    });

    if (error) {
      console.error('Hata:', error);
    } else {
      console.log(`Eklendi: ${post.title}`);
    }
  }
}

migratePosts();
