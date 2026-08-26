'use client';

import MasonryImageGallery from '@/components/MasonryImageGallery';
import { cars, withHd } from '@/lib/galleries';

const images = withHd(cars);



export default function CarsClient() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full flex-1">
        <MasonryImageGallery images={images} />
      </div>
    </div>
  );
}
