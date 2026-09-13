# YouChoose brand assets

The mark is **two swipe cards tilted toward each other with one check laid
across the seam**. The cards are the two people; the single check is the
product — not "I approved this", but *you both said yes*.

The geometry lives in one place: `src/components/Logo.astro`. Everything in
this folder is exported from it. Change the component, then re-export.

## Colors

| Token | Hex | Used for |
| --- | --- | --- |
| Teal | `#2ee6c4` | Left card ("you") |
| Violet | `#7d6bff` | Right card ("them") |
| White | `#ffffff` | The check |
| Ground | `#070a17` | Icon plate |

## Files

### Store submissions

| File | Spec | For |
| --- | --- | --- |
| `app-store-1024.png` | 1024×1024, **24-bit, no alpha**, square | Apple App Store |
| `google-play-512.png` | 512×512, **32-bit with alpha** | Google Play listing |

Both are deliberately **square with no rounded corners** — Apple and Google
each apply their own corner mask, and a pre-rounded icon gets double-rounded
and looks wrong. Apple additionally rejects icons containing an alpha
channel, which is why those two files have different color modes.

### Android launcher (adaptive icon)

| File | Notes |
| --- | --- |
| `adaptive-foreground.svg` / `adaptive-foreground-432.png` | Mark scaled to 62% so it sits inside the 66% safe circle — Android crops the outer ring to whatever shape the launcher uses |
| `adaptive-background.svg` | Flat `#070a17` |

### Web

| File | Used by |
| --- | --- |
| `logo.svg` | Master mark, transparent background |
| `logo-512.png` | Raster mark, transparent, for slides and docs |
| `icon.svg` | Square plate version (source for the store PNGs) |
| `icon-rounded.svg` | Rounded plate, for web contexts that don't mask |
| `icon-192.png`, `icon-512.png` | PWA / Android Chrome |
| `apple-touch-icon.png` | 180×180, iOS home screen |
| `og.png` | 1200×630 link preview card |

The favicon is inlined as an SVG data URI in `BaseLayout.astro`, so it costs
no extra request; the PNGs above cover platforms that ignore SVG favicons.

## Re-exporting after a change

The PNGs are rendered from the SVGs at the exact sizes above. Any
SVG→PNG tool works (`rsvg-convert`, Inkscape, Figma, or a headless browser
screenshot). Afterwards, fix the two color modes — they are not optional:

```bash
python3 -c "
from PIL import Image
Image.open('app-store-1024.png').convert('RGB').save('app-store-1024.png')
Image.open('google-play-512.png').convert('RGBA').save('google-play-512.png')
"
```

## Usage rules

- Keep clear space around the mark of at least 25% of its height.
- Don't recolor the cards, restyle the check, or add effects — the two-color
  split is the whole idea.
- On light backgrounds use `icon-rounded.svg` (the dark plate) rather than
  the bare mark; the white check needs a dark ground behind it.
- Minimum size for the bare mark is about 20px. Below that use the plate
  version, where the check still reads against the dark square.
