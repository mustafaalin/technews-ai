import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Zap } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Yapay Zeka', href: '/category/ai-ml' },
    { name: 'Web Geliştirme', href: '/category/web-dev' },
    { name: 'Mobil', href: '/category/mobile' },
    { name: 'Bulut', href: '/category/cloud' },
    { name: 'Güvenlik', href: '/category/security' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-slate-800/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Pulse of Tech</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg ${
                  isActive(item.href)
                    ? 'text-cyan-400 bg-slate-700/50'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-slate-700/30'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Teknoloji haberlerinde ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-64 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-slate-700/50"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800/95 backdrop-blur-sm border-t border-slate-700">
          <div className="px-4 py-3 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-base font-medium transition-colors duration-200 px-3 py-2 rounded-lg ${
                  isActive(item.href)
                    ? 'text-cyan-400 bg-slate-700/50'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-slate-700/30'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 border-t">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Teknoloji haberlerinde ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-full text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
