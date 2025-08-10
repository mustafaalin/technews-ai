import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  tr: {
    // Header
    'nav.home': 'Ana Sayfa',
    'nav.ai': 'Yapay Zeka',
    'nav.webdev': 'Web Geliştirme',
    'nav.mobile': 'Mobil',
    'nav.cloud': 'Bulut',
    'nav.security': 'Güvenlik',
    'search.placeholder': 'Teknoloji haberlerinde ara...',
    'search.noResults': 'için sonuç bulunamadı',
    
    // Categories
    'category.all': 'Tüm Yazılar',
    'category.aiml': 'Yapay Zeka & Makine Öğrenmesi',
    'category.webdev': 'Web Geliştirme',
    'category.mobile': 'Mobil Teknoloji',
    'category.cloud': 'Bulut Bilişim',
    'category.security': 'Siber Güvenlik',
    'category.startups': 'Girişimcilik',
    'category.other': 'Diğer',
    
    // Common
    'common.readMore': 'Devamını oku',
    'common.readTime': 'dk okuma',
    'common.author': 'Yazar',
    'common.loading': 'Yükleniyor...',
    'common.backToHome': 'Ana sayfaya dön',
    'common.backToPosts': 'Tüm yazılara dön',
    'common.viewSource': 'Orijinal kaynağı görüntüle',
    'common.share': 'Paylaş',
    
    // Home page
    'home.title': 'Yapay Zeka Destekli Teknoloji Haber Dünyası',
    'home.subtitle': 'Günlük yapay zeka destekli teknoloji haberi özetleriyle güncel kalın. Teknoloji dünyasından içgörüleri saatlerce değil, dakikalar içinde edinin.',
    'home.dailyUpdate': 'Günlük Güncelleme',
    'home.readTime': '2-4 dk okuma',
    'home.readers': '10,000+ okuyucu',
    'home.featured': 'Öne Çıkan Haber',
    'home.trending': 'Trend',
    'home.recent': 'Son Güncellemeler',
    'home.readFull': 'Tam Haberi Oku',
    
    // Newsletter
    'newsletter.title': 'Hiçbir Haberi Kaçırmayın',
    'newsletter.subtitle': 'Günlük yapay zeka destekli teknoloji haberi özetlerini e-posta kutunuza alın. Bilgili kalan binlerce profesyonele katılın.',
    'newsletter.placeholder': 'E-posta adresinizi girin',
    'newsletter.subscribe': 'Abone Ol',
    'newsletter.success': 'Başarıyla abone oldunuz! Teşekkür ederiz.',
    'newsletter.error': 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
    'newsletter.disclaimer': 'Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.',
    
    // Footer
    'footer.categories': 'Kategoriler',
    'footer.company': 'Şirket',
    'footer.about': 'Hakkımızda',
    'footer.contact': 'İletişim',
    'footer.privacy': 'Gizlilik Politikası',
    'footer.terms': 'Kullanım Şartları',
    'footer.description': 'Yapay zeka destekli özetlerle en son teknoloji haberlerinden haberdar olun. Teknoloji dünyasından özlü, doğru içgörüleri günlük olarak edinin.',
    'footer.copyright': 'Tüm hakları saklıdır.',
    'footer.tagline': 'Yapay Zeka Destekli • Günlük Güncellemeler • Teknoloji Haberleri',
    
    // Post page
    'post.summary': 'Özet',
    'post.originalArticle': 'Orijinal Makaleyi Okuyun',
    'post.originalDescription': 'Daha detaylı bilgi ve tam hikaye için orijinal kaynağı ziyaret edin.',
    'post.visitSource': 'Orijinal Kaynağı Ziyaret Et',
    'post.relatedPosts': 'İlgili Yazılar',
    'post.notFound': 'Yazı Bulunamadı',
    'post.notFoundDescription': 'Aradığınız yazı mevcut değil veya kaldırılmış olabilir.',
    
    // Category page
    'category.loading': 'Kategori yükleniyor...',
    'category.notFound': 'Kategori bulunamadı',
    'category.postsCount': 'makale',
    'category.noPosts': 'Bu kategoride henüz yazı bulunamadı.',
    'category.viewAll': 'Tüm yazılara göz at',
    
    // About page
    'about.title': 'Hakkımızda',
    'about.subtitle': 'Pulse of Tech, teknoloji dünyasının nabzını tutan, yapay zeka destekli haber platformudur.',
    'about.mission': 'Misyonumuz',
    'about.whatWeDo': 'Ne Yapıyoruz?',
    'about.values': 'Değerlerimiz',
    'about.team': 'Ekibimiz',
    
    // Contact page
    'contact.title': 'İletişim',
    'contact.subtitle': 'Sorularınız, önerileriniz veya işbirliği teklifleriniz için bizimle iletişime geçin.',
    'contact.sendMessage': 'Mesaj Gönder',
    'contact.directContact': 'Doğrudan İletişim',
    'contact.socialMedia': 'Sosyal Medya',
    'contact.faq': 'Sık Sorulan Sorular',
    'contact.form.name': 'Ad Soyad',
    'contact.form.email': 'E-posta Adresi',
    'contact.form.subject': 'Konu',
    'contact.form.message': 'Mesaj',
    'contact.form.send': 'Mesaj Gönder',
    'contact.form.sending': 'Gönderiliyor...',
    'contact.form.namePlaceholder': 'Adınızı ve soyadınızı girin',
    'contact.form.emailPlaceholder': 'ornek@email.com',
    'contact.form.messagePlaceholder': 'Mesajınızı buraya yazın...',
    'contact.form.selectSubject': 'Konu seçin',
    'contact.form.general': 'Genel Soru',
    'contact.form.content': 'İçerik Önerisi',
    'contact.form.technical': 'Teknik Destek',
    'contact.form.collaboration': 'İşbirliği Teklifi',
    'contact.form.advertising': 'Reklam ve Sponsorluk',
    'contact.form.other': 'Diğer',
    'contact.form.required': '*',
    'contact.form.success': 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.',
    'contact.form.error': 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin veya doğrudan e-posta gönderin.',
    'contact.email': 'E-posta',
    'contact.responseTime': 'Yanıt Süresi',
    'contact.responseTimeText': 'Genellikle 24 saat içinde yanıtlıyoruz',
    'contact.faqContent1': 'İçerik önerisi nasıl yapabilirim?',
    'contact.faqAnswer1': 'Yukarıdaki formu kullanarak "İçerik Önerisi" konusunu seçin ve önerinizi detaylandırın.',
    'contact.faqContent2': 'Reklam verebilir miyim?',
    'contact.faqAnswer2': 'Sponsorluk ve reklam fırsatları için "Reklam ve Sponsorluk" konusunu seçerek bizimle iletişime geçin.',
    'contact.faqContent3': 'Teknik sorun bildirimi',
    'contact.faqAnswer3': 'Websitede karşılaştığınız teknik sorunları "Teknik Destek" konusu altında bildirebilirsiniz.',
    
    // Privacy Policy page
    'privacy.title': 'Gizlilik Politikası',
    'privacy.intro': 'Bu Gizlilik Politikası, <strong>Pulse of Tech</strong> web sitesi (<a href="https://pulseoftech.net/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://pulseoftech.net/</a>) tarafından toplanan ve işlenen kişisel veriler hakkında kullanıcıları bilgilendirir. Sitemizi kullanarak bu politikayı kabul etmiş sayılırsınız.',
    'privacy.dataCollected': '1. Toplanan Veriler',
    'privacy.dataCollectedText': 'Sitemizi kullanırken aşağıdaki kişisel veriler toplanabilir:',
    'privacy.email': '<strong>E-posta adresiniz</strong> – Abonelik formu aracılığıyla verildiğinde Supabase veritabanına kaydedilir ve yeni haberler hakkında bilgilendirme için kullanılır.',
    'privacy.cookies': '<strong>Çerezler ve kullanım verileri</strong> – Google Analytics aracılığıyla site trafiği ve kullanıcı davranışları anonim olarak takip edilir.',
    'privacy.adsense': 'Google AdSense gibi reklam hizmetleri reklam çerezleri kullanabilir. Bu çerezler tercihlerinizi hatırlamak ve ilgi alanlarınıza uygun reklamlar göstermek için kullanılabilir.',
    'privacy.dataUsage': '2. Veri Kullanım Amacı',
    'privacy.dataUsageList1': 'Yeni haberler ve içerikler hakkında bildirim göndermek',
    'privacy.dataUsageList2': 'Site kullanımını analiz etmek ve kullanıcı deneyimini iyileştirmek',
    'privacy.dataUsageList3': 'Reklam hizmetleri için kişiselleştirilmiş içerik sağlamak',
    'privacy.thirdParty': '3. Üçüncü Taraf Hizmetler',
    'privacy.thirdPartyText': 'Sitemiz aşağıdaki üçüncü taraf hizmetleri kullanır:',
    'privacy.analytics': '<strong>Google Analytics:</strong> Site trafiğini ve kullanıcı davranışlarını anonim olarak analiz eder.',
    'privacy.adsenseService': '<strong>Google AdSense:</strong> Kişiselleştirilmiş reklamlar göstermek için çerezler kullanabilir.',
    'privacy.dataStorage': '4. Veri Saklama',
    'privacy.dataStorageText': 'E-posta adresiniz yalnızca Supabase veritabanında saklanır ve sadece haber bülteni bildirimleri için kullanılır. Talep üzerine e-posta adresiniz sistemimizden silinecektir.',
    'privacy.userRights': '5. Kullanıcı Hakları',
    'privacy.userRightsList1': 'Verilerinizin ne için kullanıldığını öğrenmek',
    'privacy.userRightsList2': 'Verilerinize erişim ve düzeltme talebinde bulunmak',
    'privacy.userRightsList3': 'Verilerinizin silinmesini talep etmek',
    'privacy.contact': 'Talepleriniz için <strong>info@pulseoftech.net</strong> adresinden bizimle iletişime geçebilirsiniz.',
    'privacy.changes': '6. Gizlilik Politikası Değişiklikleri',
    'privacy.changesText': 'Bu gizlilik politikası zaman zaman güncellenebilir. Güncellenmiş politika sitemizde yayınlandığı andan itibaren geçerli olacaktır.',
    
    // Terms of Service page
    'terms.title': 'Kullanım Şartları',
    'terms.intro': 'Bu Kullanım Şartları, <strong>Pulse of Tech</strong> web sitesi (<a href="https://pulseoftech.net/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://pulseoftech.net/</a>) üzerinden sunulan hizmetlerin kullanım koşullarını açıklar. Sitemizi ziyaret ederek veya kullanarak bu şartları kabul etmiş sayılırsınız.',
    'terms.purpose': '1. Hizmetin Amacı',
    'terms.purposeText': 'Pulse of Tech, teknoloji haberleri ve içerikleri paylaşan bir platformdur. Sitedeki içerikler bilgilendirme amaçlıdır ve yatırım veya hukuki tavsiye niteliği taşımaz.',
    'terms.userObligations': '2. Kullanıcı Yükümlülükleri',
    'terms.userObligationsList1': 'Siteyi yalnızca yasalara uygun ve iyi niyetle kullanmayı kabul edersiniz.',
    'terms.userObligationsList2': 'Sitedeki içeriklerin izinsiz kopyalanması, çoğaltılması veya ticari amaçla kullanılması yasaktır.',
    'terms.userObligationsList3': 'Abonelik sırasında verdiğiniz e-posta adresinin doğru ve güncel olmasından sorumlusunuz.',
    'terms.dataPrivacy': '3. Veri Toplama ve Gizlilik',
    'terms.dataPrivacyText': 'Site, Google Analytics ile anonim kullanım verileri toplar ve abonelik formu aracılığıyla kullanıcıların e-posta adreslerini saklar. Veri işleme detayları için <a href="/tr/privacy-policy" className="text-blue-600 underline">Gizlilik Politikası</a> sayfamızı inceleyiniz.',
    'terms.disclaimer': '4. Sorumluluk Reddi',
    'terms.disclaimerText': 'Sitedeki içerikler "olduğu gibi" sunulur. Site sahibi, içeriklerdeki eksiklik veya hatalardan sorumlu tutulamaz.',
    'terms.changeRight': '5. Değişiklik Hakkı',
    'terms.changeRightText': 'Pulse of Tech, bu kullanım şartlarını önceden haber vermeksizin değiştirme hakkını saklı tutar. Güncellenmiş şartlar sitede yayınlandığı andan itibaren geçerli olur.',
    'terms.contactInfo': '6. İletişim',
    'terms.contactInfoText': 'Herhangi bir soru veya talep için <strong>info@pulseoftech.net</strong> adresinden bizimle iletişime geçebilirsiniz.',
    
    // About page
    'about.mission.title': 'Misyonumuz',
    'about.mission.content1': 'Teknoloji dünyasındaki hızlı değişimleri takip etmek her geçen gün daha da zorlaşıyor. Bizim misyonumuz, karmaşık teknoloji haberlerini anlaşılır, özlü ve değerli içeriklere dönüştürerek okuyucularımızın zamanını en verimli şekilde kullanmalarını sağlamak.',
    'about.mission.content2': 'Yapay zeka teknolojilerini kullanarak, günlük binlerce teknoloji haberini analiz ediyor, en önemli gelişmeleri seçiyor ve size özetlenmiş, anlaşılır formatta sunuyoruz.',
    'about.whatWeDo.title': 'Ne Yapıyoruz?',
    'about.whatWeDo.ai': '🤖 AI Destekli İçerik',
    'about.whatWeDo.aiDesc': 'Gelişmiş yapay zeka algoritmaları ile teknoloji haberlerini analiz ediyor, en önemli noktaları çıkarıyor ve özlü özetler hazırlıyoruz.',
    'about.whatWeDo.category': '📊 Kategori Bazlı Organizasyon',
    'about.whatWeDo.categoryDesc': 'Yapay zeka, web geliştirme, mobil teknoloji, bulut bilişim ve daha fazlası - ilgi alanınıza göre içerikleri kolayca bulun.',
    'about.whatWeDo.daily': '⚡ Günlük Güncellemeler',
    'about.whatWeDo.dailyDesc': 'Her gün teknoloji dünyasından en önemli gelişmeleri takip ediyor, güncel kalmanızı sağlıyoruz.',
    'about.whatWeDo.quality': '🎯 Kaliteli Kaynak',
    'about.whatWeDo.qualityDesc': 'Sadece güvenilir kaynaklardan aldığımız haberleri işliyor, doğruluğu teyit edilmiş içerikler sunuyoruz.',
    'about.values.title': 'Değerlerimiz',
    'about.values.accuracy': 'Doğruluk',
    'about.values.accuracyDesc': 'Sadece doğrulanmış kaynaklardan alınan haberleri paylaşırız.',
    'about.values.transparency': 'Şeffaflık',
    'about.values.transparencyDesc': 'Her içeriğin kaynağını belirtiyor, orijinal makaleye erişim sağlıyoruz.',
    'about.values.qualityValue': 'Kalite',
    'about.values.qualityValueDesc': 'Miktar değil kalite odaklı yaklaşımla en değerli içerikleri seçiyoruz.',
    'about.values.accessibility': 'Erişilebilirlik',
    'about.values.accessibilityDesc': 'Karmaşık teknoloji konularını herkesin anlayabileceği şekilde sunuyoruz.',
    'about.team.title': 'Ekibimiz',
    'about.team.founder': 'Kurucu & Geliştirici',
    'about.team.founderDesc': 'Teknoloji tutkunu bir yazılım geliştirici olarak, yapay zeka ve web teknolojilerindeki gelişmeleri takip etmeyi ve paylaşmayı seviyorum. Pulse of Tech\'i, teknoloji topluluğuna değer katmak amacıyla geliştirdim.',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.ai': 'AI',
    'nav.webdev': 'Web Dev',
    'nav.mobile': 'Mobile',
    'nav.cloud': 'Cloud',
    'nav.security': 'Security',
    'search.placeholder': 'Search tech news...',
    'search.noResults': 'No results found for',
    
    // Categories
    'category.all': 'All Posts',
    'category.aiml': 'AI & Machine Learning',
    'category.webdev': 'Web Development',
    'category.mobile': 'Mobile Technology',
    'category.cloud': 'Cloud Computing',
    'category.security': 'Cybersecurity',
    'category.startups': 'Startups',
    'category.other': 'Other',
    
    // Common
    'common.readMore': 'Read more',
    'common.readTime': 'min read',
    'common.author': 'Author',
    'common.loading': 'Loading...',
    'common.backToHome': 'Back to home',
    'common.backToPosts': 'Back to all posts',
    'common.viewSource': 'View original source',
    'common.share': 'Share',
    
    // Home page
    'home.title': 'AI-Powered Tech News Hub',
    'home.subtitle': 'Stay updated with daily AI-powered tech news summaries. Get insights from the tech world in minutes, not hours.',
    'home.dailyUpdate': 'Daily Updates',
    'home.readTime': '2-4 min read',
    'home.readers': '10,000+ readers',
    'home.featured': 'Featured News',
    'home.trending': 'Trending',
    'home.recent': 'Recent Updates',
    'home.readFull': 'Read Full Story',
    
    // Newsletter
    'newsletter.title': 'Never Miss a Story',
    'newsletter.subtitle': 'Get daily AI-powered tech news summaries delivered to your inbox. Join thousands of informed professionals.',
    'newsletter.placeholder': 'Enter your email address',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.success': 'Successfully subscribed! Thank you.',
    'newsletter.error': 'An error occurred. Please try again later.',
    'newsletter.disclaimer': 'No spam. Unsubscribe anytime.',
    
    // Footer
    'footer.categories': 'Categories',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.description': 'Stay informed with AI-powered summaries of the latest tech news. Get concise, accurate insights from the tech world daily.',
    'footer.copyright': 'All rights reserved.',
    'footer.tagline': 'AI-Powered • Daily Updates • Tech News',
    
    // Post page
    'post.summary': 'Summary',
    'post.originalArticle': 'Read the Original Article',
    'post.originalDescription': 'Visit the original source for more detailed information and the complete story.',
    'post.visitSource': 'Visit Original Source',
    'post.relatedPosts': 'Related Posts',
    'post.notFound': 'Post Not Found',
    'post.notFoundDescription': 'The post you are looking for does not exist or may have been removed.',
    
    // Category page
    'category.loading': 'Loading category...',
    'category.notFound': 'Category not found',
    'category.postsCount': 'articles',
    'category.noPosts': 'No posts found in this category yet.',
    'category.viewAll': 'View all posts',
    
    // About page
    'about.title': 'About Us',
    'about.subtitle': 'Pulse of Tech is an AI-powered news platform that keeps a finger on the pulse of the tech world.',
    'about.mission': 'Our Mission',
    'about.whatWeDo': 'What We Do',
    'about.values': 'Our Values',
    'about.team': 'Our Team',
    
    // Contact page
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in touch with us for questions, suggestions, or collaboration proposals.',
    'contact.sendMessage': 'Send Message',
    'contact.directContact': 'Direct Contact',
    'contact.socialMedia': 'Social Media',
    'contact.faq': 'Frequently Asked Questions',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.namePlaceholder': 'Enter your full name',
    'contact.form.emailPlaceholder': 'example@email.com',
    'contact.form.messagePlaceholder': 'Write your message here...',
    'contact.form.selectSubject': 'Select subject',
    'contact.form.general': 'General Question',
    'contact.form.content': 'Content Suggestion',
    'contact.form.technical': 'Technical Support',
    'contact.form.collaboration': 'Collaboration Proposal',
    'contact.form.advertising': 'Advertising & Sponsorship',
    'contact.form.other': 'Other',
    'contact.form.required': '*',
    'contact.form.success': 'Your message has been sent successfully! We will get back to you soon.',
    'contact.form.error': 'An error occurred while sending the message. Please try again later or send an email directly.',
    'contact.email': 'Email',
    'contact.responseTime': 'Response Time',
    'contact.responseTimeText': 'We usually respond within 24 hours',
    'contact.faqContent1': 'How can I suggest content?',
    'contact.faqAnswer1': 'Use the form above and select "Content Suggestion" topic to detail your suggestion.',
    'contact.faqContent2': 'Can I advertise?',
    'contact.faqAnswer2': 'For sponsorship and advertising opportunities, contact us by selecting "Advertising & Sponsorship" topic.',
    'contact.faqContent3': 'Technical issue reporting',
    'contact.faqAnswer3': 'You can report technical issues you encounter on the website under "Technical Support" topic.',
    
    // About page
    'about.mission.title': 'Our Mission',
    'about.mission.content1': 'Following rapid changes in the tech world is becoming increasingly challenging. Our mission is to transform complex tech news into understandable, concise, and valuable content, helping our readers use their time most efficiently.',
    'about.mission.content2': 'Using artificial intelligence technologies, we analyze thousands of daily tech news, select the most important developments, and present them to you in summarized, understandable format.',
    'about.whatWeDo.title': 'What We Do',
    'about.whatWeDo.ai': '🤖 AI-Powered Content',
    'about.whatWeDo.aiDesc': 'We analyze tech news with advanced AI algorithms, extract key points, and prepare concise summaries.',
    'about.whatWeDo.category': '📊 Category-Based Organization',
    'about.whatWeDo.categoryDesc': 'AI, web development, mobile technology, cloud computing, and more - easily find content based on your interests.',
    'about.whatWeDo.daily': '⚡ Daily Updates',
    'about.whatWeDo.dailyDesc': 'We track the most important developments from the tech world daily, keeping you up to date.',
    'about.whatWeDo.quality': '🎯 Quality Source',
    'about.whatWeDo.qualityDesc': 'We only process news from reliable sources, providing verified and accurate content.',
    'about.values.title': 'Our Values',
    'about.values.accuracy': 'Accuracy',
    'about.values.accuracyDesc': 'We only share news from verified sources.',
    'about.values.transparency': 'Transparency',
    'about.values.transparencyDesc': 'We cite the source of every content and provide access to the original article.',
    'about.values.qualityValue': 'Quality',
    'about.values.qualityValueDesc': 'We select the most valuable content with a quality-focused approach, not quantity.',
    'about.values.accessibility': 'Accessibility',
    'about.values.accessibilityDesc': 'We present complex tech topics in a way everyone can understand.',
    'about.team.title': 'Our Team',
    'about.team.founder': 'Founder & Developer',
    'about.team.founderDesc': 'As a tech-passionate software developer, I love following and sharing developments in AI and web technologies. I developed Pulse of Tech to add value to the tech community.',
    
    // Privacy Policy page
    'privacy.title': 'Privacy Policy',
    'privacy.intro': 'This Privacy Policy informs users about personal data collected and processed by the <strong>Pulse of Tech</strong> website (<a href="https://pulseoftech.net/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://pulseoftech.net/</a>). By using our site, you accept this policy.',
    'privacy.dataCollected': '1. Data Collected',
    'privacy.dataCollectedText': 'When using our site, the following personal data may be collected:',
    'privacy.email': '<strong>Your email address</strong> – When provided through the subscription form, it is saved to the Supabase database and used to inform you about new news.',
    'privacy.cookies': '<strong>Cookies and usage data</strong> – Site traffic and user behavior are tracked anonymously through Google Analytics.',
    'privacy.adsense': 'Advertising services like Google AdSense may use advertising cookies. These cookies may be used to remember your preferences and show ads tailored to your interests.',
    'privacy.dataUsage': '2. Data Usage Purpose',
    'privacy.dataUsageList1': 'To send you notifications about new news and content',
    'privacy.dataUsageList2': 'To analyze site usage and improve user experience',
    'privacy.dataUsageList3': 'To provide personalized content for advertising services',
    'privacy.thirdParty': '3. Third Party Services',
    'privacy.thirdPartyText': 'Our site uses the following third party services:',
    'privacy.analytics': '<strong>Google Analytics:</strong> Analyzes site traffic and user behavior anonymously.',
    'privacy.adsenseService': '<strong>Google AdSense:</strong> May use cookies to show personalized ads.',
    'privacy.dataStorage': '4. Data Storage',
    'privacy.dataStorageText': 'Your email address is only stored in the Supabase database and used only for newsletter notifications. Upon request, your email address will be deleted from our system.',
    'privacy.userRights': '5. User Rights',
    'privacy.userRightsList1': 'Learn what your data is used for',
    'privacy.userRightsList2': 'Request access to and correction of your data',
    'privacy.userRightsList3': 'Request deletion of your data',
    'privacy.contact': 'You can contact us at <strong>info@pulseoftech.net</strong> for your requests.',
    'privacy.changes': '6. Changes to Privacy Policy',
    'privacy.changesText': 'This privacy policy may be updated from time to time. The updated policy will be effective from the moment it is published on our site.',
    
    // Terms of Service page
    'terms.title': 'Terms of Service',
    'terms.intro': 'These Terms of Service explain the conditions for using the services provided through the <strong>Pulse of Tech</strong> website (<a href="https://pulseoftech.net/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://pulseoftech.net/</a>). By visiting or using our site, you are deemed to have accepted these terms.',
    'terms.purpose': '1. Purpose of Service',
    'terms.purposeText': 'Pulse of Tech is a platform that shares technology news and content. The content on the site is for informational purposes and does not constitute investment or legal advice.',
    'terms.userObligations': '2. User Obligations',
    'terms.userObligationsList1': 'You agree to use the site only in accordance with laws and in good faith.',
    'terms.userObligationsList2': 'Unauthorized copying, reproduction, or commercial use of content on the site is prohibited.',
    'terms.userObligationsList3': 'You are responsible for ensuring that the email address you provide during subscription is accurate and current.',
    'terms.dataPrivacy': '3. Data Collection and Privacy',
    'terms.dataPrivacyText': 'The site collects anonymous usage data with Google Analytics and stores users\' email addresses through the subscription form. For details on data processing, please review our <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a> page.',
    'terms.disclaimer': '4. Disclaimer',
    'terms.disclaimerText': 'Content on the site is provided "as is". The site owner cannot be held responsible for deficiencies or errors in the content.',
    'terms.changeRight': '5. Right to Change',
    'terms.changeRightText': 'Pulse of Tech reserves the right to change these terms of use without prior notice. Updated terms become effective from the moment they are published on the site.',
    'terms.contactInfo': '6. Contact',
    'terms.contactInfoText': 'You can contact us at <strong>info@pulseoftech.net</strong> for any questions or requests.',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract language from URL or default to 'tr'
  const getLanguageFromPath = (): Language => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const firstSegment = pathSegments[0];
    return (firstSegment === 'en' || firstSegment === 'tr') ? firstSegment : 'tr';
  };

  const [language, setLanguageState] = useState<Language>(getLanguageFromPath);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Update language and navigate to new URL
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    
    // Save to localStorage
    localStorage.setItem('preferred-language', lang);
    
    // Update URL
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    // Remove existing language prefix if present
    if (pathSegments[0] === 'en' || pathSegments[0] === 'tr') {
      pathSegments.shift();
    }
    
    // Add new language prefix
    const newPath = `/${lang}${pathSegments.length > 0 ? '/' + pathSegments.join('/') : ''}`;
    navigate(newPath);
  };

  // Update language when URL changes
  useEffect(() => {
    const urlLang = getLanguageFromPath();
    if (urlLang !== language) {
      setLanguageState(urlLang);
    }
  }, [location.pathname]);

  // Load saved language preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language') as Language;
    if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
      const urlLang = getLanguageFromPath();
      if (urlLang !== savedLang) {
        setLanguage(savedLang);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};