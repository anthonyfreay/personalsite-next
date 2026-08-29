'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/constants';
import styles from './WorkClient.module.css';

/*
  Cover art and alt text per gallery. The tile *label* is not here: it comes
  from ROUTES, the same source as the navbar title, the footer and the 404
  list, so renaming a gallery cannot leave this page saying something else -
  which is exactly what happened when /live became "Live Music".

  Array order is the tile order on the page.
*/
const covers = [
  { path: '/live', image: 'live/A7400474-music.webp', alt: 'Live music and concert photography' },
  { path: '/bw', image: 'covers/bw_cover.jpg', alt: 'Black and white photography' },
  { path: '/people', image: 'covers/people_cover.jpg', alt: 'Portrait and lifestyle photography' },
  { path: '/places', image: 'places/A7406615-scapes.webp', alt: 'Travel and landscape photography' },
  { path: '/cars', image: 'covers/cars_cover.jpg', alt: 'Automotive photography' },
  { path: '/events', image: 'events/A7404835-color.webp', alt: 'Event and celebration photography' },
];

const categories = covers.map((cover) => ({
  ...cover,
  label: ROUTES.find((route) => route.path === cover.path)?.label ?? '',
}));

export default function WorkClient() {
  return (
    <div>
      <div className={styles.mainContent}>
        {categories.map((category, index) => (
          <Link
            key={category.path}
            href={category.path}
            className={styles.categoryLink}
          >
            {/*
              The fade lives on the figure, not the image, so the caption
              fades in together with its cover rather than popping in first.
            */}
            <figure
              className={`${styles.figure} ${styles.animateFadeInOpacity}`}
              style={{ animationDelay: `${Math.min(index * 0.08, 0.4)}s` }}
            >
              <Image
                src={`/${category.image}`}
                alt={category.alt}
                width={400}
                height={400}
                className={styles.categoryImage}
                // The grid is 3 columns on desktop, so the first three tiles
                // are the above-the-fold row and any of them can be the LCP
                // element. Priority sets fetchpriority=high and eager loading.
                priority={index < 3}
                sizes="(max-width: 470px) 200px, (max-width: 999px) 300px, 400px"
              />
              <figcaption className={styles.figcaption}>
                {category.label}
              </figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </div>
  );
}
