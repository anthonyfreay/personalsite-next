// Single source of truth for the /places gallery.
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
    alt: 'Landscape photography',
    src: '/places/A7407286-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACwAQCdASoIAAUABUB8JQBOgCIGqGc4AP7c99LXAMO74Ib+EoBznsAA',
  },
  {
    alt: 'Beams',
    src: '/places/A7202190-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAQCdASoIAAwABUB8JZQCdAEOJmOEAAD+8qLSKUsZ1wVjbCMsj2bIbWKp/3vniRAAAA==',
  },
  {
    alt: 'Tree',
    src: '/places/A7406558-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAACwAQCdASoIAAwABUB8JZQAAptqEe1gAP7pH4UDYtrTcVZ8uOxeh3JoGQdN4yhAAAA=',
  },
  {
    alt: 'Travel photography',
    src: '/places/A7405233-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAADQAQCdASoIAAUABUB8JQBdgCKUi1RUIADibvN3av8rnK1AIv2SLgAA',
  },
  {
    alt: 'Coney Island Rollercoaster',
    src: '/places/RX706719-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAQCdASoIAAwABUB8JaACsAD5jxwZBQAA/mSMzcsRPEeRDbJOll8cKeyCEyQFfAfsRhEfSuAAAA==',
  },
  {
    alt: 'Scenic landscape',
    src: '/places/A7407228-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAACQAQCdASoIAAUABUB8JYwAAuUt8gAA/kgH7CfOJPJKnIsJeAA=',
  },
  {
    alt: 'Charleston',
    src: '/places/A7406615-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACQAQCdASoIAAwABUB8JZwAAppQfQAA/oQK6OdTis5LTEFKOJ2Lh9StzciOgv0nUvMWupyYEAA=',
  },
  {
    alt: 'Nature photography',
    src: '/places/RX703948-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAQCdASoIAAUABUB8JbACdAEO2pabgADxPXmn+R9tM6uFzEqZQyPP/FPZAB3cnVrQAA==',
  },
  {
    alt: 'Queens',
    src: '/places/A7202338-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAACwAQCdASoIAAwABUB8JZQAAuWhtoAAAPyPzGTmlQ2HoVElqV6q1swwbV3Bhb+QEZigAA==',
  },
  {
    alt: 'Galapagos Summer',
    src: '/places/A7401731-Enhanced-NR-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAACwAQCdASoIAAwABUB8JQBdgB6F0VEAAP7n9Hnb+wtPxBvgNr4tmh5YBzbzGN4rPe8SAA==',
  },
  {
    alt: 'Landscape detail',
    src: '/places/A7204930-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAACwAQCdASoIAAUABUB8JaACdAEOJM3oAMtO1FFhyohbbTG+ADHlwHCwW9bEn8hyAAA=',
  },
  {
    alt: 'Multnomah Falls',
    src: '/places/A7204120-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAQCdASoIAAwABUB8JQBOgCPtx5FbzYAAzjlNSS/WbMQX8hrU9/pSijqCFAwwt45mq1W8ZcwAAA==',
  },
  {
    alt: 'Travel moment',
    src: '/places/RX703316-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAQCdASoIAAUABUB8JQBOgCHHfhYAAPfeihZhr5r0q+G3PfeCTgagi5OG/AAA',
  },
  {
    alt: 'San Francisco Summer',
    src: '/places/A7205351-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADwAQCdASoIAAwABUB8JZgCdAEO4caL1oAA95jJ39cHI0kp28RW/Smncg+AyuWQ2HwAAA==',
  },
  {
    alt: 'Street photography',
    src: '/places/RX702154-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAADQAQCdASoIAAUABUB8JZAC7AEUnwBKAAD+sjFUUQOI4U75CyeYP+2yAAA=',
  },
  {
    alt: 'Catskills Lake',
    src: '/places/A7206286-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAQCdASoIAAwABUB8JagCdAD0ocEuIAAA/psxld4WVCxwfsaeAgGgOvUn5O81ahoyXy1f4s3FD3R4AAA=',
  },
  {
    alt: 'Colorful landscape',
    src: '/places/A7205360-color.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACQAQCdASoIAAUABUB8JZQAAppikcAA/sjzWjFOByaUBtIJ5BqDgAAA',
  },
  {
    alt: 'Ice Rink',
    src: '/places/A7202369-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADQAQCdASoIAAwABUB8JZQAAp1aEhksAAD+6ifJnWvQEwGK8UOnkBc/HZEtH+bMv4F7gAAA',
  },
  {
    alt: 'Paradise',
    src: '/places/A7407416-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoIAAwABUB8JQBOgCHerVbCAAD+tgK8wBfQv/MJUPC+jLGNs+gaQ+EWQ0IcJsQAAAA=',
  },
  {
    alt: 'Travel photography by Anthony Freay',
    src: '/places/RX706732-color.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAACwAQCdASoIAAUABUB8JYwCdADZkQoAAP7c4SFEDp76dQfNQqxO09MxD7wQAA==',
  },
  {
    alt: 'Columbus Circle on a Rainy Weekday',
    src: '/places/DSC09254-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAADQAQCdASoIAAwABUB8JZwAAupxIRx4AAD0bYhHL0UAQoLCdhtQ8wAA',
  },
  {
    alt: 'Scenic photography',
    src: '/places/A7405906-color.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADQAQCdASoIAAUABUB8JQBOgCLJ0F04AAD+0bVEVSYnpm1Mxnkzq8/Eusk6+AAA',
  },
  {
    alt: 'Pigeon Guillemot on Oregon Coast',
    src: '/places/A7204896-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAACwAQCdASoIAAwABUB8JQBOgB5NFwAAAPxyMkXvC57a9OgH+7QRp+A86/qAAA==',
  },
  {
    alt: 'Landscape composition',
    src: '/places/A7407432-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADQAQCdASoIAAUABUB8JZQCdAEOuwWOAADwO+nFuKoMyUXv3AArXQ7bNs9mwAAA',
  },
  {
    alt: 'City Stacks',
    src: '/places/A7202361-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACwAQCdASoIAAwABUB8JZQAAp2pyk2AAP6psePQU1vEfnebjLRD5M008nqrdedIjszOz5XWAAA=',
  },
  {
    alt: 'Travel destination',
    src: '/places/A7206508-Edit-scapes.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAADwAQCdASoIAAUABUB8JYwCdAEUn8kM/AAAzKJPgr35Lq2Z4pyOigAA',
  },
  {
    alt: 'Mom\\\\\\\\\\\\\\\'s Apartment',
    src: '/places/RX702292-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAACwAQCdASoIAAwABUB8JQAAU7MKseoAAP3Gm16LDfG+2unxpRWZtW8e8PVWFgriwMk6KNhIF/lntYc29a0QAA==',
  },
  {
    alt: 'JETski',
    src: '/places/A7407477-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoIAAwABUB8JbACdADzVXoAAPehxRsB/j3pQoLnapwOWZwPMgA=',
  },
  {
    alt: 'Nature landscape',
    src: '/places/RX702886-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACQAQCdASoIAAUABUB8JZQAAp0LKOAA/nNA3zjbIh2Th3tLGDFBzMAA',
  },
  {
    alt: 'San Francisco street sign',
    src: '/places/A7205014-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAQCdASoIAAwABUB8JYwCdAEfbKf1FYAA+RNFPhlWVKC4jk3yxFC+2wn9G9GyZBV8a1TLQoZGML4WgAA=',
  },
  {
    alt: 'Scenic view',
    src: '/places/A7407357-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoIAAUABUB8JQBOgB6GOPzwAPyJPc/ggR9Q/xHkXu2LMg5gAAA=',
  },
  {
    alt: 'Teleferico Quito',
    src: '/places/RX703340-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADQAQCdASoIAAwABUB8JZgCdAD0RuXgAAD+3+ajw5/rJQdtTTHbiZhoT0VZ0HHHnrpSy0AA',
  },
  {
    alt: 'Street scene',
    src: '/places/RX702276-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACwAQCdASoIAAUABUB8JZwAAupb1YhAAPpMY8WFel+IwOOdk+o4AA==',
  },
  {
    alt: 'Sitting in the Sun',
    src: '/places/A7407441-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAACwAQCdASoIAAwABUB8JQBOgB8uvV4AAP7U50piUyorStDCzFSgzLQJa2ouQidDOammAAAA',
  },
  {
    alt: 'Landscape photography detail',
    src: '/places/A7406572-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACwAQCdASoIAAUABUB8JZwAAqsbCVJAAP7pK/W2gqQ7IJE8EgEAAA==',
  },
  {
    alt: 'Muir Woods',
    src: '/places/A7205161-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAACwAQCdASoIAAwABUB8JYgAAp0tk/oAAP7loQ65X5DNhQfFFzDlW1OtIELuKgwziJ2i/lcnOTQAAA==',
  },
  {
    alt: 'San Francisco Sunset',
    src: '/places/A7205308-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADwAQCdASoIAAwABUB8JbACdAEO4b1gIAAA/sOAvNYamS7QzkqI2Q4ztcbn8JqymAAAAA==',
  },
  {
    alt: 'HDR landscape',
    src: '/places/A7204586-HDR-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAACQAQCdASoIAAUABUB8JQBdgBsyHHAA/VPpeMDyNVosUq7AAagcWS7VRZwAAA==',
  },
  {
    alt: 'Kids in Galapagos',
    src: '/places/A7401603-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAABwAQCdASoIAAwABUB8JQAAU0lWYADeZzae3FMp+IiWMvgUQ6A7X22IfWuqOpPM7iF2w2iGVZvfYmNe1XLAAAAA',
  },
  {
    alt: 'Travel photography moment',
    src: '/places/A7401638-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoIAAUABUB8JYgCdAD0HQ7YAPY6h0trQZUDg8R0OBQ7J+iMAAA=',
  },
  {
    alt: 'Pretty Oregon Coast line',
    src: '/places/A7204601-HDR-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAADQAQCdASoIAAwABUB8JYwAAucKnVUVgAD+52WxyzOJpNTDGLEfllpI/ohAAA==',
  },
  {
    alt: 'Colorful travel scene',
    src: '/places/A7405944-color.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACQAQCdASoIAAUABUB8JZQAAudZtgAAzfKyCoFtns8MymD4l4AAAA==',
  },
  {
    alt: 'Kids playing in the Sand',
    src: '/places/A7407388-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAADwAQCdASoIAAwABUB8JagCdAEOPRVkiAAA+l4+d6F9XmiBCIYEji2WX4AAAA==',
  },
  {
    alt: 'Scenic landscape photography',
    src: '/places/A7407519-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAACwAQCdASoIAAUABUB8JQBOgB5P/40AAMxVb0a6kBo0NYml4kKwBEMCzFQAAA==',
  },
  {
    alt: 'Sea Lions on the Oregon Coast',
    src: '/places/A7204910-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAQCdASoIAAwABUB8JYwAAp227WdAAADiBWM3+j1/TBCXn29oVh4frtojalqkFYAAAA==',
  },
  {
    alt: 'Garret Mountain Basketball Court',
    src: '/places/A7209983-Edit-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAQCdASoIAAwABUB8JZgCdAEU9Gp8oAD+3rhdxlXrctQ6Bl/JoB0hUxked+gwxAAAAA==',
  },
  {
    alt: 'Street photography detail',
    src: '/places/RX702351-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACQAQCdASoIAAUABUB8JZwAAuWt3CwA/f0jDzxjjBEcJtwoiMcR70AA',
  },
  {
    alt: 'Volcano in Ecuador',
    src: '/places/A7402155-HDR-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAQCdASoIAAwABUB8JYgAAuaWQdyAAAD+5ygHQoaMc8WdwWxcXRopiGJ3F0z9xwAAAA==',
  },
  {
    alt: 'Travel destination photography',
    src: '/places/A7405591-color.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRi4AAABXRUJQVlA4ICIAAACQAQCdASoIAAUABUB8JZQAAudFtmAA/tzt9HMLnkvlEAAA',
  },
  {
    alt: 'Guayaquil Highway',
    src: '/places/RX702346-scapes.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAAAQAgCdASoIAAwABUB8JZgCdAD0S5tZqmBAAMqRwYAb1RKfzlrTjv9KprEj3ebga8MYxiSpeuIgIq4AAAA=',
  },
  {
    alt: 'Landscape edit',
    src: '/places/A7406556-Edit-scapes.webp',
    width: 1080, height: 720,
    blurDataURL:
      'data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAABwAQCdASoIAAUABUB8JZQC7AFAAAD+7oEzxz4JDm+O3sBoAAA=',
  },
  {
    alt: 'Tropical landscape',
    src: '/places/A7401732-Enhanced-NR-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAACwAQCdASoIAAwABUB8JZQAApxUyCVQAP7q25huob5Z0uoTnA5Agryb0MeEAA==',
  },
];
