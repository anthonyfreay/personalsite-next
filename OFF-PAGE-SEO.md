# Off-Page SEO — Action Checklist

**Created:** 2026-08-24
**Why this file exists:** the technical work in `SEO-PLAN.md` fixes what was *blocking* indexation. It does not create demand. With 4 indexed pages and 0–7 impressions/day, the binding constraint is that almost nothing on the web points at anthonyfreay.com. That is fixed off the site, not in this repo.

---

## What was done in-repo to support this

Off-page signals only pay off if Google can confidently resolve the site to a **single real-world entity**. That part is code, and it is now in place:

- **`rel="me"` on the Instagram, LinkedIn and GitHub links** in `src/components/Icons.jsx`. This is the standard machine-readable claim of "these profiles are me." It is also what makes the reciprocal links in step 1 below actually verifiable rather than just traffic.
- **One canonical `Person` node**, defined in `src/lib/structured-data.js` and emitted on every page with a stable `@id` (`https://www.anthonyfreay.com/#person`), carrying `sameAs` for all three profiles, `jobTitle`, `knowsAbout` and NYC locality.
- **`WebSite` node** with the Person as `publisher`, also on every page.
- **`ProfessionalService`** on `/contact`, reflecting that the bio states Anthony is booking photography sessions in New York.
- **`BreadcrumbList`** on every non-home page, for SERP path display.
- **Self-contained graphs** — every page declares the nodes it references, so `author` / `isPartOf` resolve without a crawler needing the home page first. Verified programmatically: no dangling `@id` on any route.
- **`max-image-preview:large`** so Google may show full-size thumbnails — meaningful for a photography portfolio.
- Every `Photograph` node carries `author`, `creator` and `copyrightHolder` pointing at the same Person.

**The consequence:** each inbound link below now reinforces one entity instead of an anonymous URL.

---

## 1. Reciprocal profile links — do this first

Highest value per minute of effort, and it activates the `rel="me"` work above. Each profile must link **back** to `https://www.anthonyfreay.com`.

- [ ] **Instagram** — website field set to `https://www.anthonyfreay.com`
- [ ] **LinkedIn** — Contact info → Website; also add the site to the Featured section
- [ ] **GitHub** — profile Website field; also add it to the profile README if one exists

Two things to get right:

- Use the **`www`** form. The apex 301-redirects, and a link to the redirecting form is marginally weaker.
- Keep the name and description **identical** across profiles. Consistency is what lets Google merge them into one entity. Suggested description, taken from the site's own bio so nothing is invented:

  > Anthony Freay — photographer and software engineer based in New York, NY. Portraits, live music, and events. anthonyfreay.com

---

## 2. Photography-specific directories and communities

Generic backlink directories are worthless. These are places where a photography portfolio is genuinely relevant:

- [ ] **Behance** or **Dribbble** portfolio linking to the site
- [ ] **Flickr** / **500px** profile with the site in the bio
- [ ] A **Mastodon** profile, if of interest — the profile "website" field supports `rel="me"` verification, which the site now reciprocates
- [ ] Local NYC creative directories and photographer listings
- [ ] Relevant subreddits (r/photocritique, r/itookapicture) — participate genuinely; drive-by link drops get removed and can hurt

---

## 3. Credit links — the biggest realistic opportunity

The `alt` text already names **Tyler, the Creator, Daniel Caesar, Jack Harlow, Nicki Minaj, Gracie Abrams, J Balvin, Chelsea Cutler, Lizzy McAlpine, Jaden Smith, Lauv** and others. Concert photography has an established credit culture, and these are exactly the queries with long-tail potential.

- [ ] When artists, managers, or venues repost a photo, ask for a **link** credit, not just an @mention. A link is an SEO signal; a mention is not.
- [ ] Offer photos to venue and promoter sites in exchange for a photographer credit linking to the relevant gallery (e.g. `/live`), not just the home page.
- [ ] Music blogs and local press covering a show you shot are often glad to use a photo for a credit link.
- [ ] If any images are already in use uncredited, a polite request for attribution is both a rights matter and a backlink.

**Caveat worth stating:** deep-linking to `/live` rather than `/` spreads authority to the page that should rank for concert-photography queries.

---

## 4. Content depth — what makes links *worth* earning

This is the honest limiter. The site is nine pages of image grids with almost no prose. There is very little for anyone to link *to*, and `alt` attributes alone rank weakly.

- [ ] **Per-shoot writeups.** A short post per show or session — venue, artist, what the night was like, gear and settings — creates indexable long-tail surface that a grid cannot. This is the single highest-impact content change available.
- [ ] **Name subjects in visible text, not only `alt`.** "Tyler, the Creator at Barclays Center" as a caption is far stronger than the same string in an attribute.
- [ ] **A short about/bio page** beyond the `/contact` blurb, expanding on background and approach.

A journal or `/blog` section would also give `changefreq: weekly` on the home page something true to point at.

---

## 5. Local SEO — only if bookings are a goal

The `/contact` bio says Anthony is currently booking sessions. If that is a real priority:

- [ ] **Google Business Profile** as a service-area business. This is the biggest single lever for "photographer near me" style queries, and nothing in the repo can substitute for it.
- [ ] Once it exists, add the verified address and phone to `photographyServiceJsonLd()` in `src/lib/structured-data.js` — it deliberately omits them today because they are not known here.
- [ ] Consider a services page describing session types. Deciding this is what open question 4 in `SEO-PLAN.md` was asking.

> **Do not** add address, phone, hours, pricing or review markup to the structured data until they are real. Fabricated local data is a liability, and Google penalises review markup that does not correspond to genuine reviews.

---

## 6. Measurement

- [ ] **GSC → Links** — track referring domains over time; this is the metric that should move.
- [ ] **GSC → Performance** — watch impressions for branded ("anthony freay") vs. non-branded queries separately. Branded lifting first is normal and confirms the entity work landed.
- [ ] Re-check **Coverage** in ~2 weeks. Expect indexed pages to rise.
- [ ] **Expect "Page with redirect" to stay at 6 and keep failing validation.** Those are intentional canonicalization redirects. Not a regression — see `SEO-PLAN.md` §P2.

---

## Honest expectations

Technical SEO removed the blockers; it does not manufacture demand. A nine-page portfolio competing for terms like "concert photography" against publications and stock agencies will not rank on technical merit alone.

Realistically:

- **Branded queries** ("anthony freay", "anthony freay photography") should improve fairly quickly — that is what the entity consolidation targets, and it is winnable.
- **Long-tail artist and venue queries** are the realistic non-branded opportunity, and they depend on §3 and §4 far more than on anything in this repo.
- **Head terms** ("nyc photographer") are a multi-year proposition requiring sustained content and links. Worth being clear-eyed rather than optimistic.

The ordering above is deliberate: §1 costs minutes, §3 and §4 are where the actual growth is.
