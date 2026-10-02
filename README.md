# Archovia — Architecture Studio Template

A brutalist, editorial website template for architecture, interior and product-design studios.
Built with Astro 5, Tailwind CSS v4, GSAP and Lenis. Static output, deployable anywhere.

Designed & built by [Cheerio Studios](https://www.cheeriostudios.com/).

## Features

- **Poster-style "plates"** — giant display type, corner arrow, asterisk notes, full-bleed media
- **Smooth inertial scrolling** (Lenis) synced with scroll-driven animation (GSAP ScrollTrigger)
- **Motion library via data attributes** — no JavaScript needed to animate new content
- **Curtain page transitions**, auto-hiding header, scroll-progress bar
- **Micro-interactions** — magnetic buttons, label cursor, rolling nav labels, wipe-fill rows
- **Performance** — responsive WebP images, videos play only while visible, self-hosted fonts
- **Accessible** — skip link, focus rings, `prefers-reduced-motion` disables all motion
- **Zero-config deploy** to GitHub Pages (workflow included)

## Quick start

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check + static build into dist/
npm run preview   # serve the build
```

## Customising

| What | Where |
| --- | --- |
| Colours, fonts, type scale | `src/styles/global.css` → `@theme` |
| Studio name, email, nav, services, projects, products | `src/data/site.ts` |
| Images | `src/assets/images/` (auto-optimised) |
| Videos, logos, favicon, OG image | `public/` |
| Contact form backend | `formEndpoint` in `src/data/site.ts` (Formspree, Basin…) — empty falls back to `mailto:` |
| Domain | `site` in `astro.config.mjs` and `public/CNAME` |

### Rebranding in one place

All colour comes from six tokens. Swap `--color-brand` / `--color-brand-light` for a new accent:

| Accent | `brand` | `brand-light` |
| --- | --- | --- |
| Oxblood (default) | `#6e1a27` | `#d4878d` |
| Terracotta | `#9c4221` | `#e2a07f` |
| Corten | `#7a3b1d` | `#d39a6f` |
| Patina green | `#2f4a3f` | `#9cbfae` |

## Motion attributes

| Attribute | Effect |
| --- | --- |
| `data-split` / `data-split="load"` | Characters rise out of a mask on scroll / on page load |
| `data-fade` | Fade and rise on scroll |
| `data-stagger` | Children reveal one after another |
| `data-clip` | Media unveils bottom-up, image settles from a zoom |
| `data-parallax="0.15"` | Media drifts inside its frame (0–0.4) |
| `data-expand` | Block grows from inset to full-bleed while scrolling |
| `data-skew` | Leans with scroll velocity |
| `data-marquee` | Infinite ticker that reacts to scroll speed/direction |
| `data-magnetic="0.3"` | Pulled toward the pointer |
| `data-cursor="Label"` | Cursor expands with a label |
| `data-count` | Number counts up when visible |

Implementation: `src/scripts/motion.ts`.

## Deploying to GitHub Pages

Push to `main`, then set **Settings → Pages → Source → GitHub Actions**.

## Licences

Space Grotesk, Inter and Instrument Serif are SIL Open Font License. GSAP is free for commercial use
(standard "no charge" licence). Lenis is MIT. Replace the demo photography and video with assets you
hold rights to before resale.
