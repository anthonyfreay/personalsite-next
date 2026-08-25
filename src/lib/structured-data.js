// Shared JSON-LD builders.
//
// Every gallery page previously inlined its own author/Person block, so the
// same facts were restated six times and could drift. Google resolves a site to
// a real-world entity partly by seeing consistent, repeated claims about it, so
// consistency here is the point, not just DRY-ness.
//
// Only facts that are actually verifiable from this repo appear below - the
// bio on /contact, the profile links in Icons.jsx, and src/lib/constants.js.
// Do not add address details, phone numbers, prices, hours or review data
// unless they are real: fabricated structured data is a liability, not a boost.

import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  DEFAULT_IMAGE_ABS,
} from './constants';

/** Profile URLs, mirrored by rel="me" links in src/components/Icons.jsx. */
export const PROFILE_URLS = [
  'https://www.instagram.com/anthonyfreay',
  'https://www.linkedin.com/in/anthonyfreay',
  'https://github.com/anthonyfreay',
];

export const CONTACT_EMAIL = 'anthonyfreay@gmail.com';

/**
 * The canonical Person node. Referenced by @id everywhere else so the whole
 * site describes one entity rather than many lookalike copies.
 */
export const PERSON_ID = `${SITE_URL}/#person`;

export const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: 'Photographer & Software Engineer',
  description: SITE_DESCRIPTION,
  image: DEFAULT_IMAGE_ABS,
  email: `mailto:${CONTACT_EMAIL}`,
  knowsAbout: ['Photography', 'Software Engineering', 'Design'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New York',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
  sameAs: PROFILE_URLS,
};

/** A compact reference to the Person, for use as author/creator. */
export const authorRef = { '@id': PERSON_ID };

const withContext = (node) => ({ '@context': 'https://schema.org', ...node });

export const personJsonLd = () => withContext(person);

/**
 * ImageGallery + Photograph nodes for a gallery route.
 * `images` are manifest entries ({ alt, src }); src is site-relative.
 */
export const imageGalleryJsonLd = ({ name, description, path, images }) =>
  withContext({
    '@type': 'ImageGallery',
    name,
    description,
    url: `${SITE_URL}${path}`,
    author: authorRef,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    image: images.map((image) => ({
      '@type': 'Photograph',
      name: image.alt,
      url: `${SITE_URL}${image.src}`,
      author: authorRef,
      creator: authorRef,
      copyrightHolder: authorRef,
    })),
  });

/**
 * Breadcrumbs. Google uses these for the SERP path display and to understand
 * how a deep page relates to the rest of the site.
 */
export const breadcrumbJsonLd = (crumbs) =>
  withContext({
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  });

export const webSiteJsonLd = () =>
  withContext({
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: authorRef,
    inLanguage: 'en-US',
  });

/**
 * The booking side of the site. The /contact bio states that Anthony is
 * currently booking photography sessions and is based in New York, NY - that
 * is the whole basis for this node. It carries no address, hours, pricing or
 * ratings because none of those are known here; adding real ones later would
 * strengthen it considerably.
 */
export const photographyServiceJsonLd = () =>
  withContext({
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#photography-service`,
    name: `${SITE_NAME} Photography`,
    url: `${SITE_URL}/contact`,
    image: DEFAULT_IMAGE_ABS,
    description:
      'Photography by Anthony Freay - portraits, live music, events and editorial work, based in New York City and available for booking.',
    provider: authorRef,
    founder: authorRef,
    email: `mailto:${CONTACT_EMAIL}`,
    areaServed: {
      '@type': 'City',
      name: 'New York',
      containedInPlace: { '@type': 'State', name: 'New York' },
    },
    serviceType: [
      'Portrait photography',
      'Live music photography',
      'Event photography',
    ],
    sameAs: PROFILE_URLS,
  });

/** Convenience: emit several nodes as one @graph script payload. */
export const graphJsonLd = (nodes) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.map(({ '@context': _ctx, ...node }) => node),
});

/**
 * The graph every page should emit: the WebSite and Person nodes that the
 * page-specific nodes reference by @id, plus those nodes.
 *
 * Declaring both on every page keeps each document's graph self-contained, so
 * an `author` or `isPartOf` reference always resolves without a crawler having
 * to have already fetched the home page.
 */
export const siteGraphJsonLd = (nodes = []) =>
  graphJsonLd([webSiteJsonLd(), personJsonLd(), ...nodes]);
