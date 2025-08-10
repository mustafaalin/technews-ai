import React from "react";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';

export default function PrivacyPolicy() {
  const { language, t } = useLanguage();
  
  // Get current language prefix
  const langPrefix = `/${language}`;
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <SEOHead
        title={`${t('privacy.title')} | Pulse of Tech`}
        description={language === 'en' ? "Privacy Policy for Pulse of Tech - Learn how we collect and use your data" : "Pulse of Tech Gizlilik Politikası - Verilerinizi nasıl topladığımızı ve kullandığımızı öğrenin"}
        keywords={language === 'en' ? ['privacy policy', 'data protection', 'pulse of tech'] : ['gizlilik politikası', 'veri koruma', 'pulse of tech']}
        url={`https://pulseoftech.net${langPrefix}/privacy-policy`}
        type="website"
      />
      
      {/* Navigation */}
      <div className="mb-8">
        <Link
          to={langPrefix}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.backToHome')}
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">{t('privacy.title')}</h1>

      <p className="mb-4">
        <span dangerouslySetInnerHTML={{ __html: t('privacy.intro') }} />
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacy.dataCollected')}</h2>
      <p className="mb-4">
        {t('privacy.dataCollectedText')}
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <span dangerouslySetInnerHTML={{ __html: t('privacy.email') }} />
        </li>
        <li>
          <span dangerouslySetInnerHTML={{ __html: t('privacy.cookies') }} />
        </li>
      </ul>
      <p className="mb-4">
        {t('privacy.adsense')}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        {t('privacy.dataUsage')}
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>{t('privacy.dataUsageList1')}</li>
        <li>{t('privacy.dataUsageList2')}</li>
        <li>{t('privacy.dataUsageList3')}</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        {t('privacy.thirdParty')}
      </h2>
      <p className="mb-4">{t('privacy.thirdPartyText')}</p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <span dangerouslySetInnerHTML={{ __html: t('privacy.analytics') }} />
        </li>
        <li>
          <span dangerouslySetInnerHTML={{ __html: t('privacy.adsenseService') }} />
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        {t('privacy.dataStorage')}
      </h2>
      <p className="mb-4">
        {t('privacy.dataStorageText')}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t('privacy.userRights')}</h2>
      <ul className="list-disc list-inside mb-4">
        <li>{t('privacy.userRightsList1')}</li>
        <li>{t('privacy.userRightsList2')}</li>
        <li>{t('privacy.userRightsList3')}</li>
      </ul>
      <p className="mb-4">
        <span dangerouslySetInnerHTML={{ __html: t('privacy.contact') }} />
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        {t('privacy.changes')}
      </h2>
      <p>
        {t('privacy.changesText')}
      </p>
    </div>
  );
}
