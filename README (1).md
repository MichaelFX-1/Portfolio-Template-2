# Lumen — Vanilla HTML/CSS/JS (+ TS) Portfolio Template

A standalone, zero-build port of the React Lumen template. Same colors, same
animations (blobs, ring, floating shapes, hover lifts, scroll reveals), same
edit mode, theme toggle, JSON import/export, and localStorage persistence.

## Files

- `index.html` — markup and section structure
- `styles.css` — all design tokens (oklch), glassmorphism, animations
- `app.js`    — runtime (rendering, edit mode, theme, import/export)
- `app.ts`    — typed source-of-truth for the data shape (`PortfolioData`)

## Run

Just open `index.html` in a browser, or serve the folder:

```bash
npx serve vanilla
```

## Optional: rebuild app.js from app.ts

```bash
npx tsc vanilla/app.ts --target es2020 --module none --outDir vanilla
```

The shipped `app.js` already includes the full runtime so the TS compile step
is optional — use it if you prefer editing TypeScript.
