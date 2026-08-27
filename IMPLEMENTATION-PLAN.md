# Implementation Plan

**Created:** 2026-08-27
**Scope:** three pieces of work, none started. Each is its own branch so they can be reviewed, shipped and reverted independently.

| branch | scope | risk | blocked on |
|---|---|---|---|
| **A** `fix/contact-form-a11y` | contact form: broken label, missing field names, autofill, error handling | low — pure fix | nothing |
| **B** `style/uppercase-nav-labels` | all-caps footer + `/work` tiles, `B & W` → `BLACK AND WHITE` | medium — footer width | open question B4 |
| **C** `feat/visible-gallery-headings` | reveal the seven existing `<h1>`s | medium — moves the grid | open question C2 |

**A is independent.** **B and C interact:** if both land, the heading case in C should match whatever B settles on, so whichever ships second follows the first.

---

## Branch A — `fix/contact-form-a11y`

`/contact` is the one page where someone is actively trying to hire you, and the form has a real bug plus accessibility gaps that could silently lose an enquiry.

### A1. Fix the dangling label — **bug**

```jsx
<label htmlFor="check">Terms of Service*…</label>
<select name="check" required>   // ← name, but no id
```

Verified in the rendered HTML: `label for="check"` points at **an element that does not exist**. Clicking the label does nothing and screen readers get no association. It is the only `<label>` on the form.

**Fix:** add `id="check"` to the `<select>`.

### A2. Give every field an accessible name

Audited from the built output — no field has one:

| field | `id` | `<label>` | `aria-label` |
|---|---|---|---|
| `fname` | ✅ | ❌ | ❌ |
| `lname` | ✅ | ❌ | ❌ |
| `_replyto` (email) | ❌ | ❌ | ❌ |
| `_subject` | ❌ | ❌ | ❌ |
| `message` | ❌ | ❌ | ❌ |
| `check` | ❌ | broken | ❌ |

`fname`/`lname` have ids but nothing points at them, so those ids do nothing today.

**Placeholders are not accessible names.** They also disappear the moment someone starts typing, so sighted users lose the field's meaning mid-entry too.

**Fix:** a real `<label>` per field, `sr-only` where the design wants placeholder-only. Placeholders stay exactly as they look now; this only adds what assistive tech and autofill need.

### A3. Autofill

No field has `autocomplete`. Add `given-name`, `family-name`, `email`. Cheap, and removes real friction on mobile.

### A4. General error state + live region

`ValidationError` handles per-field errors, but a whole-submission failure — network drop, Formspree down or over quota — renders **nothing**. The form appears inert and the enquiry is lost silently.

**Fix:** a `role="alert"` region for non-field errors, and `aria-live="polite"` on the success message so it is announced rather than only seen.

### A5. Reset on success

The form does not clear, and the current copy says *"Please refresh to send a new message."* After a successful send the fully-populated form sits next to a thank-you.

**Fix:** reset on success, drop the refresh instruction.

### Verification

- Rendered HTML: zero dangling `for=` targets; every control has an accessible name
- A real submission through Formspree end to end
- The failure path, by blocking the endpoint
- Keyboard-only pass through the whole form

### Deliberately excluded — design calls, not bugs

- **`<select>` → checkbox** for the terms acknowledgement. A select with "Select" / "Yes, I understand" is unconventional; a checkbox is the expected control and one fewer interaction. Not a defect, so not bundled with fixes.
- **A visible email link in the bio.** The copy says *"reach out directly via email"* but the only `mailto:` links on the page are the footer icons. Worth an actual link near that sentence.

---

## Branch B — `style/uppercase-nav-labels`

### B1. `B & W` → `BLACK AND WHITE`

Four occurrences, and **one is not cosmetic**:

| file | role |
|---|---|
| `src/lib/constants.js` (`ROUTES`) | feeds the `/404` gallery links |
| `src/components/Footer.jsx` | hardcoded — the footer does **not** read `ROUTES` |
| `src/app/work/WorkClient.jsx` | tile caption |
| `src/app/bw/page.jsx` | **`BreadcrumbList` JSON-LD** |

The breadcrumb name can surface in Google results, so it should read **`Black and White`** in title case — **not** shouty caps. Uppercase belongs in CSS, not in content.

### B2. Uppercase presentationally, not in the source strings

Add `text-transform: uppercase` (plus a little `letter-spacing` — all-caps reads poorly at small sizes without it) to:

- `Footer.module.css` → `.pages`
- `WorkClient.module.css` → `.figcaption`

Keeping the source strings title-case means the JSON-LD, the 404 page and any future consumer stay readable, while the two surfaces that should shout do.

### B3. The layout risk — the real work here

`B & W` → `BLACK AND WHITE` is **5 → 15 characters**. The footer row goes **38 → 48 characters across 7 links**, and at the mobile breakpoint `.pages` is already `font-size: 0.8rem`. This will plausibly wrap or overflow.

`/work` tiles are lower risk — captions sit under 400px-wide tiles with room to wrap.

**Check at 2560 / 1440 / 900 / 412 before merging.**

### B4. Open question — footer fallback

If `BLACK AND WHITE` does not fit the footer:

1. `BLACK & WHITE` — 13 chars, still full-ish, likely fits
2. Let the footer wrap to two lines on narrow screens
3. `BLACK AND WHITE` on `/work` tiles only, shorter in the footer

Recommendation: build it as specified, screenshot it, decide from the result rather than pre-emptively compromising.

### Verification

- Screenshots of footer and `/work` at all four widths
- `BreadcrumbList` still emits `Black and White` (title case) — check the built HTML
- `/404` gallery links still render

---

## Branch C — `feat/visible-gallery-headings`

### C1. What already exists

Every gallery has a well-written `<h1>` — it is just `sr-only`:

| route | heading |
|---|---|
| `/live` | Concert Photography |
| `/bw` | Black & White Photography |
| `/people` | Portrait Photography |
| `/places` | Travel & Landscape Photography |
| `/cars` | Automotive Photography |
| `/events` | Event Photography |
| `/work` | Photography Portfolio |

So this is **revealing copy that is already there**, not writing new copy.

Each `<h1>` is followed by a separate `sr-only` `<p>` — the descriptive paragraph. That should **stay hidden**: it is keyword-dense SEO prose, not page furniture.

### C2. Open question — styling

Needs a decision before building:

- **Placement** — above the grid, or beside/overlapping it
- **Case** — plain, or all-caps to match Branch B
- **Scale** — the site's type is restrained; the navbar wordmark is ~1.8rem
- **Spacing** — a heading pushes the grid down, which costs above-the-fold imagery

Alternative: build with a restrained default, screenshot it, and decide from that.

### C3. Structure

The heading is identical in shape across seven routes. Two options:

- **A shared `<GalleryHeading>` component** — one place to change, consistent by construction
- **A class in `globals.css`** — lighter, but seven call sites to keep in sync

Recommendation: the component, matching how `GalleryImage` already consolidates duplicated rendering.

### C4. Performance consequence — must re-measure

Pushing the grid down means **fewer tiles above the fold**, which can change which element is the LCP.

The masonry eager/preload budget is currently tuned to `index < 4` preload / `index < 8` eager, sized for the *current* first two rows. If a heading displaces a row, that budget may need adjusting.

CLS should stay 0 — the heading is static and present at first paint — but verify rather than assume.

### C5. SEO upside worth noting

A **visible** `<h1>` is stronger than a hidden one. Google is explicitly wary of text hidden from users, and `sr-only` headings sit in that grey area. Making these visible removes the ambiguity on all seven pages — a small but real improvement on top of the indexation work in `SEO-PLAN.md`.

### Verification

- Heading renders on all seven routes; exactly one `<h1>` per page
- The `sr-only` `<p>` is still hidden
- Screenshots at 2560 / 1440 / 900 / 412
- Lighthouse on `/events` and `/live` after the shift — LCP and CLS

---

## Suggested order

1. **A** — independent, lowest risk, and it is the page where a defect costs the most.
2. **B** — settles the all-caps question that C then follows.
3. **C** — inherits B's case decision; re-measure after.

## Open questions summary

- **B4** — footer fallback if `BLACK AND WHITE` does not fit
- **C2** — heading placement, case, scale, spacing

Both can be answered from a screenshot rather than up front, if preferred.
