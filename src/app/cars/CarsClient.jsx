'use client';

import MasonryImageGallery from '@/components/MasonryImageGallery';

const horizontalImages = [
  { alt: 'Luxury car detail shot', src: '/cars/A7406517-Enhanced-NR-color.webp' },
  { alt: 'Classic automobile photography', src: '/cars/A7405676-color.webp' },
  { alt: 'Automotive photography by Anthony Freay', src: '/cars/A7204618-color.webp' },
  { alt: 'Black and white car portrait', src: '/cars/A7406721-bw.webp' },
].map(image => ({
  ...image,
  hdSrc: image.src.replace(/(\.\w+)$/, '-hd$1'),
}));

const verticalImages = [
  { alt: 'Sports car in color', src: '/cars/A7409382-color.webp' },
  { alt: 'Modern automobile design', src: '/cars/A7409342-color.webp' },
  { alt: 'Classic car in black and white', src: '/cars/DSC04341-bw.webp' },
  { alt: 'Vintage car photography', src: '/cars/A7200465-color.webp' },
  { alt: 'Luxury vehicle detail', src: '/cars/A7200477-color.webp' },
  { alt: 'Automotive photography', src: '/cars/A7200475-color.webp' },
  { alt: 'Car in monochrome', src: '/cars/A7406716-bw.webp' },
  { alt: 'Classic automobile portrait', src: '/cars/A7200462-color.webp' },
  { alt: 'Vehicle detail shot', src: '/cars/A7200488-color.webp' },
  { alt: 'Modern car photography', src: '/cars/A7408915-color.webp' },
  { alt: 'Automotive detail by Anthony Freay', src: '/cars/A7406778-color.webp' },
  { alt: 'Black and white automotive', src: '/cars/A7406726-bw.webp' },
  { alt: 'Car in natural light', src: '/cars/A7406734-color.webp' },
  { alt: 'Monochrome car portrait', src: '/cars/A7406717-bw.webp' },
  { alt: 'Automotive photography detail', src: '/cars/A7209958-color.webp' },
  { alt: 'Classic car in color', src: '/cars/A7200461-color.webp' },
].map(image => ({
  ...image,
  hdSrc: image.src.replace(/(\.\w+)$/, '-hd$1'),
}));

export default function CarsClient() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-full mx-auto flex-1">
        <MasonryImageGallery horizontalImages={horizontalImages} verticalImages={verticalImages} />
      </div>
    </div>
  );
}
