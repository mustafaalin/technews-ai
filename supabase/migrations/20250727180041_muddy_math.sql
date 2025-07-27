/*
  # Blog Posts Tablosu Oluşturma

  1. Yeni Tablolar
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text, başlık)
      - `summary` (text, özet)
      - `content` (text, içerik)
      - `category` (text, kategori slug)
      - `image_url` (text, resim URL'i)
      - `source_url` (text, kaynak URL'i)
      - `publish_date` (timestamptz, yayın tarihi)
      - `read_time` (integer, okuma süresi)
      - `tags` (text[], etiketler dizisi)
      - `author` (text, yazar)
      - `is_published` (boolean, yayında mı)
      - `created_at` (timestamptz, oluşturulma tarihi)
      - `updated_at` (timestamptz, güncellenme tarihi)

  2. Güvenlik
    - RLS etkinleştir
    - Herkes yayınlanmış blog yazılarını okuyabilir
    - Sadece authenticated kullanıcılar yazı ekleyebilir/düzenleyebilir

  3. İndeksler
    - Kategori, yayın tarihi ve yayın durumu için indeksler
*/

-- Blog posts tablosunu oluştur
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  source_url text NOT NULL,
  publish_date timestamptz NOT NULL DEFAULT now(),
  read_time integer NOT NULL DEFAULT 5,
  tags text[] DEFAULT '{}',
  author text NOT NULL DEFAULT 'Mustafa ALIN',
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS'i etkinleştir
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Herkes yayınlanmış blog yazılarını okuyabilir
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Authenticated kullanıcılar blog yazısı ekleyebilir
CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated kullanıcılar blog yazılarını güncelleyebilir
CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated kullanıcılar blog yazılarını silebilir
CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Performans için indeksler oluştur
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts (category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_publish_date ON blog_posts (publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts (created_at DESC);

-- Updated_at otomatik güncelleme için trigger fonksiyonu
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Updated_at trigger'ını oluştur
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();