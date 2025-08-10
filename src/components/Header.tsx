import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAllBlogPosts } from '../data/blogData';
import { searchBlogPosts } from '../lib/blogService';
import { createSeoUrl } from '../utils/urlHelpers';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get current language prefix for navigation
  const langPrefix = `/${language}`;

  const navigation = [
    { name: t('nav.home'), href: langPrefix },
    { name: t('nav.ai'), href: `${langPrefix}/category/ai-ml` },
    { name: t('nav.webdev'), href: `${langPrefix}/category/web-dev` },
    { name: t('nav.mobile'), href: `${langPrefix}/category/mobile` },
    { name: t('nav.cloud'), href: `${langPrefix}/category/cloud` },
    { name: t('nav.security'), href: `${langPrefix}/category/security` },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    
    try {
      // Önce Supabase'de ara
      const supabaseResults = await searchBlogPosts(query);
      
      if (supabaseResults.length > 0) {
        console.log(`✅ Supabase'de ${supabaseResults.length} arama sonucu bulundu`);
        setSearchResults(supabaseResults);
        setShowResults(true);
        return;
      }
      
      // Supabase'de bulunamazsa JSON'da ara
      console.log("⚠️ Supabase'de sonuç bulunamadı, JSON verilerinde aranıyor");
      const allPosts = await getAllBlogPosts();
      const jsonResults = allPosts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.summary.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        post.content.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(jsonResults);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowResults(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = (postId: string) => {
    // Post ID'si ile post'u bul ve SEO URL'ye yönlendir
    const post = searchResults.find(p => p.id.toString() === postId);
    if (post) {
      navigate(createSeoUrl(post));
    }
    setSearchQuery('');
    setShowResults(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0].id);
    }
  };

  // Language switcher component
  const LanguageSwitcher = () => (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('tr')}
        className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors duration-200 ${
          language === 'tr' 
            ? 'bg-blue-100 text-blue-600' 
            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
        }`}
        title="Türkçe"
      >
        <span className="text-lg">🇹🇷</span>
        <span className="text-xs font-medium">TR</span>
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors duration-200 ${
          language === 'en' 
            ? 'bg-blue-100 text-blue-600' 
            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
        }`}
        title="English"
      >
        <span className="text-lg">🇬🇧</span>
        <span className="text-xs font-medium">EN</span>
      </button>
    </div>
  );

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={langPrefix} className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Pulse of Tech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-all duration-200 px-4 py-2 rounded-lg hover:scale-105 ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar and Language Switcher */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative" onBlur={() => setTimeout(() => setShowResults(false), 200)}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-gray-900 placeholder-gray-500 transition-all duration-200 hover:bg-white"
                />
              </form>
              
              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {searchResults.slice(0, 5).map((post) => (
                    <div
                      key={post.id}
                      onClick={() => handleResultClick(post.id)}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                        {post.title}
                      </h4>
                      <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                        {post.summary}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="ml-2">{post.readTime} dk</span>
                      </div>
                    </div>
                  ))}
                  {searchResults.length > 5 && (
                    <div className="p-3 text-center text-gray-500 text-sm bg-gray-50">
                      +{searchResults.length - 5} daha fazla sonuç
                    </div>
                  )}
                </div>
              )}
              
              {/* No Results */}
              {showResults && searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
                  <p className="text-gray-500 text-sm text-center">
                    {t('search.noResults')} "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-sm border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-base font-medium transition-all duration-200 px-4 py-3 rounded-lg ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <div className="relative" onBlur={() => setTimeout(() => setShowResults(false), 200)}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder={t('search.placeholder')}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                    className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-gray-900 placeholder-gray-500 transition-all duration-200"
                  />
                </form>
                
                {/* Mobile Search Results */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                    {searchResults.slice(0, 3).map((post) => (
                      <div
                        key={post.id}
                        onClick={() => {
                          handleResultClick(post.id.toString());
                          setIsMenuOpen(false);
                        }}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                          {post.title}
                        </h4>
                        <p className="text-gray-600 text-xs mt-1 line-clamp-1">
                          {post.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Mobile Language Switcher */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">Language / Dil</p>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;