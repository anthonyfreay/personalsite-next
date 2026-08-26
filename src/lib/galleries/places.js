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
  { alt: 'Beams', src: '/places/A7202190-scapes.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Tree', src: '/places/A7406558-scapes.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Travel photography', src: '/places/A7405233-scapes.webp', width: 1080, height: 720, color: '#d8d8c8' },
  { alt: 'Coney Island Rollercoaster', src: '/places/RX706719-color.webp', width: 1080, height: 1620, color: '#a8c8e8' },
  { alt: 'Scenic landscape', src: '/places/A7407228-scapes.webp', width: 1080, height: 720, color: '#081818' },
  { alt: 'Charleston', src: '/places/A7406615-scapes.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Nature photography', src: '/places/RX703948-scapes.webp', width: 1080, height: 720, color: '#f8b838' },
  { alt: 'Queens', src: '/places/A7202338-scapes.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Galapagos Summer', src: '/places/A7401731-Enhanced-NR-color.webp', width: 1080, height: 1620, color: '#f8f8f8' },
  { alt: 'Landscape detail', src: '/places/A7204930-scapes.webp', width: 1080, height: 720, color: '#181808' },
  { alt: 'Multnomah Falls', src: '/places/A7204120-scapes.webp', width: 1080, height: 1620, color: '#181808' },
  { alt: 'Travel moment', src: '/places/RX703316-scapes.webp', width: 1080, height: 720, color: '#d8d8d8' },
  { alt: 'San Francisco Summer', src: '/places/A7205351-color.webp', width: 1080, height: 1620, color: '#7898c8' },
  { alt: 'Street photography', src: '/places/RX702154-scapes.webp', width: 1080, height: 720, color: '#c8d8d8' },
  { alt: 'Catskills Lake', src: '/places/A7206286-scapes.webp', width: 1080, height: 1620, color: '#a8c8e8' },
  { alt: 'Colorful landscape', src: '/places/A7205360-color.webp', width: 1080, height: 720, color: '#e8e8e8' },
  { alt: 'Ice Rink', src: '/places/A7202369-scapes.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Paradise', src: '/places/A7407416-scapes.webp', width: 1080, height: 1620, color: '#f8e8e8' },
  { alt: 'Travel photography by Anthony Freay', src: '/places/RX706732-color.webp', width: 1080, height: 720, color: '#080808' },
  { alt: 'Columbus Circle on a Rainy Weekday', src: '/places/DSC09254-scapes.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Scenic photography', src: '/places/A7405906-color.webp', width: 1080, height: 720, color: '#181808' },
  { alt: 'Pigeon Guillemot on Oregon Coast', src: '/places/A7204896-scapes.webp', width: 1080, height: 1620, color: '#88a8a8' },
  { alt: 'Landscape composition', src: '/places/A7407432-scapes.webp', width: 1080, height: 720, color: '#7898b8' },
  { alt: 'City Stacks', src: '/places/A7202361-scapes.webp', width: 1080, height: 1620, color: '#383838' },
  { alt: 'Travel destination', src: '/places/A7206508-Edit-scapes.webp', width: 1620, height: 1080, color: '#e8c8b8' },
  { alt: 'Mom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s Apartment', src: '/places/RX702292-scapes.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'JETski', src: '/places/A7407477-scapes.webp', width: 1080, height: 1620, color: '#78a8c8' },
  { alt: 'Nature landscape', src: '/places/RX702886-scapes.webp', width: 1080, height: 720, color: '#080808' },
  { alt: 'San Francisco street sign', src: '/places/A7205014-color.webp', width: 1080, height: 1620, color: '#081808' },
  { alt: 'Scenic view', src: '/places/A7407357-scapes.webp', width: 1080, height: 720, color: '#98b8d8' },
  { alt: 'Teleferico Quito', src: '/places/RX703340-scapes.webp', width: 1080, height: 1620, color: '#e8e8e8' },
  { alt: 'Street scene', src: '/places/RX702276-scapes.webp', width: 1080, height: 720, color: '#080808' },
  { alt: 'Sitting in the Sun', src: '/places/A7407441-scapes.webp', width: 1080, height: 1620, color: '#b8c8d8' },
  { alt: 'Landscape photography detail', src: '/places/A7406572-scapes.webp', width: 1080, height: 720, color: '#080808' },
  { alt: 'Muir Woods', src: '/places/A7205161-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'San Francisco Sunset', src: '/places/A7205308-color.webp', width: 1080, height: 1620, color: '#f8c888' },
  { alt: 'HDR landscape', src: '/places/A7204586-HDR-scapes.webp', width: 1080, height: 720, color: '#d8d8d8' },
  { alt: 'Kids in Galapagos', src: '/places/A7401603-scapes.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Travel photography moment', src: '/places/A7401638-scapes.webp', width: 1080, height: 720, color: '#98c8e8' },
  { alt: 'Pretty Oregon Coast line', src: '/places/A7204601-HDR-scapes.webp', width: 1080, height: 1620, color: '#e8e8e8' },
  { alt: 'Colorful travel scene', src: '/places/A7405944-color.webp', width: 1080, height: 720, color: '#282818' },
  { alt: 'Kids playing in the Sand', src: '/places/A7407388-scapes.webp', width: 1080, height: 1620, color: '#5898b8' },
  { alt: 'Scenic landscape photography', src: '/places/A7407519-scapes.webp', width: 1080, height: 720, color: '#383848' },
  { alt: 'Sea Lions on the Oregon Coast', src: '/places/A7204910-scapes.webp', width: 1080, height: 1620, color: '#282828' },
  { alt: 'Garret Mountain Basketball Court', src: '/places/A7209983-Edit-scapes.webp', width: 1080, height: 1620, color: '#d8d8e8' },
  { alt: 'Street photography detail', src: '/places/RX702351-scapes.webp', width: 1080, height: 720, color: '#d8d8d8' },
  { alt: 'Volcano in Ecuador', src: '/places/A7402155-HDR-scapes.webp', width: 1080, height: 1620, color: '#e8e8e8' },
  { alt: 'Travel destination photography', src: '/places/A7405591-color.webp', width: 1080, height: 720, color: '#080808' },
  { alt: 'Guayaquil Highway', src: '/places/RX702346-scapes.webp', width: 1080, height: 1620, color: '#5898c8' },
  { alt: 'Landscape edit', src: '/places/A7406556-Edit-scapes.webp', width: 1080, height: 720, color: '#181818' },
  { alt: 'Tropical landscape', src: '/places/A7401732-Enhanced-NR-color.webp', width: 1080, height: 1620, color: '#e8e8e8' },
];
