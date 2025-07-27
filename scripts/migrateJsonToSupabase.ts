import { createClient } from '@supabase/supabase-js';
import allPostsData from '../src/data/blogPosts.json';

// Environment variables'ları kontrol et
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase environment variables eksik!');
  console.log('Gerekli değişkenler:');
  console.log('- VITE_SUPABASE_URL');
  console.log('- VITE_SUPABASE_SERVICE_ROLE_KEY veya VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateJsonToSupabase() {
  console.log('🚀 JSON verilerini Supabase\'e aktarma başlıyor...');
  console.log(`📊 Toplam ${allPostsData.length} haber aktarılacak`);
  
  let successCount = 0;
  let errorCount = 0;
  const errors: string[] = [];

  for (let i = 0; i < allPostsData.length; i++) {
    const post = allPostsData[i];
    
    try {
      // Önce bu ID'de bir kayıt var mı kontrol et
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('id', post.id)
        .single();

      if (existingPost) {
        console.log(`⏭️  ${i + 1}/${allPostsData.length} - Zaten mevcut: ${post.title.substring(0, 50)}...`);
        continue;
      }

      // Yeni kayıt ekle
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          id: post.id,
          title: post.title,
          summary: post.summary,
          content: post.content,
          category: post.category,
          image_url: post.imageUrl,
          source_url: post.sourceUrl,
          publish_date: post.publishDate,
          read_time: post.readTime,
          tags: post.tags || [],
          author: post.author,
          is_published: true
        });

      if (error) {
        console.error(`❌ ${i + 1}/${allPostsData.length} - Hata: ${post.title.substring(0, 50)}...`);
        console.error(`   Detay: ${error.message}`);
        errors.push(`${post.title}: ${error.message}`);
        errorCount++;
      } else {
        console.log(`✅ ${i + 1}/${allPostsData.length} - Başarılı: ${post.title.substring(0, 50)}...`);
        successCount++;
      }
    } catch (error) {
      console.error(`💥 ${i + 1}/${allPostsData.length} - Beklenmeyen hata: ${post.title.substring(0, 50)}...`);
      console.error(`   Detay: ${error}`);
      errors.push(`${post.title}: ${error}`);
      errorCount++;
    }

    // Her 10 kayıtta bir kısa bekleme (rate limiting için)
    if (i % 10 === 0 && i > 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  console.log('\n📈 ÖZET:');
  console.log(`✅ Başarılı: ${successCount}`);
  console.log(`❌ Hatalı: ${errorCount}`);
  console.log(`📊 Toplam: ${allPostsData.length}`);

  if (errors.length > 0) {
    console.log('\n🔍 HATALAR:');
    errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  }

  if (successCount > 0) {
    console.log('\n🎉 Veri aktarımı tamamlandı!');
  }
}

// Script'i çalıştır
migrateJsonToSupabase()
  .then(() => {
    console.log('✨ Migration tamamlandı');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration hatası:', error);
    process.exit(1);
  });