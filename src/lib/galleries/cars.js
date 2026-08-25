// Single source of truth for the /cars gallery.
//
// Imported by the route page (JSON-LD), the gallery component (rendering) and
// scripts/generate-sitemap.js (image sitemap entries). Keeping one copy is the
// point: these lists were previously duplicated across all three, and a drift
// would have made the structured data advertise images the page never shows.
//
// Split by orientation for the masonry layout, which interleaves the two.
// `images` is the flat list in render order and is what the sitemap and
// JSON-LD consume.

export const horizontalImages = [
  { alt: 'Luxury car detail shot', src: '/cars/A7406517-Enhanced-NR-color.webp' },
  { alt: 'Classic automobile photography', src: '/cars/A7405676-color.webp' },
  { alt: 'Automotive photography by Anthony Freay', src: '/cars/A7204618-color.webp' },
  { alt: 'Black and white car portrait', src: '/cars/A7406721-bw.webp' },
];

export const verticalImages = [
  { alt: 'Sports car in color', src: '/cars/A7409382-color.webp' },
  { alt: 'Modern automobile design', src: '/cars/A7409342-color.webp' },
  { alt: 'Classic car in black and white', src: '/cars/DSC04341-bw.webp' },
  { alt: 'Vintage car photography', src: '/cars/A7200465-color.webp' },
  { alt: 'Luxury vehicle detail', src: '/cars/A7200477-color.webp' },
  { alt: 'Automotive photography', src: '/cars/A7200475-color.webp' },
  { alt: 'Car in monochrome', src: '/cars/A7406716-bw.webp' },
  { alt: 'Classic automobile portrait', src: '/cars/A7200462-color.webp' },
  { alt: 'Vehicle detail shot', src: '/cars/A7200488-color.webp' },
  { alt: 'Modern car photography', src: '/cars/A7408915-color.webp' },
  { alt: 'Automotive detail by Anthony Freay', src: '/cars/A7406778-color.webp' },
  { alt: 'Black and white automotive', src: '/cars/A7406726-bw.webp' },
  { alt: 'Car in natural light', src: '/cars/A7406734-color.webp' },
  { alt: 'Monochrome car portrait', src: '/cars/A7406717-bw.webp' },
  { alt: 'Automotive photography detail', src: '/cars/A7209958-color.webp' },
  { alt: 'Classic car in color', src: '/cars/A7200461-color.webp' },
];

export const images = [...horizontalImages, ...verticalImages];
