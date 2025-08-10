import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage, translateCategorySlug } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import BlogCard from '../components/BlogCard';
import { getBlogPostsByCategory, getCategories } from '../data/blogData';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const [category, setCategory] = React.useState<any>(null);
  const [categoryPosts, setCategoryPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Get current language prefix
  const langPrefix = `/${language}`;
  React.useEffect(() => {
    const loadCategoryData = async () => {
      if (!slug) return;
      
      try {
        console.log('🔍 Loading category data for URL slug:', slug, 'language:', language);
        
        // Normalize the slug to match the current language
        const normalizedSlug = translateCategorySlug(slug, language);
        console.log('🔄 Normalized slug for current language:', normalizedSlug);
        
        // Kategorileri yükle
        const categories = await getCategories(language);
        console.log('📋 Available categories:', categories.map(c => ({ name: c.name, slug: c.slug })));
        
        // Try to find category with normalized slug first, then try original slug
        let foundCategory = categories.find(c => c.slug === normalizedSlug);
        if (!foundCategory) {
          foundCategory = categories.find(c => c.slug === slug);
        }
        
        console.log('✅ Found category:', foundCategory);
        
        if (!foundCategory) {
          console.error('❌ Category not found for slug:', slug, 'or normalized slug:', normalizedSlug);
          console.log('🔍 Trying alternative slug search...');
          
          // Alternatif slug arama - hem TR hem EN slug'larını kontrol et
          const alternativeCategory = categories.find(c => 
            c.slug === slug ||
            c.slug === normalizedSlug ||
            (c as any).slug_tr === slug || 
            (c as any).slug_en === slug ||
            (c as any).slug_tr === normalizedSlug ||
            (c as any).slug_en === normalizedSlug
          );
          console.log('🔄 Alternative category found:', alternativeCategory);
          foundCategory = alternativeCategory;
        }
        
        setCategory(foundCategory);

        // Kategori yazılarını yükle - use the slug that actually found the category
        const categorySlugToUse = foundCategory ? foundCategory.slug : slug;
        const posts = await getBlogPostsByCategory(categorySlugToUse, language);
        console.log('📰 Found posts:', posts.length);
        setCategoryPosts(posts);
      } catch (error) {
        console.error('❌ Error loading category data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [slug, language]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('category.loading')}</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('category.notFound')}</h1>
        <Link to={langPrefix} className="text-blue-600 hover:text-blue-800">
          {t('common.backToHome')}
        </Link>
      </div>
    );
  }

  // SEO için URL ve bilgiler oluştur
  const categoryUrl = `https://pulseoftech.net${langPrefix}/category/${category.slug}`;
  const seoTitle = language === 'en' 
    ? `${category.name} News | Pulse of Tech`
    : `${category.name} Haberleri | Pulse of Tech`;
  const seoDescription = language === 'en'
    ? `Discover the latest technology news in ${category.name} category. Stay updated with ${categoryPosts.length} articles.`
    : `${category.name} kategorisindeki en son teknoloji haberlerini keşfedin. ${categoryPosts.length} makale ile güncel kalın.`;
  const seoKeywords = [
    category.name.toLowerCase(),
    language === 'en' ? 'tech news' : 'teknoloji haberleri',
    language === 'en' ? 'artificial intelligence' : 'yapay zeka',
    language === 'en' ? 'technology' : 'teknoloji',
    category.slug
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        url={categoryUrl}
        type="website"
      />
      {/* Navigation */}
      <div className="mb-8">
        <Link
          to={langPrefix}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.backToPosts')}
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {category.name}
        </h1>
        <p className="text-gray-600 text-lg">
          {language === 'en' 
            ? `${categoryPosts.length} ${categoryPosts.length === 1 ? 'article' : 'articles'} in this category`
            : `Bu kategoride ${categoryPosts.length} ${categoryPosts.length === 1 ? 'makale' : 'makale'}`
          }
        </p>
      </div>

      {/* Posts Grid */}
      {categoryPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{t('category.noPosts')}</p>
          <Link
            to={langPrefix}
            className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
          >
            {t('category.viewAll')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
