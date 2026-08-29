// Single source of truth for the /events gallery.
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
  { alt: 'Party attendee moment', src: '/events/A7404355-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Two guests in evening dress at a reception', src: '/events/A7401169-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Celebration attendee portrait', src: '/events/A7404555-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Celebration gathering candid', src: '/events/A7405730-Enhanced-NR-events.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Event moment captured', src: '/events/A7404514-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Party gathering portrait', src: '/events/A7404632-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event attendee candid', src: '/events/A7407621-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Celebration moment portrait', src: '/events/A7207607-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Mom, Cita, and Tio', src: '/events/A7206591-events.webp', width: 1080, height: 1620, color: '#c8b8a8' },
  { alt: 'Event moment portrait', src: '/events/A7404868-events.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Party moment portrait', src: '/events/A7404780-events.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Event celebration detail', src: '/events/A7206528-events.webp', width: 1080, height: 1620, color: '#180808' },
  { alt: 'Celebration gathering portrait', src: '/events/A7404479-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event moment candid shot', src: '/events/A7206559-events.webp', width: 1080, height: 1620, color: '#c8b898' },
  { alt: 'Event attendee portrait', src: '/events/A7401014-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Party celebration candid', src: '/events/A7407559-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event moment photography', src: '/events/A7206574-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Cake', src: '/events/A7206529-events.webp', width: 1080, height: 1620, color: '#180808' },
  { alt: 'Event celebration detail', src: '/events/A7206604-Enhanced-NR-events.webp', width: 1080, height: 1620, color: '#e8e8e8' },
  { alt: 'Guest holding a glass of red wine at a candlelit dinner', src: '/events/A7401018-events.webp', width: 1080, height: 1620, color: '#f8e8e8' },
  { alt: 'All The Way Down', src: '/events/A7207740-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Celebration attendee candid', src: '/events/A7404717-events.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Party moment candid shot', src: '/events/A7405960-events.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Event photography by Anthony Freay', src: '/events/A7401037-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Glasses of white wine lined up on marble at a tasting', src: '/events/A7400802-events.webp', width: 1080, height: 1620, color: '#e8e8e8' },
  { alt: 'Event gathering moment', src: '/events/A7405071-events.webp', width: 1080, height: 1620, color: '#282828' },
  { alt: 'Party attendee portrait', src: '/events/A7206542-events.webp', width: 1080, height: 1620, color: '#685848' },
  { alt: 'Event celebration candid', src: '/events/A7207884-events.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Event attendee moment', src: '/events/A7206535-events.webp', width: 1080, height: 1620, color: '#d8d8c8' },
  { alt: 'Party gathering photography', src: '/events/A7405908-Enhanced-NR-events.webp', width: 1080, height: 1620, color: '#f8f8f8' },
  { alt: 'Party gathering photography', src: '/events/A7207716-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Party attendees candid', src: '/events/A7206546-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event moment captured', src: '/events/A7207859-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Party moment by photographer', src: '/events/A7207913-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event gathering candid shot', src: '/events/A7207820-events.webp', width: 1620, height: 1080, color: '#784848' },
  { alt: 'Event attendees candid', src: '/events/A7207907-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Celebration photography', src: '/events/A7208176-events.webp', width: 1620, height: 1080, color: '#d88898' },
  { alt: 'Event celebration moment', src: '/events/A7401031-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Maddie Miller Bday Cake', src: '/events/A7407589-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Gathering candid shot', src: '/events/A7208096-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event moment photography', src: '/events/A7207973-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event attendees by Anthony Freay', src: '/events/A7400919-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Celebration moment captured', src: '/events/A7206906-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event photography detail', src: '/events/A7400937-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event celebration detail', src: '/events/A7208033-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Two plates of seared scallops carried to the table', src: '/events/A7400918-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Celebration gathering photography', src: '/events/A7400963-events.webp', width: 1620, height: 1080, color: '#080808' },
];
