# Wranngle Feature Cards — Animation Variants

Three Canvas 2D animation routines built to replace the placeholder visuals in
the `#features` section of the marketing site. Each routine is a pure function
of time so the loop is exact and the file is droppable into any React component.

## Concept

The wranngle.com `#features` section is three cards describing the agent flow.
The current visuals (clock with dots, bar chart, call mockup) don't use the
Wranngle rope at all. These variants make the rope the narrator of every card,
so the three cards feel like one product:

| Card | What the rope does |
|---|---|
| `coverage` (24/7 answering) | Comet orbits a clock ring; each beat catches a "missed call" event with a bright flash. Counter ticks. |
| `qualify` (lead filtering) | Rope-loop sieve sits across the path of a falling-lead stream. Deterministic keep/pass per lead; rope dips at impact like real tension; caught leads deflect into a pile. |
| `handoff` (instant routing) | Lasso whips in a single arc from a pulsing call orb to a dim handler orb; both ignite on connection. |

## Files

| File | Purpose |
|---|---|
| `_anim.js` | The three render fns: `coverage(ctx,w,h,t)`, `qualify(...)`, `handoff(...)` |
| `wranngle-cards.html` | 3-up preview gallery, modular (uses `_anim.js`) |
| `wranngle-cards.standalone.html` | Same gallery, self-contained single file |
| `coverage.html` / `qualify.html` / `handoff.html` | Per-card preview pages |
| `*.standalone.html` | Per-card single-file bundles |

Each `.standalone.html` is droppable anywhere — open with file:// or serve it.

## Drop-in for React

1. Lift the three routines from `_anim.js` into your bundle (one shared module).
2. In the feature-card component, replace the awkward visual with:

```tsx
import { useEffect, useRef } from "react";
import { WranngleCardAnims } from "./wranngle-card-anims";

export function CardVisual({ anim }: { anim: "coverage" | "qualify" | "handoff" }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!; const ctx = cv.getContext("2d", { alpha: false })!;
    const dpr = Math.min(2, devicePixelRatio || 1);
    const fn = WranngleCardAnims[anim];
    let raf = 0; const t0 = performance.now();
    const resize = () => {
      const r = cv.parentElement!.getBoundingClientRect();
      cv.width  = Math.round(r.width  * dpr);
      cv.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); window.addEventListener("resize", resize);
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      const w = cv.width / dpr, h = cv.height / dpr;
      ctx.fillStyle = "#0c0b14"; ctx.fillRect(0, 0, w, h);
      fn(ctx, w, h, t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [anim]);
  return <canvas ref={ref} className="block w-full h-full" />;
}
```

The animation area on the site is the inner panel with `noise-overlay` plus the
rounded border. The canvas should fill that container; aspect doesn't matter —
the routines auto-fit to whatever `(w, h)` they get.

## Determinism

All three routines are `f(ctx, w, h, t) → void`. No retained state. Two consecutive
frames at the same `t` render the same pixels. That means you can:

- Deep-link a frozen frame with `?t=2.5&play=0`
- Record an MP4/GIF by sampling at known `t` values
- Snapshot for static OG previews

## Brand checks

- Background: `#12111a` (Night 950) with the same radial sunset tint the site uses
- Rope core: `rgb(252,250,245)` (Sand 50) — appears white-hot but never blooms past brand
- Rope halo: `rgb(255,95,0)` (Sunset 500) — the only saturated colour anywhere
- Status colour: cactus green `#5d8c61` (matches the site's blinking status dot)
