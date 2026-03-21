import ImageGallery from '@/components/ImageGallery';

export const metadata = {
  title: 'People | Anthony Freay',
  description: 'Portraits by Anthony Freay. Capturing candid and lifestyle moments.',
  alternates: {
    canonical: 'https://www.anthonyfreay.com/people',
  },
  openGraph: {
    title: 'People | Anthony Freay',
    description: 'Portraits by Anthony Freay. Capturing candid and lifestyle moments.',
    images: [{ url: 'https://www.anthonyfreay.com/covers/people_cover.jpg', width: 1200, height: 630 }],
    url: 'https://www.anthonyfreay.com/people',
  },
  twitter: {
    title: 'People | Anthony Freay',
    description: 'Portraits by Anthony Freay. Capturing candid and lifestyle moments.',
    images: ['https://www.anthonyfreay.com/covers/people_cover.jpg'],
  },
};

function People() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="sr-only">Portrait Photography</h1>
      <div className="max-w-full mx-auto my-2.5 flex-1">
        <ImageGallery images={imageData} />
      </div>
    </div>
  );
}

const imageData = [
  { alt: 'Em in Williamsburg', src: '/people/DSC01179-Edit-portrait.webp' },
  { alt: 'Kal looking over a fire escape', src: '/people/DSC06349-portrait.webp' },
  { alt: 'Natalie Freay celebrating her enagement', src: '/people/A7404306-portrait.webp' },
  { alt: 'Dajee at Untermyer Gardens', src: '/people/A7205925-portrait.webp' },
  { alt: 'Dajee in Grand Central', src: '/people/A7207181-portrait.webp' },
  { alt: 'Arize in Studio', src: '/people/A7201581-Edit-portrait.webp' },
  { alt: 'Dajee at the MET Cloisters', src: '/people/A7205508-HDR-Edit-portrait.webp' },
  { alt: 'Camille in Studio', src: '/people/A7201742-Edit-portrait.webp' },
  { alt: 'Richard in his favorite green shirt', src: '/people/A7204813-Edit-portrait.webp' },
  { alt: 'Em in Bryant Park', src: '/people/DSC00436-Edit-portrait.webp' },
  { alt: 'Jenn in an alley', src: '/people/A7209214-Edit-portrait.webp' },
  { alt: 'Michael', src: '/people/A7404298-portrait.webp' },
  { alt: 'Ben over Rio Grande', src: '/people/DSC07716-Edit-portrait.webp' },
  { alt: 'Natalie at Liberty State Park', src: '/people/A7200334-portrait.webp' },
].map(image => ({
  ...image,
  hdSrc: image.src.replace(/(\.\w+)$/, '-hd$1'),
}));

export default People;
