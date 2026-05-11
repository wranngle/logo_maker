# logo_maker
Generate Wranngle favicon, web manifest, and social preview assets from one PNG
or SVG source.

![CI](https://github.com/wranngle/logo_maker/actions/workflows/ci.yml/badge.svg)

## Outputs

- `output/favicons/favicon.ico`
- `output/favicons/apple-touch-icon.png`
- `output/favicons/icon-192.png`
- `output/favicons/icon-512.png`
- `output/favicons/icon.svg` when the input is SVG
- `output/favicons/site.webmanifest`
- `output/social/og-image.png` and `og-image.webp`
- `output/social/profile.png`
- `output/social/social-feed.png` and `social-feed.webp`

## Usage

Install dependencies, then pass a PNG, SVG, or PNG/SVG data URL text file.

```bash
bun install
bun run generate -- raw/logo-data-url.txt
```

Useful options:

```bash
bun run generate -- raw/logo-data-url.txt \
  --output dist/assets \
  --app-name Wranngle \
  --short-name Wranngle
```

Run the full local check:

```bash
bun run check
```
