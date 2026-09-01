'use client';

import MasonryImageGallery from '@/components/MasonryImageGallery';
import { sports, withHd } from '@/lib/galleries';

const images = withHd(sports);

export default function SportsClient() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full flex-1">
        <MasonryImageGallery images={images} spanWideOnMobile />
      </div>
    </div>
  );
}
