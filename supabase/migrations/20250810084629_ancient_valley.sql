/*
  # Add English language support columns

  1. New Columns
    - `blog_posts` table:
      - `title_en` (text) - English title
      - `summary_en` (text) - English summary  
      - `content_en` (text) - English content
    - `categories` table:
      - `name_en` (text) - English category name
      - `slug_en` (text) - English category slug

  2. Security
    - Update existing RLS policies to include new columns
    - Maintain same security level for English content
*/

-- Add English columns to blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS summary_en TEXT,
ADD COLUMN IF NOT EXISTS content_en TEXT;

-- Add English columns to categories table
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS name_en TEXT,
ADD COLUMN IF NOT EXISTS slug_en TEXT;

-- Update RLS policies to include English columns
DROP POLICY IF EXISTS "Anyone can read published blog posts" ON blog_posts;
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS "Anyone can read categories" ON categories;
CREATE POLICY "Anyone can read categories"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Add some sample English data for existing categories
UPDATE categories SET 
  name_en = 'AI & Machine Learning',
  slug_en = 'ai-ml'
WHERE slug = 'ai-ml';

UPDATE categories SET 
  name_en = 'Web Development',
  slug_en = 'web-dev'
WHERE slug = 'web-dev';

UPDATE categories SET 
  name_en = 'Mobile Technology',
  slug_en = 'mobile'
WHERE slug = 'mobile';

UPDATE categories SET 
  name_en = 'Cloud Computing',
  slug_en = 'cloud'
WHERE slug = 'cloud';

UPDATE categories SET 
  name_en = 'Cybersecurity',
  slug_en = 'security'
WHERE slug = 'security';

UPDATE categories SET 
  name_en = 'Startups',
  slug_en = 'startups'
WHERE slug = 'startups';

UPDATE categories SET 
  name_en = 'Other',
  slug_en = 'other'
WHERE slug = 'diger';