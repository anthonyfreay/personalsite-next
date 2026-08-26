// Single source of truth for the /cars gallery.
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
  {
    alt: 'Luxury car detail shot',
    src: '/cars/A7406517-Enhanced-NR-color.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACQAQCdASoIAAUABUB8JaQAApe1EEAA/uXw1qrYRRyFLL9quUgAAA==',
  },
  {
    alt: 'Sports car in color',
    src: '/cars/A7409382-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADQAQCdASoIAAwABUB8JZACw7D0MLPRAAD+7BEoIjiwD2nqZcpd/8Gd8Cy6q4uoBIExXZR2bgGS8HaUbeYAAA==',
  },
  {
    alt: 'Modern automobile design',
    src: '/cars/A7409342-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoIAAwABUB8JQBOgB6Jfpc0AAD+z3Fa4Yeyp1vOHeUTUgMlF5ycdHLlMQIkOgmmgAA=',
  },
  {
    alt: 'Classic car in black and white',
    src: '/cars/DSC04341-bw.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACwAQCdASoIAAwABUB8JaQAAqsRsYQAAP6jdDpMniFyVHaGbqoP05gL+VqxHMRmA1cmx7sxqFWlc3QAAAA=',
  },
  {
    alt: 'Vintage car photography',
    src: '/cars/A7200465-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADwAQCdASoIAAwABUB8JYwAAxf8U1DVkMAA/uRNkV2C/MydDSpvJ67IUt27idnYHawM88BOcAr2y+7r+AAAAA==',
  },
  {
    alt: 'Classic automobile photography',
    src: '/cars/A7405676-color.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACwAQCdASoIAAUABUB8JYwCdADzesjgAPRYuxPs3FE+GikWGSY9tkAA',
  },
  {
    alt: 'Luxury vehicle detail',
    src: '/cars/A7200477-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADwAQCdASoIAAwABUB8JagCdAD6GdgT9IAA/tPAv08ZmssF7aLs5Sdj1Mtm0xbyLyL9i4K2P1X/JvKBKoAAAA==',
  },
  {
    alt: 'Automotive photography',
    src: '/cars/A7200475-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAQCdASoIAAwABUB8JYwCdAD0TFfzGwAAzev1jfUK2jGuECagUCpyRmL7B4X0FCvfqKKf9riWAA==',
  },
  {
    alt: 'Car in monochrome',
    src: '/cars/A7406716-bw.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAABwAQCdASoIAAwABUB8JaQAApWGAAD+QMTgODHahL9T4s9Zhfdn8CLvOWgAAA==',
  },
  {
    alt: 'Classic automobile portrait',
    src: '/cars/A7200462-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAACwAQCdASoIAAwABUB8JaQAAppIkvgAAM4rfE5aOBkZ0YVQY3ziHu9ESZ8XfL7uHlIAAA==',
  },
  {
    alt: 'Automotive photography by Anthony Freay',
    src: '/cars/A7204618-color.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoIAAUABUB8JZwAAvdokT8AAOJnIipeNULe3ph6hnEnolCKAAA=',
  },
  {
    alt: 'Vehicle detail shot',
    src: '/cars/A7200488-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAAAwAgCdASoIAAwABUB8JaACdAEfbKb76S5WAAD+xgIbgOEMICgpg1ZFbqi7vsKrFCMC3eKGq1e9KbHSRFD/zGud9Gl/4VAA',
  },
  {
    alt: 'Modern car photography',
    src: '/cars/A7408915-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACwAQCdASoIAAwABUB8JYgAAueBggQAAP7r5k4JQ0EjoVjNH6rIcQAA',
  },
  {
    alt: 'Automotive detail by Anthony Freay',
    src: '/cars/A7406778-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAADQAQCdASoIAAwABUB8JaQAAuc/DJGHoAD+8NBG8TeuMjvgpkaVFj6wAAA=',
  },
  {
    alt: 'Black and white automotive',
    src: '/cars/A7406726-bw.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAACwAQCdASoIAAwABUB8JaQAAucKjTgAAP7ug0AvamYm0M2YpdcQhIwGZVmmt018AAA=',
  },
  {
    alt: 'Black and white car portrait',
    src: '/cars/A7406721-bw.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAACQAQCdASoIAAUABUB8JaQAAlJ6bAAA/tGv/tdEZieEu094KDcE1Nbn4AAAAA==',
  },
  {
    alt: 'Car in natural light',
    src: '/cars/A7406734-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAACwAQCdASoIAAwABUB8JYwCw7DzVKYAAP7sKaTmdaUng5DeCJJx+Zn37UMt8VbAAAA=',
  },
  {
    alt: 'Monochrome car portrait',
    src: '/cars/A7406717-bw.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAABwAQCdASoIAAwABUB8JaWDrAGIAAD+8AT6lFJ510G19iQwL42jfUgAAAA=',
  },
  {
    alt: 'Automotive photography detail',
    src: '/cars/A7209958-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADQAQCdASoIAAwABUB8JYwCdAD0l+QisAD1ewzAmvcUvYqlloEChLC8qhWMtitXdizHgPKnZMbYYjQAAAA=',
  },
  {
    alt: 'Classic car in color',
    src: '/cars/A7200461-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADwAQCdASoIAAwABUB8JZwAAucbSjGSqwAA/uEFPuXwJvQo1mVbLcGkuy7oMYHaEBAAAA==',
  },
];
