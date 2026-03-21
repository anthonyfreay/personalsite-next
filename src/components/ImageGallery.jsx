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
      <div className={`${styles.gallery} flex flex-wrap justify-center`}>
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`${styles.animateFadeIn} max-w-sm opacity-0 cursor-pointer`}
            onClick={() => openLightbox(index)}
            style={{
              animationDelay: `${Math.min(index * 0.05, 0.35)}s`,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={450}
              height={300}
              className="w-full h-auto"
              loading={index < 6 ? 'eager' : 'lazy'}
              priority={index < 1}
              sizes="(max-width: 470px) 100vw, (max-width: 999px) 50vw, 33vw"
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
