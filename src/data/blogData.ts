import { BlogPost, Category } from '../types/blog';
import postsFromJson from './blogPosts.json';

// Import all images
import birlesikKrallikImage from '../assets/images/birlesik-krallikta-cocuk-guven.png';
import gupshupImage from '../assets/images/gupshup-60-milyon-yatirimla-me.png';
import masaustuImage from '../assets/images/masaustu-fuzyon-enerjide-devri.png';
import mcneilImage from '../assets/images/mcneil-ile-otomotivde-yenilikc.png';
import natoImage from '../assets/images/natonun-yenilikci-cozumleri-sa.png';
import nisImage from '../assets/images/nis-pazarin-gucu-girisimciler-.png';
import teaImage from '../assets/images/tea-uygulamasinda-veri-ihlali-.png';
import teslaImage from '../assets/images/teslanin-robotaksi-projesinde-.png';
import yapayZekaYazilimImage from '../assets/images/yapay-zek-yazilim-muhendisligi.png';
import yapayZekaSavunmaImage from '../assets/images/yapay-zeka-ve-savunma-disrupt-.png';
import yemekSiparisImage from '../assets/images/yemek-siparisinde-yeni-donem-b.png';
import amazonImage from '../assets/images/amazondan-renkli-ekranli-uygun.png';
import googleAramaImage from '../assets/images/google-aramayi-degistiriyor-ya.png';
import googleUyariImage from '../assets/images/googledan-uyari-catwatchful-ca.png';
import googleOpalImage from '../assets/images/googlein-opal-araciyla-kodsuz-.png';
import googlePhotosImage from '../assets/images/google-photos-ile-anilarinizi-.png';
import lyftImage from '../assets/images/2026da-lyft-ile-otonom-servis-.png';

// Create image mapping
const imageMap: { [key: string]: string } = {
  'birlesik-krallikta-cocuk-guven.png': birlesikKrallikImage,
  'gupshup-60-milyon-yatirimla-me.png': gupshupImage,
  'masaustu-fuzyon-enerjide-devri.png': masaustuImage,
  'mcneil-ile-otomotivde-yenilikc.png': mcneilImage,
  'natonun-yenilikci-cozumleri-sa.png': natoImage,
  'nis-pazarin-gucu-girisimciler-.png': nisImage,
  'tea-uygulamasinda-veri-ihlali-.png': teaImage,
  'teslanin-robotaksi-projesinde-.png': teslaImage,
  'yapay-zek-yazilim-muhendisligi.png': yapayZekaYazilimImage,
  'yapay-zeka-ve-savunma-disrupt-.png': yapayZekaSavunmaImage,
  'yemek-siparisinde-yeni-donem-b.png': yemekSiparisImage,
  'amazondan-renkli-ekranli-uygun.png': amazonImage,
  'google-aramayi-degistiriyor-ya.png': googleAramaImage,
  'googledan-uyari-catwatchful-ca.png': googleUyariImage,
  'googlein-opal-araciyla-kodsuz-.png': googleOpalImage,
  'google-photos-ile-anilarinizi-.png': googlePhotosImage,
  '2026da-lyft-ile-otonom-servis-.png': lyftImage,
};

// Update image URLs in posts
const allPosts: BlogPost[] = (postsFromJson as any).map((post: BlogPost) => {
  const imageName = post.imageUrl.split('/').pop() || '';
  return {
    ...post,
    imageUrl: imageMap[imageName] || post.imageUrl
  };
});

export const baseCategories: Omit<Category, 'count'>[] = [
  { id: '1', name: 'Yapay Zeka & Makine Öğrenmesi', slug: 'ai-ml' },
  { id: '2', name: 'Web Geliştirme', slug: 'web-dev' },
  { id: '3', name: 'Mobil Teknoloji', slug: 'mobile' },
  { id: '4', name: 'Bulut Bilişim', slug: 'cloud' },
  { id: '5', name: 'Siber Güvenlik', slug: 'security' },
  { id: '6', name: 'Girişimcilik', slug: 'startups' },
];

const categoryCounts: { [key: string]: number } = {};
for (const post of allPosts) {
  if (post.category) {
    categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
  }
}

export const categories: Category[] = baseCategories.map(category => ({
  ...category,
  count: categoryCounts[category.slug] || 0,
}));

export const blogPosts: BlogPost[] = allPosts;
