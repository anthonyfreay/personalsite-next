// Single source of truth for the /people gallery.
//
// Imported by the route page (JSON-LD), the gallery component (rendering) and
// scripts/generate-sitemap.js (image sitemap entries). Keeping one copy is the
// point: these lists were previously duplicated across all three, and a drift
// would have made the structured data advertise images the page never shows.

export const images = [
  { alt: 'Em in Williamsburg', src: '/people/DSC01179-Edit-portrait.webp', color: '#484848' },
  { alt: 'Kal looking over a fire escape', src: '/people/DSC06349-portrait.webp', color: '#080808' },
  { alt: 'Natalie Freay celebrating her enagement', src: '/people/A7404306-portrait.webp', color: '#081808' },
  { alt: 'Dajee at Untermyer Gardens', src: '/people/A7205925-portrait.webp', color: '#181818' },
  { alt: 'Dajee in Grand Central', src: '/people/A7207181-portrait.webp', color: '#b8b8b8' },
  { alt: 'Arize in Studio', src: '/people/A7201581-Edit-portrait.webp', color: '#f8f8f8' },
  { alt: 'Dajee at the MET Cloisters', src: '/people/A7205508-HDR-Edit-portrait.webp', color: '#080808' },
  { alt: 'Camille in Studio', src: '/people/A7201742-Edit-portrait.webp', color: '#d8d8d8' },
  { alt: 'Richard in his favorite green shirt', src: '/people/A7204813-Edit-portrait.webp', color: '#080808' },
  { alt: 'Em in Bryant Park', src: '/people/DSC00436-Edit-portrait.webp', color: '#080808' },
  { alt: 'Jenn in an alley', src: '/people/A7209214-Edit-portrait.webp', color: '#080808' },
  { alt: 'Michael', src: '/people/A7404298-portrait.webp', color: '#080808' },
  { alt: 'Ben over Rio Grande', src: '/people/DSC07716-Edit-portrait.webp', color: '#a8b8c8' },
  { alt: 'Natalie at Liberty State Park', src: '/people/A7200334-portrait.webp', color: '#181818' },
];
