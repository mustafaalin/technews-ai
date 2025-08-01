/*
  # Categories Table and Blog Posts Integration

  1. New Tables
    - `categories`
      - `id` (serial, primary key)
      - `name` (text, kategori adı)
      - `slug` (text, URL slug)
      - `created_at` (timestamp)

  2. Changes to Existing Tables
    - `blog_posts` tablosuna `category_id` kolonu eklenir
    - Eski `category` kolonu kaldırılır
    - Foreign key constraint eklenir

  3. Default Data
    - Temel kategoriler eklenir
    - Mevcut blog postları için kategori eşleştirmesi yapılır

  4. Security
    - Categories tablosu için RLS politikaları
*/

-- Categories tablosunu oluştur
CREATE TABLE IF NOT EXISTS categories (
  id serial PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Temel kategorileri ekle
INSERT INTO categories (id, name, slug) VALUES
  (1, 'Yapay Zeka & Makine Öğrenmesi', 'ai-ml'),
  (2, 'Web Geliştirme', 'web-dev'),
  (3, 'Mobil Teknoloji', 'mobile'),
  (4, 'Bulut Bilişim', 'cloud'),
  (5, 'Siber Güvenlik', 'security'),
  (6, 'Girişimcilik', 'startups'),
  (99, 'Diğer', 'diger')
ON CONFLICT (slug) DO NOTHING;

-- Sequence'i doğru değere ayarla
SELECT setval('categories_id_seq', 99, true);

-- Blog posts tablosuna category_id kolonu ekle (eğer yoksa)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'category_id'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN category_id integer DEFAULT 99;
  END IF;
END $$;

-- Mevcut category değerlerini category_id'ye dönüştür
UPDATE blog_posts SET category_id = 
  CASE 
    WHEN category = 'ai-ml' THEN 1
    WHEN category = 'web-dev' THEN 2
    WHEN category = 'mobile' THEN 3
    WHEN category = 'cloud' THEN 4
    WHEN category = 'security' THEN 5
    WHEN category = 'startups' THEN 6
    ELSE 99
  END
WHERE category_id IS NULL OR category_id = 99;

-- Foreign key constraint ekle
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'blog_posts_category_id_fkey'
  ) THEN
    ALTER TABLE blog_posts 
    ADD CONSTRAINT blog_posts_category_id_fkey 
    FOREIGN KEY (category_id) REFERENCES categories(id);
  END IF;
END $$;

-- Categories tablosu için RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Herkes kategorileri okuyabilir
CREATE POLICY "Anyone can read categories"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated kullanıcılar kategori ekleyebilir/güncelleyebilir
CREATE POLICY "Authenticated users can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON blog_posts(category_id);