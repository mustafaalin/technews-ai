import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { getBlogPostsByCategory, getCategories } from '../data/blogData';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = React.useState<any>(null);
  const [categoryPosts, setCategoryPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadCategoryData = async () => {
      if (!slug) return;
      
      try {
        // Kategorileri yükle
        const categories = await getCategories();
        const foundCategory = categories.find(c => c.slug === slug);
        setCategory(foundCategory);

        // Kategori yazılarını yükle
        const posts = await getBlogPostsByCategory(slug);
        setCategoryPosts(posts);
      } catch (error) {
        console.error('Error loading category data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Kategori yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Kategori bulunamadı</h1>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Ana sayfaya dön
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tüm yazılara dön
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {category.name}
        </h1>
        <p className="text-gray-600 text-lg">
          Bu kategoride {categoryPosts.length} {categoryPosts.length === 1 ? 'makale' : 'makale'}
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
          <p className="text-gray-500 text-lg">Bu kategoride henüz yazı bulunamadı.</p>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
          >
            Tüm yazılara göz at
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
