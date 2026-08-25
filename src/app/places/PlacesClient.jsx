'use client';

import MasonryImageGallery from '@/components/MasonryImageGallery';
import { placesHorizontal, placesVertical, withHd } from '@/lib/galleries';

const horizontalImages = withHd(placesHorizontal);
const verticalImages = withHd(placesVertical);



export default function PlacesClient() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full flex-1">
        <MasonryImageGallery horizontalImages={horizontalImages} verticalImages={verticalImages} />
      </div>
    </div>
  );
}
