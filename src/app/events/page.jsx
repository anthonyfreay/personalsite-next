import EventsClient from './EventsClient';
import { events as allImages } from '@/lib/galleries';
import {
  imageGalleryJsonLd,
  breadcrumbJsonLd,
  siteGraphJsonLd,
} from '@/lib/structured-data';


export const metadata = {
  title: 'Events | Anthony Freay',
  description: 'Photography from events by Anthony Freay — candid moments, celebrations, and live gatherings.',
  alternates: {
    canonical: 'https://www.anthonyfreay.com/events',
  },
  openGraph: {
    title: 'Events | Anthony Freay',
    description: 'Photography from events by Anthony Freay — candid moments, celebrations, and live gatherings.',
    images: [{ url: 'https://www.anthonyfreay.com/covers/events_cover.jpg', width: 1200, height: 630 }],
    url: 'https://www.anthonyfreay.com/events',
  },
  twitter: {
    title: 'Events | Anthony Freay',
    description: 'Photography from events by Anthony Freay — candid moments, celebrations, and live gatherings.',
    images: ['https://www.anthonyfreay.com/covers/events_cover.jpg'],
  },
};

export default function Events() {
  const jsonLd = siteGraphJsonLd([
    imageGalleryJsonLd({
      name: 'Event Photography by Anthony Freay',
      description: 'Photography from events by Anthony Freay — candid moments, celebrations, and live gatherings.',
      path: '/events',
      images: allImages,
    }),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Work', path: '/work' },
      { name: 'Events', path: '/events' },
    ]),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Event Photography</h1>
      <p className="sr-only">
        Event photography by Anthony Freay, a New York City-based photographer specializing
        in candid moments at parties, birthdays, and gatherings. These images document real
        people and real emotions — unposed and full of life.
      </p>
      <EventsClient />
    </>
  );
}
