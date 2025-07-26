import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '../data/blogData';

const CategoryNav = () => {
  const location = useLocation();
  
  const isActive = (slug: string) => {
    return location.pathname === `/category/${slug}`;
  };

  return (
    <nav className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto py-4">
          <Link
            to="/"
            className={`whitespace-nowrap pb-2 px-3 py-1 rounded-lg border-b-2 font-medium text-sm transition-all duration-200 ${
              location.pathname === '/'
                ? 'border-cyan-400 text-cyan-400 bg-slate-700/30'
                : 'border-transparent text-gray-300 hover:text-cyan-400 hover:bg-slate-700/30'
            }`}
          >
            Tüm Yazılar
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className={`whitespace-nowrap pb-2 px-3 py-1 rounded-lg border-b-2 font-medium text-sm transition-all duration-200 ${
                isActive(category.slug)
                  ? 'border-cyan-400 text-cyan-400 bg-slate-700/30'
                  : 'border-transparent text-gray-300 hover:text-cyan-400 hover:bg-slate-700/30'
              }`}
            >
              {category.name}
              <span className="ml-1 text-xs text-gray-500">({category.count})</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
