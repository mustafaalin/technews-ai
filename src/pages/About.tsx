import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Target, Users, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';

const About = () => {
  const { language, t } = useLanguage();
  
  // Get current language prefix
  const langPrefix = `/${language}`;
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEOHead
        title={`${t('about.title')} | Pulse of Tech`}
        description={t('about.subtitle')}
        keywords={language === 'en' ? ['about us', 'pulse of tech', 'tech news', 'artificial intelligence', 'mustafa alin'] : ['hakkımızda', 'pulse of tech', 'teknoloji haberleri', 'yapay zeka', 'mustafa alin']}
        url={`https://pulseoftech.net${langPrefix}/about`}
        type="website"
        language={language}
        alternateUrls={{
          tr: 'https://pulseoftech.net/tr/about',
          en: 'https://pulseoftech.net/en/about'
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

      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-4 rounded-2xl">
            <Zap className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('about.title')}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('about.subtitle')}
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center mb-6">
          <Target className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">{t('about.mission.title')}</h2>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          {t('about.mission.content1')}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {t('about.mission.content2')}
        </p>
      </div>

      {/* What We Do */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center mb-6">
          <Users className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">{t('about.whatWeDo.title')}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('about.whatWeDo.ai')}</h3>
            <p className="text-gray-700">
              {t('about.whatWeDo.aiDesc')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('about.whatWeDo.category')}</h3>
            <p className="text-gray-700">
              {t('about.whatWeDo.categoryDesc')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('about.whatWeDo.daily')}</h3>
            <p className="text-gray-700">
              {t('about.whatWeDo.dailyDesc')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('about.whatWeDo.quality')}</h3>
            <p className="text-gray-700">
              {t('about.whatWeDo.qualityDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center mb-6">
          <Award className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">{t('about.values.title')}</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{t('about.values.accuracy')}</h3>
              <p className="text-gray-700">{t('about.values.accuracyDesc')}</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{t('about.values.transparency')}</h3>
              <p className="text-gray-700">{t('about.values.transparencyDesc')}</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{t('about.values.qualityValue')}</h3>
              <p className="text-gray-700">{t('about.values.qualityValueDesc')}</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{t('about.values.accessibility')}</h3>
              <p className="text-gray-700">{t('about.values.accessibilityDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('about.team.title')}</h2>
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users className="w-12 h-12 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Mustafa ALIN</h3>
          <p className="text-blue-600 font-medium mb-3">{t('about.team.founder')}</p>
          <p className="text-gray-700 max-w-2xl mx-auto">
            {t('about.team.founderDesc')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;