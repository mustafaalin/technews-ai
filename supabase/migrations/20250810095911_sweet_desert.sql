/*
  # Add Turkish and English slug fields to categories table

  1. Changes
    - Add `slug_tr` column for Turkish slugs
    - Add `slug_en` column for English slugs
    - Update existing data with appropriate slug values
    - Add indexes for better performance

  2. Data Migration
    - Populate slug_tr and slug_en fields for existing categories
    - Maintain backward compatibility with existing slug field
*/

-- Add new columns for Turkish and English slugs
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'slug_tr'
  ) THEN
    ALTER TABLE categories ADD COLUMN slug_tr text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'slug_en'
  ) THEN
    ALTER TABLE categories ADD COLUMN slug_en text;
  END IF;
END $$;

-- Update existing categories with Turkish and English slugs
UPDATE categories SET 
  slug_tr = CASE 
    WHEN slug = 'ai-ml' THEN 'yapay-zeka-ml'
    WHEN slug = 'web-dev' THEN 'web-gelistirme'
    WHEN slug = 'mobile' THEN 'mobil-teknoloji'
    WHEN slug = 'cloud' THEN 'bulut-bilisim'
    WHEN slug = 'security' THEN 'siber-guvenlik'
    WHEN slug = 'startups' THEN 'girisimcilik'
    WHEN slug = 'diger' THEN 'diger'
    ELSE slug
  END,
  slug_en = CASE 
    WHEN slug = 'ai-ml' THEN 'ai-ml'
    WHEN slug = 'web-dev' THEN 'web-development'
    WHEN slug = 'mobile' THEN 'mobile-technology'
    WHEN slug = 'cloud' THEN 'cloud-computing'
    WHEN slug = 'security' THEN 'cybersecurity'
    WHEN slug = 'startups' THEN 'startups'
    WHEN slug = 'diger' THEN 'other'
    ELSE slug
  END
WHERE slug_tr IS NULL OR slug_en IS NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_categories_slug_tr ON categories (slug_tr);
CREATE INDEX IF NOT EXISTS idx_categories_slug_en ON categories (slug_en);