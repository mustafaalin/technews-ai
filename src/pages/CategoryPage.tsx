import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { useLanguage, translateCategorySlug } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import BlogCard from '../components/BlogCard';
import { getBlogPostsByCategory, getCategories } from '../data/blogData';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const [category, setCategory] = React.useState<any>(null);
  const [categoryPosts, setCategoryPosts] = React.useState<any[]>([]);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [offset, setOffset] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const observerRef = React.useRef<HTMLDivElement>(null);

  const POSTS_PER_PAGE = 9;

  // Get current language prefix
  const langPrefix = `/${language}`;

  // Reset pagination when slug or language changes
  React.useEffect(() => {
    setCategoryPosts([]);
    setOffset(0);
    setHasMore(true);
    setLoadingMore(false);
  }, [slug, language]);

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
        const result = await getBlogPostsByCategory(categorySlugToUse, language, { limit: POSTS_PER_PAGE, offset: 0 });
        console.log('📰 Found posts:', (result.data ?? []).length);
        setCategoryPosts(result.data);
        setHasMore(result.hasMore);
        setOffset(POSTS_PER_PAGE);
      } catch (error) {
        console.error('❌ Error loading category data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [slug, language]);

  const loadMorePosts = React.useCallback(async () => {
    if (loadingMore || !hasMore || !category) return;

    setLoadingMore(true);
    try {
      const result = await getBlogPostsByCategory(category.slug, language, { limit: POSTS_PER_PAGE, offset });
      setCategoryPosts(prev => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setOffset(prev => prev + POSTS_PER_PAGE);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [category, language, offset, loadingMore, hasMore]);

  // Intersection Observer for infinite scroll
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMorePosts, hasMore, loadingMore]);

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
        language={language}
        alternateUrls={{
          tr: `https://pulseoftech.net/tr/category/${category.slug}`,
          en: `https://pulseoftech.net/en/category/${category.slug}`
        }}
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
            ? `${category.count} ${category.count === 1 ? 'article' : 'articles'} in this category`
            : `Bu kategoride ${category.count} ${category.count === 1 ? 'makale' : 'makale'}`
          }
        </p>
      </div>

      {/* Posts Grid */}
      {categoryPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          {/* Loading indicator */}
          {loadingMore && (
            <div className="flex justify-center items-center py-8">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">{t('common.loading')}</span>
            </div>
          )}
          
          {/* Intersection observer target */}
          {hasMore && !loadingMore && categoryPosts.length > 0 && (
            <div ref={observerRef} className="h-10 flex justify-center items-center">
              <div className="text-gray-400 text-sm">{t('category.scrollForMore')}</div>
            </div>
          )}
          
          {/* End of posts message */}
          {!hasMore && categoryPosts.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">{t('category.allPostsLoaded')}</p>
            </div>
          )}
        </>
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
