// Single source of truth for the /people gallery.
//
// Imported by the route page (JSON-LD), the gallery component (rendering) and
// scripts/generate-sitemap.js (image sitemap entries). Keeping one copy is the
// point: these lists were previously duplicated across all three, and a drift
// would have made the structured data advertise images the page never shows.

export const images = [
  { alt: 'Em in Williamsburg', src: '/people/DSC01179-Edit-portrait.webp', color: '#484848' },
  { alt: 'Couple leaning together on a tree-lined city street', src: '/people/A7403286-portrait.webp', width: 1079, height: 1620, color: '#181818' },
  { alt: 'Woman looking back over the Paris rooftops from Montmartre', src: '/people/A7409817-portrait.webp', width: 1215, height: 1620, color: '#080808' },
  { alt: 'Kal looking over a fire escape', src: '/people/DSC06349-portrait.webp', color: '#080808' },
  { alt: 'Natalie Freay celebrating her enagement', src: '/people/A7404306-portrait.webp', color: '#081808' },
  { alt: 'Arize in Studio', src: '/people/A7201581-Edit-portrait.webp', color: '#f8f8f8' },
  { alt: 'Dajee at Untermyer Gardens', src: '/people/A7205925-portrait.webp', color: '#181818' },
  { alt: 'Six law graduates outside the Fordham School of Law', src: '/people/A7401733-portrait.webp', width: 1215, height: 1620, color: '#c8a888' },
  { alt: 'Dajee at the MET Cloisters', src: '/people/A7205508-HDR-Edit-portrait.webp', color: '#080808' },
  { alt: 'Camille in Studio', src: '/people/A7201742-Edit-portrait.webp', color: '#d8d8d8' },
  { alt: 'Richard in his favorite green shirt', src: '/people/A7204813-Edit-portrait.webp', color: '#080808' },
  { alt: 'Em in Bryant Park', src: '/people/DSC00436-Edit-portrait.webp', color: '#080808' },
  { alt: 'Jenn in an alley', src: '/people/A7209214-Edit-portrait.webp', color: '#080808' },
  { alt: 'Michael', src: '/people/A7404298-portrait.webp', color: '#080808' },
  { alt: 'Ben over Rio Grande', src: '/people/DSC07716-Edit-portrait.webp', color: '#a8b8c8' },
  { alt: 'Law graduate in cap and gown beside the Fordham ram statue', src: '/people/A7401410-portrait.webp', width: 1080, height: 1620, color: '#f8f8f8' },
  { alt: 'Natalie at Liberty State Park', src: '/people/A7200334-portrait.webp', color: '#181818' },
  { alt: 'Three friends at a wedding reception', src: '/people/A7400648-portrait.webp', width: 1080, height: 1620, color: '#080808' },
];
