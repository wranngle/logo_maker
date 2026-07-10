![terminal recording: bun run generate builds favicons, a web manifest, and social assets from one source file, then a find listing shows the output tree](demo/hero.gif)

# logo_maker

> generate Wranngle favicon, web manifest, and social preview assets from one PNG or SVG source

![CI](https://github.com/wranngle/logo_maker/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/github/license/wranngle/logo_maker?color=A371F7)
![Status](https://img.shields.io/badge/status-active-brightgreen)

> [!NOTE]
> Personal tool. I use this. You can too.

## Quick start

```bash
git clone https://github.com/wranngle/logo_maker.git
cd logo_maker
bun install
```

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

Pass a PNG, SVG, or PNG/SVG data URL text file.

```bash
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

## License

[MIT](LICENSE)
