import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ExternalLink, User } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { categories } from '../data/blogData';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
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
    <article className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 border border-slate-700/50">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {categoryName}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-400 mb-3">
          <User className="w-4 h-4 mr-1" />
          <span className="font-medium text-gray-300">{post.author}</span>
          <span className="mx-2">•</span>
          <Clock className="w-4 h-4 mr-1" />
          <span>{post.readTime} dk okuma</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.publishDate)}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
          <Link
            to={`/post/${post.id}`}
            className="hover:text-cyan-400 transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-300 mb-4 line-clamp-3">
          {post.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-slate-700/50 text-gray-300 px-2 py-1 rounded-md text-xs border border-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Link
              to={`/post/${post.id}`}
              className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors duration-200"
            >
              Devamını oku
            </Link>
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
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
