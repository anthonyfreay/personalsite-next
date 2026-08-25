'use client';

import MasonryImageGallery from '@/components/MasonryImageGallery';
import { carsHorizontal, carsVertical, withHd } from '@/lib/galleries';

const horizontalImages = withHd(carsHorizontal);
const verticalImages = withHd(carsVertical);



export default function CarsClient() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-full mx-auto flex-1">
        <MasonryImageGallery horizontalImages={horizontalImages} verticalImages={verticalImages} />
      </div>
    </div>
  );
}
