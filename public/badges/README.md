# App Store & Google Play badges

**You don't need to do anything here to have working badges.** By default the
page renders store buttons using the real Apple and Google Play brand marks,
pulled from the [Simple Icons](https://simpleicons.org) set via
[`astro-icon`](https://www.astroicon.dev) (`@iconify-json/simple-icons`) and
inlined as SVG at build time — no runtime JS, no icon font, no external
request.

This folder is for the step after that. Drop the two *official* badge files
here and the page switches from the icon buttons to the real artwork
automatically — no code changes.

## Why bother, if the icon buttons already work

An icon set gives you the brand **glyph**. Apple and Google's marketing
guidelines ask for the full **lockup** — the complete "Download on the App
Store" / "Get it on Google Play" badge as they supply it — on a live link to
your listing. For a pre-launch waitlist page the icon buttons are fine; swap
in the official files when the listings go live.

## Required filenames

| Store | Save as | Where to get it |
| --- | --- | --- |
| Apple | `app-store.svg` (or `app-store.png`) | <https://developer.apple.com/app-store/marketing/guidelines/#section-badges> — "Download on the App Store" lockup, available as SVG in black and white |
| Google | `google-play.png` (or `google-play.svg`) | <https://play.google.com/intl/en_us/badges/> — pick your language, then download the generated PNG |

Either extension works for either store; the build uses whichever it finds.
On this dark background, use the **black** Apple badge (it has a white
wordmark on a black pill) and Google's standard badge.

## Why the artwork isn't committed here

Both companies supply the badge files and prohibit redrawing, recoloring,
rotating, or otherwise altering them. Downloading them yourself also means
you accept each company's marketing terms, which is how it's supposed to
work — the same reason no npm package ships the official lockups either.

## After you add them

The badges render at 48px tall (40px in the compact footer/hero rows).
Google's file includes its own built-in clear space, so it's rendered
taller with a negative margin to visually match Apple's — if your export
looks off, adjust `.badge-img[data-store='google']` in
`src/components/StoreBadges.astro`.

Both badges stay non-clickable with a "Coming soon" label underneath until
you set `live: true` and add the store URL in `src/data/site.ts`.

## Rules worth knowing

- Don't put the badge on a busy background; keep clear space around it
  equal to about a quarter of the badge height (the layout already does).
- Apple's badge must not be smaller than Google's when shown together.
- Don't add your own text inside or on top of the badge.
- Don't animate, skew, or outline them.
