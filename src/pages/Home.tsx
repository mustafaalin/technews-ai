import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Users, User } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import NewsletterSignup from '../components/NewsletterSignup';
import { blogPosts } from '../data/blogData';

const Home = () => {
  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1, 7);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Yapay Zeka Destekli Teknoloji Haber Dünyası
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          Günlük yapay zeka destekli teknoloji haberi özetleriyle güncel kalın.
          Teknoloji dünyasından içgörüleri saatlerce değil, dakikalar içinde edinin.
        </p>
        <div className="flex justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-1 text-blue-500" />
            <span>Günlük Güncelleme</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-blue-500" />
            <span>2-4 dk okuma</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-blue-500" />
            <span>10,000+ okuyucu</span>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Öne Çıkan Haber</h2>
          <div className="ml-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
            Trend
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
                  to={`/post/${featuredPost.id}`}
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
                <span>{featuredPost.readTime} dk okuma</span>
              </div>
              
              <Link
                to={`/post/${featuredPost.id}`}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium inline-block shadow-lg"
              >
                Tam Haberi Oku
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Son Güncellemeler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </div>
  );
};

export default Home;