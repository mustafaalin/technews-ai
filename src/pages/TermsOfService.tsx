import React from "react";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';

export default function TermsOfService() {
  const { language, t } = useLanguage();
  
  // Get current language prefix
  const langPrefix = `/${language}`;
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <SEOHead
        title={`${t('terms.title')} | Pulse of Tech`}
        description={language === 'en' ? "Terms of Service for Pulse of Tech - Learn about our service conditions" : "Pulse of Tech Kullanım Şartları - Hizmet koşullarımızı öğrenin"}
        keywords={language === 'en' ? ['terms of service', 'conditions', 'pulse of tech'] : ['kullanım şartları', 'koşullar', 'pulse of tech']}
        url={`https://pulseoftech.net${langPrefix}/terms-of-service`}
        type="website"
        language={language}
        alternateUrls={{
          tr: 'https://pulseoftech.net/tr/terms-of-service',
          en: 'https://pulseoftech.net/en/terms-of-service'
        }}
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
      
      <h1 className="text-3xl font-bold mb-6">{t('terms.title')}</h1>

      <p className="mb-4">
        <span dangerouslySetInnerHTML={{ __html: t('terms.intro') }} />
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t('terms.purpose')}</h2>
      <p className="mb-4">
        {t('terms.purposeText')}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        {t('terms.userObligations')}
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>{t('terms.userObligationsList1')}</li>
        <li>{t('terms.userObligationsList2')}</li>
        <li>{t('terms.userObligationsList3')}</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        {t('terms.dataPrivacy')}
      </h2>
      <p className="mb-4">
        <span dangerouslySetInnerHTML={{ __html: t('terms.dataPrivacyText') }} />
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        {t('terms.disclaimer')}
      </h2>
      <p className="mb-4">
        {t('terms.disclaimerText')}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        {t('terms.changeRight')}
      </h2>
      <p className="mb-4">
        {t('terms.changeRightText')}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">{t('terms.contactInfo')}</h2>
      <p>
        <span dangerouslySetInnerHTML={{ __html: t('terms.contactInfoText') }} />
      </p>
    </div>
  );
}
