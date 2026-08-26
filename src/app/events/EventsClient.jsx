'use client';

import MasonryImageGallery from '@/components/MasonryImageGallery';
import { events, withHd } from '@/lib/galleries';

const images = withHd(events);



export default function EventsClient() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full flex-1">
        <MasonryImageGallery images={images} />
      </div>
    </div>
  );
}
