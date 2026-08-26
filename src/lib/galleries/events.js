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
  {
    alt: 'Event celebration moment',
    src: '/events/A7401031-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAQCdASoIAAUABUB8JZQAAxZTW4kAAP7lvUKI1vQi+SnUwf5TWyedgFUNkAAA',
  },
  {
    alt: 'Event celebration portrait',
    src: '/events/A7404835-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADQAQCdASoIAAwABUB8JQBOgBeG8PRwAAD+3ggDpgVqr1zwAruuBwU2f54MYY1D7lCAGevdbBvFoPY2gAA=',
  },
  {
    alt: 'Party attendee moment',
    src: '/events/A7404355-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAQCdASoIAAwABUB8JQBOgB6XczU8DAAA/oY9epb9WrEi7dOqZOCikIUydborsNfqnU2odOS2h/rgAAA=',
  },
  {
    alt: 'Party gathering photography',
    src: '/events/A7207716-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAACwAQCdASoIAAUABUB8JYwAApxXrlYAAP7Sjq0apFquSWypbX+AXLjmxFigAA==',
  },
  {
    alt: 'Event photography by Anthony Freay',
    src: '/events/A7401037-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADwAQCdASoIAAwABUB8JYgCw7DyBSCyFgAA/ubMN8pgYUixgXxyxGM3wbMIeU7XGp52IgbwtmDLeaWLBz/prLyYCfc3CAAA',
  },
  {
    alt: 'Event attendees by Anthony Freay',
    src: '/events/A7400919-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADQAQCdASoIAAUABUB8JZACdAEXfAo/wAD+5b9tK9HQleeY4WTdLWBQGksYzZCMAAA=',
  },
  {
    alt: 'Celebration attendee portrait',
    src: '/events/A7404555-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAQCdASoIAAwABUB8JYgCdADdIehJiAD+qdGsE/J/RAR3brOOjrP9VuDIityNSL8AAA==',
  },
  {
    alt: 'Celebration moment captured',
    src: '/events/A7206906-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAACQAQCdASoIAAUABUB8JZQAApplHeAA/qL4hjw5p0el1mTk0zo7HbP0ATYAAA==',
  },
  {
    alt: 'Event moment captured',
    src: '/events/A7404514-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADQAQCdASoIAAwABUB8JYwC7AD0pMdQ7AD+zO2Mn52rOu2oj2mwR7odxIIL8NFN9FGgHVDiEu2brpL4AAA=',
  },
  {
    alt: 'Party gathering portrait',
    src: '/events/A7404632-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADwAQCdASoIAAwABUB8JYgCdADdqpWJMIAA/tEXj8JP7dFaabiamfRdVwdaWqluumWHScnBqzM5/hKnfBQAAA==',
  },
  {
    alt: 'Event photography detail',
    src: '/events/A7400937-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAQCdASoIAAUABUB8JYwCdAD0XgoCwAD+rZfbNnkd8gvWAf0Ez3mkipouaSC1GgAAAA==',
  },
  {
    alt: 'Event attendee candid',
    src: '/events/A7407621-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADQAQCdASoIAAwABUB8JZwAAvhyixzogAD+7BCRY3m5GUKNyTIn7lpSEkWCFYqogAA=',
  },
  {
    alt: 'Party moment by Anthony Freay',
    src: '/events/A7402659-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACQAQCdASoIAAUABUB8JZQAApxXsVAA4k9f8udkA1/BM0r0Jbl4/ngAAAA=',
  },
  {
    alt: 'Celebration moment portrait',
    src: '/events/A7207607-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAACwAQCdASoIAAwABUB8JYwC7ADx6YZgAP7xc0J7G4fro37PXjiM9njoK5gV6VcWc6rxjc5AVgAAAA==',
  },
  {
    alt: 'Event gathering candid shot',
    src: '/events/A7207820-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAACwAQCdASoIAAUABUB8JaACdAD0eqnsAP6G8mP3esgunbezfi+GnwBdVz/OV7zCwAA=',
  },
  {
    alt: 'Mom, Cita, and Tio',
    src: '/events/A7206591-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAQCdASoIAAwABUB8JQBOgB5wAoRgAAD+loAZoCdcbCdxAeftZc2ZQaf4af4Ib2qAAA==',
  },
  {
    alt: 'Event celebration detail',
    src: '/events/A7206528-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAACwAQCdASoIAAwABUB8JaACdADzVLQAAP6qr6WG234QFuQLs4lOrD13ADRBHJRZ24Szko+02iQ/abjOAZu9TGTPKPIPAAAA',
  },
  {
    alt: 'Celebration photography',
    src: '/events/A7208176-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAACwAQCdASoIAAUABUB8JZgCdADZkL0AAP3wMdrLHni+EOXnpwNhbx5FO7Sr1eVwAAA=',
  },
  {
    alt: 'Party moment portrait',
    src: '/events/A7404780-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADwAQCdASoIAAwABUB8JZQCdADconMxaAAA/tx1h/2jvaLJDrGT5+Ubmle3oCituG142iIvMag5sFB1MyAAAA==',
  },
  {
    alt: 'Event attendees moment',
    src: '/events/A7407714-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAACQAQCdASoIAAUABUB8JZQAApplHeAA/t2p4bNLG8LarQKaPnD28XaAr5SAAA==',
  },
  {
    alt: 'Event attendee photograph',
    src: '/events/A7402521-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADQAQCdASoIAAwABUB8JZQCdAD0VwJ8AAD8j7hbIPlxBUrcnV+YLG0irurMM8bIFPV9YGQ/EHigh/60GgA=',
  },
  {
    alt: 'Party celebration captured',
    src: '/events/A7402648-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoIAAUABUB8JZQAAxZYYLLAAPk0m5g1n6oZXrQzN1oOm8QOAAA=',
  },
  {
    alt: 'Celebration gathering portrait',
    src: '/events/A7404479-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADwAQCdASoIAAwABUB8JYwCdAEfa7sVGDAA/tDc4tjufcluGMg/H+wFzXB1SwIAAAA=',
  },
  {
    alt: 'Event moment candid shot',
    src: '/events/A7206559-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAAAQAgCdASoIAAwABUB8JbACdAEe1WYkmBYAAP5baLSC2zM4/Y+swYyHzKaPE+uQhKj26tICfephMsoA',
  },
  {
    alt: 'Event moment photography',
    src: '/events/A7207973-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADQAQCdASoIAAUABUB8JaACdAEUmfdOAAD+0O865AHLFFCzzYehvRl0isb6GdQxRpdw+AAA',
  },
  {
    alt: 'Jill and Kendall',
    src: '/events/A7401130-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADQAQCdASoIAAwABUB8JQBOgB5vneTabAD9U5LBaXYO8uVvLLXRCnN/ThUYu3aipPGLS8hSy0dhG/lgAAA=',
  },
  {
    alt: 'Gathering candid shot',
    src: '/events/A7208096-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAQCdASoIAAUABUB8JQBdgB6GMUaAAP5A+CLY946vbwK11T2DhsShKH6xqAAA',
  },
  {
    alt: 'Event attendee portrait',
    src: '/events/A7401014-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADwAQCdASoIAAwABUB8JQBOgCHcypM0DAAA/kCcGBzBkDocnJMOhLPe9alky98Y0zvg1eYPsHT6j8BsW03UbyYAAAA=',
  },
  {
    alt: 'Event celebration detail',
    src: '/events/A7208033-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAACQAQCdASoIAAUABUB8JYwAAp0LLcAA/sG4IC8/my7VRybWo1guZiRwrAAAAA==',
  },
  {
    alt: 'Party celebration candid',
    src: '/events/A7407559-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoIAAwABUB8JQBdgCHctASPiAD+7L5Rp3NAQYqdmUr4FtbvyEf4AvA3smccml+QAAA=',
  },
  {
    alt: 'DJ Bolivar',
    src: '/events/A7206551-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAAAQAgCdASoIAAwABUB8JYwCdADdlfJ1DOAAAP7enrEy0dh5B3taB2PWz8zCzKOP9wecLKIGuxJLZO8R2kAAAA==',
  },
  {
    alt: 'Party moment by photographer',
    src: '/events/A7207913-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoIAAUABUB8JYwC7ADx+IRAAP7RyqZHTNFDtra2MBrYRMNAAAA=',
  },
  {
    alt: 'Event moment photography',
    src: '/events/A7206574-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADwAQCdASoIAAwABUB8JQBOgB6SIBaf4AAAzjgZkqLaOmnckTSgUa06iHj3Ef/0ObOkfezZKzsH4AAA',
  },
  {
    alt: 'Event attendees candid',
    src: '/events/A7207907-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACwAQCdASoIAAUABUB8JbACdADW1vcAAPv1Hy5ojHHFBPs9muLSFqPuI9uo5cbQPBupaopwAAA=',
  },
  {
    alt: 'Celebration attendee candid',
    src: '/events/A7404717-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADQAQCdASoIAAwABUB8JZgCdAD0twr6eAD+g20fHmhFvHnu9qNohHh2V7TY+/AgAAA=',
  },
  {
    alt: 'Maddie Miller Bday Cake',
    src: '/events/A7407589-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAACwAQCdASoIAAUABUB8JQBYdh5P38AAAP7Q+LJQnPj1zLMYYgsDG9Vhxq1am/juX8DxnQeZ7kAAAA==',
  },
  {
    alt: 'All The Way Down',
    src: '/events/A7207740-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoIAAwABUB8JaACw7ERHwI68QAA/u9kd6l8zGH122GjpGcvmB4Td1XGi1weQAAA',
  },
  {
    alt: 'Event gathering moment',
    src: '/events/A7405071-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADwAQCdASoIAAwABUB8JbACdAD0TxBZJ0AA7+vrOs8Wo+FtIGKgRAFpaWyr0CAeBcOmpUfS0b5HAAAA',
  },
  {
    alt: 'Event celebration photography',
    src: '/events/A7402701-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAQCdASoIAAUABUB8JZwAAp10t/EAAP4nIDrRdP7AQSMgg9ZGZrxdAAA=',
  },
  {
    alt: 'Party attendee portrait',
    src: '/events/A7206542-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADQAQCdASoIAAwABUB8JagCdADzg1FxAAD+0d9DoWEzqV7DYhs4ccqvfsjp09aNSpZCDtxmD6tBnKKkRUAAAA==',
  },
  {
    alt: 'Party gathering moment',
    src: '/events/A7401049-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAACwAQCdASoIAAUABUB8JQBOgCHRwmpAAP7Q/X3ty5Fx4VC2xZ6vaOfF7BkIvKSZAAA=',
  },
  {
    alt: 'Event celebration candid',
    src: '/events/A7207884-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADwAQCdASoIAAwABUB8JYwC7AD0mYnCwQAA/uZeCFT2oA0xRqv0pWmr0i+fUCcTGCGAAA==',
  },
  {
    alt: 'Event candid shot',
    src: '/events/A7402526-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAACwAQCdASoIAAUABUB8JZQAAp1UjCgAAM42p1EksxZ6gGQWw6A3vx0a16Y3F8DgAAA=',
  },
  {
    alt: 'Celebration moment captured',
    src: '/events/A7402743-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADQAQCdASoIAAwABUB8JYwAApe+IeiAAAD9eOEeg1XXTeubQWPEZ6sdBeIsBEI+gMKXChG+uL4JUD6kB4AAAA==',
  },
  {
    alt: 'Event attendee moment',
    src: '/events/A7206535-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADQAQCdASoIAAwABUB8JYgCdADzgbeKAADfwYYSkk2nXISptZnlC0RvQpDWGmIoVXUEeEQ54VFtIuf9koVQAA==',
  },
  {
    alt: 'Abuela and Candeladia',
    src: '/events/A7206966-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoIAAUABUB8JaACdAD5hEc6FwAA/t2hKLVvXWXJjndrLJLPjoe33B7sedGF1+AA',
  },
  {
    alt: 'Party gathering photography',
    src: '/events/A7405908-Enhanced-NR-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAAAQAgCdASoIAAwABUB8JaACdADdsmht/ywAAP7hjaLk0HyyXxLL1cJqnbPbGlS2CEDS23d0ZM9HbtSgAAA=',
  },
  {
    alt: 'Event moment captured',
    src: '/events/A7207859-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAACwAQCdASoIAAUABUB8JYwCdADze7hYAP5OYppgHdcoHd0BLyXaVAHYDcK2D1w3AAA=',
  },
  {
    alt: 'Event moment portrait',
    src: '/events/A7404868-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACwAQCdASoIAAwABUB8JQBOgB5wYuAAAP3UNj19pZiVP6cLEDGkl+yXUQ1tfhzqmjdwjlcwJToZ67AAAAA=',
  },
  {
    alt: 'Celebration gathering photography',
    src: '/events/A7400963-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAACwAQCdASoIAAUABUB8JZgCdAEOZ8kcAP68SDImROvzL3dPcRFIateqgQjk6xcDwAAAAA==',
  },
  {
    alt: 'Cake',
    src: '/events/A7206529-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACwAQCdASoIAAwABUB8JaACdADzVKYAAP6rCeI7PaxGSnLtZnvvWeRAsxYwiwXxqy1JLrxk97nvAxT4AAA=',
  },
  {
    alt: 'Event celebration detail',
    src: '/events/A7206604-Enhanced-NR-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADQAQCdASoIAAwABUB8JQBYdh57WPMDwAD4VulIqPhM7kpQuICA1HiBQEf91Mt52TNjVar8s2RVUysZhAAAAA==',
  },
  {
    alt: 'Party attendees candid',
    src: '/events/A7206546-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAQCdASoIAAUABUB8JQBOgB5P38AAAP6H2kk9NIo7ULhC6AbMvsrgZiWgAAAA',
  },
  {
    alt: 'Party moment candid shot',
    src: '/events/A7405960-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAACwAQCdASoIAAwABUB8JYwCdADzYsIAAP4fxzOsOlGaqCtZ4W22AvRjLF4scRbGj0x3USn+KEAAAA==',
  },
  {
    alt: 'Event celebration moment',
    src: '/events/A7207942-color.webp',
    width: 1620, height: 1080,
    blurDataURL:
      'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAADQAQCdASoIAAUABUB8JZQCdAD0mE+oAAD+0mVFpkwTcv0RURT6+x7aWAAAAA==',
  },
  {
    alt: 'Celebration gathering candid',
    src: '/events/A7405730-Enhanced-NR-color.webp',
    width: 1080, height: 1620,
    blurDataURL:
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAQCdASoIAAwABUB8JYwAAptl75IAAP7o8WTpwkStOyzAOSbfITQYZPQHgAAA',
  },
];
