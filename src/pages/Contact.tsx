import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageSquare, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/SEOHead';

const Contact = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Get current language prefix
  const langPrefix = `/${language}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simüle edilmiş form gönderimi (gerçek implementasyon için EmailJS veya backend gerekli)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      
      // Formu temizle
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Email gönderme hatası:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEOHead
        title={`${t('contact.title')} | Pulse of Tech`}
        description={t('contact.subtitle')}
        keywords={language === 'en' ? ['contact', 'pulse of tech', 'tech news', 'mustafa alin', 'collaboration'] : ['iletişim', 'pulse of tech', 'teknoloji haberleri', 'mustafa alin', 'işbirliği']}
        url={`https://pulseoftech.net${langPrefix}/contact`}
        type="website"
        language={language}
        alternateUrls={{
          tr: 'https://pulseoftech.net/tr/contact',
          en: 'https://pulseoftech.net/en/contact'
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('contact.title')}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <MessageSquare className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">{t('contact.sendMessage')}</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.name')} {t('contact.form.required')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('contact.form.namePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.email')} {t('contact.form.required')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('contact.form.emailPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.subject')} {t('contact.form.required')}
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t('contact.form.selectSubject')}</option>
                <option value="genel">{t('contact.form.general')}</option>
                <option value="icerik">{t('contact.form.content')}</option>
                <option value="teknik">{t('contact.form.technical')}</option>
                <option value="isbirligi">{t('contact.form.collaboration')}</option>
                <option value="reklam">{t('contact.form.advertising')}</option>
                <option value="diger">{t('contact.form.other')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.message')} {t('contact.form.required')}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      {t('contact.form.success')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">
                      {t('contact.form.error')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          {/* Direct Contact */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Mail className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">{t('contact.directContact')}</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('contact.email')}</h3>
                <a 
                  href="mailto:info@pulseoftech.net" 
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  info@pulseoftech.net
                </a>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('contact.responseTime')}</h3>
                <p className="text-gray-700">
                  {t('contact.responseTimeText')}
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.socialMedia')}</h2>
            
            <div className="space-y-4">
              <a 
                href="https://x.com/mustafaalinn" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5 mr-3" />
                <span>@mustafaalin</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/mustafa-alin-3567411b2/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5 mr-3" />
                <span>Mustafa ALIN</span>
              </a>
              
              <a 
                href="https://github.com/mustafaalin" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <Github className="w-5 h-5 mr-3" />
                <span>mustafaalin</span>
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.faq')}</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('contact.faqContent1')}</h3>
                <p className="text-gray-700 text-sm">
                  {t('contact.faqAnswer1')}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('contact.faqContent2')}</h3>
                <p className="text-gray-700 text-sm">
                  {t('contact.faqAnswer2')}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('contact.faqContent3')}</h3>
                <p className="text-gray-700 text-sm">
                  {t('contact.faqAnswer3')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
