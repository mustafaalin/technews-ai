import React, { useState } from 'react';
import { Download, FileText, Loader } from 'lucide-react';
import { saveSitemap } from '../utils/generateSitemap';
import { useLanguage } from '../context/LanguageContext';

const SitemapGenerator: React.FC = () => {
  const { language, t } = useLanguage();
  const [isGeneratingTR, setIsGeneratingTR] = useState(false);
  const [isGeneratingEN, setIsGeneratingEN] = useState(false);
  const [lastGeneratedTR, setLastGeneratedTR] = useState<string | null>(null);
  const [lastGeneratedEN, setLastGeneratedEN] = useState<string | null>(null);

  const handleGenerateSitemap = async (lang: 'tr' | 'en') => {
    const setGenerating = lang === 'tr' ? setIsGeneratingTR : setIsGeneratingEN;
    const setLastGenerated = lang === 'tr' ? setLastGeneratedTR : setLastGeneratedEN;
    
    setGenerating(true);
    
    try {
      await saveSitemap(lang);
      setLastGenerated(new Date().toLocaleString(language === 'en' ? 'en-US' : 'tr-TR'));
    } catch (error) {
      console.error(`${lang.toUpperCase()} Sitemap oluşturulurken hata:`, error);
      alert(language === 'en' 
        ? `An error occurred while generating ${lang.toUpperCase()} sitemap.`
        : `${lang.toUpperCase()} sitemap oluşturulurken bir hata oluştu.`
      );
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
      <div className="flex items-center mb-4">
        <FileText className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">
          {language === 'en' ? 'Sitemap Generator' : 'Sitemap Oluşturucu'}
        </h3>
      </div>
      
      <p className="text-gray-600 mb-6 text-sm">
        {language === 'en' 
          ? 'Generate up-to-date sitemap.xml files including all pages and blog posts for each language.'
          : 'Tüm sayfalar ve blog yazıları dahil olmak üzere her dil için güncel sitemap.xml dosyaları oluşturun.'
        }
      </p>
      
      {/* Turkish Sitemap Button */}
      <div className="space-y-3">
        <button
          onClick={() => handleGenerateSitemap('tr')}
          disabled={isGeneratingTR}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            isGeneratingTR
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isGeneratingTR ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              {language === 'en' ? 'Generating...' : 'Oluşturuluyor...'}
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Download TR Sitemap' : 'TR Sitemap İndir'}
            </>
          )}
        </button>
        
        {lastGeneratedTR && (
          <p className="text-xs text-gray-500 text-center">
            {language === 'en' ? 'TR Last generated: ' : 'TR Son oluşturulma: '}{lastGeneratedTR}
          </p>
        )}
      </div>

      {/* English Sitemap Button */}
      <div className="space-y-3 mt-4">
        <button
          onClick={() => handleGenerateSitemap('en')}
          disabled={isGeneratingEN}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            isGeneratingEN
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isGeneratingEN ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              {language === 'en' ? 'Generating...' : 'Oluşturuluyor...'}
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Download EN Sitemap' : 'EN Sitemap İndir'}
            </>
          )}
        </button>
        
        {lastGeneratedEN && (
          <p className="text-xs text-gray-500 text-center">
            {language === 'en' ? 'EN Last generated: ' : 'EN Son oluşturulma: '}{lastGeneratedEN}
          </p>
        )}
      </div>
    </div>
  );
};

export default SitemapGenerator;