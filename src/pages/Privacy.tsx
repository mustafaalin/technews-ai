import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';

const Privacy = () => {
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
        <div className="flex justify-center mb-6">
          <div className="bg-green-600 p-4 rounded-2xl">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Gizlilik Politikası</h1>
        <p className="text-lg text-gray-600">
          Son güncelleme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giriş</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            TechPulse AI olarak, kullanıcılarımızın gizliliğini korumayı en önemli önceliklerimizden biri olarak görüyoruz. 
            Bu Gizlilik Politikası, websitemizi ziyaret ettiğinizde kişisel bilgilerinizin nasıl toplandığını, 
            kullanıldığını ve korunduğunu açıklamaktadır.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Bu politika, TechPulse AI websitesi (techpulse.ai) ve tüm alt sayfaları için geçerlidir.
          </p>
        </div>

        {/* Data Collection */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Database className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Toplanan Bilgiler</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Otomatik Olarak Toplanan Bilgiler</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>IP adresi ve coğrafi konum bilgileri</li>
                <li>Tarayıcı türü ve versiyonu</li>
                <li>İşletim sistemi bilgileri</li>
                <li>Ziyaret edilen sayfalar ve geçirilen süre</li>
                <li>Referans URL'leri (hangi siteden geldiğiniz)</li>
                <li>Cihaz bilgileri (masaüstü, mobil, tablet)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Gönüllü Olarak Sağlanan Bilgiler</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>İletişim formunda paylaştığınız ad, e-posta ve mesaj içeriği</li>
                <li>Bülten aboneliği için e-posta adresi</li>
                <li>Yorumlar ve geri bildirimler</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Usage */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Eye className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Bilgilerin Kullanımı</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:
          </p>
          
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Website performansını analiz etmek ve iyileştirmek</li>
            <li>Kullanıcı deneyimini kişiselleştirmek</li>
            <li>İçerik tercihlerini anlamak ve daha iyi içerik sunmak</li>
            <li>Teknik sorunları tespit etmek ve çözmek</li>
            <li>İletişim taleplerinize yanıt vermek</li>
            <li>Bülten ve güncellemeler göndermek (sadece izin verdiğiniz takdirde)</li>
            <li>Yasal yükümlülükleri yerine getirmek</li>
          </ul>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Çerezler (Cookies)</h2>
          
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Websitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Gerekli Çerezler</h4>
                <p className="text-sm text-gray-700">
                  Website'nin temel işlevlerini yerine getirmesi için gerekli olan çerezler.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Analitik Çerezler</h4>
                <p className="text-sm text-gray-700">
                  Google Analytics gibi araçlarla website trafiğini ve kullanımını analiz etmek için.
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              Tarayıcınızın ayarlarından çerezleri devre dışı bırakabilirsiniz, ancak bu durumda 
              website'nin bazı özellikleri düzgün çalışmayabilir.
            </p>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Lock className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Veri Güvenliği</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Kişisel bilgilerinizin güvenliğini sağlamak için aşağıdaki önlemleri alıyoruz:
          </p>
          
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>SSL sertifikası ile şifreli veri iletimi</li>
            <li>Güvenli sunucu altyapısı</li>
            <li>Düzenli güvenlik güncellemeleri</li>
            <li>Erişim kontrolü ve yetkilendirme</li>
            <li>Veri yedekleme ve kurtarma sistemleri</li>
          </ul>
        </div>

        {/* Third Party Services */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Üçüncü Taraf Hizmetler</h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Websitemizde aşağıdaki üçüncü taraf hizmetleri kullanmaktayız:
          </p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-600 pl-4">
              <h4 className="font-semibold text-gray-900">Google Analytics</h4>
              <p className="text-sm text-gray-700">
                Website trafiğini analiz etmek için. Google'ın gizlilik politikası: 
                <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-800 ml-1">
                  policies.google.com/privacy
                </a>
              </p>
            </div>
            
            <div className="border-l-4 border-green-600 pl-4">
              <h4 className="font-semibold text-gray-900">Netlify</h4>
              <p className="text-sm text-gray-700">
                Website hosting hizmeti için. Netlify'ın gizlilik politikası: 
                <a href="https://www.netlify.com/privacy/" className="text-blue-600 hover:text-blue-800 ml-1">
                  netlify.com/privacy
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* User Rights */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Kullanıcı Hakları</h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            KVKK ve GDPR kapsamında aşağıdaki haklarınız bulunmaktadır:
          </p>
          
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenen kişisel verileriniz hakkında bilgi talep etme</li>
            <li>Kişisel verilerinizin düzeltilmesini isteme</li>
            <li>Kişisel verilerinizin silinmesini isteme</li>
            <li>Veri işlemeye itiraz etme</li>
            <li>Veri taşınabilirliği hakkı</li>
          </ul>
          
          <p className="text-gray-700 leading-relaxed mt-4">
            Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">İletişim</h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Gizlilik politikamız hakkında sorularınız varsa veya haklarınızı kullanmak istiyorsanız:
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong>E-posta:</strong> privacy@techpulse.ai<br />
              <strong>İletişim Formu:</strong> <Link to="/contact" className=\"text-blue-600 hover:text-blue-800">İletişim sayfası</Link>
            </p>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Politika Güncellemeleri</h2>
          
          <p className="text-gray-700 leading-relaxed">
            Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler olduğunda 
            kullanıcılarımızı website üzerinden bilgilendireceğiz. Politikanın en güncel halini 
            bu sayfada bulabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;