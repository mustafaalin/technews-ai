import { getAllBlogPosts } from '../data/blogData';
import { createSeoUrl } from './urlHelpers';
import type { Language } from '../context/LanguageContext';

export const generateSitemap = async (language: Language = 'tr'): Promise<string> => {
  const baseUrl = 'https://pulseoftech.net';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Dile göre statik sayfalar
  const staticPages = language === 'en' ? [
    { url: '/en', priority: '1.0', changefreq: 'daily' },
    { url: '/en/category/ai-ml', priority: '0.8', changefreq: 'daily' },
    { url: '/en/category/web-development', priority: '0.8', changefreq: 'daily' },
    { url: '/en/category/mobile-technology', priority: '0.8', changefreq: 'daily' },
    { url: '/en/category/cloud-computing', priority: '0.8', changefreq: 'daily' },
    { url: '/en/category/cybersecurity', priority: '0.8', changefreq: 'daily' },
    { url: '/en/category/startups', priority: '0.8', changefreq: 'daily' },
    { url: '/en/about', priority: '0.6', changefreq: 'monthly' },
    { url: '/en/contact', priority: '0.6', changefreq: 'monthly' },
    { url: '/en/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { url: '/en/terms-of-service', priority: '0.3', changefreq: 'yearly' },
  ] : [
    { url: '/tr', priority: '1.0', changefreq: 'daily' },
    { url: '/tr/category/yapay-zeka-ml', priority: '0.8', changefreq: 'daily' },
    { url: '/tr/category/web-gelistirme', priority: '0.8', changefreq: 'daily' },
    { url: '/tr/category/mobil-teknoloji', priority: '0.8', changefreq: 'daily' },
    { url: '/tr/category/bulut-bilisim', priority: '0.8', changefreq: 'daily' },
    { url: '/tr/category/siber-guvenlik', priority: '0.8', changefreq: 'daily' },
    { url: '/tr/category/girisimcilik', priority: '0.8', changefreq: 'daily' },
    { url: '/tr/about', priority: '0.6', changefreq: 'monthly' },
    { url: '/tr/contact', priority: '0.6', changefreq: 'monthly' },
    { url: '/tr/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { url: '/tr/terms-of-service', priority: '0.3', changefreq: 'yearly' },
  ];

  // O dildeki blog yazılarını al
  const blogPosts = await getAllBlogPosts(language);

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Statik sayfaları ekle
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Blog yazılarını ekle
  blogPosts.forEach(post => {
    const postDate = new Date(post.publishDate).toISOString().split('T')[0];
    const seoUrl = createSeoUrl({
      id: post.id,
      title: post.title,
      title_en: post.title_en,
      category: post.category,
      publishDate: post.publishDate
    }, language);
    
    sitemap += `
  <url>
    <loc>${baseUrl}${seoUrl}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

// Sitemap'i dosyaya kaydet
export const saveSitemap = async (language: Language = 'tr'): Promise<void> => {
  try {
    const sitemapContent = await generateSitemap(language);
    
    // Browser ortamında dosya kaydetme işlemi
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    const fileName = `sitemap-${language}.xml`;
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    console.log(`✅ ${language.toUpperCase()} Sitemap başarıyla oluşturuldu ve indirildi: ${fileName}`);
  } catch (error) {
    console.error(`❌ ${language.toUpperCase()} Sitemap oluşturulurken hata:`, error);
  }
};