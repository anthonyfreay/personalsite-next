// Single source of truth for the /places gallery.
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
  { alt: 'Landscape photography', src: '/places/A7407286-scapes.webp', width: 1080, height: 720, color: '#081808' },
  { alt: 'Tree', src: '/places/A7406558-scapes.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Coney Island Rollercoaster', src: '/places/RX706719-color.webp', width: 1080, height: 1620, color: '#a8c8e8' },
  { alt: 'Travel photography', src: '/places/A7405233-scapes.webp', width: 1080, height: 720, color: '#d8d8c8' },
  { alt: 'Charleston', src: '/places/A7406615-scapes.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Queens', src: '/places/A7202338-scapes.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Galapagos Summer', src: '/places/A7401731-Enhanced-NR-color.webp', width: 1080, height: 1620, color: '#f8f8f8' },
  { alt: 'Multnomah Falls', src: '/places/A7204120-scapes.webp', width: 1080, height: 1620, color: '#181808' },
  { alt: 'Travel moment', src: '/places/RX703316-scapes.webp', width: 1080, height: 720, color: '#d8d8d8' },
  { alt: 'San Francisco Summer', src: '/places/A7205351-color.webp', width: 1080, height: 1620, color: '#7898c8' },
  { alt: 'Street photography', src: '/places/RX702154-scapes.webp', width: 1080, height: 720, color: '#c8d8d8' },
  { alt: 'Catskills Lake', src: '/places/A7206286-scapes.webp', width: 1080, height: 1620, color: '#a8c8e8' },
  { alt: 'Colorful landscape', src: '/places/A7205360-color.webp', width: 1080, height: 720, color: '#e8e8e8' },
  { alt: 'Travel photography by Anthony Freay', src: '/places/RX706732-color.webp', width: 1080, height: 720, color: '#080808' },
  { alt: 'Columbus Circle on a Rainy Weekday', src: '/places/DSC09254-scapes.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Scenic photography', src: '/places/A7405906-color.webp', width: 1080, height: 720, color: '#181808' },
  { alt: 'Pigeon Guillemot on Oregon Coast', src: '/places/A7204896-scapes.webp', width: 1080, height: 1620, color: '#88a8a8' },
  { alt: 'Travel destination', src: '/places/A7206508-Edit-scapes.webp', width: 1620, height: 1080, color: '#e8c8b8' },
  { alt: 'The Eiffel Tower at night from beneath the Passerelle Debilly', src: '/places/A7409534-scapes.webp', width: 1215, height: 1620, color: '#082848' },
  { alt: 'Nature landscape', src: '/places/RX702886-scapes.webp', width: 1080, height: 720, color: '#080808' },
  { alt: 'San Francisco street sign', src: '/places/A7205014-color.webp', width: 1080, height: 1620, color: '#081808' },
  { alt: 'Teleferico Quito', src: '/places/RX703340-scapes.webp', width: 1080, height: 1620, color: '#e8e8e8' },
  { alt: 'Street scene', src: '/places/RX702276-scapes.webp', width: 1080, height: 720, color: '#080808' },
  { alt: 'Muir Woods', src: '/places/A7205161-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Kids in Galapagos', src: '/places/A7401603-scapes.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Travel photography moment', src: '/places/A7401638-scapes.webp', width: 1080, height: 720, color: '#98c8e8' },
  { alt: 'Pretty Oregon Coast line', src: '/places/A7204601-HDR-scapes.webp', width: 1080, height: 1620, color: '#e8e8e8' },
  { alt: 'Colorful travel scene', src: '/places/A7405944-color.webp', width: 1080, height: 720, color: '#282818' },
  { alt: 'Scenic landscape photography', src: '/places/A7407519-scapes.webp', width: 1080, height: 720, color: '#383848' },
  { alt: 'Sea Lions on the Oregon Coast', src: '/places/A7204910-scapes.webp', width: 1080, height: 1620, color: '#282828' },
  { alt: 'Garret Mountain Basketball Court', src: '/places/A7209983-Edit-scapes.webp', width: 1080, height: 1620, color: '#d8d8e8' },
  { alt: 'Landscape photography detail', src: '/places/A7406572-scapes.webp', width: 1080, height: 720, color: '#080808' },
  { alt: 'Volcano in Ecuador', src: '/places/A7402155-HDR-scapes.webp', width: 1080, height: 1620, color: '#e8e8e8' },
  { alt: 'Guayaquil Highway', src: '/places/RX702346-scapes.webp', width: 1080, height: 1620, color: '#5898c8' },
  { alt: 'Tropical landscape', src: '/places/A7401732-Enhanced-NR-color.webp', width: 1080, height: 1620, color: '#e8e8e8' },
  { alt: 'Late afternoon light along a Haussmann boulevard in Paris', src: '/places/A7408926-scapes.webp', width: 1215, height: 1620, color: '#080808' },
  { alt: 'Father and child crossing a snowy Manhattan sidewalk', src: '/places/A7409942-scapes.webp', width: 1620, height: 1080, color: '#e8e8e8' },
];
