# Archovia brand kit

Exported from the Archovia website (`src/styles/global.css`, `src/components/Icons.astro`, `public/brand/`).

## Logo files

| File | Use |
| --- | --- |
| `archovia-mark-{ink,paper,oxblood}` | Primary mark, solid. Ink on light grounds, paper on dark or oxblood. |
| `archovia-mark-outline-{ink,paper,oxblood}` | Outline mark from the original artwork. Over photography, embossing, etching. |
| `archovia-lockup-horizontal-{ink,paper}` | Primary lockup (site header proportions: mark 32, wordmark 18, gap 12). |
| `archovia-lockup-stacked-{ink,paper}` | Square-ish formats: plaques, covers, merch. |
| `archovia-wordmark-{ink,paper,oxblood}` | Wordmark alone, Space Grotesk Bold, +8% tracking, converted to outlines. |
| `archovia-app-icon` / `archovia-avatar-oxblood` | 1024 × 1024 social avatar and app icon. |

SVGs are master files; PNGs are transparent exports (marks 1200 px tall, lockups and wordmarks 2400 px wide, icons 1024 px).

## Rules

- Construction: isometric 30° grid. Module M = ¼ mark width, unit U = 1⁄16 mark height. Bars are 2U, gaps 1U.
- Clear space: 1M on every side.
- Minimum size: 24 px tall on screen, 10 mm in print.
- Don't stretch, rotate, recolour outside the palette, add effects or set in low contrast.

## Colour

| Token | Hex | Role |
| --- | --- | --- |
| ink | #0E0D0C | Page frame, dark plates (≈60%) |
| ink-2 | #171513 | Dark plates, footer |
| ink-3 | #282522 | Rules, media placeholders |
| paper | #EFEBE4 | Poster plates, text on ink (≈28%) |
| paper-2 | #E2DDD3 | Secondary light surface |
| concrete | #928C83 | Muted text on ink |
| concrete-dark | #5F5A53 | Body text on paper |
| brand (oxblood) | #6E1A27 | Accent, hover fills, page curtain (≈4%) |
| brand-light | #D4878D | Accent on dark surfaces, links |

## Type

Space Grotesk (display, uppercase) · Inter (body) · Instrument Serif Italic (one accent word per headline) · JetBrains Mono (measurements and sheet numbers). All are SIL Open Font License, free on Google Fonts.

`tokens/archovia-tokens.css` and `.json` hold the full set: colours, fonts, type scale, spacing and motion.
