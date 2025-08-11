import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { generateSitemap } from '../src/utils/generateSitemap';

async function generateSitemaps() {
  console.log('🚀 Sitemap oluşturma işlemi başlıyor...');
  
  try {
    // Public dizininin var olduğundan emin ol
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Türkçe sitemap oluştur
    console.log('📝 Türkçe sitemap oluşturuluyor...');
    const trSitemap = await generateSitemap('tr');
    const trPath = path.join(publicDir, 'sitemap-tr.xml');
    fs.writeFileSync(trPath, trSitemap, 'utf8');
    console.log('✅ Türkçe sitemap kaydedildi: sitemap-tr.xml');

    // İngilizce sitemap oluştur
    console.log('📝 İngilizce sitemap oluşturuluyor...');
    const enSitemap = await generateSitemap('en');
    const enPath = path.join(publicDir, 'sitemap-en.xml');
    fs.writeFileSync(enPath, enSitemap, 'utf8');
    console.log('✅ İngilizce sitemap kaydedildi: sitemap-en.xml');

    // Ana sitemap index dosyası oluştur (opsiyonel)
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://pulseoftech.net/sitemap-tr.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://pulseoftech.net/sitemap-en.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;

    const indexPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(indexPath, sitemapIndex, 'utf8');
    console.log('✅ Ana sitemap index dosyası kaydedildi: sitemap.xml');

    console.log('\n🎉 Tüm sitemap dosyaları başarıyla oluşturuldu!');
    console.log('📍 Dosya konumları:');
    console.log('   - public/sitemap.xml (ana index)');
    console.log('   - public/sitemap-tr.xml (Türkçe)');
    console.log('   - public/sitemap-en.xml (İngilizce)');
    console.log('\n🔗 Google Search Console URL\'leri:');
    console.log('   - https://pulseoftech.net/sitemap.xml');
    console.log('   - https://pulseoftech.net/sitemap-tr.xml');
    console.log('   - https://pulseoftech.net/sitemap-en.xml');

  } catch (error) {
    console.error('❌ Sitemap oluşturulurken hata:', error);
    process.exit(1);
  }
}

// Script'i çalıştır
generateSitemaps()
  .then(() => {
    console.log('✨ Sitemap oluşturma işlemi tamamlandı');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Sitemap oluşturma hatası:', error);
    process.exit(1);
  });