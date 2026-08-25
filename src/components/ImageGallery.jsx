'use client';

import { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import styles from './ImageGallery.module.css';

const ImageGallery = memo(({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const openLightbox = useCallback((index) => {
    setActiveImage(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const lightboxImages = images.map(image => ({
    ...image,
    src: image.hdSrc
  }));

  return (
    <div>
      <div className={styles.gallery}>
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`${styles.animateFadeIn} opacity-0 cursor-pointer`}
            onClick={() => openLightbox(index)}
            style={{
              animationDelay: `${Math.min(index * 0.05, 0.35)}s`,
            }}
          >
            <Image
              // Grid tiles render from the 1080px -hd source, not the 450px
              // base. A tile is up to 450 CSS px wide, which a retina display
              // needs 900 physical px to fill - more than the base image has,
              // so it would be upscaled and soft. Next never upscales past the
              // source, so it downscales the -hd file to whatever each device
              // actually needs and the tiles stay sharp at every DPR.
              src={image.hdSrc}
              alt={image.alt}
              width={1080}
              height={1620}
              className="w-full h-auto"
              // The grid is 4 columns on desktop, so the first four tiles are
              // the above-the-fold row and any of them can be the LCP element.
              priority={index < 4}
              loading={index < 8 ? 'eager' : 'lazy'}
              sizes="(max-width: 640px) 50vw, (max-width: 1023px) 33vw, 450px"
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

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;
