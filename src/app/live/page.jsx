import ImageGallery from '@/components/ImageGallery';

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
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="sr-only">Concert Photography</h1>
      <div className="max-w-full mx-auto my-2.5 flex-1">
        <ImageGallery images={imageData} />
      </div>
    </div>
  );
}

const imageData = [
  { alt: 'Tyler, the Creator', src: '/live/DSC05584-music.webp' },
  { alt: 'Anik Khan', src: '/live/A7206554-music.webp' },
  { alt: 'Daniel Caesar', src: '/live/DSC02184-music.webp' },
  { alt: 'Alexa Porat', src: '/live/A7400207-Edit-music.webp' },
  { alt: 'Cautious Clay', src: '/live/RX704864-music.webp' },
  { alt: 'J Balvin', src: '/live/RX709066-Edit-music.webp' },
  { alt: 'Lizzie McAlpine', src: '/live/RX704131-music.webp' },
  { alt: 'Gracie Abrams', src: '/live/RX701806-music.webp' },
  { alt: 'Gracie Abrams', src: '/live/RX701741-Enhanced-NR-music.webp' },
  { alt: 'Tiffany Day', src: '/live/A7400474-music.webp' },
  { alt: 'Tai Verdes', src: '/live/RX708483-music.webp' },
  { alt: 'Cautious Clay', src: '/live/RX704917-music.webp' },
  { alt: 'Alexa Porat', src: '/live/A7400244-music.webp' },
  { alt: 'Lizie McAlpine', src: '/live/RX704049-Enhanced-NR-Edit-music.webp' },
  { alt: 'WowGr8', src: '/live/RX703010-Enhanced-NR-Edit-music.webp' },
  { alt: 'Tyler, The Creator singing sad', src: '/live/DSC05554-Enhanced-NR-music.webp' },
  { alt: 'Gracie Abrams', src: '/live/RX704104-Edit-2-music.webp' },
  { alt: 'Jack Harlow', src: '/live/DSC08431-Edit-music.webp' },
  { alt: 'JUNO', src: '/live/A7400058-music.webp' },
  { alt: 'New Politics', src: '/live/DSC02629-music.webp' },
  { alt: 'Olu', src: '/live/RX702447-music.webp' },
  { alt: 'Tyler, The Creator sillouette', src: '/live/DSC05693-Enhanced-NR-music.webp' },
  { alt: 'Alexander23', src: '/live/A7207787-music.webp' },
  { alt: 'Jaden Smith', src: '/live/DSC04170-music.webp' },
  { alt: 'Tyler, The Creator on Stage', src: '/live/DSC05678-Enhanced-NR-music.webp' },
  { alt: 'X Lovers', src: '/live/A7207540-music.webp' },
  { alt: 'Chelsea Cutler', src: '/live/A7208496-music.webp' },
  { alt: 'Sango', src: '/live/A7206805-music.webp' },
  { alt: 'Lizzie McAlpine', src: '/live/RX704229-Enhanced-NR-Edit-music.webp' },
  { alt: 'Lauv', src: '/live/DSC06611-music.webp' },
  { alt: 'Olu', src: '/live/RX703590-music.webp' },
  { alt: 'Nicki Minaj', src: '/live/RX709090-music.webp' },
].map(image => ({
  ...image,
  hdSrc: image.src.replace(/(\.\w+)$/, '-hd$1'),
}));

export default Live;
