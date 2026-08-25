'use client';

import MasonryImageGallery from '@/components/MasonryImageGallery';
import { eventsHorizontal, eventsVertical, withHd } from '@/lib/galleries';

const horizontalImages = withHd(eventsHorizontal);
const verticalImages = withHd(eventsVertical);



export default function EventsClient() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full flex-1">
        <MasonryImageGallery horizontalImages={horizontalImages} verticalImages={verticalImages} />
      </div>
    </div>
  );
}
