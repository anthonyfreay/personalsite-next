import EventsClient from './EventsClient';

const allImages = [
  { alt: 'Event celebration moment', src: '/events/A7401031-color.webp' },
  { alt: 'Party gathering photography', src: '/events/A7207716-color.webp' },
  { alt: 'Event attendees by Anthony Freay', src: '/events/A7400919-color.webp' },
  { alt: 'Celebration moment captured', src: '/events/A7206906-color.webp' },
  { alt: 'Event photography detail', src: '/events/A7400937-color.webp' },
  { alt: 'Party moment by Anthony Freay', src: '/events/A7402659-color.webp' },
  { alt: 'Event gathering candid shot', src: '/events/A7207820-color.webp' },
  { alt: 'Celebration photography', src: '/events/A7208176-color.webp' },
  { alt: 'Event attendees moment', src: '/events/A7407714-color.webp' },
  { alt: 'Party celebration captured', src: '/events/A7402648-color.webp' },
  { alt: 'Event moment photography', src: '/events/A7207973-color.webp' },
  { alt: 'Gathering candid shot', src: '/events/A7208096-color.webp' },
  { alt: 'Event celebration detail', src: '/events/A7208033-color.webp' },
  { alt: 'Party moment by photographer', src: '/events/A7207913-color.webp' },
  { alt: 'Event attendees candid', src: '/events/A7207907-color.webp' },
  { alt: 'Maddie Miller Bday Cake', src: '/events/A7407589-color.webp' },
  { alt: 'Event celebration photography', src: '/events/A7402701-color.webp' },
  { alt: 'Party gathering moment', src: '/events/A7401049-color.webp' },
  { alt: 'Event candid shot', src: '/events/A7402526-color.webp' },
  { alt: 'Abuela and Candeladia', src: '/events/A7206966-color.webp' },
  { alt: 'Event moment captured', src: '/events/A7207859-color.webp' },
  { alt: 'Celebration gathering photography', src: '/events/A7400963-color.webp' },
  { alt: 'Party attendees candid', src: '/events/A7206546-color.webp' },
  { alt: 'Event celebration moment', src: '/events/A7207942-color.webp' },
  { alt: 'Event celebration portrait', src: '/events/A7404835-color.webp' },
  { alt: 'Party attendee moment', src: '/events/A7404355-color.webp' },
  { alt: 'Event photography by Anthony Freay', src: '/events/A7401037-color.webp' },
  { alt: 'Celebration attendee portrait', src: '/events/A7404555-color.webp' },
  { alt: 'Event moment captured', src: '/events/A7404514-color.webp' },
  { alt: 'Party gathering portrait', src: '/events/A7404632-color.webp' },
  { alt: 'Event attendee candid', src: '/events/A7407621-color.webp' },
  { alt: 'Celebration moment portrait', src: '/events/A7207607-color.webp' },
  { alt: 'Mom, Cita, and Tio', src: '/events/A7206591-color.webp' },
  { alt: 'Event celebration detail', src: '/events/A7206528-color.webp' },
  { alt: 'Party moment portrait', src: '/events/A7404780-color.webp' },
  { alt: 'Event attendee photograph', src: '/events/A7402521-color.webp' },
  { alt: 'Celebration gathering portrait', src: '/events/A7404479-color.webp' },
  { alt: 'Event moment candid shot', src: '/events/A7206559-color.webp' },
  { alt: 'Jill and Kendall', src: '/events/A7401130-color.webp' },
  { alt: 'Event attendee portrait', src: '/events/A7401014-color.webp' },
  { alt: 'Party celebration candid', src: '/events/A7407559-color.webp' },
  { alt: 'DJ Bolivar', src: '/events/A7206551-color.webp' },
  { alt: 'Event moment photography', src: '/events/A7206574-color.webp' },
  { alt: 'Celebration attendee candid', src: '/events/A7404717-color.webp' },
  { alt: 'All The Way Down', src: '/events/A7207740-color.webp' },
  { alt: 'Event gathering moment', src: '/events/A7405071-color.webp' },
  { alt: 'Party attendee portrait', src: '/events/A7206542-color.webp' },
  { alt: 'Event celebration candid', src: '/events/A7207884-color.webp' },
  { alt: 'Celebration moment captured', src: '/events/A7402743-color.webp' },
  { alt: 'Event attendee moment', src: '/events/A7206535-color.webp' },
  { alt: 'Party gathering photography', src: '/events/A7405908-Enhanced-NR-color.webp' },
  { alt: 'Event moment portrait', src: '/events/A7404868-color.webp' },
  { alt: 'Cake', src: '/events/A7206529-color.webp' },
  { alt: 'Event celebration detail', src: '/events/A7206604-Enhanced-NR-color.webp' },
  { alt: 'Party moment candid shot', src: '/events/A7405960-color.webp' },
  { alt: 'Celebration gathering candid', src: '/events/A7405730-Enhanced-NR-color.webp' },
];

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
