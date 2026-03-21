import EventsClient from './EventsClient';

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
  return (
    <>
      <h1 className="sr-only">Event Photography</h1>
      <EventsClient />
    </>
  );
}
