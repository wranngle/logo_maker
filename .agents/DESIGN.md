# Logo Maker Design Contract

This project generates deployable Wranngle brand assets from one source mark.
The output should be boring in the best way: predictable dimensions, readable
contrast, no decorative surprises, and no hand-edited one-off exports.

## Asset Intent

- Favicons must preserve the source mark with transparent padding unless a
  platform requires an opaque background.
- Social assets use the logo as the subject, centered with enough safe area for
  previews, feed crops, and circular avatars.
- Generated files are build output. Do not commit `output/`.

## Colors

- Sunset 500: `#ff5f00`
- Night 950: `#12111a`
- Sand 50: `#fcfaf5`
- Violet 500: `#cf3c69`
- Cactus green: `#5d8c61`
- White: `#ffffff`
- Black: `#000000`

## Output Rules

- `favicon.ico`: valid ICO container with a 32x32 PNG image.
- `apple-touch-icon.png`: 180x180 PNG, opaque Night 950 background.
- `icon-192.png`: 192x192 PNG, transparent, 80 percent logo safe area.
- `icon-512.png`: 512x512 PNG, transparent, 80 percent logo safe area.
- `site.webmanifest`: relative icon paths so it works from the generated
  favicon directory.
- `og-image`: 1200x630, Night 950 background, centered mark.
- `profile`: 800x800, Night 950 background, centered mark with crop padding.
- `social-feed`: 1080x1350, Sunset 500 background, centered mark.

## Anti-Patterns

- Do not ship screenshots or generated prompt dumps as design documentation.
- Do not name PNG data URLs as SVG code.
- Do not save a PNG with an `.ico` extension.
- Do not claim "best practices" unless a test or spec enforces the behavior.
- Do not commit runtime logs, local output, or model-generated scratch files.
