import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Users, User } from 'lucide-react';
import BlogCard from '../components/BlogCard';
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
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          AI-Powered Tech News World
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Stay ahead of the curve with daily AI-generated summaries of the latest technology news. 
          Get insights from across the tech world in minutes, not hours.
        </p>
        <div className="flex justify-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>Updated Daily</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>2-4 min reads</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>10,000+ readers</span>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Story</h2>
          <div className="ml-3 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
            Trending
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
              
              <p className="text-gray-600 mb-4">
                {featuredPost.summary}
              </p>
              
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <User className="w-4 h-4 mr-1" />
                <span className="font-medium">{featuredPost.author}</span>
                <span className="mx-2">•</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>{featuredPost.readTime} min read</span>
              </div>
              
              <Link
                to={`/post/${featuredPost.id}`}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium inline-block"
              >
                Read Full Story
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Never Miss a Beat</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Get daily AI-curated tech news summaries delivered to your inbox. Join thousands of professionals staying informed.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg text-gray-900 w-full sm:w-auto"
          />
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
