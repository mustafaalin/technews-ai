import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Users, User, Loader, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';
import BlogCard from '../components/BlogCard';
import NewsletterSignup from '../components/NewsletterSignup';
import { getAllBlogPosts } from '../data/blogData';
import { createSeoUrl } from '../utils/urlHelpers';

const Home = () => {
  const { language, t } = useLanguage();
  const [blogPosts, setBlogPosts] = React.useState<any[]>([]);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [offset, setOffset] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const POSTS_PER_PAGE = 9;

  React.useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const result = await getAllBlogPosts(language, { limit: POSTS_PER_PAGE, offset: 0 });
        setBlogPosts(result.data);
        setHasMore(result.hasMore);
        setOffset(POSTS_PER_PAGE);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, [language]);

  const loadMorePosts = React.useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const result = await getAllBlogPosts(language, { limit: POSTS_PER_PAGE, offset });
      setBlogPosts(prev => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setOffset(prev => prev + POSTS_PER_PAGE);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [language, offset, loadingMore, hasMore]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      loadMorePosts();
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);

  if (!featuredPost) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No news available yet</h2>
        <p className="text-gray-600">New articles will be added soon.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const locale = language === 'en' ? 'en-US' : 'tr-TR';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEOHead
        title={language === 'en' ? "Pulse of Tech - AI-Powered Tech News" : "Pulse of Tech - Yapay Zeka Destekli Teknoloji Haberleri"}
        description={language === 'en' ? "Stay updated with daily AI-powered tech news summaries. Get insights from the tech world in minutes, not hours." : "Günlük yapay zeka destekli teknoloji haberi özetleriyle güncel kalın. Teknoloji dünyasından içgörüleri saatlerce değil, dakikalar içinde edinin."}
        keywords={language === 'en' ? ['tech news', 'artificial intelligence', 'AI', 'technology', 'machine learning', 'web development', 'cloud computing', 'cybersecurity', 'startups'] : ['teknoloji haberleri', 'yapay zeka', 'AI', 'teknoloji', 'makine öğrenmesi', 'web geliştirme', 'bulut bilişim', 'siber güvenlik', 'girişimcilik']}
        url={`https://pulseoftech.net/${language}`}
        type="website"
        language={language}
        alternateUrls={{
          tr: 'https://pulseoftech.net/tr',
          en: 'https://pulseoftech.net/en'
        }}
      />
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {t('home.title')}
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          {t('home.subtitle')}
        </p>
        <div className="flex justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-1 text-blue-500" />
            <span>{t('home.dailyUpdate')}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-blue-500" />
            <span>{t('home.readTime')}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-blue-500" />
            <span>{t('home.readers')}</span>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t('home.featured')}</h2>
          <div className="ml-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
            {t('home.trending')}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  {featuredPost.category}
                </span>
                <span className="ml-4 text-sm text-gray-500">
                  {formatDate(featuredPost.publishDate)}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                <Link
                  to={createSeoUrl(featuredPost, language)}
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {featuredPost.title}
                </Link>
              </h3>
              
              <p className="text-gray-700 mb-4">
                {featuredPost.summary}
              </p>
              
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <User className="w-4 h-4 mr-1" />
                <span className="font-medium text-gray-700">{featuredPost.author}</span>
                <span className="mx-2">•</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>{featuredPost.readTime} {t('common.readTime')}</span>
              </div>
              
              <Link
                to={createSeoUrl(featuredPost, language)}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium inline-block shadow-lg"
              >
                {t('home.readFull')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('home.recent')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className={`flex items-center px-8 py-4 rounded-lg font-medium text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                loadingMore
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
              }`}
            >
              {loadingMore ? (
                <>
                  <Loader className="w-5 h-5 mr-3 animate-spin" />
                  {t('home.loading')}
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-3" />
                  {t('home.loadMore')}
                </>
              )}
            </button>
          </div>
        )}
        
        {/* All posts loaded message */}
        {!hasMore && recentPosts.length > 0 && !loading && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <p className="text-gray-600 font-medium">{t('home.allPostsLoaded')}</p>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </div>
  );
};

export default Home;