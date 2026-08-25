import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

import { galleriesByRoute } from '../src/lib/galleries/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

const SITE_URL = 'https://www.anthonyfreay.com';

const routes = [
  '/',
  '/work',
  '/live',
  '/bw',
  '/people',
  '/places',
  '/cars',
  '/events',
  '/contact',
];

// Map each route to the source that determines its content.
const routeSources = {
  '/': 'src/app/page.jsx',
  '/work': 'src/app/work',
  '/live': 'src/app/live',
  '/bw': 'src/app/bw',
  '/people': 'src/app/people',
  '/places': 'src/app/places',
  '/cars': 'src/app/cars',
  '/events': 'src/app/events',
  '/contact': 'src/app/contact',
};

// Gallery routes are driven by their manifest, so a change there should move
// the route's lastmod too.
const manifestFor = (route) =>
  galleriesByRoute[route] ? `src/lib/galleries${route}.js` : null;

// Real last-modified date per route, from the last commit touching its source.
// A build-date stamp on every URL is a signal Google learns to ignore, so fall
// back to omitting <lastmod> rather than asserting something untrue.
function getLastMod(route) {
  const sources = [routeSources[route], manifestFor(route)].filter(Boolean);
  if (!sources.length) return null;

  const dates = sources
    .map((source) => {
      try {
        const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', source], {
          cwd: repoRoot,
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'ignore'],
        }).trim();
        return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  if (!dates.length) return null;
  return dates.sort().at(-1); // most recent of the contributing sources
}

// Only the characters that are actually illegal in XML text content. Quotes and
// apostrophes are legal there and are left alone, which keeps titles like
// "Mom's Apartment" readable. Previously nothing was escaped at all, so an alt
// containing & or < would have produced a malformed sitemap.
const escapeXml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildImageEntries(route) {
  const images = galleriesByRoute[route];
  if (!images) return '';
  return images
    .map(
      (image) => `    <image:image>
      <image:loc>${SITE_URL}${image.src}</image:loc>
      <image:title>${escapeXml(image.alt)}</image:title>
    </image:image>`
    )
    .join('\n');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
    .map((route) => {
      const imageEntries = buildImageEntries(route);
      const lastMod = getLastMod(route);
      return `  <url>
    <loc>${SITE_URL}${route}</loc>
${lastMod ? `    <lastmod>${lastMod}</lastmod>\n` : ''}    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
${imageEntries ? imageEntries + '\n' : ''}  </url>`;
    })
    .join('\n')}
</urlset>`;

const publicDir = path.join(repoRoot, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

const imageCount = routes.reduce(
  (total, route) => total + (galleriesByRoute[route]?.length ?? 0),
  0
);
console.log(
  `✓ Sitemap generated at public/sitemap.xml (${routes.length} urls, ${imageCount} images)`
);
