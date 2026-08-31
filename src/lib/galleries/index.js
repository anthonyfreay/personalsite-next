// Gallery manifests and the helpers shared by their consumers.
//
// Each manifest module exports the raw image list for one route. Consumers
// differ in what they need from it:
//   - route pages       -> `images` for JSON-LD (base src, no -hd)
//   - gallery components -> `withHd(...)` for rendering + lightbox
//   - generate-sitemap   -> `images` for <image:image> entries
//
// Keep the raw lists free of derived fields so each consumer opts in.

import { images as bw } from './bw.js';
import { images as live } from './live.js';
import { images as people } from './people.js';
import { images as cars } from './cars.js';
import { images as places } from './places.js';
import { images as events } from './events.js';
import { images as sports } from './sports.js';

/**
 * Add the high-resolution variant path for an image list.
 *
 * Every gallery image ships as a base file plus an `-hd` sibling
 * (e.g. `/bw/x.webp` and `/bw/x-hd.webp`). The grid renders the base `src` and
 * only the lightbox uses `hdSrc`, at full size: with `images.unoptimized` there
 * is no downscaling step, so an `-hd` tile would be downloaded at full weight.
 */
export const withHd = (images) =>
  images.map((image) => ({
    ...image,
    hdSrc: image.src.replace(/(\.\w+)$/, '-hd$1'),
  }));

export {
  bw,
  live,
  people,
  cars,
  places,
  events,
  sports,
};

/** Route path -> image list, for consumers that iterate every gallery. */
export const galleriesByRoute = {
  '/bw': bw,
  '/live': live,
  '/people': people,
  '/places': places,
  '/cars': cars,
  '/events': events,
  '/sports': sports,
};
