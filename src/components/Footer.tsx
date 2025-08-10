import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  // Get current language prefix
  const langPrefix = `/${language}`;

  const footerLinks = {
    categories: [
      { name: t('category.aiml'), href: `${langPrefix}/category/ai-ml` },
      { name: t('category.webdev'), href: `${langPrefix}/category/web-dev` },
      { name: t('category.mobile'), href: `${langPrefix}/category/mobile` },
      { name: t('category.cloud'), href: `${langPrefix}/category/cloud` },
      { name: t('category.security'), href: `${langPrefix}/category/security` },
      { name: t('category.startups'), href: `${langPrefix}/category/startups` },
    ],
    company: [
      { name: t('footer.about'), href: `${langPrefix}/about` },
      { name: t('footer.contact'), href: `${langPrefix}/contact` },
      { name: t('footer.privacy'), href: `${langPrefix}/privacy-policy` },
      { name: t('footer.terms'), href: `${langPrefix}/terms-of-service` },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Email', href: '#', icon: Mail },
  ];

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link to={langPrefix} className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Pulse of Tech</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.categories')}</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Pulse of Tech. {t('footer.copyright')}
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;