import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// JSON dosyasını doğrudan oku
const jsonPath = path.join(process.cwd(), 'src/data/blogPosts.json');
const allPostsData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

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
  console.log(`🔗 Supabase URL: ${supabaseUrl}`);
  console.log(`🔑 Service Key mevcut: ${supabaseServiceKey ? 'Evet' : 'Hayır'}`);
  
  let successCount = 0;
  let errorCount = 0;
  const errors: string[] = [];

  for (let i = 0; i < allPostsData.length; i++) {
    const post = allPostsData[i];
    
    console.log(`\n📝 ${i + 1}/${allPostsData.length} - İşleniyor: ${post.title.substring(0, 50)}...`);
    
    try {
      // Önce bu ID'de bir kayıt var mı kontrol et
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('id', post.id)
        .single();

      if (existingPost) {
        console.log(`⏭️  Zaten mevcut, atlanıyor`);
        continue;
      }

      // Yeni kayıt ekle
      const { error } = await supabase
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
          tags: post.tags || [],
          author: post.author,
          is_published: true
        }]);

      if (error) {
        console.error(`❌ Hata oluştu!`);
        console.error(`   Detay: ${error.message}`);
        console.error(`   Kod: ${error.code}`);
        errors.push(`${post.title}: ${error.message}`);
        errorCount++;
      } else {
        console.log(`✅ Başarıyla kaydedildi!`);
        successCount++;
      }
    } catch (error) {
      console.error(`💥 Beklenmeyen hata!`);
      console.error(`   Detay: ${error}`);
      errors.push(`${post.title}: ${error}`);
      errorCount++;
    }

    // Her 10 kayıtta bir kısa bekleme (rate limiting için)
    if (i % 5 === 0 && i > 0) {
      console.log(`⏸️  Kısa mola (rate limiting)...`);
      await new Promise(resolve => setTimeout(resolve, 500));
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