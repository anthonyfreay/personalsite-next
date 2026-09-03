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
  { alt: 'Two guests in black tie with glasses of red', src: '/events/A7408052-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Plated course beside a wine pairing flight', src: '/events/A7400997-events.webp', width: 1080, height: 1620, color: '#e8e8e8' },
  { alt: 'Kitchen brigade plating the main course', src: '/events/A7409291-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Guests toasting across the table at a wine dinner', src: '/events/A7409279-events.webp', width: 1620, height: 1080, color: '#181818' },
  { alt: 'Three guests outside Lincoln Center at night', src: '/events/A7408112-events.webp', width: 1080, height: 1620, color: '#181808' },
  { alt: 'Bartender pouring red wine across a row of glasses', src: '/events/A7407962-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Bouchard Pere & Fils reds lined up for the pairing', src: '/events/A7409264-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Three guests at a gala reception', src: '/events/A7407642-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Two plates of seared scallops carried to the table', src: '/events/A7400918-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Long table in conversation beside the tree', src: '/events/A7407886-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Celebration gathering portrait', src: '/events/A7404479-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Party gathering portrait', src: '/events/A7404632-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Party celebration candid', src: '/events/A7407559-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Party moment portrait', src: '/events/A7404780-events.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Event celebration moment', src: '/events/A7401031-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event celebration detail', src: '/events/A7206528-events.webp', width: 1080, height: 1620, color: '#180808' },
  { alt: 'Event celebration candid', src: '/events/A7207884-events.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Celebration moment portrait', src: '/events/A7207607-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Gathering candid shot', src: '/events/A7208096-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event attendee portrait', src: '/events/A7401014-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Celebration attendee candid', src: '/events/A7404717-events.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Two guests in evening dress at a reception', src: '/events/A7401169-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event gathering moment', src: '/events/A7405071-events.webp', width: 1080, height: 1620, color: '#282828' },
  { alt: 'Event attendees by Anthony Freay', src: '/events/A7400919-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event photography by Anthony Freay', src: '/events/A7401037-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Glasses of white wine lined up on marble at a tasting', src: '/events/A7400802-events.webp', width: 1080, height: 1620, color: '#e8e8e8' },
  { alt: 'Celebration gathering photography', src: '/events/A7400963-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Couple posing at a black-tie gala', src: '/events/A7407671-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Champagne poured into a guest\'s glass', src: '/events/A7407745-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Celebration moment captured', src: '/events/A7206906-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Server carrying a tray of white wine', src: '/events/A7407945-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Scallops plated in a bisque foam', src: '/events/A7409196-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Server carrying a tray of canapes', src: '/events/A7407629-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Crudo plated on blue and white ceramics', src: '/events/A7407851-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Guest holding a glass of red wine at a candlelit dinner', src: '/events/A7401018-events.webp', width: 1080, height: 1620, color: '#f8e8e8' },
  { alt: 'Event moment captured', src: '/events/A7404514-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event attendee candid', src: '/events/A7407621-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event moment photography', src: '/events/A7207973-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Party attendee moment', src: '/events/A7404355-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Kitchen sending plates down the pass', src: '/events/A7409238-events.webp', width: 1080, height: 1620, color: '#382818' },
  { alt: 'Host speaking to the room at a holiday dinner', src: '/events/A7407819-events.webp', width: 1080, height: 1620, color: '#783808' },
  { alt: 'Bouchard Beaune du Chateau whites before service', src: '/events/A7409268-events.webp', width: 1080, height: 1620, color: '#e8e8e8' },
  { alt: 'Event moment portrait', src: '/events/A7404868-events.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Party gathering photography', src: '/events/A7207716-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Celebration attendee portrait', src: '/events/A7404555-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Friends together at a birthday dinner', src: '/events/A7400472-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Valentine\'s table set with candles and paper hearts', src: '/events/A7400370-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event photography detail', src: '/events/A7400937-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Party gathering photography', src: '/events/A7405908-Enhanced-NR-events.webp', width: 1080, height: 1620, color: '#f8f8f8' },
  { alt: 'Bottles of Kistler Hyde Vineyard Chardonnay', src: '/events/A7400954-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Burrata plated across a run of patterned bowls', src: '/events/A7407848-events.webp', width: 1620, height: 1080, color: '#d8d8c8' },
  { alt: 'Couple at a black-tie dinner', src: '/events/A7401165-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Party moment candid shot', src: '/events/A7405960-events.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Maddie Miller Bday Cake', src: '/events/A7407589-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Guests in black tie with champagne', src: '/events/A7407626-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Party attendee portrait', src: '/events/A7206542-events.webp', width: 1080, height: 1620, color: '#685848' },
  { alt: 'All The Way Down', src: '/events/A7207740-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'A chef reaching across rows of blue and white plates of salmon crudo in an open kitchen', src: '/events/A7407857-events.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Party moment by photographer', src: '/events/A7207913-events.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Three guests posing together at a party under warm hanging lights', src: '/events/A7400648-events.webp', width: 1080, height: 1620, color: '#080808' },
];
