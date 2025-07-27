import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCategories } from '../data/blogData';

const CategoryNav = () => {
  const location = useLocation();
  const [categories, setCategories] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);
  
  const isActive = (slug: string) => {
    return location.pathname === `/category/${slug}`;
  };

  if (loading) {
    return (
      <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-8 w-28 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto py-4">
          <Link
            to="/"
            className={`whitespace-nowrap pb-2 px-3 py-1 rounded-lg border-b-2 font-medium text-sm transition-all duration-200 ${
              location.pathname === '/'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-700 hover:text-blue-600 hover:bg-gray-50'
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
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-700 hover:text-blue-600 hover:bg-gray-50'
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
