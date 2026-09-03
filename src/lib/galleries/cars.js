// Single source of truth for the /cars gallery.
//
// Imported by the route page (JSON-LD), the gallery component (rendering) and
// scripts/generate-sitemap.js (image sitemap entries). Keeping one copy is the
// point: these lists were previously duplicated across all three, and a drift
// would have made the structured data advertise images the page never shows.
//
// Order matters and is deliberate: landscape and portrait shots alternate so
// the CSS columns get a mix of tile heights rather than a run of one shape.
// This used to be computed at render time from separate horizontalImages and
// verticalImages arrays; that algorithm existed to balance react-masonry-css's
// round-robin distribution, which CSS columns now do on their own. The order is
// baked in here so there is no runtime work and only one list to maintain.

export const images = [
  { alt: 'Car buried in snow outside a Manhattan doorway', src: '/cars/A7408301-cars.webp', width: 1620, height: 1080, color: '#181818' },
  { alt: 'Sports car in color', src: '/cars/A7409382-cars.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Modern automobile design', src: '/cars/A7409342-cars.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Classic automobile portrait', src: '/cars/A7200462-cars.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Vintage car photography', src: '/cars/A7200465-cars.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Luxury vehicle detail', src: '/cars/A7200477-cars.webp', width: 1080, height: 1620, color: '#b8d8e8' },
  { alt: 'Classic automobile photography', src: '/cars/A7405676-cars.webp', width: 1080, height: 720, color: '#281818' },
  { alt: 'Automotive photography', src: '/cars/A7200475-cars.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'A7406689 cars', src: '/cars/A7406689-cars.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'A7409701 cars', src: '/cars/A7409701-cars.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Car in natural light', src: '/cars/A7406734-cars.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Vehicle detail shot', src: '/cars/A7200488-cars.webp', width: 1080, height: 1620, color: '#f8e8b8' },
  { alt: 'A7402122 cars', src: '/cars/A7402122-cars.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Modern car photography', src: '/cars/A7408915-cars.webp', width: 1080, height: 1620, color: '#380818' },
  { alt: 'Classic car in color', src: '/cars/A7200461-cars.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Automotive photography detail', src: '/cars/A7209958-cars.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Automotive detail by Anthony Freay', src: '/cars/A7406778-cars.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Automotive photography by Anthony Freay', src: '/cars/A7204618-cars.webp', width: 1080, height: 720, color: '#f8f8f8' },
  { alt: 'Black and white automotive', src: '/cars/A7406726-cars.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Monochrome car portrait', src: '/cars/A7406717-cars.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Luxury car detail shot', src: '/cars/A7406517-Enhanced-NR-cars.webp', width: 1080, height: 720, color: '#181818' },
  { alt: 'Car in monochrome', src: '/cars/A7406716-cars.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Black and white car portrait', src: '/cars/A7406721-cars.webp', width: 1080, height: 720, color: '#181818' },
  { alt: 'Classic car in black and white', src: '/cars/DSC04341-cars.webp', width: 1080, height: 1620, color: '#080808' },
];
