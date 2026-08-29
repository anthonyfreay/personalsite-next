// Single source of truth for the /sports gallery.
//
// Imported by the route page (JSON-LD), the gallery component (rendering) and
// scripts/generate-sitemap.js (image sitemap entries). Keeping one copy is the
// point: these lists were previously duplicated across all three, and a drift
// would have made the structured data advertise images the page never shows.
//
// Order matters and is deliberate: landscape and portrait shots alternate so
// the CSS columns get a mix of tile heights rather than a run of one shape.
// Today that is nearly all portrait, so the columns come out even on their own;
// the masonry layout is here for the horizontal frames still to be shot.

export const images = [
  { alt: 'France players applauding the crowd at full time', src: '/sports/DSC02801-sports.webp', width: 1080, height: 1620, color: '#284828' },
  { alt: 'Following through on a serve at the US Open', src: '/sports/A7404155-sports.webp', width: 1080, height: 1620, color: '#285878' },
  { alt: 'A shot on goal in front of the Sevilla ultras', src: '/sports/DSC08221-sports.webp', width: 1080, height: 1620, color: '#283808' },
  { alt: 'France attacking into the far half', src: '/sports/DSC02677-sports.webp', width: 1620, height: 1080, color: '#587838' },
  { alt: 'Cyclist on the drops in a black PAS kit', src: '/sports/A7401777-sports.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Sevilla breaking forward, seen from the stands', src: '/sports/DSC08089-sports.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Young fans crowding the rail with oversized US Open balls', src: '/sports/A7404573-sports.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Carrying the ball out of midfield at the Sanchez-Pizjuan', src: '/sports/DSC08192-sports.webp', width: 1079, height: 1620, color: '#384818' },
  { alt: 'Rider out of the saddle, tattooed forearm on the hoods', src: '/sports/A7401783-sports.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Scramble in the six-yard box at a France international', src: '/sports/DSC02638-sports.webp', width: 1080, height: 1620, color: '#284818' },
  { alt: 'Sevilla stretching for a loose ball', src: '/sports/DSC08170-sports.webp', width: 1080, height: 1620, color: '#384818' },
  { alt: 'Stadium crowd spun into a blur', src: '/sports/DSC02645-sports.webp', width: 1080, height: 1620, color: '#483838' },
  { alt: 'A winger alone in the empty half', src: '/sports/DSC08299-sports.webp', width: 1080, height: 1620, color: '#283818' },
];
