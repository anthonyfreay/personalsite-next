export const SITE_NAME = 'Anthony Freay';
export const SITE_TITLE = 'Anthony Freay | Photographer & Software Engineer';
export const SITE_DESCRIPTION = 'NYC-based photographer and software engineer. Explore portraits, concerts, and events captured by Anthony Freay.';
export const SITE_URL = 'https://www.anthonyfreay.com';
export const DEFAULT_IMAGE_PATH = '/covers/live_cover.jpg';
export const DEFAULT_IMAGE_ABS = `${SITE_URL}${DEFAULT_IMAGE_PATH}`;
export const DEFAULT_TWITTER = '@anthonyfreay';
export const GA_MEASUREMENT_ID = 'G-5RYLFVDX71';

/*
  `label` is the navigation name: the footer, the /work tile captions and the
  404 list all render it, uppercased by their own CSS.

  `heading` is optional and overrides the *on-page* gallery title only - the h1
  and the navbar's centred copy of it. It is rendered verbatim, casing and all,
  so a route can present itself differently from how it is navigated to.
*/
export const ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/work', label: 'Work' },
  { path: '/live', label: 'Live', heading: 'live music' },
  { path: '/bw', label: 'B & W' },
  { path: '/people', label: 'People' },
  { path: '/places', label: 'Places' },
  { path: '/cars', label: 'Cars' },
  { path: '/events', label: 'Events' },
  { path: '/contact', label: 'Contact' },
];
