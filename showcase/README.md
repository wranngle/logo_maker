# Wranngle Brand Motion

Two artifact families:

1. **Lasso Reveal** — WebGL particle film: rope whips, shatters, swarms back, forms
   the brand mark. Card mode (wordmark + transport hidden) is the default; append
   `?ui=1` to bring them back for tuning. Six named looks, full parameter rack,
   deterministic scrubber.
2. **Feature Cards** — three Canvas 2D animation variants built to drop into the
   `#features` section of the marketing site: Coverage, Qualify, Handoff. The rope
   narrates each one. See `cards/README.md` for the integration snippet.

## Files

| File | Purpose |
|---|---|
| `lasso-reveal.html` | Source artifact. Pairs with `logo-data.js`. |
| `logo-data.js` | Base64-embedded source PNG sampled at runtime. |
| `lasso-reveal.standalone.html` | Single self-contained file (logo inlined). Drop anywhere. |
| `screenshots/timeline/` | 9 captures across one loop (whip → burst → swarm → mark → dissolve). |
| `screenshots/presets/` | The 6 named looks at the held-mark beat (`t = 7.6 s`). |

## Controls

| Key / UI | Action |
|---|---|
| Spacebar | Play / pause |
| ← / → | Step −0.1 s / +0.1 s |
| Scrubber | Seek any frame (state persists per session) |
| Gear | Open parameter rack (5 groups, 22 sliders, 6 named presets, randomize, reset) |
| `?t=<sec>&play=0` | Deep-link a frozen frame |
| `?preset=<name>` | Boot into a named look (e.g. `?preset=Plasma`) |

## Named looks

`Branded` · `Inferno` · `Ghost lasso` · `Plasma` · `Hairline` · `Supernova`.

## What's tunable

- **Whip** — force, crack snap, rope body
- **Embers** — count, size, scatter radius, turbulence
- **Tracers** (orb_forge-style comets) — count, speed, head size, tail length, glow
- **Glow & post** — bloom, bloom radius, chromatic aberration, vignette, exposure,
  saturation, contrast, hue-shift
- **Camera & time** — playback speed, drift, group spin

## Local preview

```bash
cd showcase && python3 -m http.server 8731
# → http://localhost:8731/lasso-reveal.html
```

The standalone file works from `file://` too — three.js is loaded from CDN on first run.
