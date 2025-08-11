import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { Language } from '../context/LanguageContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  category?: string;
  tags?: string[];
  language?: Language;
  alternateUrls?: {
    tr?: string;
    en?: string;
  };
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Pulse of Tech - AI-Powered Tech News',
  description = 'Yapay zeka destekli özetlerle en son teknoloji haberlerinden haberdar olun. Teknoloji dünyasından özlü, doğru içgörüleri günlük olarak edinin.',
  keywords = ['teknoloji haberleri', 'yapay zeka', 'AI', 'teknoloji', 'makine öğrenmesi', 'web geliştirme', 'bulut bilişim'],
  image = 'https://pulseoftech.net/favicon.png',
  url = 'https://pulseoftech.net',
  type = 'website',
  author = 'Mustafa ALIN',
  publishedTime,
  modifiedTime,
  category,
  tags = [],
  language = 'tr',
  alternateUrls
}) => {
  // Description'ı 160 karakter ile sınırla
  const truncatedDescription = description.length > 160 
    ? description.substring(0, 157) + '...' 
    : description;

  // Keywords'ü birleştir ve optimize et
  const allKeywords = [
    ...keywords,
    ...tags,
    category,
    'teknoloji',
    'haber',
    'pulse of tech'
  ].filter(Boolean).join(', ');

  // Language and locale settings
  const languageSettings = {
    tr: {
      language: 'Turkish',
      locale: 'tr_TR',
      inLanguage: 'tr',
      htmlLang: 'tr'
    },
    en: {
      language: 'English',
      locale: 'en_US',
      inLanguage: 'en',
      htmlLang: 'en'
    }
  };

  const currentLangSettings = languageSettings[language];

  return (
    <Helmet>
      {/* HTML lang attribute */}
      <html lang={currentLangSettings.htmlLang} />
      
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={truncatedDescription} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={currentLangSettings.language} />
      <meta name="revisit-after" content="1 days" />
      
      {/* Canonical URL - Self-referencing */}
      <link rel="canonical" href={url} />
      
      {/* Hreflang Tags */}
      {alternateUrls?.tr && (
        <link rel="alternate" href={alternateUrls.tr} hreflang="tr" />
      )}
      {alternateUrls?.en && (
        <link rel="alternate" href={alternateUrls.en} hreflang="en" />
      )}
      {/* x-default points to English version */}
      {alternateUrls?.en && (
        <link rel="alternate" href={alternateUrls.en} hreflang="x-default" />
      )}
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Pulse of Tech" />
      <meta property="og:locale" content={currentLangSettings.locale} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={truncatedDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@mustafaalin" />
      <meta name="twitter:creator" content="@mustafaalin" />
      
      {/* Article Specific Tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {category && <meta property="article:section" content={category} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      
      {/* JSON-LD Structured Data */}
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": truncatedDescription,
            "image": image,
            "author": {
              "@type": "Person",
              "name": author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Pulse of Tech",
              "logo": {
                "@type": "ImageObject",
                "url": "https://pulseoftech.net/favicon.png"
              }
            },
            "datePublished": publishedTime,
            "dateModified": modifiedTime || publishedTime,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": url
            },
            "url": url,
            "inLanguage": currentLangSettings.inLanguage
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;