/**
 * How each route lays its gallery out — the single source of truth.
 *
 * Two consumers have to agree on this and previously did not:
 *
 *   1. The route's own `page.jsx` / `<Category>Client.jsx`, which renders the
 *      real gallery.
 *   2. `/curate`, whose whole value is being a faithful preview. It used to
 *      carry a private copy of the component mapping and knew nothing about
 *      per-route options, so when /sports gained `spanWideOnMobile` the
 *      preview silently stopped matching the page it was editing.
 *
 * Keeping the mapping here means a route cannot change layout without curate
 * following it. `component` picks which gallery component renders the route;
 * `options` are the props that component takes.
 */
export const GALLERY_LAYOUT = {
  bw: { component: 'grid', options: {} },
  live: { component: 'grid', options: {} },
  people: { component: 'grid', options: {} },
  /*
    Every masonry route uses the mobile row grid.

    Below 900px multicol renders two columns whose tiles are nearly all one
    height, so the rows line up and read as a grid - and a single shorter
    landscape then throws its column out of phase for the rest of the page.
    `spanWideOnMobile` swaps multicol for a real row grid and gives landscapes
    the full width, which fixes the phase and shows the wide frames wide.

    It is safe everywhere because `add-photos` accepts 3:2 only, so every tile
    in every gallery is 3:2: a row holds either two identical portraits or one
    spanning landscape, and a mixed-height row cannot occur. An earlier version
    of this file kept the option off for cars/places/events on the grounds that
    a row would be as tall as its tallest tile - that was wrong about the
    content.

    The real cost is height. A landscape that used to sit half-width inside a
    column now takes a row of its own, so /places (16 landscapes in 35) and
    /events (14 in 58) scroll noticeably longer on a phone.
  */
  cars: { component: 'masonry', options: { spanWideOnMobile: true } },
  places: { component: 'masonry', options: { spanWideOnMobile: true } },
  events: { component: 'masonry', options: { spanWideOnMobile: true } },
  sports: { component: 'masonry', options: { spanWideOnMobile: true } },
};

/** Layout options for one route, safe for galleries with nothing special. */
export const layoutOptions = (gallery) => GALLERY_LAYOUT[gallery]?.options ?? {};
