import ImageGallery from '@/components/ImageGallery';
import { live, withHd } from '@/lib/galleries';

export const metadata = {
  title: 'Live Music | Anthony Freay',
  description: 'Concert and live music photography by Anthony Freay. Featuring artists like Tyler, the Creator, Daniel Caesar, and more.',
  alternates: {
    canonical: 'https://www.anthonyfreay.com/live',
  },
  openGraph: {
    title: 'Live Music | Anthony Freay',
    description: 'Concert and live music photography by Anthony Freay. Featuring artists like Tyler, the Creator, Daniel Caesar, and more.',
    images: [
      {
        url: 'https://www.anthonyfreay.com/covers/live_cover.jpg',
        width: 1200,
        height: 630,
      },
    ],
    url: 'https://www.anthonyfreay.com/live',
  },
  twitter: {
    title: 'Live Music | Anthony Freay',
    description: 'Concert and live music photography by Anthony Freay. Featuring artists like Tyler, the Creator, Daniel Caesar, and more.',
    images: ['https://www.anthonyfreay.com/covers/live_cover.jpg'],
  },
};

function Live() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Live Music Photography by Anthony Freay',
    description: 'Concert and live music photography by Anthony Freay. Featuring artists like Tyler, the Creator, Daniel Caesar, and more.',
    url: 'https://www.anthonyfreay.com/live',
    author: { '@type': 'Person', name: 'Anthony Freay', url: 'https://www.anthonyfreay.com' },
    image: imageData.map(img => ({
      '@type': 'Photograph',
      name: img.alt,
      url: `https://www.anthonyfreay.com${img.src}`,
      author: { '@type': 'Person', name: 'Anthony Freay' },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Concert Photography</h1>
      <p className="sr-only">
        Live music and concert photography by Anthony Freay, shot at venues across New York City
        and beyond. This gallery features artists including Tyler, the Creator, Daniel Caesar,
        Jack Harlow, Nicki Minaj, and many more captured in their element on stage.
      </p>
      <div className="max-w-full mx-auto my-2.5 flex-1">
        <ImageGallery images={imageData} />
      </div>
    </div>
  );
}

const imageData = withHd(live);

export default Live;
