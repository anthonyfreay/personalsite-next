'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import Image from 'next/image';
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
            className={`${styles.animateFadeIn} cursor-pointer opacity-0`}
            onClick={() => openLightbox(index)}
            style={{
              animationDelay: `${Math.min(index * 0.05, 0.35)}s`,
            }}
          >
            <LazyLoadImage src={image.src} alt={image.alt} index={index} />
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

// The masonry grid is 4 columns on desktop, and react-masonry-css fills them
// round-robin, so items 0-3 are the first visible row and 4-7 the second.
// Because column heights vary, that second row routinely sits above the fold -
// a short landscape image in column 0 pulls item 4 straight up into view. Both
// LCP warnings seen in dev (/cars item 4, /places item 6) came from exactly
// that. Preload the first row, eager-load the second, lazy-load the rest.
const FIRST_ROW = 4;
const ABOVE_FOLD = 8;

const LazyLoadImage = ({ src, alt, index = 0 }) => {
  const isFirstRow = index < FIRST_ROW;
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      className="w-full h-auto"
      priority={isFirstRow}
      loading={index < ABOVE_FOLD ? 'eager' : 'lazy'}
      // Must track .masonryGrid: 4 columns, 2 at <=900px, and the grid
      // caps at 1800px so tiles stop growing past ~450px. The previous value
      // still encoded react-masonry-css's old 490/900/1100 breakpoints and
      // overstated the tile by 2.16x on a phone and 1.46x at 2560px, so
      // browsers fetched roughly double the pixels they could display.
      sizes="(max-width: 900px) 50vw, (max-width: 1800px) 25vw, 450px"
    />
  );
};

MasonryImageGallery.displayName = 'MasonryImageGallery';

export default MasonryImageGallery;
