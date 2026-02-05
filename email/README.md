# Newsletter Email Template

Branded HTML template for Beehiiv newsletter sends.

## Importing into Beehiiv

1. Go to **Beehiiv Dashboard > Templates > Create Template**
2. In the editor, switch to **Code View** (the `</>` icon)
3. Paste the contents of `newsletter-template.html`
4. Save as "The District — Article Announcement"
5. New posts can be created from this template

## Before first use

The header logo references `hamlet-h-mark.png`. You need to host this image:

- **Option A:** Upload `hamlet-h-mark.png` to Beehiiv's media library, then update the `src` URL in the template
- **Option B:** Upload to your CDN or `district.myhamlet.com/hamlet-h-mark.png`

Provide a **56x50px** PNG (2x retina) on a transparent background, white fill.

## Each send

Swap four things (marked with `<!-- EDIT -->` comments in the HTML):

1. **Article title** — the h1 text
2. **Key stat + label** — the big number and its caption (or delete the section)
3. **Article blurb** — 1-2 sentence hook
4. **Article URL** — the CTA button link

## Design notes

- **Fonts:** Georgia (web-safe fallback for Literata — most email clients can't load custom fonts)
- **Colors:** Navy `#00152e`, Indigo `#4f46e5`, light gray `#f4f4f7` background
- **Dark mode:** Handled via `prefers-color-scheme` media query (inverts to navy bg, light text)
- **Width:** 600px max (email standard)
