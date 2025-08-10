import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ExternalLink, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BlogPost } from '../types/blog';
import { createSeoUrl } from '../utils/urlHelpers';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { language, t } = useLanguage();

  const formatDate = (dateString: string) => {
    const locale = language === 'en' ? 'en-US' : 'tr-TR';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const categorySlug = post.category || "diger";

  const categoryMap: Record<string, string> = {
    "ai-ml": "Yapay Zeka & Makine Öğrenmesi",
    "web-dev": "Web Geliştirme",
    "mobile": "Mobil Teknoloji",
    "cloud": "Bulut Bilişim",
    "security": "Siber Güvenlik",
    "startups": "Girişimcilik",
    "diger": "Diğer",
  };

  const categoryName = post.categoryName || categoryMap[categorySlug] || "Diğer";

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-200">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {categoryName}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <User className="w-4 h-4 mr-1" />
          <span className="font-medium text-gray-700">{post.author}</span>
          <span className="mx-2">•</span>
          <Clock className="w-4 h-4 mr-1" />
          <span>{post.readTime} {t('common.readTime')}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.publishDate)}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link
            to={createSeoUrl(post)}
            className="hover:text-blue-600 transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs border border-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Link
              to={createSeoUrl(post, language)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
            >
              {t('common.readMore')}
            </Link>
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              title="Orijinal kaynağı görüntüle"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
