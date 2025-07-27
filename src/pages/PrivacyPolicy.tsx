import React from "react";
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Gizlilik Politikası</h1>

      <p className="mb-4">
        Bu Gizlilik Politikası, <strong>Pulse of Tech</strong> web sitesi
        (<a
          href="https://pulseoftech.net/"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://pulseoftech.net/
        </a>
        ) tarafından toplanan ve işlenen kişisel veriler hakkında kullanıcıları
        bilgilendirmek amacıyla hazırlanmıştır. Sitemizi kullanarak bu
        politikayı kabul etmiş olursunuz.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Toplanan Veriler</h2>
      <p className="mb-4">
        Sitemizi kullanırken aşağıdaki kişisel verileriniz toplanabilir:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>E-posta adresiniz</strong> – Abonelik formu aracılığıyla
          verdiğinizde Supabase veritabanına kaydedilir ve size yeni haberler
          hakkında bilgilendirme yapmak için kullanılır.
        </li>
        <li>
          <strong>Çerezler ve kullanım verileri</strong> – Google Analytics
          aracılığıyla site trafiği ve kullanıcı davranışları anonim olarak
          izlenir.
        </li>
      </ul>
      <p className="mb-4">
        İleride Google AdSense gibi reklam hizmetleri eklenirse, reklam
        çerezleri de kullanılabilir. Bu çerezler kullanıcı tercihlerinizi
        hatırlamak ve ilgi alanlarınıza yönelik reklamlar göstermek amacıyla
        kullanılabilir.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Verilerin Kullanım Amacı
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>Yeni haber ve içeriklerle ilgili size bildirim göndermek</li>
        <li>Site kullanımını analiz ederek kullanıcı deneyimini geliştirmek</li>
        <li>
          İleride eklenecek reklam hizmetleri için kişiselleştirilmiş içerik
          sağlamak
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Üçüncü Taraf Hizmetler
      </h2>
      <p className="mb-4">Sitemiz aşağıdaki üçüncü taraf hizmetleri kullanır:</p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Google Analytics:</strong> Site trafiğini ve kullanıcı
          davranışlarını anonim olarak analiz eder.
        </li>
        <li>
          <strong>Google AdSense (ileride):</strong> Kişiselleştirilmiş reklamlar
          göstermek için çerezleri kullanabilir.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Verilerin Saklanması
      </h2>
      <p className="mb-4">
        E-posta adresiniz, yalnızca Supabase veritabanında saklanır ve yalnızca
        haber bülteni bilgilendirmeleri için kullanılır. Talep etmeniz durumunda
        e-posta adresiniz sistemimizden silinir.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Kullanıcı Hakları</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Verilerinizin hangi amaçla kullanıldığını öğrenme</li>
        <li>Verilerinize erişme ve düzeltilmesini talep etme</li>
        <li>Verilerinizin silinmesini talep etme</li>
      </ul>
      <p className="mb-4">
        Talepleriniz için bizimle{" "}
        <strong>[e-posta adresinizi buraya yazın]</strong> üzerinden iletişime
        geçebilirsiniz.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Gizlilik Politikasında Değişiklikler
      </h2>
      <p>
        Bu gizlilik politikası zaman zaman güncellenebilir. Güncellenmiş politika
        sitemizde yayımlandığı andan itibaren geçerli olacaktır.
      </p>
    </div>
  );
}

export default PrivacyPolicy;