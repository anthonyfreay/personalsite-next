'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import GalleryImage from './GalleryImage';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import styles from './MasonryImageGallery.module.css';

const MasonryImageGallery = memo(({ images = [] }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const openLightbox = useCallback((index) => {
    setActiveImage(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // Memoised: this maps the full gallery (up to 56 items) and previously ran
  // on every render, including every lightbox open/close.
  const lightboxImages = useMemo(
    () => images.map((image) => ({ ...image, src: image.hdSrc })),
    [images]
  );

  return (
    <div>
      {/*
        Column count lives in the stylesheet (see .masonryGrid), not here.
        This used to be react-masonry-css driven by window.innerWidth, which
        the server cannot know - it rendered 4 columns and the client
        re-rendered to 2 below 900px, costing 0.082 CLS at hydration.
      */}
      <div className={styles.masonryGrid}>
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`${styles.tile} cursor-pointer`}
            onClick={() => openLightbox(index)}
          >
            <GalleryImage
              src={image.hdSrc}
              alt={image.alt}
              width={image.width}
              height={image.height}
              color={image.color}
              priority={index < FIRST_ROW}
              eager={index < ABOVE_FOLD}
              sizes="(max-width: 900px) 50vw, (max-width: 1800px) 25vw, 450px"
            />
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div>
          <Lightbox
            slides={lightboxImages}
            open={lightboxOpen}
            index={activeImage}
            controller={{ closeOnBackdropClick: true }}
            close={closeLightbox}
            className={styles.lightbox}
            animation={{ swipe: 0 }}
          />
        </div>
      )}
    </div>
  );
});

// The masonry grid is 4 columns on desktop, and CSS columns fill them
// top-to-bottom, so items 0-3 head each column and 4-7 follow. Because column
// heights vary, that second set routinely sits above the fold. Preload the
// first row, eager-load the second, lazy-load the rest.
const FIRST_ROW = 4;
const ABOVE_FOLD = 8;

MasonryImageGallery.displayName = 'MasonryImageGallery';

export default MasonryImageGallery;
