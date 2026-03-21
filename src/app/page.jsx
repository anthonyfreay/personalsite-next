import HomeClient from './HomeClient';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Anthony Freay',
    url: 'https://www.anthonyfreay.com',
    jobTitle: 'Photographer & Software Engineer',
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Anthony Freay | Photographer & Software Engineer</h1>
      <HomeClient />
    </>
  );
}
