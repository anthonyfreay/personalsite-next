'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './WorkClient.module.css';

const categories = [
  { path: '/live', image: 'live/A7400474-music.webp', label: 'Live' },
  { path: '/bw', image: 'covers/bw_cover.jpg', label: 'B & W' },
  { path: '/people', image: 'covers/people_cover.jpg', label: 'People' },
  { path: '/places', image: 'places/A7406615-scapes.webp', label: 'Places' },
  { path: '/cars', image: 'covers/cars_cover.jpg', label: 'Cars' },
  { path: '/events', image: 'events/A7404835-color.webp', label: 'Events' },
];

export default function WorkClient() {
  return (
    <div>
      <div className={styles.mainContent}>
        {categories.map((category, index) => (
          <Link
            key={category.label}
            href={category.path}
            className={styles.categoryLink}
          >
            <figure className={styles.figure}>
              <Image
                src={`/${category.image}`}
                alt={category.label}
                width={400}
                height={400}
                className={`${styles.categoryImage} ${styles.animateFadeInOpacity}`}
                style={{ opacity: 0 }}
                priority={index < 2}
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
