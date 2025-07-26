import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, ExternalLink, Share2, Calendar, User } from 'lucide-react';
import { blogPosts, categories } from '../data/blogData';

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Yazı bulunamadı</h1>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Ana sayfaya dön
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Find the category name from the slug
  const categoryData = categories.find(cat => cat.slug === post.category);
  const categoryName = categoryData ? categoryData.name : post.category;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <header className="mb-8">
        <div className="flex items-center mb-4">
          <Link
            to={`/category/${post.category}`}
            className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            {categoryName}
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <User className="w-4 h-4 mr-1" />
          <span className="font-medium">{post.author}</span>
          <span className="mx-2">•</span>
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formatDate(post.publishDate)}</span>
          <span className="mx-2">•</span>
          <Clock className="w-4 h-4 mr-1" />
          <span>{post.readTime} dk okuma</span>
        </div>
        
        <div className="flex items-center justify-between border-b border-gray-200 pb-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
              <Share2 className="w-5 h-5" />
            </button>
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Kaynağı Görüntüle
            </a>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="mb-8">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Özet</h2>
        <p className="text-blue-800 leading-relaxed">
          {post.summary}
        </p>
      </div>

      {/* Content */}
      <div className="prose max-w-none mb-12">
        <div className="text-gray-800 leading-relaxed space-y-4">
        <div className="text-gray-900 leading-relaxed space-y-4 text-lg">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-6 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        </div>
      </div>

      {/* Source Link */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-2">Orijinal Makaleyi Okuyun</h3>
        <p className="text-gray-600 mb-4">
          Daha detaylı bilgi ve tam hikaye için orijinal kaynağı ziyaret edin.
        </p>
        <a
          href={post.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Orijinal Kaynağı Ziyaret Et
        </a>
      </div>

      {/* Related Posts */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">İlgili Yazılar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts
            .filter(p => p.id !== post.id && p.category === post.category)
            .slice(0, 2)
            .map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/post/${relatedPost.id}`}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={relatedPost.imageUrl}
                    alt={relatedPost.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">
                      {formatDate(relatedPost.publishDate)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      </article>
    </div>
  );
};

export default PostPage;
