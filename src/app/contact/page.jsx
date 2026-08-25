import ContactClient from './ContactClient';
import {
  photographyServiceJsonLd,
  breadcrumbJsonLd,
  siteGraphJsonLd,
} from '@/lib/structured-data';

export const metadata = {
  title: 'Contact | Anthony Freay',
  description: 'Contact Anthony Freay for photography, software engineering, or design inquiries. Based in NYC and available for freelance projects.',
  alternates: {
    canonical: 'https://www.anthonyfreay.com/contact',
  },
  openGraph: {
    title: 'Contact | Anthony Freay',
    description: 'Contact Anthony Freay for photography, software engineering, or design inquiries. Based in NYC and available for freelance projects.',
    images: [{ url: 'https://www.anthonyfreay.com/me/A7406500.jpg', width: 1200, height: 630 }],
    url: 'https://www.anthonyfreay.com/contact',
  },
  twitter: {
    title: 'Contact | Anthony Freay',
    description: 'Contact Anthony Freay for photography, software engineering, or design inquiries. Based in NYC and available for freelance projects.',
    images: ['https://www.anthonyfreay.com/me/A7406500.jpg'],
  },
};

export default function Contact() {
  // The bio on this page is what states that Anthony is booking photography
  // sessions in New York, so the service node belongs here.
  const jsonLd = siteGraphJsonLd([
    photographyServiceJsonLd(),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Contact Anthony Freay</h1>
      <p className="sr-only">
        Contact Anthony Freay, a photographer and software engineer based in New York, NY,
        currently booking photography sessions. Reach out about portrait, live music, event,
        or editorial photography using the form below, or connect on Instagram, LinkedIn,
        or GitHub.
      </p>
      <ContactClient />
    </>
  );
}
