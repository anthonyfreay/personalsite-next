// Single source of truth for the /people gallery.
//
// Imported by the route page (JSON-LD), the gallery component (rendering) and
// scripts/generate-sitemap.js (image sitemap entries). Keeping one copy is the
// point: these lists were previously duplicated across all three, and a drift
// would have made the structured data advertise images the page never shows.

export const images = [
  { alt: 'Em in Williamsburg', src: '/people/DSC01179-Edit-people.webp', color: '#484848' },
  { alt: 'Couple leaning together on a tree-lined city street', src: '/people/A7403286-people.webp', width: 1079, height: 1620, color: '#181818' },
  { alt: 'Kal looking over a fire escape', src: '/people/DSC06349-people.webp', color: '#080808' },
  { alt: 'Natalie Freay celebrating her enagement', src: '/people/A7404306-people.webp', color: '#081808' },
  { alt: 'Arize in Studio', src: '/people/A7201581-Edit-people.webp', color: '#f8f8f8' },
  { alt: 'Dajee at Untermyer Gardens', src: '/people/A7205925-people.webp', color: '#181818' },
  { alt: 'Dajee at the MET Cloisters', src: '/people/A7205508-HDR-Edit-people.webp', color: '#080808' },
  { alt: 'Camille in Studio', src: '/people/A7201742-Edit-people.webp', color: '#d8d8d8' },
  { alt: 'Richard in his favorite green shirt', src: '/people/A7204813-Edit-people.webp', color: '#080808' },
  { alt: 'Em in Bryant Park', src: '/people/DSC00436-Edit-people.webp', color: '#080808' },
  { alt: 'Jenn in an alley', src: '/people/A7209214-Edit-people.webp', color: '#080808' },
  { alt: 'Michael', src: '/people/A7404298-people.webp', color: '#080808' },
  { alt: 'Ben over Rio Grande', src: '/people/DSC07716-Edit-people.webp', color: '#a8b8c8' },
  { alt: 'Law graduate in cap and gown beside the Fordham ram statue', src: '/people/A7401410-people.webp', width: 1080, height: 1620, color: '#f8f8f8' },
  { alt: 'Natalie at Liberty State Park', src: '/people/A7200334-people.webp', color: '#181818' },
  { alt: 'Three friends at a wedding reception', src: '/people/A7400648-people.webp', width: 1080, height: 1620, color: '#080808' },
];
