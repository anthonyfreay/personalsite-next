import ContactClient from './ContactClient';

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
  return (
    <>
      <h1 className="sr-only">Contact Anthony Freay</h1>
      <ContactClient />
    </>
  );
}
