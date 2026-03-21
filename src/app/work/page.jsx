import WorkClient from './WorkClient';

export const metadata = {
  title: 'Work | Anthony Freay',
  description: 'A collection of photography work by Anthony Freay, showcasing portraits, concerts, and events.',
  alternates: {
    canonical: 'https://www.anthonyfreay.com/work',
  },
  openGraph: {
    title: 'Work | Anthony Freay',
    description: 'A collection of photography work by Anthony Freay, showcasing portraits, concerts, and events.',
    images: [
      {
        url: 'https://www.anthonyfreay.com/covers/live_cover.jpg',
        width: 1200,
        height: 630,
      },
    ],
    url: 'https://www.anthonyfreay.com/work',
  },
  twitter: {
    title: 'Work | Anthony Freay',
    description: 'A collection of photography work by Anthony Freay, showcasing portraits, concerts, and events.',
    images: ['https://www.anthonyfreay.com/covers/live_cover.jpg'],
  },
};

export default function Work() {
  return (
    <>
      <h1 className="sr-only">Photography Portfolio</h1>
      <WorkClient />
    </>
  );
}
