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
  cars: { component: 'masonry', options: {} },
  places: { component: 'masonry', options: {} },
  events: { component: 'masonry', options: {} },
  /*
    /sports is 32 portrait tiles and 4 landscape, all portraits at one
    identical height. Below 900px that renders as a strict two-column grid
    whose rows align, so a single shorter landscape throws its column out of
    phase for the rest of the page. `spanWideOnMobile` swaps the multicol
    masonry for a row grid there and gives landscapes the full width.

    Deliberately not the default: /places is 16 landscapes in 35, where a row
    grid would make every row as tall as its tallest tile.
  */
  sports: { component: 'masonry', options: { spanWideOnMobile: true } },
};

/** Layout options for one route, safe for galleries with nothing special. */
export const layoutOptions = (gallery) => GALLERY_LAYOUT[gallery]?.options ?? {};
