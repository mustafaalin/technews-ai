# Edge Functions - Meta Tag Injection Kurulum Rehberi

## Ne Yapıldı?

X (Twitter) ve diğer sosyal medya platformlarında link preview'ların düzgün çıkması için Netlify Edge Functions ile meta tag injection sistemi kuruldu.

## Nasıl Çalışıyor?

1. Bir bot (Twitter, Facebook, vb.) site'ye istek atınca
2. Edge Function devreye girer
3. URL'den post bilgisini parse eder
4. Supabase'den post verisini çeker
5. HTML'e Open Graph ve Twitter Card meta tag'lerini inject eder
6. Bot'a meta tag'li HTML döner

Normal kullanıcılar için hiçbir şey değişmez, sadece SPA çalışır.

## Deployment Adımları

### 1. Netlify Environment Variables

Netlify Dashboard'a gidin:
- Site Settings > Environment Variables
- Aşağıdaki değişkenleri ekleyin:

```
VITE_SUPABASE_URL = your_supabase_url
VITE_SUPABASE_ANON_KEY = your_supabase_anon_key
```

**ÖNEMLİ:** Bu değişkenler zaten `.env` dosyanızda var. Aynı değerleri Netlify'a da eklemeniz gerekiyor.

### 2. Deploy

Değişiklikleri GitHub'a push edin:

```bash
git add .
git commit -m "Add Netlify Edge Functions for meta tag injection"
git push
```

Netlify otomatik olarak deploy edecek ve edge function'ı aktif edecek.

### 3. Test Etme

#### Twitter Card Validator ile Test:
1. https://cards-dev.twitter.com/validator adresine gidin
2. Bir post URL'i girin (örn: https://pulseoftech.net/tr/post/yapay-zeka-ml/2026-02-03/chatgpt-yeni-ozellik)
3. "Preview card" butonuna tıklayın
4. Large image card ile birlikte başlık, açıklama ve görsel görünmeli

#### Bot Simülasyonu (cURL ile):
```bash
curl -H "User-Agent: Twitterbot/1.0" https://pulseoftech.net/tr/post/... | grep "og:"
```

Çıktıda şu tarz meta tag'ler görünmeli:
```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta name="twitter:card" content="summary_large_image">
```

#### View Page Source ile Kontrol:
1. Chrome/Firefox'ta bir post sayfasını açın
2. Sağ tık > "View Page Source" (Sayfa Kaynağını Görüntüle)
3. `<head>` kısmında normal kullanıcılar için meta tag'ler olmayacak (bu normal)
4. Bot olarak istek atınca meta tag'ler inject edilecek

## Sorun Giderme

### Edge Function Çalışmıyor mu?

1. **Environment Variables Kontrolü:**
   - Netlify Dashboard > Site Settings > Environment Variables
   - `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` var mı?

2. **Deploy Logları:**
   - Netlify Dashboard > Deploys > Son deploy
   - Edge Functions başarıyla deploy edildi mi?

3. **Function Logs:**
   - Netlify Dashboard > Functions > inject-meta
   - Real-time logları izleyin

### Meta Tag'ler Görünmüyor mu?

1. **URL Formatı Doğru mu?**
   - URL format: `/tr/post/{category}/{date}/{slug}`
   - Supabase'deki `full_url_tr` veya `full_url_en` ile eşleşmeli

2. **Post Published mı?**
   - Supabase'de `is_published = true` olmalı

3. **Bot User-Agent:**
   - Edge function sadece bot'lar için çalışır
   - Test ederken bot user-agent kullanın

## Dosyalar

- `/netlify/edge-functions/inject-meta.ts` - Ana edge function
- `/netlify.toml` - Netlify konfigürasyonu
- `/_redirects` - URL redirect kuralları (artık `netlify.toml`'da)

## Ek Bilgiler

- Edge Functions Netlify Free plan'de çalışır
- Her istek için Supabase'e gidilir (performans için cache eklenebilir)
- 50ms'den daha hızlı çalışır
- Bot detection user-agent bazlı yapılır

## Cache (Opsiyonel İyileştirme)

Yüksek trafikte cache eklenebilir:

```typescript
// KV store ile 5 dakika cache
const cacheKey = `post:${pathname}`;
const cached = await context.cookies.get(cacheKey);
if (cached) return cached;
// ... fetch from Supabase
await context.cookies.set(cacheKey, result, { maxAge: 300 });
```

## Destek

Sorun yaşarsanız:
1. Netlify function logs'a bakın
2. Browser console'da error var mı kontrol edin
3. Supabase'de post verisi doğru mu kontrol edin
