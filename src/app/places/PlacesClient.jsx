'use client';

import MasonryImageGallery from '@/components/MasonryImageGallery';
import { places, withHd } from '@/lib/galleries';
import { layoutOptions } from '@/lib/galleries/layout';

const images = withHd(places);



export default function PlacesClient() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full flex-1">
        <MasonryImageGallery images={images} {...layoutOptions('places')} />
      </div>
    </div>
  );
}
