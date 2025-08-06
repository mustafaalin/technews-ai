import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Target, Users, Award } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEOHead
        title="Hakkımızda | Pulse of Tech"
        description="Pulse of Tech, teknoloji dünyasının nabzını tutan, yapay zeka destekli haber platformudur. Misyonumuz ve değerlerimiz hakkında bilgi edinin."
        keywords={['hakkımızda', 'pulse of tech', 'teknoloji haberleri', 'yapay zeka', 'mustafa alin']}
        url="https://pulseoftech.net/about"
        type="website"
      />
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
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-4 rounded-2xl">
            <Zap className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Hakkımızda</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Pulse of Tech, teknoloji dünyasının nabzını tutan, yapay zeka destekli haber platformudur.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center mb-6">
          <Target className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Misyonumuz</h2>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          Teknoloji dünyasındaki hızlı değişimleri takip etmek her geçen gün daha da zorlaşıyor. 
          Bizim misyonumuz, karmaşık teknoloji haberlerini anlaşılır, özlü ve değerli içeriklere 
          dönüştürerek okuyucularımızın zamanını en verimli şekilde kullanmalarını sağlamak.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Yapay zeka teknolojilerini kullanarak, günlük binlerce teknoloji haberini analiz ediyor, 
          en önemli gelişmeleri seçiyor ve size özetlenmiş, anlaşılır formatta sunuyoruz.
        </p>
      </div>

      {/* What We Do */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center mb-6">
          <Users className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Ne Yapıyoruz?</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🤖 AI Destekli İçerik</h3>
            <p className="text-gray-700">
              Gelişmiş yapay zeka algoritmaları ile teknoloji haberlerini analiz ediyor, 
              en önemli noktaları çıkarıyor ve özlü özetler hazırlıyoruz.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 Kategori Bazlı Organizasyon</h3>
            <p className="text-gray-700">
              Yapay zeka, web geliştirme, mobil teknoloji, bulut bilişim ve daha fazlası - 
              ilgi alanınıza göre içerikleri kolayca bulun.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">⚡ Günlük Güncellemeler</h3>
            <p className="text-gray-700">
              Her gün teknoloji dünyasından en önemli gelişmeleri takip ediyor, 
              güncel kalmanızı sağlıyoruz.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Kaliteli Kaynak</h3>
            <p className="text-gray-700">
              Sadece güvenilir kaynaklardan aldığımız haberleri işliyor, 
              doğruluğu teyit edilmiş içerikler sunuyoruz.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center mb-6">
          <Award className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Değerlerimiz</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Doğruluk</h3>
              <p className="text-gray-700">Sadece doğrulanmış kaynaklardan alınan haberleri paylaşırız.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Şeffaflık</h3>
              <p className="text-gray-700">Her içeriğin kaynağını belirtiyor, orijinal makaleye erişim sağlıyoruz.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Kalite</h3>
              <p className="text-gray-700">Miktar değil kalite odaklı yaklaşımla en değerli içerikleri seçiyoruz.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Erişilebilirlik</h3>
              <p className="text-gray-700">Karmaşık teknoloji konularını herkesin anlayabileceği şekilde sunuyoruz.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ekibimiz</h2>
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users className="w-12 h-12 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Mustafa ALIN</h3>
          <p className="text-blue-600 font-medium mb-3">Kurucu & Geliştirici</p>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Teknoloji tutkunu bir yazılım geliştirici olarak, yapay zeka ve web teknolojilerindeki 
            gelişmeleri takip etmeyi ve paylaşmayı seviyorum. Pulse of Tech'i, teknoloji 
            topluluğuna değer katmak amacıyla geliştirdim.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;