/**
 * Build-time sitemap generator — includes static routes, categories, and live products.
 * Run: node scripts/generate-sitemap.mjs (also via npm prebuild)
 */
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { ARTICLES } from '../src/data/articles.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
config({ path: join(root, '.env') });

const SITE_URL = 'https://www.flowerlifestyle.co.ke';
const today = new Date().toISOString().slice(0, 10);

const STATIC_PAGES = [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/florist-kenya', changefreq: 'weekly', priority: '0.95' },
  { loc: '/flowers', changefreq: 'daily', priority: '0.9' },
  // Occasion landing pages
  { loc: '/birthday-flowers-nairobi', changefreq: 'weekly', priority: '0.9' },
  { loc: '/roses-delivery-nairobi', changefreq: 'weekly', priority: '0.9' },
  { loc: '/anniversary-flowers-nairobi', changefreq: 'weekly', priority: '0.9' },
  // Topical authority pages
  { loc: '/same-day-flower-delivery-nairobi', changefreq: 'weekly', priority: '0.88' },
  { loc: '/money-bouquet-nairobi', changefreq: 'weekly', priority: '0.85' },
  { loc: '/corporate-flower-gifts-nairobi', changefreq: 'monthly', priority: '0.8' },
  // Neighbourhood local SEO pages
  { loc: '/flower-delivery-westlands', changefreq: 'monthly', priority: '0.82' },
  { loc: '/flower-delivery-kilimani', changefreq: 'monthly', priority: '0.82' },
  { loc: '/flower-delivery-karen', changefreq: 'monthly', priority: '0.82' },
  { loc: '/flower-delivery-lavington', changefreq: 'monthly', priority: '0.82' },
  { loc: '/flower-delivery-gigiri', changefreq: 'monthly', priority: '0.82' },
  { loc: '/flower-delivery-kasarani', changefreq: 'monthly', priority: '0.82' },
  // Utility pages
  { loc: '/delivery', changefreq: 'monthly', priority: '0.85' },
  { loc: '/faq', changefreq: 'monthly', priority: '0.75' },
  { loc: '/about', changefreq: 'monthly', priority: '0.7' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
];

const CATEGORY_SLUGS = [
  'girlfriends-day',
  'birthday',
  'romance',
  'roses',
  'anniversary',
  'combos',
  'mothers-day',
  'money-bouquet',
];

const urlEntry = (loc, changefreq, priority) => `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

async function fetchProductUrls() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn('[sitemap] Supabase env not set — skipping product URLs');
    return [];
  }

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from('products')
      .select('id, updated_at, created_at')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) {
      console.warn('[sitemap] Could not fetch products:', error.message);
      return [];
    }

    return (data || []).map((p) => ({
      loc: `/flowers?product=${encodeURIComponent(p.id)}`,
      changefreq: 'weekly',
      priority: '0.7',
      lastmod: (p.updated_at || p.created_at || today).slice(0, 10),
    }));
  } catch (err) {
    console.warn('[sitemap] Product fetch failed:', err.message);
    return [];
  }
}

async function main() {
  const articleEntries = ARTICLES.map((a) => ({
    loc: `/blog/${a.slug}`,
    changefreq: 'monthly',
    priority: '0.75',
    lastmod: (a.updatedAt || a.publishedAt).slice(0, 10),
  }));

  const entries = [
    ...STATIC_PAGES.map((p) => ({ ...p, lastmod: today })),
    ...CATEGORY_SLUGS.map((slug) => ({
      loc: `/flowers?category=${slug}`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: today,
    })),
    ...articleEntries,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((e) => {
    const lastmod = e.lastmod || today;
    return `  <url>
    <loc>${SITE_URL}${e.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

  const outPath = join(root, 'public', 'sitemap.xml');
  writeFileSync(outPath, xml, 'utf8');
  console.log(`[sitemap] Wrote ${entries.length} URLs to public/sitemap.xml`);
}

main();
