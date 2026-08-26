'use client';

import MasonryImageGallery from '@/components/MasonryImageGallery';
import { places, withHd } from '@/lib/galleries';

const images = withHd(places);



export default function PlacesClient() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full flex-1">
        <MasonryImageGallery images={images} />
      </div>
    </div>
  );
}
