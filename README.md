# YouChoose — Landing Page

Marketing landing page for the activity-matching app. Built with **Astro**,
deployed to **GitHub Pages** by a GitHub Actions workflow on every push to
`main`.

Zero runtime JavaScript frameworks, no external image hosts, no CSS
libraries — the whole page ships as one HTML file plus a ~1 KB script for the
signup form and the sticky nav.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321/youchoose-landing
npm run build    # outputs to ./dist
npm run preview  # serve the built output locally
```

---

## Before you deploy — 3 things to fill in

Everything you need to change lives in two files.

### 1. Your GitHub repo → `astro.config.mjs`

```js
const GITHUB_USER = 'YOUR-GITHUB-USERNAME';
const REPO_NAME   = 'youchoose-landing';
```

This is set up for a **project page** (`https://user.github.io/repo`). The
`base` path matters — get it wrong and the CSS won't load.

- Moving to a **user page** (repo named `yourname.github.io`)? Set
  `base: '/'`.
- Using a **custom domain**? Set `base: '/'`, point `site` at the domain, and
  add a `public/CNAME` file containing just the domain.

### 2. Your Google Form — ✅ already wired up

`FORM_ID` and `EMAIL_FIELD_ID` in `src/data/site.ts` are set to your live
form (`…cFvN5X1…`, field `entry.1825157573`). Submissions land in that
form's responses. Nothing to do here unless you swap forms later.

Two settings on the Form itself are worth confirming, because Google
silently rejects posts otherwise:

- **"Limit to 1 response"** must be **off** (it forces Google sign-in)
- The form must **not** be restricted to your organization

<details>
<summary>If you ever point this at a different form</summary>

Update `FORM_ID` from the new form's URL, then get its email field name
either way:

- **No devtools:** ⋮ menu → **Get pre-filled link** → type something in the
  email box → **Get link** → **COPY LINK** → paste the whole URL into
  `PREFILLED_LINK`. The field name is parsed out at build time. (Leaving
  the box empty produces a link with no `entry.` parameter — that's the
  common mistake.)
- **Directly:** right-click the email box on the live form → **Inspect**,
  copy the input's `name` attribute into `EMAIL_FIELD_ID`.

If neither is set, the button still validates and shows the thank-you, but
every submission logs a console warning naming the dropped address, so a
half-connected form can't ship unnoticed.

Prefer sending people to the form itself instead? Set `mode: 'link'`.

</details>

### How the signup behaves

- Submits by posting the real `<form>` into a hidden iframe, so the visitor
  never leaves the page and nothing else on it moves. This is deliberately
  not `fetch`: Google Forms sends no CORS headers, so a fetch must run in
  `no-cors` mode, which fails outright behind privacy extensions, strict
  tracking protection, and proxies that block `docs.google.com` — the
  visitor would see an error even though their address was fine. A native
  form POST isn't subject to CORS at all.
- Validation runs in three steps, each with its own message: empty → missing
  `@` → malformed. The field is flagged with `aria-invalid` as well as the
  message below it, and the error clears as soon as they start typing.
- On success the form is replaced in place by a "Thanks for joining the
  waitlist" block. Both signup blocks switch together, so someone who signs
  up in the hero isn't asked again by the CTA section further down.
- With JavaScript off, the `<form>` still has a real `action` and `method`
  and posts natively to Google's own confirmation page.

### 3. Your app store links → `src/data/site.ts`

The badges render out of the box as store buttons using the real Apple and
Google Play brand marks, pulled from [Simple Icons](https://simpleicons.org)
via [`astro-icon`](https://www.astroicon.dev) and inlined as SVG at build
time. Nothing to download.

They stay non-clickable "Coming soon" buttons until your listings exist.
When they do, paste the URL and flip `live: true`:

```ts
{ id: 'apple', name: 'App Store', preLabel: 'Download on the', live: true,
  url: 'https://apps.apple.com/us/app/...' }
```

The badge becomes a real link automatically.

> **Upgrading to the official lockups at launch:** an icon set gives you the
> brand glyph; Apple and Google's guidelines ask for their full supplied
> badge ("Download on the App Store" / "Get it on Google Play") on a live
> store link. Grab those from
> [Apple](https://developer.apple.com/app-store/marketing/guidelines/) and
> [Google](https://play.google.com/intl/en_us/badges/), save them as
> `public/badges/app-store.svg` and `public/badges/google-play.png`, and the
> build detects them and switches over — no code change. Details in
> `public/badges/README.md`.

---

## Turning on GitHub Pages

One-time, in the repo:

**Settings → Pages → Build and deployment → Source: _GitHub Actions_**

(Not "Deploy from a branch" — the workflow uploads the build artifact
directly.)

Then push to `main`. `.github/workflows/build.yml` installs, builds, and
deploys. You can also trigger it by hand from the **Actions** tab.

---

## Where things live

```
astro.config.mjs                  base path + site URL  ← EDIT
.github/workflows/build.yml       build + deploy to Pages
public/
  .nojekyll                       stops Pages from mangling _-prefixed files
  robots.txt
src/
  data/site.ts                    ALL copy, form config, store links  ← EDIT
  layouts/BaseLayout.astro        <head>, meta/OG tags, favicon
  pages/index.astro               page structure + section styles
  styles/global.css               design tokens, buttons, utilities
  components/
    Nav.astro                     sticky header + persistent CTA
    PhoneMockup.astro             hero visual (HTML + inline SVG)
    SignupForm.astro              email capture → Google Forms
    StoreBadges.astro             App Store / Google Play badges
    FeatureIcon.astro             inline SVG icon set
    Footer.astro
```

**Copy changes almost never require touching a component.** Headline,
subhead, steps, features, FAQ, categories, and every microcopy string are in
`src/data/site.ts`.

---

## Logo & app icon

The mark is two swipe cards with one check across the seam — the cards are
the two people, the single check is "you both said yes". The geometry lives
in `src/components/Logo.astro` and everything else is exported from it: nav,
footer, favicon, PWA icons, the 1200×630 link-preview card, and both store
icons.

Store-ready files are in `public/brand/`:

| File | Spec |
| --- | --- |
| `app-store-1024.png` | 1024×1024, 24-bit, no alpha, square |
| `google-play-512.png` | 512×512, 32-bit with alpha |
| `adaptive-foreground.svg` + `adaptive-background.svg` | Android launcher icon |

Both store icons are square on purpose — Apple and Google apply their own
corner masks, and a pre-rounded icon gets rounded twice. `public/brand/README.md`
covers the full asset list, the color rules, and how to re-export.

## Renaming the app

The product name appears once, in `site.name`. Change it there and it
updates across the nav, body copy, footer, page title, and social preview.
The only other places the string is hard-coded are the repo/folder name and
the `contactEmail`.

---

## Design notes

- **Above the fold:** eyebrow, headline, one-sentence benefit, email field,
  proof points, and store badges all land before the first scroll at
  1440×900 and on a 390px phone.
- **F-pattern:** copy is left-aligned in the left column, the visual sits
  right, so the eye starts where English readers start and the CTA falls on
  the second horizontal sweep.
- **CTA contrast:** the neon gradient button is the only element on the page
  using that treatment, so it reads as the single action.
- **Two CTAs, one destination:** the hero form and the mid-page form both
  post to the same list; the nav button scrolls to the second one, so the
  CTA is reachable from any scroll position.
- **Responsive:** fluid type (`clamp()`) rather than breakpoint jumps; layout
  breakpoints at 560 / 620 / 640 / 720 / 820 / 900 / 1000px. Verified with no
  horizontal overflow down to 320px.
- **Accessibility:** visible focus rings, a skip link, `aria-live` status
  messages on the form, labelled inputs, and `prefers-reduced-motion`
  honored.
- **Performance:** no framework, no external images, inline SVG favicon.
  Google Fonts is the only third-party request, with a full system-font
  fallback stack if it fails.
