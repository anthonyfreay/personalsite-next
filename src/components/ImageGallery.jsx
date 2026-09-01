'use client';

import { useState, useCallback, memo } from 'react';
import GalleryImage from './GalleryImage';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import styles from './ImageGallery.module.css';

/**
 * @param images        manifest entries, already run through withHd()
 * @param captionOnHover  reveal each image's alt text on hover. Opt-in, because
 *   it only makes sense where the alt names a subject (e.g. /live names the
 *   artist). Hover-capable pointers only - see the media query in the CSS.
 */
const ImageGallery = memo(({ images, captionOnHover = false }) => {
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
            className={`${styles.tile} cursor-pointer`}
            onClick={() => openLightbox(index)}
          >
            <GalleryImage
              // The 675px base file, not -hd. With the optimizer off there is
              // no downscaling step, so whatever is named here is what every
              // tile downloads - and -hd would ship 14MB of /live to a phone
              // showing 191px tiles. 675 slightly undershoots a 450 CSS px
              // retina tile; the lightbox still opens the full -hd.
              src={image.src}
              alt={image.alt}
              width={image.width ?? 1080}
              height={image.height ?? 1620}
              color={image.color}
              priority={index < 4}
              eager={index < 8}
              sizes="(max-width: 640px) 50vw, (max-width: 1023px) 33vw, 450px"
            />
            {/*
              `image.alt &&` is load-bearing: the caption paints a dark
              gradient behind its text, so an entry with an intentionally empty
              alt (the crowd frames on /live, which name no artist) would
              otherwise fade in an empty shadow bar on hover.

              aria-hidden: this duplicates the image's alt text, which screen
              readers already announce. Purely a visual affordance.
            */}
            {captionOnHover && image.alt && (
              <span className={styles.hoverCaption} aria-hidden="true">
                {image.alt}
              </span>
            )}
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
