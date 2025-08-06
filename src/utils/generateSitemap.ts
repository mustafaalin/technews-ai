import { getAllBlogPosts } from '../data/blogData';
import { createSeoUrl } from './urlHelpers';

export const generateSitemap = async (): Promise<string> => {
  const baseUrl = 'https://pulseoftech.net';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Statik sayfalar
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/category/ai-ml', priority: '0.8', changefreq: 'daily' },
    { url: '/category/web-dev', priority: '0.8', changefreq: 'daily' },
    { url: '/category/mobile', priority: '0.8', changefreq: 'daily' },
    { url: '/category/cloud', priority: '0.8', changefreq: 'daily' },
    { url: '/category/security', priority: '0.8', changefreq: 'daily' },
    { url: '/category/startups', priority: '0.8', changefreq: 'daily' },
    { url: '/about', priority: '0.6', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
  ];

  // Blog yazılarını al
  const blogPosts = await getAllBlogPosts();

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
      category: post.category,
      publishDate: post.publishDate
    });
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
export const saveSitemap = async (): Promise<void> => {
  try {
    const sitemapContent = await generateSitemap();
    
    // Browser ortamında dosya kaydetme işlemi
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    console.log('✅ Sitemap başarıyla oluşturuldu ve indirildi!');
  } catch (error) {
    console.error('❌ Sitemap oluşturulurken hata:', error);
  }
};