import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageSquare, Send, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Mesajınız alındı! En kısa sürede size dönüş yapacağız.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">İletişim</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Sorularınız, önerileriniz veya işbirliği teklifleriniz için bizimle iletişime geçin.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <MessageSquare className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Mesaj Gönder</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Adınızı ve soyadınızı girin"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-posta Adresi *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Konu *
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Konu seçin</option>
                <option value="genel">Genel Soru</option>
                <option value="icerik">İçerik Önerisi</option>
                <option value="teknik">Teknik Destek</option>
                <option value="isbirligi">İşbirliği Teklifi</option>
                <option value="reklam">Reklam ve Sponsorluk</option>
                <option value="diger">Diğer</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Mesaj *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Mesajınızı buraya yazın..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Mesaj Gönder
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          {/* Direct Contact */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Mail className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Doğrudan İletişim</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">E-posta</h3>
                <a 
                  href="mailto:info@pulseoftech.net" 
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  info@pulseoftech.net
                </a>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Yanıt Süresi</h3>
                <p className="text-gray-700">
                  Genellikle 24 saat içinde yanıtlıyoruz
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sosyal Medya</h2>
            
            <div className="space-y-4">
              <a 
                href="#" 
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5 mr-3" />
                <span>@TechPulseAI</span>
              </a>
              
              <a 
                href="#" 
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5 mr-3" />
                <span>Pulse of Tech</span>
              </a>
              
              <a 
                href="#" 
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <Github className="w-5 h-5 mr-3" />
                <span>pulseoftech</span>
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sık Sorulan Sorular</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">İçerik önerisi nasıl yapabilirim?</h3>
                <p className="text-gray-700 text-sm">
                  Yukarıdaki formu kullanarak "İçerik Önerisi" konusunu seçin ve önerinizi detaylandırın.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Reklam verebilir miyim?</h3>
                <p className="text-gray-700 text-sm">
                  Sponsorluk ve reklam fırsatları için "Reklam ve Sponsorluk" konusunu seçerek bizimle iletişime geçin.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Teknik sorun bildirimi</h3>
                <p className="text-gray-700 text-sm">
                  Websitede karşılaştığınız teknik sorunları "Teknik Destek" konusu altında bildirebilirsiniz.
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