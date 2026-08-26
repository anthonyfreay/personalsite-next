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
  { alt: 'Event celebration moment', src: '/events/A7401031-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event celebration portrait', src: '/events/A7404835-color.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Party attendee moment', src: '/events/A7404355-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Party gathering photography', src: '/events/A7207716-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event photography by Anthony Freay', src: '/events/A7401037-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event attendees by Anthony Freay', src: '/events/A7400919-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Celebration attendee portrait', src: '/events/A7404555-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Celebration moment captured', src: '/events/A7206906-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event moment captured', src: '/events/A7404514-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Party gathering portrait', src: '/events/A7404632-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event photography detail', src: '/events/A7400937-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event attendee candid', src: '/events/A7407621-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Party moment by Anthony Freay', src: '/events/A7402659-color.webp', width: 1620, height: 1080, color: '#e8e8e8' },
  { alt: 'Celebration moment portrait', src: '/events/A7207607-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event gathering candid shot', src: '/events/A7207820-color.webp', width: 1620, height: 1080, color: '#784848' },
  { alt: 'Mom, Cita, and Tio', src: '/events/A7206591-color.webp', width: 1080, height: 1620, color: '#c8b8a8' },
  { alt: 'Event celebration detail', src: '/events/A7206528-color.webp', width: 1080, height: 1620, color: '#180808' },
  { alt: 'Celebration photography', src: '/events/A7208176-color.webp', width: 1620, height: 1080, color: '#d88898' },
  { alt: 'Party moment portrait', src: '/events/A7404780-color.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Event attendees moment', src: '/events/A7407714-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event attendee photograph', src: '/events/A7402521-color.webp', width: 1080, height: 1620, color: '#b8c8d8' },
  { alt: 'Party celebration captured', src: '/events/A7402648-color.webp', width: 1620, height: 1080, color: '#e8e8e8' },
  { alt: 'Celebration gathering portrait', src: '/events/A7404479-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event moment candid shot', src: '/events/A7206559-color.webp', width: 1080, height: 1620, color: '#c8b898' },
  { alt: 'Event moment photography', src: '/events/A7207973-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Jill and Kendall', src: '/events/A7401130-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Gathering candid shot', src: '/events/A7208096-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event attendee portrait', src: '/events/A7401014-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event celebration detail', src: '/events/A7208033-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Party celebration candid', src: '/events/A7407559-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'DJ Bolivar', src: '/events/A7206551-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Party moment by photographer', src: '/events/A7207913-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event moment photography', src: '/events/A7206574-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event attendees candid', src: '/events/A7207907-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Celebration attendee candid', src: '/events/A7404717-color.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Maddie Miller Bday Cake', src: '/events/A7407589-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'All The Way Down', src: '/events/A7207740-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event gathering moment', src: '/events/A7405071-color.webp', width: 1080, height: 1620, color: '#282828' },
  { alt: 'Event celebration photography', src: '/events/A7402701-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Party attendee portrait', src: '/events/A7206542-color.webp', width: 1080, height: 1620, color: '#685848' },
  { alt: 'Party gathering moment', src: '/events/A7401049-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event celebration candid', src: '/events/A7207884-color.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Event candid shot', src: '/events/A7402526-color.webp', width: 1620, height: 1080, color: '#281818' },
  { alt: 'Celebration moment captured', src: '/events/A7402743-color.webp', width: 1080, height: 1620, color: '#080808' },
  { alt: 'Event attendee moment', src: '/events/A7206535-color.webp', width: 1080, height: 1620, color: '#d8d8c8' },
  { alt: 'Abuela and Candeladia', src: '/events/A7206966-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Party gathering photography', src: '/events/A7405908-Enhanced-NR-color.webp', width: 1080, height: 1620, color: '#f8f8f8' },
  { alt: 'Event moment captured', src: '/events/A7207859-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Event moment portrait', src: '/events/A7404868-color.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Celebration gathering photography', src: '/events/A7400963-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Cake', src: '/events/A7206529-color.webp', width: 1080, height: 1620, color: '#180808' },
  { alt: 'Event celebration detail', src: '/events/A7206604-Enhanced-NR-color.webp', width: 1080, height: 1620, color: '#e8e8e8' },
  { alt: 'Party attendees candid', src: '/events/A7206546-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Party moment candid shot', src: '/events/A7405960-color.webp', width: 1080, height: 1620, color: '#181818' },
  { alt: 'Event celebration moment', src: '/events/A7207942-color.webp', width: 1620, height: 1080, color: '#080808' },
  { alt: 'Celebration gathering candid', src: '/events/A7405730-Enhanced-NR-color.webp', width: 1080, height: 1620, color: '#181818' },
];
