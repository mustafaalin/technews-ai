import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  tr: {
    // Header
    'nav.home': 'Ana Sayfa',
    'nav.ai': 'Yapay Zeka',
    'nav.webdev': 'Web Geliştirme',
    'nav.mobile': 'Mobil',
    'nav.cloud': 'Bulut',
    'nav.security': 'Güvenlik',
    'search.placeholder': 'Teknoloji haberlerinde ara...',
    'search.noResults': 'için sonuç bulunamadı',
    
    // Categories
    'category.all': 'Tüm Yazılar',
    'category.aiml': 'Yapay Zeka & Makine Öğrenmesi',
    'category.webdev': 'Web Geliştirme',
    'category.mobile': 'Mobil Teknoloji',
    'category.cloud': 'Bulut Bilişim',
    'category.security': 'Siber Güvenlik',
    'category.startups': 'Girişimcilik',
    'category.other': 'Diğer',
    
    // Common
    'common.readMore': 'Devamını oku',
    'common.readTime': 'dk okuma',
    'common.author': 'Yazar',
    'common.loading': 'Yükleniyor...',
    'common.backToHome': 'Ana sayfaya dön',
    'common.backToPosts': 'Tüm yazılara dön',
    'common.viewSource': 'Orijinal kaynağı görüntüle',
    'common.share': 'Paylaş',
    
    // Home page
    'home.title': 'Yapay Zeka Destekli Teknoloji Haber Dünyası',
    'home.subtitle': 'Günlük yapay zeka destekli teknoloji haberi özetleriyle güncel kalın. Teknoloji dünyasından içgörüleri saatlerce değil, dakikalar içinde edinin.',
    'home.dailyUpdate': 'Günlük Güncelleme',
    'home.readTime': '2-4 dk okuma',
    'home.readers': '10,000+ okuyucu',
    'home.featured': 'Öne Çıkan Haber',
    'home.trending': 'Trend',
    'home.recent': 'Son Güncellemeler',
    'home.readFull': 'Tam Haberi Oku',
    
    // Newsletter
    'newsletter.title': 'Hiçbir Haberi Kaçırmayın',
    'newsletter.subtitle': 'Günlük yapay zeka destekli teknoloji haberi özetlerini e-posta kutunuza alın. Bilgili kalan binlerce profesyonele katılın.',
    'newsletter.placeholder': 'E-posta adresinizi girin',
    'newsletter.subscribe': 'Abone Ol',
    'newsletter.success': 'Başarıyla abone oldunuz! Teşekkür ederiz.',
    'newsletter.error': 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
    'newsletter.disclaimer': 'Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.',
    
    // Footer
    'footer.categories': 'Kategoriler',
    'footer.company': 'Şirket',
    'footer.about': 'Hakkımızda',
    'footer.contact': 'İletişim',
    'footer.privacy': 'Gizlilik Politikası',
    'footer.terms': 'Kullanım Şartları',
    'footer.description': 'Yapay zeka destekli özetlerle en son teknoloji haberlerinden haberdar olun. Teknoloji dünyasından özlü, doğru içgörüleri günlük olarak edinin.',
    'footer.copyright': 'Tüm hakları saklıdır.',
    'footer.tagline': 'Yapay Zeka Destekli • Günlük Güncellemeler • Teknoloji Haberleri',
    
    // Post page
    'post.summary': 'Özet',
    'post.originalArticle': 'Orijinal Makaleyi Okuyun',
    'post.originalDescription': 'Daha detaylı bilgi ve tam hikaye için orijinal kaynağı ziyaret edin.',
    'post.visitSource': 'Orijinal Kaynağı Ziyaret Et',
    'post.relatedPosts': 'İlgili Yazılar',
    'post.notFound': 'Yazı Bulunamadı',
    'post.notFoundDescription': 'Aradığınız yazı mevcut değil veya kaldırılmış olabilir.',
    
    // Category page
    'category.loading': 'Kategori yükleniyor...',
    'category.notFound': 'Kategori bulunamadı',
    'category.postsCount': 'makale',
    'category.noPosts': 'Bu kategoride henüz yazı bulunamadı.',
    'category.viewAll': 'Tüm yazılara göz at',
    
    // About page
    'about.title': 'Hakkımızda',
    'about.subtitle': 'Pulse of Tech, teknoloji dünyasının nabzını tutan, yapay zeka destekli haber platformudur.',
    'about.mission': 'Misyonumuz',
    'about.whatWeDo': 'Ne Yapıyoruz?',
    'about.values': 'Değerlerimiz',
    'about.team': 'Ekibimiz',
    
    // Contact page
    'contact.title': 'İletişim',
    'contact.subtitle': 'Sorularınız, önerileriniz veya işbirliği teklifleriniz için bizimle iletişime geçin.',
    'contact.sendMessage': 'Mesaj Gönder',
    'contact.directContact': 'Doğrudan İletişim',
    'contact.socialMedia': 'Sosyal Medya',
    'contact.faq': 'Sık Sorulan Sorular',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.ai': 'AI',
    'nav.webdev': 'Web Dev',
    'nav.mobile': 'Mobile',
    'nav.cloud': 'Cloud',
    'nav.security': 'Security',
    'search.placeholder': 'Search tech news...',
    'search.noResults': 'No results found for',
    
    // Categories
    'category.all': 'All Posts',
    'category.aiml': 'AI & Machine Learning',
    'category.webdev': 'Web Development',
    'category.mobile': 'Mobile Technology',
    'category.cloud': 'Cloud Computing',
    'category.security': 'Cybersecurity',
    'category.startups': 'Startups',
    'category.other': 'Other',
    
    // Common
    'common.readMore': 'Read more',
    'common.readTime': 'min read',
    'common.author': 'Author',
    'common.loading': 'Loading...',
    'common.backToHome': 'Back to home',
    'common.backToPosts': 'Back to all posts',
    'common.viewSource': 'View original source',
    'common.share': 'Share',
    
    // Home page
    'home.title': 'AI-Powered Tech News Hub',
    'home.subtitle': 'Stay updated with daily AI-powered tech news summaries. Get insights from the tech world in minutes, not hours.',
    'home.dailyUpdate': 'Daily Updates',
    'home.readTime': '2-4 min read',
    'home.readers': '10,000+ readers',
    'home.featured': 'Featured News',
    'home.trending': 'Trending',
    'home.recent': 'Recent Updates',
    'home.readFull': 'Read Full Story',
    
    // Newsletter
    'newsletter.title': 'Never Miss a Story',
    'newsletter.subtitle': 'Get daily AI-powered tech news summaries delivered to your inbox. Join thousands of informed professionals.',
    'newsletter.placeholder': 'Enter your email address',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.success': 'Successfully subscribed! Thank you.',
    'newsletter.error': 'An error occurred. Please try again later.',
    'newsletter.disclaimer': 'No spam. Unsubscribe anytime.',
    
    // Footer
    'footer.categories': 'Categories',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.description': 'Stay informed with AI-powered summaries of the latest tech news. Get concise, accurate insights from the tech world daily.',
    'footer.copyright': 'All rights reserved.',
    'footer.tagline': 'AI-Powered • Daily Updates • Tech News',
    
    // Post page
    'post.summary': 'Summary',
    'post.originalArticle': 'Read the Original Article',
    'post.originalDescription': 'Visit the original source for more detailed information and the complete story.',
    'post.visitSource': 'Visit Original Source',
    'post.relatedPosts': 'Related Posts',
    'post.notFound': 'Post Not Found',
    'post.notFoundDescription': 'The post you are looking for does not exist or may have been removed.',
    
    // Category page
    'category.loading': 'Loading category...',
    'category.notFound': 'Category not found',
    'category.postsCount': 'articles',
    'category.noPosts': 'No posts found in this category yet.',
    'category.viewAll': 'View all posts',
    
    // About page
    'about.title': 'About Us',
    'about.subtitle': 'Pulse of Tech is an AI-powered news platform that keeps a finger on the pulse of the tech world.',
    'about.mission': 'Our Mission',
    'about.whatWeDo': 'What We Do',
    'about.values': 'Our Values',
    'about.team': 'Our Team',
    
    // Contact page
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in touch with us for questions, suggestions, or collaboration proposals.',
    'contact.sendMessage': 'Send Message',
    'contact.directContact': 'Direct Contact',
    'contact.socialMedia': 'Social Media',
    'contact.faq': 'Frequently Asked Questions',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract language from URL or default to 'tr'
  const getLanguageFromPath = (): Language => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const firstSegment = pathSegments[0];
    return (firstSegment === 'en' || firstSegment === 'tr') ? firstSegment : 'tr';
  };

  const [language, setLanguageState] = useState<Language>(getLanguageFromPath);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Update language and navigate to new URL
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    
    // Save to localStorage
    localStorage.setItem('preferred-language', lang);
    
    // Update URL
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    // Remove existing language prefix if present
    if (pathSegments[0] === 'en' || pathSegments[0] === 'tr') {
      pathSegments.shift();
    }
    
    // Add new language prefix
    const newPath = `/${lang}${pathSegments.length > 0 ? '/' + pathSegments.join('/') : ''}`;
    navigate(newPath);
  };

  // Update language when URL changes
  useEffect(() => {
    const urlLang = getLanguageFromPath();
    if (urlLang !== language) {
      setLanguageState(urlLang);
    }
  }, [location.pathname]);

  // Load saved language preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language') as Language;
    if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
      const urlLang = getLanguageFromPath();
      if (urlLang !== savedLang) {
        setLanguage(savedLang);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};