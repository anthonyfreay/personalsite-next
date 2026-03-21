'use client';

import { useState, useCallback, useMemo, useRef, useEffect, memo } from 'react';
import Masonry from 'react-masonry-css';
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

  const breakpointColumnsObj = {
    default: 4,
    1100: 4,
    900: 2,
    490: 2
  };

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {organizedImages.map((image, index) => (
          <div
            key={image.src}
            className={`${styles.animateFadeIn} cursor-pointer opacity-0`}
            onClick={() => openLightbox(index)}
            style={{
              animationDelay: `${Math.min(index * 0.05, 0.35)}s`,
            }}
          >
            <LazyLoadImage src={image.src} alt={image.alt} priority={index < 2} index={index} />
          </div>
        ))}
      </Masonry>

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

const LazyLoadImage = ({ src, alt, priority = false, index = 0 }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      className="w-full h-auto"
      loading={priority || index < 2 ? 'eager' : 'lazy'}
      priority={priority || index < 2}
      sizes="(max-width: 490px) 100vw, (max-width: 900px) 50vw, (max-width: 1100px) 33vw, 25vw"
    />
  );
};

MasonryImageGallery.displayName = 'MasonryImageGallery';

export default MasonryImageGallery;
