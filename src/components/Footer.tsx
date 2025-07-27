import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail, Zap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    categories: [
      { name: 'Yapay Zeka & Makine Öğrenmesi', href: '/category/ai-ml' },
      { name: 'Web Geliştirme', href: '/category/web-dev' },
      { name: 'Mobil Teknoloji', href: '/category/mobile' },
      { name: 'Bulut Bilişim', href: '/category/cloud' },
      { name: 'Siber Güvenlik', href: '/category/security' },
      { name: 'Girişimcilik', href: '/category/startups' },
    ],
    company: [
      { name: 'Hakkımızda', href: '/about' },
      { name: 'İletişim', href: '/contact' },
      { name: 'Gizlilik Politikası', href: '/privacy-policy' },
      { name: 'Kullanım Şartları', href: '/terms-of-service' },
      { name: 'RSS Beslemesi', href: '#' },
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
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Pulse of Tech</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Yapay zeka destekli özetlerle en son teknoloji haberlerinden haberdar olun. 
              Teknoloji dünyasından özlü, doğru içgörüleri günlük olarak edinin.
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
            <h3 className="text-lg font-semibold mb-4">Kategoriler</h3>
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
            <h3 className="text-lg font-semibold mb-4">Şirket</h3>
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
            © {currentYear} Pulse of Tech. Tüm hakları saklıdır.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Yapay Zeka Destekli • Günlük Güncelleme • ❤️ ile Yapıldı
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;