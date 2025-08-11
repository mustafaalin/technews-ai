import React from 'react';
import { FileText, ExternalLink, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SitemapGenerator: React.FC = () => {
  const { language } = useLanguage();

  const sitemapUrls = [
    {
      name: language === 'en' ? 'Main Sitemap Index' : 'Ana Sitemap Index',
      url: 'https://pulseoftech.net/sitemap.xml',
      description: language === 'en' 
        ? 'Contains references to all language-specific sitemaps'
        : 'Tüm dil-spesifik sitemap\'lere referans içerir'
    },
    {
      name: language === 'en' ? 'Turkish Sitemap' : 'Türkçe Sitemap',
      url: 'https://pulseoftech.net/sitemap-tr.xml',
      description: language === 'en' 
        ? 'All Turkish pages and blog posts'
        : 'Tüm Türkçe sayfalar ve blog yazıları'
    },
    {
      name: language === 'en' ? 'English Sitemap' : 'İngilizce Sitemap',
      url: 'https://pulseoftech.net/sitemap-en.xml',
      description: language === 'en' 
        ? 'All English pages and blog posts'
        : 'Tüm İngilizce sayfalar ve blog yazıları'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <FileText className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">
          {language === 'en' ? 'Sitemap Information' : 'Sitemap Bilgileri'}
        </h3>
      </div>
      
      <div className="flex items-start mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="text-green-800 font-medium mb-1">
            {language === 'en' ? 'Automatic Generation' : 'Otomatik Oluşturma'}
          </p>
          <p className="text-green-700">
            {language === 'en' 
              ? 'Sitemaps are automatically generated during the build process and updated with every deployment.'
              : 'Sitemap\'ler build sürecinde otomatik olarak oluşturulur ve her deployment\'ta güncellenir.'
            }
          </p>
        </div>
      </div>
      
      <p className="text-gray-600 mb-6 text-sm">
        {language === 'en' 
          ? 'The following sitemap URLs are available for submission to Google Search Console:'
          : 'Aşağıdaki sitemap URL\'leri Google Search Console\'a gönderilebilir:'
        }
      </p>
      
      <div className="space-y-4">
        {sitemapUrls.map((sitemap, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{sitemap.name}</h4>
              <a
                href={sitemap.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                {language === 'en' ? 'View' : 'Görüntüle'}
              </a>
            </div>
            <p className="text-gray-600 text-sm mb-2">{sitemap.description}</p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-800 break-all">
              {sitemap.url}
            </code>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">
          {language === 'en' ? 'Google Search Console Setup' : 'Google Search Console Kurulumu'}
        </h4>
        <ol className="text-sm text-blue-800 space-y-1">
          <li>
            1. {language === 'en' 
              ? 'Go to Google Search Console'
              : 'Google Search Console\'a gidin'
            }
          </li>
          <li>
            2. {language === 'en' 
              ? 'Select your property (pulseoftech.net)'
              : 'Property\'nizi seçin (pulseoftech.net)'
            }
          </li>
          <li>
            3. {language === 'en' 
              ? 'Navigate to "Sitemaps" in the left menu'
              : 'Sol menüden "Sitemap\'ler" bölümüne gidin'
            }
          </li>
          <li>
            4. {language === 'en' 
              ? 'Add the sitemap URLs above'
              : 'Yukarıdaki sitemap URL\'lerini ekleyin'
            }
          </li>
        </ol>
      </div>
    </div>
  );
};

export default SitemapGenerator;