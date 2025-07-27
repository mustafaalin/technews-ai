import React from "react";

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Kullanım Şartları</h1>

      <p className="mb-4">
        Bu Kullanım Şartları,{" "}
        <strong>Pulse of Tech</strong> web sitesi (
        <a
          href="https://pulseoftech.net/"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://pulseoftech.net/
        </a>
        ) üzerinden sunulan hizmetlerin kullanımına ilişkin koşulları açıklar.
        Sitemizi ziyaret ederek veya kullanarak bu şartları kabul etmiş
        sayılırsınız.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Hizmetin Amacı</h2>
      <p className="mb-4">
        Pulse of Tech, teknoloji haberleri ve içerikleri paylaşan bir platformdur.
        Sitedeki içerikler bilgilendirme amacı taşır ve herhangi bir yatırım
        veya hukuki tavsiye niteliği taşımaz.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Kullanıcı Yükümlülükleri
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Siteyi yalnızca yasalara uygun şekilde ve iyi niyetle kullanmayı kabul
          edersiniz.
        </li>
        <li>
          Sitede bulunan içeriklerin izinsiz olarak kopyalanması, çoğaltılması
          veya ticari amaçla kullanılması yasaktır.
        </li>
        <li>
          Abonelik sırasında verdiğiniz e-posta adresinin doğru ve güncel
          olmasından siz sorumlusunuz.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Toplanan Veriler ve Gizlilik
      </h2>
      <p className="mb-4">
        Site, Google Analytics ile anonim kullanım verilerini toplar ve
        abonelik formu üzerinden kullanıcıların e-posta adreslerini saklar.
        Verilerin işlenmesine ilişkin detaylar için{" "}
        <a
          href="/privacy-policy"
          className="text-blue-600 underline"
        >
          Gizlilik Politikası
        </a>{" "}
        sayfamızı inceleyebilirsiniz.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Sorumluluk Reddi
      </h2>
      <p className="mb-4">
        Sitede yer alan içerikler “olduğu gibi” sağlanır. İçeriklerdeki
        eksikliklerden veya hatalardan dolayı site sahibi sorumlu tutulamaz.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. Değişiklik Hakkı
      </h2>
      <p className="mb-4">
        Pulse of Tech, bu kullanım şartlarını önceden bildirim yapmaksızın
        değiştirme hakkını saklı tutar. Güncellenmiş şartlar sitede
        yayımlandığı andan itibaren geçerli olur.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. İletişim</h2>
      <p>
        Herhangi bir soru veya talebiniz için bizimle{" "}
        <strong>info@pulseoftech.net</strong> üzerinden iletişime
        geçebilirsiniz.
      </p>
    </div>
  );
}
