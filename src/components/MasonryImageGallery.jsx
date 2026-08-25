'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import styles from './MasonryImageGallery.module.css';

const MasonryImageGallery = memo(({ horizontalImages = [], verticalImages = [] }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const openLightbox = useCallback((index) => {
    setActiveImage(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const organizedImages = useMemo(() => {
    const horizontal = horizontalImages.map(img => ({ ...img, orientation: 'horizontal' }));
    const vertical = verticalImages.map(img => ({ ...img, orientation: 'vertical' }));

    const result = [];
    const maxLength = Math.max(horizontal.length, vertical.length);

    const hRatio = horizontal.length / maxLength;
    const vRatio = vertical.length / maxLength;

    let hIndex = 0;
    let vIndex = 0;

    for (let i = 0; i < maxLength * 2; i++) {
      const shouldAddHorizontal = hIndex < horizontal.length &&
        (vIndex >= vertical.length || (hIndex / (horizontal.length || 1)) <= (vIndex / (vertical.length || 1)));

      if (shouldAddHorizontal) {
        result.push(horizontal[hIndex]);
        hIndex++;
      } else if (vIndex < vertical.length) {
        result.push(vertical[vIndex]);
        vIndex++;
      }
    }

    return result;
  }, [horizontalImages, verticalImages]);

  const lightboxImages = organizedImages.map(image => ({
    ...image,
    src: image.hdSrc
  }));

  return (
    <div>
      {/*
        Column count lives in the stylesheet (see .masonryGrid), not here.
        This used to be react-masonry-css driven by window.innerWidth, which
        the server cannot know - it rendered 4 columns and the client
        re-rendered to 2 below 900px, costing 0.082 CLS at hydration.
      */}
      <div className={styles.masonryGrid}>
        {organizedImages.map((image, index) => (
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
      sizes="(max-width: 490px) 100vw, (max-width: 900px) 50vw, (max-width: 1100px) 33vw, 25vw"
    />
  );
};

MasonryImageGallery.displayName = 'MasonryImageGallery';

export default MasonryImageGallery;
