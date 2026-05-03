# logo_maker
> Wranngle's modern asset pipeline for generating the "Essential 5" favicons and social assets.

![Status](https://img.shields.io/badge/status-stable-green.svg)

## What it does
Takes a source SVG (or base64 encoded PNG) and generates a complete suite of modern brand assets adhering to 2025/2026 best practices.

**The Pipeline outputs:**
- **The "Essential 5" Favicons**: `favicon.ico`, `icon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`.
- **PWA Ready**: Auto-generates `site.webmanifest`.
- **Modern Social Assets**: `og-image.png` (1200x630), `social-feed.png` (1080x1350 4:5 ratio), and padded `profile.png` (800x800).
- **Design System Aligned**: Utilizes the canonical `Night 950` and `Sunset 500` Wranngle brand tokens.

## Usage
Provide a source SVG or base64 PNG text file to generate the output directories.

```bash
bun run src/index.ts raw/orange_svg_code.txt
```

## License
See [LICENSE](LICENSE).
