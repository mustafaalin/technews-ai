import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '../data/blogData';

const CategoryNav = () => {
  const location = useLocation();
  
  const isActive = (slug: string) => {
    return location.pathname === `/category/${slug}`;
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto py-4">
          <Link
            to="/"
            className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              location.pathname === '/'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All Posts
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                isActive(category.slug)
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {category.name}
              <span className="ml-1 text-xs text-gray-400">({category.count})</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
