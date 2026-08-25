import EventsClient from './EventsClient';
import { events as allImages } from '@/lib/galleries';


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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Event Photography by Anthony Freay',
    description: 'Photography from events by Anthony Freay — candid moments, celebrations, and live gatherings.',
    url: 'https://www.anthonyfreay.com/events',
    author: { '@type': 'Person', name: 'Anthony Freay', url: 'https://www.anthonyfreay.com' },
    image: allImages.map(img => ({
      '@type': 'Photograph',
      name: img.alt,
      url: `https://www.anthonyfreay.com${img.src}`,
      author: { '@type': 'Person', name: 'Anthony Freay' },
    })),
  };

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
