'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './GalleryImage.module.css';

/**
 * A gallery tile that fades its photo in when the image actually decodes.
 *
 * Two earlier approaches did not work well:
 *
 *   1. A keyframe fade staggered on `index * 0.05s`. It ran on a timer from
 *      mount with no relationship to loading, so a tile could finish fading in
 *      while still empty and the photo popped in afterwards.
 *   2. Next's `placeholder="blur"`. It removed the blank gap, but an upscaled
 *      8px preview is visually noisy, and tiles sharpening at unrelated moments
 *      read as jitter scattered across the grid.
 *
 * Instead each tile paints the photo's own dominant colour immediately - so the
 * grid is complete and calm from the first frame - and the image crossfades in
 * over it. The colour is close to the photo, so the transition is a settle
 * rather than a reveal.
 */
export default function GalleryImage({
  src,
  alt,
  width,
  height,
  color,
  sizes,
  priority = false,
  eager = false,
  className = '',
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  // A cached image can already be complete before React attaches onLoad, in
  // which case the event never fires and the tile would stay at opacity 0.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <span
      className={styles.frame}
      style={{ backgroundColor: color, aspectRatio: `${width} / ${height}` }}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={eager ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        className={`${styles.image} ${loaded ? styles.loaded : ''} ${className}`}
      />
    </span>
  );
}
