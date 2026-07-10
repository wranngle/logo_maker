![terminal recording: bun run generate builds favicons, a web manifest, and social assets from one source file, then a find listing shows the output tree](demo/hero.gif)

# logo_maker

> every favicon, manifest, and OG image Wranngle ships starts as one PNG or SVG here

![CI](https://github.com/wranngle/logo_maker/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/github/license/wranngle/logo_maker?color=A371F7)
![Status](https://img.shields.io/badge/status-active-brightgreen)

> [!NOTE]
> Personal tool. I use this. You can too.

## What it does

You point it at one logo (PNG, SVG, or a data-url text file); it emits favicons, a web manifest, and social preview images. The browser tab icon, the home-screen icon, and the link-preview card all come from the same source, so they never drift apart. Edit the source, rerun, and every derivative updates.

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

Pass a PNG, SVG, or PNG/SVG data URL text file:

```bash
bun run generate -- raw/logo-data-url.txt
```

Flags: `--output <dir>` (default `./output`), `--app-name`, `--short-name`, `--theme-color <hex>`, `--background-color <hex>`, `--help`.

Subcommands:

```bash
bun run generate -- palette raw/logo-data-url.txt        # palette.css + palette.json; --output, --count
bun run generate -- kit "Wranngle" --color ff5f00        # brand kit; --out, --type serif|sans|display|mono, --og minimal|bold|gradient
bun run generate -- variations "Wranngle" --color ff5f00 # wordmark, monogram, icon, dark, light SVGs; --out
```

Lint, typecheck, test:

```bash
bun run check
```

## License

[MIT](LICENSE)
