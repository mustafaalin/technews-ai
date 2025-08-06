import React, { useState } from 'react';
import { Download, FileText, Loader } from 'lucide-react';
import { generateSitemap } from '../utils/generateSitemap';

const SitemapGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);

  const handleGenerateSitemap = async () => {
    setIsGenerating(true);
    
    try {
      const sitemapContent = await generateSitemap();
      
      // Sitemap'i indir
      const blob = new Blob([sitemapContent], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sitemap.xml';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      setLastGenerated(new Date().toLocaleString('tr-TR'));
      
    } catch (error) {
      console.error('Sitemap oluşturulurken hata:', error);
      alert('Sitemap oluşturulurken bir hata oluştu.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
      <div className="flex items-center mb-4">
        <FileText className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Sitemap Oluşturucu</h3>
      </div>
      
      <p className="text-gray-600 mb-4 text-sm">
        Tüm sayfalar ve blog yazıları dahil olmak üzere güncel sitemap.xml dosyası oluşturun.
      </p>
      
      <button
        onClick={handleGenerateSitemap}
        disabled={isGenerating}
        className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          isGenerating
            ? 'bg-gray-400 cursor-not-allowed text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isGenerating ? (
          <>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Oluşturuluyor...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Sitemap İndir
          </>
        )}
      </button>
      
      {lastGenerated && (
        <p className="text-xs text-gray-500 mt-3 text-center">
          Son oluşturulma: {lastGenerated}
        </p>
      )}
    </div>
  );
};

export default SitemapGenerator;