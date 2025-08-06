import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, FileText } from 'lucide-react';
import SitemapGenerator from '../components/SitemapGenerator';

const Admin = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Ana sayfaya dön
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Settings className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Yönetim Paneli</h1>
        </div>
        <p className="text-gray-600">
          Site yönetimi ve SEO araçları
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sitemap Generator */}
        <SitemapGenerator />
        
        {/* Placeholder for future tools */}
        <div className="bg-gray-50 rounded-lg shadow-md p-6 border-2 border-dashed border-gray-300">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 text-gray-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-500">Yakında</h3>
          </div>
          <p className="text-gray-400 text-sm">
            Yeni yönetim araçları yakında eklenecek.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;