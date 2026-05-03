# Wranngle Design System

Single source of truth for visual brand across all Wranngle repos.
Apply these tokens to every project to keep `wranngle.com`, internal tools,
emails, and proposal artifacts visually coherent.

> **Sources consolidated:**
> - `~/projects/wranngle_com/openspec/design_system.html` (most complete artifact — full token set + components)
> - `~/projects/wranngle_com/email-templates/STYLE_GUIDE.md` (email/SMS palette + voice rules)
> - `~/projects/wranngle_com/email-templates/master/master-template.html` (token defs in CSS)
> - `~/projects/wranngle_com/openspec/project.md` & `specs/landing-page/spec.md` (console aesthetic + fonts)
> - `~/projects/wranngle_com/client/src/index.css` & `tailwind.config.ts` (runtime brand vars)
> - `~/projects/wranngle_com/client/src/App.tsx` (hero tagline)
> - `~/projects/unified-presales-report/lib/branding.js` (default brand exports — confirms canonical hexes)
> - `~/projects/gtm_ops/docs/DESIGN.md` (operational/internal tooling principles)
>
> **Conflicts flagged inline below.** When in doubt, the `openspec/design_system.html` token table (Wranngle Color Palette section) is the canonical reference for the marketing surface; the email STYLE_GUIDE governs transactional email; the GTM engine doc governs internal tools.

---

## 1. Brand Identity

### Tagline

> **Tame the Wild Frontier of AI.**

(`Wild Frontier` rendered in Sunset Orange `--s500`, balance in inverse text on dark hero.)

### Positioning sub-line

> The 24/7 AI Voice Agent for small trades businesses. Stop missing leads.

### Aesthetic identity

- **Console / terminal aesthetic** — monospaced labels (`[INFO]`, `[READY]`, `[WARN]`),
  high-contrast dark surfaces, animated typewriter sequences, blinking cursors,
  pulsing live indicators.
- **Lasso-inspired curves** — signature asymmetric corner radius
  (`24px 4px 24px 4px`) used on hero panels and feature consoles.
- **Operational over decorative** — internal tooling repos (`gtm_ops`)
  intentionally lean dense + scannable; no marketing hero sections.

---

## 2. Color Tokens

All colors documented as HEX. Convert to HSL only at the consumption layer
(e.g. shadcn/ui Tailwind vars).

### 2.1 Primary palette (canonical scales)

#### Sunset (Action / CTA — primary brand accent)

| Token | Hex | Notes |
|---|---|---|
| `--sunset-50`  | `#fff3e7` | |
| `--sunset-100` | `#ffe0bf` | |
| `--sunset-200` | `#ffc179` | |
| `--sunset-300` | `#ff9e33` | Maps to `--color-warning` (warm amber slot) |
| `--sunset-400` | `#ff7f00` | |
| `--sunset-500` | `#ff5f00` | **Primary CTA / brand orange** (= legacy `--s500`, `--wranngle-primary`) |
| `--sunset-600` | `#ef4b00` | hover state |
| `--sunset-700` | `#c73a00` | |
| `--sunset-800` | `#9f3000` | |
| `--sunset-900` | `#7d2700` | |
| `--sunset-950` | `#431300` | |

#### Violet (Critical / security / premium accent)

| Token | Hex | Notes |
|---|---|---|
| `--violet-50`  | `#fdf1f5` | |
| `--violet-100` | `#f9dce5` | |
| `--violet-200` | `#f2b6c6` | |
| `--violet-300` | `#ea8aa6` | |
| `--violet-400` | `#dd6186` | |
| `--violet-500` | `#cf3c69` | **Secondary brand magenta** (= legacy `--v500`, `--wranngle-secondary`); maps to `--color-critical` |
| `--violet-600` | `#b92a56` | |
| `--violet-700` | `#972144` | |
| `--violet-800` | `#741a36` | |
| `--violet-900` | `#561329` | |
| `--violet-950` | `#2d0914` | Used in dark-page radial gradient |

#### Sand (Neutral / background)

| Token | Hex | Notes |
|---|---|---|
| `--sand-50`  | `#fcfaf5` | **Light page background** (= `--wranngle-light`) |
| `--sand-100` | `#f6f1e7` | Muted surface |
| `--sand-200` | `#ebdfc8` | Subtle borders |
| `--sand-300` | `#dac39f` | Default borders |
| `--sand-400` | `#c2a677` | Strong borders |
| `--sand-500` | `#ab8c5b` | |
| `--sand-600` | `#957850` | |
| `--sand-700` | `#7a6343` | |
| `--sand-800` | `#625137` | |
| `--sand-900` | `#4f412d` | |
| `--sand-950` | `#292218` | |

#### Night (Dark / text)

| Token | Hex | Notes |
|---|---|---|
| `--night-50`  | `#f2f0f3` | |
| `--night-100` | `#e4e1e7` | |
| `--night-200` | `#cbc7d3` | |
| `--night-300` | `#aaa4b8` | |
| `--night-400` | `#847d9a` | `--text-muted` |
| `--night-500` | `#6a6380` | `--text-secondary` |
| `--night-600` | `#57516a` | |
| `--night-700` | `#464055` | |
| `--night-800` | `#393444` | |
| `--night-900` | `#201e28` | |
| `--night-950` | `#12111a` | **Primary text on light / dark page background** (= `--n950`, `--wranngle-dark`) |

### 2.2 Semantic mappings (web/marketing — `design_system.html`)

| Token | Value | Usage |
|---|---|---|
| `--color-action`        | `var(--sunset-500)` `#ff5f00` | All CTAs |
| `--color-action-hover`  | `var(--sunset-600)` `#ef4b00` | CTA hover |
| `--color-action-glow`   | `rgba(255, 95, 0, 0.25)`      | Button shadows / focus rings |
| `--color-critical`      | `var(--violet-500)` `#cf3c69` | Urgent attention, security context |
| `--color-warning`       | `var(--sunset-300)` `#ff9e33` | Caution states |
| `--color-healthy`       | `#5D8C61`                     | Cactus green — completed, positive |
| `--color-info`          | `#3b82f6`                     | Informational |

### 2.3 Email semantic palette (`email-templates/STYLE_GUIDE.md` + `master-template.html`)

Email clients require a separate, slightly different semantic stack
(higher-saturation reds/greens for client compatibility).

> **CONFLICT:** The web design system uses `#5D8C61` (Cactus Green) and `#ff9e33`
> (Sunset 300) for `healthy` / `warning`. The email system uses `#10b981`
> (success), `#f59e0b` (warning), `#ef4444` (danger). These intentionally
> diverge — keep web palette for the marketing site & internal dashboards;
> use the email palette only inside transactional templates. Cross-source values:
>   - Healthy/Success: web `#5D8C61` vs email `#10b981` (from `STYLE_GUIDE.md`)
>   - Warning: web `#ff9e33` vs email `#f59e0b` (from `STYLE_GUIDE.md`)
>   - Critical/Danger: web `#cf3c69` (violet brand) vs email `#ef4444` (pure red, danger only)

| Token | Hex | Usage |
|---|---|---|
| `--wranngle-primary`     | `#ff5f00` | CTAs, console labels, left borders, links |
| `--wranngle-secondary`   | `#cf3c69` | Security / premium contexts ONLY |
| `--wranngle-dark`        | `#12111a` | Body text, dark backgrounds |
| `--wranngle-light`       | `#fcfaf5` | Light mode backgrounds |
| `--wranngle-success`     | `#10b981` | Completed states ONLY (email-only) |
| `--wranngle-warning`     | `#f59e0b` | Action-required boxes (email-only) |
| `--wranngle-danger`      | `#ef4444` | Errors, security alerts (email-only) |
| `--wranngle-gray-600`    | `#6b7280` | Secondary body text |
| `--wranngle-gray-400`    | `#9ca3af` | Footer text |
| `--wranngle-gray-300`    | `#d1d5db` | Dividers |
| `--wranngle-border`      | `#e5e7eb` | Light borders |
| `--wranngle-bg-subtle`   | `#f9fafb` | Subtle backgrounds (info boxes) |
| `--wranngle-bg-page`     | `#f3f4f6` | Email wrapper background |

### 2.4 Surfaces / text / borders (web)

| Token | Value |
|---|---|
| `--surface-page`     | `var(--sand-50)` |
| `--surface-card`     | `#ffffff` |
| `--surface-elevated` | `#ffffff` |
| `--surface-muted`    | `var(--sand-100)` |
| `--surface-glass`    | `rgba(255, 255, 255, 0.7)` |
| `--text-primary`     | `var(--night-950)` `#12111a` |
| `--text-secondary`   | `var(--night-500)` `#6a6380` |
| `--text-muted`       | `var(--night-400)` `#847d9a` |
| `--text-inverse`     | `var(--sand-50)` `#fcfaf5` |
| `--border-subtle`    | `var(--sand-200)` `#ebdfc8` |
| `--border-default`   | `var(--sand-300)` `#dac39f` |
| `--border-strong`    | `var(--sand-400)` `#c2a677` |

### 2.5 Page background gradients

```css
/* Light page (App.tsx .bg-page-light) */
background: linear-gradient(to bottom, #fcfaf5, #ebdfc8);

/* Dark page (App.tsx .bg-page-dark) */
background: radial-gradient(circle at 50% 0%, #2d0914 0%, #12111a 60%);

/* Marketing showcase body */
background: linear-gradient(180deg, var(--sand-50) 0%, var(--sand-100) 50%, var(--violet-100) 100%);
```

### 2.6 Status colors (Tailwind config — for in-app presence states)

| Token | Value | Usage |
|---|---|---|
| `status.online`  | `rgb(34 197 94)` `#22c55e`  | Online indicator |
| `status.away`    | `rgb(245 158 11)` `#f59e0b` | Away |
| `status.busy`    | `rgb(239 68 68)` `#ef4444`  | Do not disturb |
| `status.offline` | `rgb(156 163 175)` `#9ca3af` | Offline |

### 2.7 Deprecated colors — DO NOT USE

| Color | Hex | Replacement |
|---|---|---|
| Sky Blue       | `#0ea5e9` | Use `#ff5f00` (Sunset 500) |
| Light Blue BG  | `#f0f9ff` | Use `#f9fafb` (neutral subtle) |
| Blue Border    | `#bae6fd` | Use `#e5e7eb` (neutral border) |

---

## 3. Typography

### 3.1 Font families

> **CONFLICT — INTENTIONAL SURFACE SPLIT:** Three different font stacks live in
> the codebase. They map to surfaces, not contexts. **Pick the right stack for
> the surface you are designing for.**
>
> | Surface | Display / Headings | Body | Mono | Source |
> |---|---|---|---|---|
> | **Marketing site (`wranngle.com` landing)** | Bricolage Grotesque (`.brand-font`) | DM Sans / Inter | JetBrains Mono (`.mono-font`) | `App.tsx` + `project.md` |
> | **Web design system (proposals, dashboards, presales reports)** | Outfit (`--font-display`) | Inter (`--font-body`) | `ui-monospace, SF Mono, Menlo` (`--font-mono`) | `openspec/design_system.html` |
> | **Email templates** | Inter | Inter | Courier New | `STYLE_GUIDE.md` |
>
> **Recommended unification path** (Cody to confirm):
> Standardize on **Bricolage Grotesque (display) + Inter (body) + JetBrains Mono (mono)**
> as the canonical stack. The Outfit/SF Mono stack in `design_system.html` is
> a leftover from an earlier iteration; the live marketing site has already
> moved to Bricolage. Email keeps Courier New for client compatibility (no
> change recommended).

#### Web token definitions

```css
--font-display: 'Bricolage Grotesque', 'Outfit', system-ui, sans-serif;
--font-body:    'Inter', system-ui, sans-serif;
--font-mono:    'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
```

Google Fonts import (combined for marketing site):

```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,400;500;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 3.2 Type scale (web)

| Token | Value | px | Usage |
|---|---|---|---|
| `--text-xs`   | `0.6875rem` | 11px | Footer legal, micro-labels |
| `--text-sm`   | `0.75rem`   | 12px | Console labels, metadata, captions |
| `--text-base` | `0.875rem`  | 14px | Buttons, small body |
| `--text-lg`   | `1rem`      | 16px | Primary body |
| `--text-xl`   | `1.25rem`   | 20px | H2 / section headings |
| `--text-2xl`  | `1.5rem`    | 24px | Sub-hero / large stats |
| `--text-3xl`  | `2rem`      | 32px | H1 hero |

**Marketing hero override:** App.tsx uses `text-5xl md:text-7xl` (Tailwind: 48px / 72px) for the brand tagline. Reserve for top-of-page hero only.

### 3.3 Type scale (email — slightly narrower)

| Token | Value | Usage |
|---|---|---|
| `--text-xs`   | 11px | Footer legal |
| `--text-sm`   | 12px | Console labels |
| `--text-base` | 14px | Buttons, small body |
| `--text-lg`   | 16px | Primary body |
| `--text-xl`   | 20px | H2 |
| `--text-2xl`  | 28px | H1 hero |

### 3.4 Weights & line-height

- Display headings: **800** (Outfit/Bricolage), letter-spacing `-0.02em`, line-height `1.1`–`1.2`.
- Body: **400** regular, **600** for emphasis, **700** for strong; line-height `1.5`–`1.6`.
- Buttons / labels: **700** uppercase, letter-spacing `0.03em`–`0.05em`, line-height `1.4`.
- Console labels: monospace, **700**, ALL CAPS, often bracketed `[INFO]`.

---

## 4. Spacing

8px-based scale. Use `--space-*` tokens; never hard-code px in components.

| Token | Value | px | Common usage |
|---|---|---|---|
| `--space-1`  | `0.25rem` | 4px  | Minimal gaps, micro-padding |
| `--space-2`  | `0.5rem`  | 8px  | Icon padding, tight spacing |
| `--space-3`  | `0.75rem` | 12px | Default element gap |
| `--space-4`  | `1rem`    | 16px | Standard margins, paragraph spacing |
| `--space-5`  | `1.25rem` | 20px | Info-box padding |
| `--space-6`  | `1.5rem`  | 24px | Hero padding, section gaps |
| `--space-8`  | `2rem`    | 32px | Major section breaks, page padding |
| `--space-10` | `2.5rem`  | 40px | Content-area padding |
| `--space-12` | `3rem`    | 48px | Showcase / page-level rhythm |

Email-specific aliases (same numeric scale, different names):
`xs=4 / sm=8 / md=12 / base=16 / lg=20 / xl=24 / 2xl=32 / 3xl=40`.

---

## 5. Border Radius

> **CONFLICT — INTENTIONAL SCALE SPLIT:** Three radius scales co-exist:
>
> | Surface | sm | md | lg | xl | 2xl | Source |
> |---|---|---|---|---|---|---|
> | **Web design system (canonical)** | 4px | 8px | 12px | 16px | 24px | `design_system.html` |
> | **Tailwind shadcn (`tailwind.config.ts`)** | 3px | 6px | 9px | — | — | one-off shadcn tweak |
> | **Email** | 4px | 8px | — | — | — | `STYLE_GUIDE.md` |
>
> **Recommendation:** Use the web design-system scale below as the source of
> truth. The shadcn-tweaked tailwind.config.ts radii are an
> outlier — bring them into alignment when refactoring the marketing site.

### Canonical scale (use everywhere)

| Token | Value | Usage |
|---|---|---|
| `--radius-sm`     | `4px`  | Small chips, info-box accents, status badges |
| `--radius-md`     | `8px`  | Cards, buttons, heroes |
| `--radius-lg`     | `12px` | Larger cards, section panels |
| `--radius-xl`     | `16px` | Page-level shells, component-section containers |
| `--radius-2xl`    | `24px` | Showcase headers, hero panels |
| `--radius-pill`   | `9999px` | Pills, badges, status dots, accent bars |
| `--radius-lasso`  | `0 var(--radius-lg) var(--radius-lg) 0` | **Signature asymmetric** — use on left-bordered accent cards |

**Console / hero-accent variant** (App.tsx — featured panel signature shape):
```css
border-radius: 24px 4px 24px 4px;
```

---

## 6. Shadows / Elevation

Layered, low-saturation shadows tinted with `rgba(18, 17, 26, …)` so they match the Night-950 text tone instead of pure black.

| Token | Value |
|---|---|
| `--shadow-xs`    | `0 1px 2px rgba(18, 17, 26, 0.04)` |
| `--shadow-sm`    | `0 2px 4px rgba(18, 17, 26, 0.04), 0 1px 2px rgba(18, 17, 26, 0.02)` |
| `--shadow-md`    | `0 4px 12px rgba(18, 17, 26, 0.06), 0 2px 4px rgba(18, 17, 26, 0.04)` |
| `--shadow-lg`    | `0 8px 24px rgba(18, 17, 26, 0.08), 0 4px 8px rgba(18, 17, 26, 0.04)` |
| `--shadow-xl`    | `0 16px 48px rgba(18, 17, 26, 0.12), 0 8px 16px rgba(18, 17, 26, 0.06)` |
| `--shadow-glow`  | `0 0 24px var(--color-action-glow)` (Sunset CTA halo) |
| `--shadow-inner` | `inset 0 2px 4px rgba(18, 17, 26, 0.06)` |

Page-context shadow tints (App.tsx):
- Light page card: `--shadow-card: 0 6px 16px rgba(18, 17, 26, 0.08);`
- Dark page card: `--shadow-card: 0 6px 16px rgba(0, 0, 0, 0.4);`

---

## 7. Motion

| Token | Value |
|---|---|
| `--ease-out`         | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-in-out`      | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--duration-fast`    | `150ms` |
| `--duration-normal`  | `250ms` |
| `--duration-slow`    | `400ms` |

Recurring patterns:
- Card lift on hover: `transform: translateY(-1px)` + shadow step-up.
- Button lift on hover: `transform: translateY(-2px)`, settles to `(0)` on `:active`.
- Pulse for "live" indicators: 2s ease-in-out infinite, `scale(1) → scale(1.1)`, opacity `1 → 0.7`.
- Console typewriter: 800ms delay between lines.

---

## 8. Component Patterns (web)

Every component below uses the unified token system. The full reference
implementation lives in `~/projects/wranngle_com/openspec/design_system.html`.

### 8.1 Card (`.card`)

Replaces: `.exec-summary`, `.summary-card`, `.fix-block`, `.bleed-callout`,
`.milestone-card`, `.scope-column`, `.zone-finops`, `.term-item`.

Base:
```css
background: var(--surface-card);
border: 1px solid var(--border-subtle);
border-radius: var(--radius-lg);
padding: var(--space-4) var(--space-5);
box-shadow: var(--shadow-sm);
transition: box-shadow .25s var(--ease-out), transform .25s var(--ease-out);
```

Variants:
- `.card--accent` — left 4px Sunset border + lasso radius + warm gradient
- `.card--critical` — Violet accent + violet-50 gradient
- `.card--warning`  — Sunset-300 accent
- `.card--healthy`  — Cactus green accent
- `.card--glass`    — backdrop-blur frosted
- `.card--elevated` — `--shadow-lg`, no border, larger lift on hover
- `.card--inset`    — `--surface-muted` + inner shadow
- `.card--sm` / `.card--lg` — padding tweaks
- `.card--interactive` — pointer cursor + hover border = Sunset 300

### 8.2 Stat (`.stat`)

Big-number metric block. Replaces `.stat-card`, `.zone-stat`, `.metric-chip`.

- Value: `--font-display`, `--text-2xl`, weight 800, line-height 1.1, `letter-spacing: -0.02em`
- Label: `--text-xs`, weight 600, uppercase, `letter-spacing: 0.05em`, `--text-muted`
- Background: linear-gradient(135deg, white → `--sand-100`)
- Variants: `--bordered` (3px Sunset left bar + lasso radius), `--highlight` (Sunset gradient bg), color states (`--accent`, `--critical`, `--warning`, `--healthy`)
- Sizes: `--sm` (text-lg value), default, `--lg` (text-3xl, padding-6)

### 8.3 Label (`.label`)

Block label / meta-text. Replaces `.term-label`, `.timeline-label`, `.floor-label`, etc.

- `--text-xs`, weight 600, uppercase, `letter-spacing: 0.05em`
- Color variants: `--accent`, `--critical`, `--warning`, `--healthy`, `--muted`
- `.label--inline` for in-paragraph use

### 8.4 Indicator (`.indicator`)

Status dot (replaces `.status-dot`, `.fix-dot`, `.bleed-dot`).

- 12px round (`--md` default), 8/16/24px size variants
- Linear-gradient fill + inset shadow + outer glow halo per state
- `.indicator--pulse` for live status

### 8.5 Badge (`.badge`)

Pill-style token (replaces `.pill`, `.risk-badge`, `.type-pill`, `.math-pill`, `.milestone-badge`, `.hosting-pill`).

- Default: sand background, secondary text, pill radius
- Semantic: `--accent` (Sunset), `--critical` (Violet), `--warning`, `--healthy`, `--info`
- Style variants: `--solid` (high contrast), `--outline`, `--code` (mono + dotted border), `--caps` (uppercase + bold)
- Tech-stack semantic colors: `--workflow`, `--ai`, `--database`, `--communication`, `--integration`, `--api`
- Sizes: `--sm`, default, `--lg`

### 8.6 Section (`.section`)

Layout block with numbered header.
- `.section__header` — flex, 2px sand-200 bottom border
- `.section__number` — Sunset-500 display number
- `.section__title` — display-font, weight 700

### 8.7 Button (`.btn`)

Web button (replaces ad-hoc CTAs).

```css
padding: 0.625rem 1.25rem; /* default; --sm and --lg variants */
font: 700 var(--text-sm) var(--font-display);
text-transform: uppercase;
letter-spacing: 0.03em;
border-radius: var(--radius-md);
```

- `.btn--primary` — Sunset gradient (500→600), white text, glow shadow, lift on hover
- `.btn--ghost`   — transparent, sand border, hovers to Sunset accent
- Sizes: `--sm` (text-xs), default, `--lg` (text-base)

### 8.8 Email button (`.btn-primary`, `.btn-secondary`, `.btn-warning`, `.btn-danger`)

Email-specific button (inline-styled for client compatibility):
- Padding `14px 32px`, border-radius `8px`, 2px solid border matching bg
- Font `'Inter', Arial, sans-serif`, 14px / weight 700, uppercase, letter-spacing `0.5px`
- Always include both class AND inline styles (email-client fallback)

### 8.9 Console aesthetic blocks

Distinctive Wranngle UI motif — dark monospaced panels with bracketed labels.

- Background: `#1a1a1e` (or `--night-900`/`--night-950`)
- Border-left: 4px Sunset
- Font: `'Courier New', Courier, monospace` (email) or `JetBrains Mono` (web)
- Color labels: `[INFO]` orange (`#ff5f00`), `[READY]` green (`#10b981`), `[WARN]` amber (`#f59e0b`), `[ERROR]` red (`#ef4444`)
- Optional animated border tracer using `--color-action`

### 8.10 Hero section (email)

```css
background: linear-gradient(135deg, #12111a 0%, #2d0914 100%);
border-radius: 8px;
padding: 24px;
/* H1: Inter 28px/700 white, line-height 1.2 */
/* Tagline: Courier New 14px Sunset, letter-spacing 1px, e.g. "[ SYSTEM STATUS ]" */
```

### 8.11 Layout utilities

- `.grid` / `.grid--2` / `.grid--3` / `.grid--4` (CSS grid, gap = `--space-4`)
- `.flex` / `.flex--wrap` / `.flex--center` / `.flex--between` / `.flex--gap-sm` / `.flex--gap-md`
- `.stack` (flex column, gap `--space-3`), `--sm` (gap-2), `--lg` (gap-6)

---

## 9. Voice & Tone

### 9.1 Brand voice

- **Confident frontier-tamer.** Tagline "Tame the Wild Frontier of AI" sets the
  posture: bold, plainspoken, slightly outlaw. Avoid academic / corporate hedging.
- **Operational clarity over marketing fluff.** Show the system working
  (live demos, console output, real numbers) instead of describing it.
- **Console-coded technical credibility.** Bracketed labels, monospaced metadata,
  and visible "system status" cues build trust with technical buyers.
- **Trades-business-readable.** Primary audience is HVAC / Plumbing / Electrical
  small businesses. Avoid AI jargon; lead with outcomes ("stop missing leads",
  "24/7 coverage", "$X recovered/month").

### 9.2 Surface-specific tone

| Surface | Tone | Source |
|---|---|---|
| Marketing site | Bold, confident, console-ish, outcome-led | App.tsx hero |
| Email — transactional | Calm, factual, brief; respects CAN-SPAM tone | STYLE_GUIDE.md |
| Email — sales | Direct, value-led, single clear CTA | STYLE_GUIDE.md |
| SMS / RCS | Compressed: greeting + key info + action + contact, ≤160 chars | STYLE_GUIDE.md |
| Internal tooling (`gtm_ops`) | Dense, scannable, operational. No marketing flourish. Show synthetic-data labels prominently. | gtm_ops/docs/DESIGN.md |

### 9.3 Writing rules (carried from email STYLE_GUIDE)

- Never say "Reply to this email" when the sender is `noreply@`.
- All "contact support" mentions must include the specific email
  (`support@`, `billing@`, or `security@wranngle.com`).
- Match sender address to context expectation.
- Button labels: action verb first ("View Invoice", "Schedule Demo", "Deploy Agent"). Avoid "Click Here".
- Button labels are uppercase in web/email; max 25 chars (RCS), max 20 chars (RCS button).
- Console labels stay in `[BRACKETS]`, ALL CAPS, monospace.

---

## 10. Logo & Mark

### Confirmed assets

- `~/projects/wranngle_com/client/public/assets/rcs/logo-card.png` — RCS messaging logo card
- RCS branded sender display name: **"Wranngle"**

### Required assets per RCS carrier-approval spec

- Brand logo: square, **min 1024×1024px**
- Brand banner: optional, **1440×720px**

### GAP — Cody to fill in

- No formal logo-usage / clearspace / minimum-size doc found in any repo.
- No stated SVG / vector source path.
- No defined wordmark vs. icon-only treatment rules.
- No light/dark logo variants documented.

---

## 11. Color Usage Rules (consolidated do's and don'ts)

### Sunset Orange (`#ff5f00`) — Primary

DO use for: CTA backgrounds, left accent borders on info boxes, console labels,
in-body links, step-indicator badges, brand highlights.
DON'T use for: body text (low contrast), large background fills (overwhelming),
error states (use Danger Red).

### Violet / Magenta (`#cf3c69`) — Secondary

DO use for: security-context borders (password reset, 2FA), premium / VIP indicators,
sensitive information boxes, "Critical" semantic state.
DON'T use for: general info boxes, CTA buttons, regular links.

### Cactus Green (`#5D8C61` web / `#10b981` email) — Healthy

DO use for: completed states, payment confirmations, `[READY]` / `[SUCCESS]` labels,
checkmarks for done items.
DON'T use for: pending steps, generic info, CTAs.

### Sunset 300 (`#ff9e33` web) / Amber (`#f59e0b` email) — Warning

DO use for: action-required boxes, time-sensitive notices, warning buttons.
DON'T use for: success states, generic info.

### Danger Red (`#ef4444`) — Errors / Security alerts (email primarily)

DO use for: security alerts, error messages, escalation buttons, critical warnings.
DON'T use for: general warnings (use Amber/Sunset 300), normal action buttons.

---

## 12. Accessibility

- Maintain **4.5:1 contrast ratio** for normal text, **3:1** for large text (WCAG AA).
- The runtime branding helper `unified-presales-report/lib/branding.js` enforces this via `meetsContrastRequirement()`.
- Always provide alt text on images.
- Don't rely on color alone for meaning (pair with icons / labels).
- Test layouts at 320px mobile width.
- `input, select, textarea { font-size: 16px; }` to prevent iOS auto-zoom.

---

## 13. Implementation Templates

### CSS variables (drop into `:root`)

```css
:root {
  /* Sunset */
  --sunset-50:#fff3e7; --sunset-100:#ffe0bf; --sunset-200:#ffc179;
  --sunset-300:#ff9e33; --sunset-400:#ff7f00; --sunset-500:#ff5f00;
  --sunset-600:#ef4b00; --sunset-700:#c73a00; --sunset-800:#9f3000;
  --sunset-900:#7d2700; --sunset-950:#431300;

  /* Violet */
  --violet-50:#fdf1f5; --violet-100:#f9dce5; --violet-200:#f2b6c6;
  --violet-300:#ea8aa6; --violet-400:#dd6186; --violet-500:#cf3c69;
  --violet-600:#b92a56; --violet-700:#972144; --violet-800:#741a36;
  --violet-900:#561329; --violet-950:#2d0914;

  /* Sand */
  --sand-50:#fcfaf5; --sand-100:#f6f1e7; --sand-200:#ebdfc8;
  --sand-300:#dac39f; --sand-400:#c2a677; --sand-500:#ab8c5b;
  --sand-600:#957850; --sand-700:#7a6343; --sand-800:#625137;
  --sand-900:#4f412d; --sand-950:#292218;

  /* Night */
  --night-50:#f2f0f3; --night-100:#e4e1e7; --night-200:#cbc7d3;
  --night-300:#aaa4b8; --night-400:#847d9a; --night-500:#6a6380;
  --night-600:#57516a; --night-700:#464055; --night-800:#393444;
  --night-900:#201e28; --night-950:#12111a;

  /* Semantic */
  --color-critical: var(--violet-500);
  --color-warning:  var(--sunset-300);
  --color-healthy:  #5D8C61;
  --color-info:     #3b82f6;
  --color-action:   var(--sunset-500);
  --color-action-hover: var(--sunset-600);
  --color-action-glow:  rgba(255, 95, 0, 0.25);

  /* Surfaces */
  --surface-page: var(--sand-50);
  --surface-card: #fff;
  --surface-elevated: #fff;
  --surface-muted: var(--sand-100);
  --surface-glass: rgba(255,255,255,.7);

  /* Text */
  --text-primary:   var(--night-950);
  --text-secondary: var(--night-500);
  --text-muted:     var(--night-400);
  --text-inverse:   var(--sand-50);

  /* Borders */
  --border-subtle:  var(--sand-200);
  --border-default: var(--sand-300);
  --border-strong:  var(--sand-400);

  /* Spacing */
  --space-1:.25rem; --space-2:.5rem; --space-3:.75rem; --space-4:1rem;
  --space-5:1.25rem; --space-6:1.5rem; --space-8:2rem; --space-10:2.5rem; --space-12:3rem;

  /* Typography */
  --font-display:'Bricolage Grotesque','Outfit',system-ui,sans-serif;
  --font-body:'Inter',system-ui,sans-serif;
  --font-mono:'JetBrains Mono',ui-monospace,SFMono-Regular,'SF Mono',Menlo,monospace;
  --text-xs:.6875rem; --text-sm:.75rem; --text-base:.875rem; --text-lg:1rem;
  --text-xl:1.25rem; --text-2xl:1.5rem; --text-3xl:2rem;

  /* Radii */
  --radius-sm:4px; --radius-md:8px; --radius-lg:12px; --radius-xl:16px;
  --radius-2xl:24px; --radius-pill:9999px;
  --radius-lasso:0 var(--radius-lg) var(--radius-lg) 0;

  /* Shadows */
  --shadow-xs:0 1px 2px rgba(18,17,26,.04);
  --shadow-sm:0 2px 4px rgba(18,17,26,.04),0 1px 2px rgba(18,17,26,.02);
  --shadow-md:0 4px 12px rgba(18,17,26,.06),0 2px 4px rgba(18,17,26,.04);
  --shadow-lg:0 8px 24px rgba(18,17,26,.08),0 4px 8px rgba(18,17,26,.04);
  --shadow-xl:0 16px 48px rgba(18,17,26,.12),0 8px 16px rgba(18,17,26,.06);
  --shadow-glow:0 0 24px var(--color-action-glow);
  --shadow-inner:inset 0 2px 4px rgba(18,17,26,.06);

  /* Motion */
  --ease-out:cubic-bezier(.16,1,.3,1);
  --ease-in-out:cubic-bezier(.65,0,.35,1);
  --duration-fast:150ms; --duration-normal:250ms; --duration-slow:400ms;
}
```

### Tailwind config snippet (for new repos)

```js
// tailwind.config.{js,ts}
extend: {
  colors: {
    sunset: { 50:'#fff3e7',100:'#ffe0bf',200:'#ffc179',300:'#ff9e33',400:'#ff7f00',500:'#ff5f00',600:'#ef4b00',700:'#c73a00',800:'#9f3000',900:'#7d2700',950:'#431300' },
    violet: { 50:'#fdf1f5',100:'#f9dce5',200:'#f2b6c6',300:'#ea8aa6',400:'#dd6186',500:'#cf3c69',600:'#b92a56',700:'#972144',800:'#741a36',900:'#561329',950:'#2d0914' },
    sand:   { 50:'#fcfaf5',100:'#f6f1e7',200:'#ebdfc8',300:'#dac39f',400:'#c2a677',500:'#ab8c5b',600:'#957850',700:'#7a6343',800:'#625137',900:'#4f412d',950:'#292218' },
    night:  { 50:'#f2f0f3',100:'#e4e1e7',200:'#cbc7d3',300:'#aaa4b8',400:'#847d9a',500:'#6a6380',600:'#57516a',700:'#464055',800:'#393444',900:'#201e28',950:'#12111a' },
  },
  fontFamily: {
    display: ['Bricolage Grotesque','Outfit','system-ui','sans-serif'],
    sans:    ['Inter','system-ui','sans-serif'],
    mono:    ['JetBrains Mono','ui-monospace','SFMono-Regular','SF Mono','Menlo','monospace'],
  },
  borderRadius: { sm:'4px', md:'8px', lg:'12px', xl:'16px', '2xl':'24px' },
}
```

### Default brand exports (JS — mirrors `unified-presales-report/lib/branding.js`)

```js
export const DefaultBranding = {
  PRIMARY_COLOR:    '#ff5f00',  // Sunset 500
  SECONDARY_COLOR:  '#cf3c69',  // Violet 500
  BACKGROUND_COLOR: '#fcfaf5',  // Sand 50
  TEXT_COLOR:       '#12111a',  // Night 950
  SUCCESS_COLOR:    '#5D8C61',  // Cactus Green
};
```

---

## 14. Open Questions / Gaps for Cody

1. **Font stack consolidation** — confirm Bricolage Grotesque + Inter +
   JetBrains Mono is the canonical stack going forward (current state has 3
   coexisting stacks across surfaces).
2. **Logo system** — no formal logo doc exists. Need: vector source, light/dark
   variants, clearspace, min sizes, wordmark vs. icon rules.
3. **Tailwind shadcn radius reconciliation** — `wranngle_com/tailwind.config.ts`
   uses 3/6/9px radii; the rest of the system uses 4/8/12px. Pick one.
4. **`client/src/index.css` shadcn HSL vars are placeholders** ("red" stubs).
   These should be filled with the canonical Sunset/Violet/Sand/Night
   conversions if shadcn components are intended to actually render branded.
5. **Form / input components** — no documented styling rules for inputs,
   selects, textareas. Currently relies on implicit Tailwind defaults.
6. **Iconography** — Lucide React is in use, but no documented size scale or
   color-pairing rules.
7. **Animation library** — Framer Motion is in use but no documented motion
   patterns (entrance, exit, stagger). Section 7 covers easing + duration only.

---

*Last updated: 2026-05-02. When you change any token, update this file first
and ripple changes outward.*


---

## Appendix A: Consolidated Components showcase (verbatim)

Source: `wranngle_com/openspec/design_system.html` (private; not in public repos).
Title: "Wranngle Design System — Consolidated Components"

```html
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Wranngle Design System — Consolidated Components</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">

  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">

  <style>

/**

 * ═══════════════════════════════════════════════════════════════════════════

 * WRANNGLE DESIGN SYSTEM — CONSOLIDATED COMPONENTS

 * A unified vocabulary replacing 6 redundant pattern families

 * ═══════════════════════════════════════════════════════════════════════════

 */



*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }



/* ═══════════════════════════════════════════════════════════════════════════

   DESIGN TOKENS

   Single source of truth for all visual values

   ═══════════════════════════════════════════════════════════════════════════ */



:root {

  /* ─── Wranngle Color Palette ─── */

  /* Violet (Primary Brand) */

  --violet-50: #fdf1f5;

  --violet-100: #f9dce5;

  --violet-200: #f2b6c6;

  --violet-300: #ea8aa6;

  --violet-400: #dd6186;

  --violet-500: #cf3c69;

  --violet-600: #b92a56;

  --violet-700: #972144;

  --violet-800: #741a36;

  --violet-900: #561329;

  --violet-950: #2d0914;



  /* Sunset (Action/CTA) */

  --sunset-50: #fff3e7;

  --sunset-100: #ffe0bf;

  --sunset-200: #ffc179;

  --sunset-300: #ff9e33;

  --sunset-400: #ff7f00;

  --sunset-500: #ff5f00;

  --sunset-600: #ef4b00;

  --sunset-700: #c73a00;

  --sunset-800: #9f3000;

  --sunset-900: #7d2700;

  --sunset-950: #431300;



  /* Sand (Neutral/Background) */

  --sand-50: #fcfaf5;

  --sand-100: #f6f1e7;

  --sand-200: #ebdfc8;

  --sand-300: #dac39f;

  --sand-400: #c2a677;

  --sand-500: #ab8c5b;

  --sand-600: #957850;

  --sand-700: #7a6343;

  --sand-800: #625137;

  --sand-900: #4f412d;

  --sand-950: #292218;



  /* Night (Dark/Text) */

  --night-50: #f2f0f3;

  --night-100: #e4e1e7;

  --night-200: #cbc7d3;

  --night-300: #aaa4b8;

  --night-400: #847d9a;

  --night-500: #6a6380;

  --night-600: #57516a;

  --night-700: #464055;

  --night-800: #393444;

  --night-900: #201e28;

  --night-950: #12111a;



  /* ─── Semantic Mappings ─── */

  --color-critical: var(--violet-500);

  --color-warning: var(--sunset-300);

  --color-healthy: #5D8C61;

  --color-info: #3b82f6;

  

  --color-action: var(--sunset-500);

  --color-action-hover: var(--sunset-600);

  --color-action-glow: rgba(255, 95, 0, 0.25);



  /* ─── Surfaces ─── */

  --surface-page: var(--sand-50);

  --surface-card: #ffffff;

  --surface-elevated: #ffffff;

  --surface-muted: var(--sand-100);

  --surface-glass: rgba(255, 255, 255, 0.7);



  /* ─── Text ─── */

  --text-primary: var(--night-950);

  --text-secondary: var(--night-500);

  --text-muted: var(--night-400);

  --text-inverse: var(--sand-50);



  /* ─── Borders ─── */

  --border-subtle: var(--sand-200);

  --border-default: var(--sand-300);

  --border-strong: var(--sand-400);



  /* ─── Spacing Scale (8px base) ─── */

  --space-1: 0.25rem;  /* 4px */

  --space-2: 0.5rem;   /* 8px */

  --space-3: 0.75rem;  /* 12px */

  --space-4: 1rem;     /* 16px */

  --space-5: 1.25rem;  /* 20px */

  --space-6: 1.5rem;   /* 24px */

  --space-8: 2rem;     /* 32px */

  --space-10: 2.5rem;  /* 40px */

  --space-12: 3rem;    /* 48px */



  /* ─── Typography ─── */

  --font-display: 'Outfit', system-ui, sans-serif;

  --font-body: 'Inter', system-ui, sans-serif;

  --font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;



  --text-xs: 0.6875rem;   /* 11px */

  --text-sm: 0.75rem;     /* 12px */

  --text-base: 0.875rem;  /* 14px */

  --text-lg: 1rem;        /* 16px */

  --text-xl: 1.25rem;     /* 20px */

  --text-2xl: 1.5rem;     /* 24px */

  --text-3xl: 2rem;       /* 32px */



  /* ─── Radii (Lasso-inspired organic curves) ─── */

  --radius-sm: 4px;

  --radius-md: 8px;

  --radius-lg: 12px;

  --radius-xl: 16px;

  --radius-2xl: 24px;

  --radius-pill: 9999px;

  --radius-lasso: 0 var(--radius-lg) var(--radius-lg) 0; /* Signature accent radius */



  /* ─── Shadows (Layered depth) ─── */

  --shadow-xs: 0 1px 2px rgba(18, 17, 26, 0.04);

  --shadow-sm: 0 2px 4px rgba(18, 17, 26, 0.04), 0 1px 2px rgba(18, 17, 26, 0.02);

  --shadow-md: 0 4px 12px rgba(18, 17, 26, 0.06), 0 2px 4px rgba(18, 17, 26, 0.04);

  --shadow-lg: 0 8px 24px rgba(18, 17, 26, 0.08), 0 4px 8px rgba(18, 17, 26, 0.04);

  --shadow-xl: 0 16px 48px rgba(18, 17, 26, 0.12), 0 8px 16px rgba(18, 17, 26, 0.06);

  --shadow-glow: 0 0 24px var(--color-action-glow);

  --shadow-inner: inset 0 2px 4px rgba(18, 17, 26, 0.06);



  /* ─── Transitions ─── */

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  --duration-fast: 150ms;

  --duration-normal: 250ms;

  --duration-slow: 400ms;

}



/* ═══════════════════════════════════════════════════════════════════════════

   BASE STYLES

   ═══════════════════════════════════════════════════════════════════════════ */



html { 

  font-size: 16px; 

  -webkit-font-smoothing: antialiased;

  -moz-osx-font-smoothing: grayscale;

}



body {

  font-family: var(--font-body);

  background: linear-gradient(180deg, var(--sand-50) 0%, var(--sand-100) 50%, var(--violet-100) 100%);

  color: var(--text-primary);

  line-height: 1.5;

  min-height: 100vh;

  padding: var(--space-8);

}



/* ═══════════════════════════════════════════════════════════════════════════

   COMPONENT 1: UNIFIED CARD (.card)

   Replaces: exec-summary, summary-card, fix-block, bleed-callout, 

             milestone-card, scope-column, zone-finops, term-item

   ═══════════════════════════════════════════════════════════════════════════ */



.card {

  /* Base structure */

  position: relative;

  background: var(--surface-card);

  border: 1px solid var(--border-subtle);

  border-radius: var(--radius-lg);

  padding: var(--space-4) var(--space-5);

  

  /* Subtle depth */

  box-shadow: var(--shadow-sm);

  

  /* Smooth interactions */

  transition: 

    box-shadow var(--duration-normal) var(--ease-out),

    transform var(--duration-normal) var(--ease-out),

    border-color var(--duration-fast) var(--ease-out);

}



.card:hover {

  box-shadow: var(--shadow-md);

  transform: translateY(-1px);

}



/* ─── Accent Variant (Left border highlight) ─── */

.card--accent {

  border-left: 4px solid var(--sunset-500);

  border-radius: var(--radius-lasso);

  background: linear-gradient(135deg, var(--surface-card) 0%, var(--sunset-50) 100%);

}



.card--accent::before {

  content: '';

  position: absolute;

  top: 0;

  left: -4px;

  bottom: 0;

  width: 4px;

  background: linear-gradient(180deg, var(--sunset-400) 0%, var(--sunset-600) 100%);

  border-radius: var(--radius-sm) 0 0 var(--radius-sm);

}



/* ─── Color Variants ─── */

.card--critical {

  border-left-color: var(--violet-500);

  background: linear-gradient(135deg, var(--surface-card) 0%, var(--violet-50) 100%);

}

.card--critical::before { background: linear-gradient(180deg, var(--violet-400) 0%, var(--violet-600) 100%); }



.card--warning {

  border-left-color: var(--sunset-300);

  background: linear-gradient(135deg, var(--surface-card) 0%, var(--sunset-50) 100%);

}

.card--warning::before { background: linear-gradient(180deg, var(--sunset-200) 0%, var(--sunset-400) 100%); }



.card--healthy {

  border-left-color: var(--color-healthy);

  background: linear-gradient(135deg, var(--surface-card) 0%, #f0fdf4 100%);

}

.card--healthy::before { background: linear-gradient(180deg, #6ee7b7 0%, #059669 100%); }



/* ─── Glass Variant (Frosted effect) ─── */

.card--glass {

  background: var(--surface-glass);

  backdrop-filter: blur(12px);

  -webkit-backdrop-filter: blur(12px);

  border: 1px solid rgba(255, 255, 255, 0.5);

  box-shadow: 

    var(--shadow-md),

    inset 0 1px 0 rgba(255, 255, 255, 0.8);

}



/* ─── Elevated Variant (Higher prominence) ─── */

.card--elevated {

  box-shadow: var(--shadow-lg);

  border-color: transparent;

}



.card--elevated:hover {

  box-shadow: var(--shadow-xl);

  transform: translateY(-2px);

}



/* ─── Inset Variant (Recessed appearance) ─── */

.card--inset {

  background: var(--surface-muted);

  box-shadow: var(--shadow-inner);

  border-color: transparent;

}



.card--inset:hover {

  box-shadow: var(--shadow-inner);

  transform: none;

}



/* ─── Size Variants ─── */

.card--sm { padding: var(--space-2) var(--space-3); }

.card--lg { padding: var(--space-6) var(--space-8); }



/* ─── Interactive Variant ─── */

.card--interactive {

  cursor: pointer;

}



.card--interactive:hover {

  border-color: var(--sunset-300);

}



.card--interactive:active {

  transform: translateY(0);

  box-shadow: var(--shadow-sm);

}





/* ═══════════════════════════════════════════════════════════════════════════

   COMPONENT 2: UNIFIED STAT (.stat)

   Replaces: stat-card, zone-stat, metric-chip

   ═══════════════════════════════════════════════════════════════════════════ */



.stat {

  /* Structure */

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

  padding: var(--space-4);

  min-height: 5rem;

  

  /* Surface */

  background: linear-gradient(135deg, var(--surface-card) 0%, var(--sand-100) 100%);

  border: 1px solid var(--border-subtle);

  border-radius: var(--radius-lg);

  

  /* Depth */

  box-shadow: var(--shadow-sm);

  

  /* Interaction */

  transition: all var(--duration-normal) var(--ease-out);

}



.stat:hover {

  box-shadow: var(--shadow-md);

  transform: translateY(-2px);

}



/* ─── Value (The big number) ─── */

.stat__value {

  font-family: var(--font-display);

  font-size: var(--text-2xl);

  font-weight: 800;

  line-height: 1.1;

  color: var(--text-primary);

  letter-spacing: -0.02em;

}



.stat__value--accent { color: var(--sunset-500); }

.stat__value--critical { color: var(--violet-500); }

.stat__value--warning { color: var(--sunset-300); }

.stat__value--healthy { color: var(--color-healthy); }



/* Suffix styling (for units like /mo, /yr) */

.stat__value small {

  font-size: 0.5em;

  font-weight: 600;

  opacity: 0.7;

  margin-left: 0.1em;

}



/* ─── Label (Description) ─── */

.stat__label {

  font-family: var(--font-body);

  font-size: var(--text-xs);

  font-weight: 600;

  color: var(--text-muted);

  text-transform: uppercase;

  letter-spacing: 0.05em;

  margin-top: var(--space-1);

}



/* ─── Meta (Additional context) ─── */

.stat__meta {

  margin-top: var(--space-2);

}



/* ─── Size Variants ─── */

.stat--sm {

  padding: var(--space-2) var(--space-3);

  min-height: auto;

}

.stat--sm .stat__value { font-size: var(--text-lg); }

.stat--sm .stat__label { font-size: 0.5625rem; }



.stat--lg {

  padding: var(--space-6);

  min-height: 7rem;

}

.stat--lg .stat__value { font-size: var(--text-3xl); }



/* ─── Accent Border Variant ─── */

.stat--bordered {

  border-left: 3px solid var(--sunset-500);

  border-radius: var(--radius-lasso);

}



.stat--bordered.stat--critical { border-left-color: var(--violet-500); }

.stat--bordered.stat--warning { border-left-color: var(--sunset-300); }

.stat--bordered.stat--healthy { border-left-color: var(--color-healthy); }



/* ─── Highlighted Variant (Prominent background) ─── */

.stat--highlight {

  background: linear-gradient(135deg, var(--sunset-50) 0%, var(--sunset-100) 100%);

  border-color: var(--sunset-200);

}



.stat--highlight.stat--critical {

  background: linear-gradient(135deg, var(--violet-50) 0%, var(--violet-100) 100%);

  border-color: var(--violet-200);

}



.stat--highlight.stat--healthy {

  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);

  border-color: #a7f3d0;

}





/* ═══════════════════════════════════════════════════════════════════════════

   COMPONENT 3: UNIFIED LABEL (.label)

   Replaces: term-label, milestone-deliverables-label, deliverables-label,

             timeline-label, floor-label, retainer-label, chip-label

   ═══════════════════════════════════════════════════════════════════════════ */



.label {

  display: block;

  font-family: var(--font-body);

  font-size: var(--text-xs);

  font-weight: 600;

  color: var(--text-muted);

  text-transform: uppercase;

  letter-spacing: 0.05em;

  line-height: 1.3;

}



/* ─── Color Variants ─── */

.label--accent { color: var(--sunset-500); }

.label--critical { color: var(--violet-500); }

.label--warning { color: var(--sunset-400); }

.label--healthy { color: var(--color-healthy); }

.label--muted { color: var(--text-muted); }



/* ─── Size Variants ─── */

.label--sm { font-size: 0.5625rem; }

.label--lg { font-size: var(--text-sm); }



/* ─── Inline Variant ─── */

.label--inline {

  display: inline;

  margin-right: var(--space-1);

}





/* ═══════════════════════════════════════════════════════════════════════════

   COMPONENT 4: UNIFIED INDICATOR (.indicator)

   Replaces: status-dot, fix-dot, bleed-dot

   ═══════════════════════════════════════════════════════════════════════════ */



.indicator {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  width: 12px;

  height: 12px;

  border-radius: 50%;

  flex-shrink: 0;

  

  /* Subtle inner shadow for depth */

  box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.15);

  

  /* Default: neutral */

  background: var(--night-300);

}



/* ─── Status Colors ─── */

.indicator--critical { 

  background: linear-gradient(135deg, var(--violet-400) 0%, var(--violet-600) 100%);

  box-shadow: 

    inset 0 -2px 4px rgba(0, 0, 0, 0.15),

    0 0 8px rgba(207, 60, 105, 0.3);

}



.indicator--warning { 

  background: linear-gradient(135deg, var(--sunset-300) 0%, var(--sunset-500) 100%);

  box-shadow: 

    inset 0 -2px 4px rgba(0, 0, 0, 0.15),

    0 0 8px rgba(255, 158, 51, 0.3);

}



.indicator--healthy { 

  background: linear-gradient(135deg, #6ee7b7 0%, #059669 100%);

  box-shadow: 

    inset 0 -2px 4px rgba(0, 0, 0, 0.15),

    0 0 8px rgba(5, 150, 105, 0.3);

}



.indicator--info { 

  background: linear-gradient(135deg, #60a5fa 0%, #2563eb 100%);

  box-shadow: 

    inset 0 -2px 4px rgba(0, 0, 0, 0.15),

    0 0 8px rgba(37, 99, 235, 0.3);

}



/* ─── Size Variants ─── */

.indicator--sm { width: 8px; height: 8px; }

.indicator--md { width: 12px; height: 12px; }

.indicator--lg { width: 16px; height: 16px; }

.indicator--xl { width: 24px; height: 24px; }



/* ─── Pulsing Animation (for live status) ─── */

.indicator--pulse {

  animation: indicator-pulse 2s ease-in-out infinite;

}



@keyframes indicator-pulse {

  0%, 100% { opacity: 1; transform: scale(1); }

  50% { opacity: 0.7; transform: scale(1.1); }

}





/* ═══════════════════════════════════════════════════════════════════════════

   COMPONENT 5: UNIFIED BADGE (.badge)

   Replaces: pill, risk-badge, type-pill, math-pill, milestone-badge, hosting-pill

   ═══════════════════════════════════════════════════════════════════════════ */



.badge {

  display: inline-flex;

  align-items: center;

  gap: var(--space-1);

  padding: 0.1875rem 0.5rem;

  

  font-family: var(--font-body);

  font-size: var(--text-xs);

  font-weight: 600;

  line-height: 1.3;

  white-space: nowrap;

  

  background: var(--sand-100);

  color: var(--text-secondary);

  border: 1px solid var(--border-subtle);

  border-radius: var(--radius-pill);

  

  transition: all var(--duration-fast) var(--ease-out);

}



/* ─── Semantic Variants ─── */

.badge--critical {

  background: var(--violet-100);

  color: var(--violet-700);

  border-color: var(--violet-200);

}



.badge--warning {

  background: var(--sunset-100);

  color: var(--sunset-800);

  border-color: var(--sunset-200);

}



.badge--healthy {

  background: #d1fae5;

  color: #065f46;

  border-color: #a7f3d0;

}



.badge--info {

  background: #dbeafe;

  color: #1e40af;

  border-color: #bfdbfe;

}



.badge--accent {

  background: var(--sunset-100);

  color: var(--sunset-700);

  border-color: var(--sunset-200);

}



/* ─── Code/Math Variant ─── */

.badge--code {

  font-family: var(--font-mono);

  font-size: 0.625rem;

  font-weight: 500;

  letter-spacing: -0.01em;

  background: var(--sand-100);

  border-style: dotted;

  border-radius: var(--radius-sm);

}



/* ─── Uppercase Variant ─── */

.badge--caps {

  text-transform: uppercase;

  letter-spacing: 0.05em;

  font-weight: 700;

}



/* ─── Size Variants ─── */

.badge--sm {

  padding: 0.125rem 0.375rem;

  font-size: 0.5625rem;

}



.badge--lg {

  padding: 0.25rem 0.75rem;

  font-size: var(--text-sm);

}



/* ─── Solid Variant (More prominent) ─── */

.badge--solid {

  background: var(--night-800);

  color: var(--sand-50);

  border-color: transparent;

}



.badge--solid.badge--critical {

  background: var(--violet-500);

  color: white;

}



.badge--solid.badge--warning {

  background: var(--sunset-500);

  color: white;

}



.badge--solid.badge--healthy {

  background: var(--color-healthy);

  color: white;

}



/* ─── Outline Variant (Minimal) ─── */

.badge--outline {

  background: transparent;

}



/* ─── Semantic Type Badges (for tech stacks) ─── */

.badge--workflow { background: #fef3c7; color: #92400e; border-color: #fde68a; }

.badge--ai { background: #fae8ff; color: #86198f; border-color: #f5d0fe; }

.badge--database { background: #d1fae5; color: #065f46; border-color: #a7f3d0; }

.badge--communication { background: #fce7f3; color: #9d174d; border-color: #fbcfe8; }

.badge--integration { background: #e0e7ff; color: #3730a3; border-color: #c7d2fe; }

.badge--api { background: #dbeafe; color: #1e40af; border-color: #bfdbfe; }





/* ═══════════════════════════════════════════════════════════════════════════

   COMPONENT 6: UNIFIED SECTION (.section)

   Replaces: zone-finops, zone-commercial, scope-section, term-item groups

   ═══════════════════════════════════════════════════════════════════════════ */



.section {

  margin-bottom: var(--space-6);

}



.section__header {

  display: flex;

  align-items: center;

  gap: var(--space-3);

  margin-bottom: var(--space-4);

  padding-bottom: var(--space-3);

  border-bottom: 2px solid var(--sand-200);

}



.section__number {

  font-family: var(--font-display);

  font-size: var(--text-base);

  font-weight: 700;

  color: var(--sunset-500);

}



.section__title {

  font-family: var(--font-display);

  font-size: var(--text-base);

  font-weight: 700;

  color: var(--text-primary);

}



.section__content {

  /* Container for section body */

}





/* ═══════════════════════════════════════════════════════════════════════════

   COMPONENT 7: UNIFIED BUTTON (.btn)

   A proper button component following the design system

   ═══════════════════════════════════════════════════════════════════════════ */



.btn {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: var(--space-2);

  

  padding: 0.625rem 1.25rem;

  

  font-family: var(--font-display);

  font-size: var(--text-sm);

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.03em;

  text-decoration: none;

  white-space: nowrap;

  

  border: none;

  border-radius: var(--radius-md);

  cursor: pointer;

  

  transition: all var(--duration-normal) var(--ease-out);

}



/* ─── Primary (Default) ─── */

.btn--primary {

  background: linear-gradient(135deg, var(--sunset-500) 0%, var(--sunset-600) 100%);

  color: white;

  box-shadow: 

    0 4px 12px var(--color-action-glow),

    inset 0 1px 0 rgba(255, 255, 255, 0.2);

}



.btn--primary:hover {

  background: linear-gradient(135deg, var(--sunset-400) 0%, var(--sunset-500) 100%);

  box-shadow: 

    0 6px 20px rgba(255, 95, 0, 0.35),

    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  transform: translateY(-2px);

}



.btn--primary:active {

  transform: translateY(0);

  box-shadow: 0 2px 8px var(--color-action-glow);

}



/* ─── Ghost Variant ─── */

.btn--ghost {

  background: transparent;

  color: var(--text-secondary);

  border: 1px solid var(--border-default);

}



.btn--ghost:hover {

  background: var(--sand-100);

  border-color: var(--sunset-300);

  color: var(--sunset-600);

}



/* ─── Size Variants ─── */

.btn--sm {

  padding: 0.375rem 0.75rem;

  font-size: var(--text-xs);

}



.btn--lg {

  padding: 0.875rem 1.75rem;

  font-size: var(--text-base);

}





/* ═══════════════════════════════════════════════════════════════════════════

   LAYOUT UTILITIES

   ═══════════════════════════════════════════════════════════════════════════ */



.grid { display: grid; gap: var(--space-4); }

.grid--2 { grid-template-columns: repeat(2, 1fr); }

.grid--3 { grid-template-columns: repeat(3, 1fr); }

.grid--4 { grid-template-columns: repeat(4, 1fr); }



.flex { display: flex; }

.flex--wrap { flex-wrap: wrap; }

.flex--center { align-items: center; justify-content: center; }

.flex--between { justify-content: space-between; }

.flex--gap-sm { gap: var(--space-2); }

.flex--gap-md { gap: var(--space-4); }



.stack { display: flex; flex-direction: column; gap: var(--space-3); }

.stack--sm { gap: var(--space-2); }

.stack--lg { gap: var(--space-6); }





/* ═══════════════════════════════════════════════════════════════════════════

   SHOWCASE STYLING

   ═══════════════════════════════════════════════════════════════════════════ */



.showcase {

  max-width: 1200px;

  margin: 0 auto;

}



.showcase__header {

  text-align: center;

  margin-bottom: var(--space-12);

  padding: var(--space-8);

  background: var(--surface-card);

  border-radius: var(--radius-2xl);

  box-shadow: var(--shadow-lg);

  border: 1px solid var(--border-subtle);

  position: relative;

  overflow: hidden;

}



/* Decorative gradient swoosh (lasso-inspired) */

.showcase__header::before {

  content: '';

  position: absolute;

  top: -50%;

  right: -20%;

  width: 60%;

  height: 200%;

  background: linear-gradient(135deg, transparent 0%, var(--sunset-100) 50%, transparent 100%);

  opacity: 0.5;

  transform: rotate(-15deg);

  pointer-events: none;

}



.showcase__logo {

  font-family: var(--font-display);

  font-size: var(--text-3xl);

  font-weight: 800;

  background: linear-gradient(135deg, var(--sunset-500) 0%, var(--sunset-600) 100%);

  -webkit-background-clip: text;

  -webkit-text-fill-color: transparent;

  background-clip: text;

  margin-bottom: var(--space-2);

  position: relative;

}



.showcase__subtitle {

  font-family: var(--font-body);

  font-size: var(--text-lg);

  color: var(--text-secondary);

  position: relative;

}



.component-section {

  background: var(--surface-card);

  border-radius: var(--radius-xl);

  padding: var(--space-8);

  margin-bottom: var(--space-8);

  box-shadow: var(--shadow-md);

  border: 1px solid var(--border-subtle);

}



.component-section__title {

  font-family: var(--font-display);

  font-size: var(--text-xl);

  font-weight: 700;

  color: var(--text-primary);

  margin-bottom: var(--space-2);

  display: flex;

  align-items: center;

  gap: var(--space-3);

}



.component-section__title::before {

  content: '';

  width: 4px;

  height: 1.5em;

  background: linear-gradient(180deg, var(--sunset-400) 0%, var(--sunset-600) 100%);

  border-radius: var(--radius-pill);

}



.component-section__desc {

  font-size: var(--text-base);

  color: var(--text-secondary);

  margin-bottom: var(--space-6);

  padding-bottom: var(--space-4);

  border-bottom: 1px solid var(--sand-200);

}



.component-section__desc code {

  font-family: var(--font-mono);

  font-size: 0.875em;

  background: var(--sand-100);

  padding: 0.1em 0.4em;

  border-radius: var(--radius-sm);

  color: var(--violet-600);

}



.variant-group {

  margin-bottom: var(--space-6);

}



.variant-group__label {

  font-family: var(--font-display);

  font-size: var(--text-sm);

  font-weight: 600;

  color: var(--text-muted);

  text-transform: uppercase;

  letter-spacing: 0.05em;

  margin-bottom: var(--space-3);

}

  </style>

</head>

<body>



<div class="showcase">



  <!-- ═══════════════════════════════════════════════════════════════════════

       HEADER

       ═══════════════════════════════════════════════════════════════════════ -->

  <header class="showcase__header">

    <h1 class="showcase__logo">Wranngle Design System</h1>

    <p class="showcase__subtitle">Consolidated Components — 6 Pattern Families Unified</p>

  </header>





  <!-- ═══════════════════════════════════════════════════════════════════════

       COMPONENT 1: CARD

       ═══════════════════════════════════════════════════════════════════════ -->

  <section class="component-section">

    <h2 class="component-section__title">Card Component</h2>

    <p class="component-section__desc">

      <strong>Replaces:</strong> <code>.exec-summary</code>, <code>.summary-card</code>, <code>.fix-block</code>, <code>.bleed-callout</code>, <code>.milestone-card</code>, <code>.scope-column</code>

    </p>



    <div class="variant-group">

      <div class="variant-group__label">Base + Accent Variants</div>

      <div class="grid grid--3" style="margin-bottom: var(--space-4);">

        <div class="card">

          <div class="label label--muted" style="margin-bottom: var(--space-2);">Default Card</div>

          <p style="font-size: var(--text-sm); color: var(--text-secondary);">Clean surface with subtle shadow. Hover for lift effect.</p>

        </div>

        <div class="card card--accent">

          <div class="label label--accent" style="margin-bottom: var(--space-2);">Accent Card</div>

          <p style="font-size: var(--text-sm); color: var(--text-secondary);">Signature left-border treatment with warm gradient.</p>

        </div>

        <div class="card card--elevated">

          <div class="label label--muted" style="margin-bottom: var(--space-2);">Elevated Card</div>

          <p style="font-size: var(--text-sm); color: var(--text-secondary);">Higher prominence with deeper shadows.</p>

        </div>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Semantic Color Variants</div>

      <div class="grid grid--4">

        <div class="card card--accent">

          <div class="label label--accent" style="margin-bottom: var(--space-1);">Action</div>

          <p style="font-size: var(--text-xs); color: var(--text-muted);">Primary emphasis</p>

        </div>

        <div class="card card--accent card--critical">

          <div class="label label--critical" style="margin-bottom: var(--space-1);">Critical</div>

          <p style="font-size: var(--text-xs); color: var(--text-muted);">Urgent attention</p>

        </div>

        <div class="card card--accent card--warning">

          <div class="label label--warning" style="margin-bottom: var(--space-1);">Warning</div>

          <p style="font-size: var(--text-xs); color: var(--text-muted);">Caution needed</p>

        </div>

        <div class="card card--accent card--healthy">

          <div class="label label--healthy" style="margin-bottom: var(--space-1);">Healthy</div>

          <p style="font-size: var(--text-xs); color: var(--text-muted);">Positive state</p>

        </div>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Special Variants</div>

      <div class="grid grid--2">

        <div class="card card--glass">

          <div class="label" style="margin-bottom: var(--space-2);">Glass Card</div>

          <p style="font-size: var(--text-sm); color: var(--text-secondary);">Frosted glass effect with backdrop blur. Modern, ethereal feel.</p>

        </div>

        <div class="card card--inset">

          <div class="label" style="margin-bottom: var(--space-2);">Inset Card</div>

          <p style="font-size: var(--text-sm); color: var(--text-secondary);">Recessed appearance for secondary content or grouping.</p>

        </div>

      </div>

    </div>

  </section>





  <!-- ═══════════════════════════════════════════════════════════════════════

       COMPONENT 2: STAT

       ═══════════════════════════════════════════════════════════════════════ -->

  <section class="component-section">

    <h2 class="component-section__title">Stat Component</h2>

    <p class="component-section__desc">

      <strong>Replaces:</strong> <code>.stat-card</code>, <code>.zone-stat</code>, <code>.metric-chip</code>

    </p>



    <div class="variant-group">

      <div class="variant-group__label">Standard Stats</div>

      <div class="grid grid--4">

        <div class="stat">

          <div class="stat__value stat__value--accent">$28,152</div>

          <div class="stat__label">Client Price</div>

        </div>

        <div class="stat">

          <div class="stat__value">180<small>hrs</small></div>

          <div class="stat__label">Total Hours</div>

        </div>

        <div class="stat">

          <div class="stat__value stat__value--healthy">9<small>wks</small></div>

          <div class="stat__label">Duration</div>

        </div>

        <div class="stat">

          <div class="stat__value stat__value--critical">65%</div>

          <div class="stat__label">Margin</div>

        </div>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Bordered Variants (With Accent Line)</div>

      <div class="grid grid--4">

        <div class="stat stat--bordered">

          <div class="stat__value stat__value--accent">1853%</div>

          <div class="stat__label">ROI Coverage</div>

          <div class="stat__meta">

            <span class="badge badge--code">= savings ÷ cost</span>

          </div>

        </div>

        <div class="stat stat--bordered stat--critical">

          <div class="stat__value stat__value--critical">$13,475<small>/mo</small></div>

          <div class="stat__label">Monthly Bleed</div>

        </div>

        <div class="stat stat--bordered stat--warning">

          <div class="stat__value stat__value--warning">7<small>/10</small></div>

          <div class="stat__label">Risk Score</div>

        </div>

        <div class="stat stat--bordered stat--healthy">

          <div class="stat__value stat__value--healthy">3<small>wks</small></div>

          <div class="stat__label">Payback Period</div>

        </div>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Size Variants</div>

      <div class="flex flex--gap-md" style="align-items: flex-end;">

        <div class="stat stat--sm" style="min-width: 80px;">

          <div class="stat__value">18%</div>

          <div class="stat__label">Small</div>

        </div>

        <div class="stat" style="min-width: 120px;">

          <div class="stat__value stat__value--accent">$521K</div>

          <div class="stat__label">Default</div>

        </div>

        <div class="stat stat--lg stat--highlight" style="min-width: 180px;">

          <div class="stat__value stat__value--accent">$161,700<small>/yr</small></div>

          <div class="stat__label">Large + Highlight</div>

        </div>

      </div>

    </div>

  </section>





  <!-- ═══════════════════════════════════════════════════════════════════════

       COMPONENT 3: LABEL

       ═══════════════════════════════════════════════════════════════════════ -->

  <section class="component-section">

    <h2 class="component-section__title">Label Component</h2>

    <p class="component-section__desc">

      <strong>Replaces:</strong> <code>.term-label</code>, <code>.milestone-deliverables-label</code>, <code>.deliverables-label</code>, <code>.timeline-label</code>, <code>.floor-label</code>, <code>.retainer-label</code>, <code>.chip-label</code>

    </p>



    <div class="variant-group">

      <div class="variant-group__label">Color Variants</div>

      <div class="flex flex--wrap flex--gap-md">

        <div>

          <span class="label">Default Label</span>

          <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-top: var(--space-1);">Muted by default</p>

        </div>

        <div>

          <span class="label label--accent">Accent Label</span>

          <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-top: var(--space-1);">For primary emphasis</p>

        </div>

        <div>

          <span class="label label--critical">Critical Label</span>

          <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-top: var(--space-1);">Urgent items</p>

        </div>

        <div>

          <span class="label label--warning">Warning Label</span>

          <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-top: var(--space-1);">Caution items</p>

        </div>

        <div>

          <span class="label label--healthy">Healthy Label</span>

          <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-top: var(--space-1);">Positive items</p>

        </div>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Size Variants</div>

      <div class="flex flex--wrap flex--gap-md" style="align-items: baseline;">

        <span class="label label--sm">Small Label</span>

        <span class="label">Default Label</span>

        <span class="label label--lg">Large Label</span>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Inline Usage</div>

      <div class="card card--inset">

        <p style="font-size: var(--text-sm);">

          <span class="label label--inline label--accent">Problem:</span>

          Manual paperwork processing requires 17.5m per patient.

        </p>

        <p style="font-size: var(--text-sm); margin-top: var(--space-2);">

          <span class="label label--inline label--healthy">Fix:</span>

          Automate the data bridge between Jotform and Athenahealth.

        </p>

      </div>

    </div>

  </section>





  <!-- ═══════════════════════════════════════════════════════════════════════

       COMPONENT 4: INDICATOR

       ═══════════════════════════════════════════════════════════════════════ -->

  <section class="component-section">

    <h2 class="component-section__title">Indicator Component</h2>

    <p class="component-section__desc">

      <strong>Replaces:</strong> <code>.status-dot</code>, <code>.fix-dot</code>, <code>.bleed-dot</code>

    </p>



    <div class="variant-group">

      <div class="variant-group__label">Status Colors</div>

      <div class="flex flex--wrap flex--gap-md">

        <div class="flex flex--gap-sm" style="align-items: center;">

          <span class="indicator"></span>

          <span style="font-size: var(--text-sm);">Neutral</span>

        </div>

        <div class="flex flex--gap-sm" style="align-items: center;">

          <span class="indicator indicator--critical"></span>

          <span style="font-size: var(--text-sm);">Critical</span>

        </div>

        <div class="flex flex--gap-sm" style="align-items: center;">

          <span class="indicator indicator--warning"></span>

          <span style="font-size: var(--text-sm);">Warning</span>

        </div>

        <div class="flex flex--gap-sm" style="align-items: center;">

          <span class="indicator indicator--healthy"></span>

          <span style="font-size: var(--text-sm);">Healthy</span>

        </div>

        <div class="flex flex--gap-sm" style="align-items: center;">

          <span class="indicator indicator--info"></span>

          <span style="font-size: var(--text-sm);">Info</span>

        </div>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Size Variants</div>

      <div class="flex flex--wrap flex--gap-md" style="align-items: center;">

        <div class="flex flex--gap-sm" style="align-items: center;">

          <span class="indicator indicator--sm indicator--critical"></span>

          <span style="font-size: var(--text-xs);">Small (8px)</span>

        </div>

        <div class="flex flex--gap-sm" style="align-items: center;">

          <span class="indicator indicator--md indicator--warning"></span>

          <span style="font-size: var(--text-xs);">Medium (12px)</span>

        </div>

        <div class="flex flex--gap-sm" style="align-items: center;">

          <span class="indicator indicator--lg indicator--healthy"></span>

          <span style="font-size: var(--text-xs);">Large (16px)</span>

        </div>

        <div class="flex flex--gap-sm" style="align-items: center;">

          <span class="indicator indicator--xl indicator--info"></span>

          <span style="font-size: var(--text-xs);">XL (24px)</span>

        </div>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Animated (Pulse)</div>

      <div class="flex flex--wrap flex--gap-md" style="align-items: center;">

        <div class="flex flex--gap-sm" style="align-items: center;">

          <span class="indicator indicator--lg indicator--healthy indicator--pulse"></span>

          <span style="font-size: var(--text-sm);">Live / Active Status</span>

        </div>

        <div class="flex flex--gap-sm" style="align-items: center;">

          <span class="indicator indicator--lg indicator--critical indicator--pulse"></span>

          <span style="font-size: var(--text-sm);">Alert Active</span>

        </div>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">In Context (Table Row)</div>

      <div class="card card--inset">

        <div class="flex flex--between" style="padding: var(--space-2) 0; border-bottom: 1px solid var(--sand-200);">

          <span style="font-size: var(--text-sm); font-weight: 600;">Patient No-Show Rate</span>

          <div class="flex flex--gap-sm" style="align-items: center;">

            <span class="indicator indicator--critical"></span>

            <span style="font-size: var(--text-sm); color: var(--violet-600);">18% (target: 5%)</span>

          </div>

        </div>

        <div class="flex flex--between" style="padding: var(--space-2) 0; border-bottom: 1px solid var(--sand-200);">

          <span style="font-size: var(--text-sm); font-weight: 600;">System Uptime</span>

          <div class="flex flex--gap-sm" style="align-items: center;">

            <span class="indicator indicator--healthy"></span>

            <span style="font-size: var(--text-sm); color: var(--color-healthy);">99.9%</span>

          </div>

        </div>

        <div class="flex flex--between" style="padding: var(--space-2) 0;">

          <span style="font-size: var(--text-sm); font-weight: 600;">API Response Time</span>

          <div class="flex flex--gap-sm" style="align-items: center;">

            <span class="indicator indicator--warning"></span>

            <span style="font-size: var(--text-sm); color: var(--sunset-600);">450ms (target: 200ms)</span>

          </div>

        </div>

      </div>

    </div>

  </section>





  <!-- ═══════════════════════════════════════════════════════════════════════

       COMPONENT 5: BADGE

       ═══════════════════════════════════════════════════════════════════════ -->

  <section class="component-section">

    <h2 class="component-section__title">Badge Component</h2>

    <p class="component-section__desc">

      <strong>Replaces:</strong> <code>.pill</code>, <code>.risk-badge</code>, <code>.type-pill</code>, <code>.math-pill</code>, <code>.milestone-badge</code>, <code>.hosting-pill</code>

    </p>



    <div class="variant-group">

      <div class="variant-group__label">Semantic Variants</div>

      <div class="flex flex--wrap flex--gap-sm">

        <span class="badge">Default</span>

        <span class="badge badge--accent">Accent</span>

        <span class="badge badge--critical">Critical</span>

        <span class="badge badge--warning">Warning</span>

        <span class="badge badge--healthy">Healthy</span>

        <span class="badge badge--info">Info</span>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Solid Variants (High Contrast)</div>

      <div class="flex flex--wrap flex--gap-sm">

        <span class="badge badge--solid">Default</span>

        <span class="badge badge--solid badge--critical">Critical</span>

        <span class="badge badge--solid badge--warning">Warning</span>

        <span class="badge badge--solid badge--healthy">Healthy</span>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Code/Math Badges</div>

      <div class="flex flex--wrap flex--gap-sm">

        <span class="badge badge--code">= $13,475/mo × 12</span>

        <span class="badge badge--code">180 hrs × $50/hr</span>

        <span class="badge badge--code">ROI: 1853%</span>

        <span class="badge badge--code">= price ÷ cost × 100</span>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Uppercase / Caps Variants</div>

      <div class="flex flex--wrap flex--gap-sm">

        <span class="badge badge--caps">Low Effort</span>

        <span class="badge badge--caps badge--accent">High Impact</span>

        <span class="badge badge--caps badge--warning">7-14 Days</span>

        <span class="badge badge--caps badge--healthy badge--solid">Complete</span>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Tech Stack Badges (Semantic Types)</div>

      <div class="flex flex--wrap flex--gap-sm">

        <span class="badge badge--workflow">n8n Workflow</span>

        <span class="badge badge--ai">Production LLM</span>

        <span class="badge badge--database">PostgreSQL</span>

        <span class="badge badge--communication">SMS Gateway</span>

        <span class="badge badge--integration">OAuth 2.0</span>

        <span class="badge badge--api">REST API</span>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Size Variants</div>

      <div class="flex flex--wrap flex--gap-sm" style="align-items: center;">

        <span class="badge badge--sm badge--accent">Small</span>

        <span class="badge badge--accent">Default</span>

        <span class="badge badge--lg badge--accent">Large</span>

      </div>

    </div>

  </section>





  <!-- ═══════════════════════════════════════════════════════════════════════

       COMPONENT 6: BUTTON

       ═══════════════════════════════════════════════════════════════════════ -->

  <section class="component-section">

    <h2 class="component-section__title">Button Component</h2>

    <p class="component-section__desc">

      A proper button following the consolidated design tokens for consistent CTAs.

    </p>



    <div class="variant-group">

      <div class="variant-group__label">Variants</div>

      <div class="flex flex--wrap flex--gap-md" style="align-items: center;">

        <button class="btn btn--primary">Primary Action</button>

        <button class="btn btn--primary btn--lg">Large Primary</button>

        <button class="btn btn--ghost">Ghost Button</button>

        <button class="btn btn--ghost btn--sm">Small Ghost</button>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">With Arrows (CTA Style)</div>

      <div class="flex flex--wrap flex--gap-md">

        <button class="btn btn--primary">Review Solution →</button>

        <button class="btn btn--primary">Approve & Start →</button>

        <button class="btn btn--ghost">← Back to Proposal</button>

      </div>

    </div>

  </section>





  <!-- ═══════════════════════════════════════════════════════════════════════

       COMPOSITE EXAMPLE: Real Usage

       ═══════════════════════════════════════════════════════════════════════ -->

  <section class="component-section">

    <h2 class="component-section__title">Composite Example</h2>

    <p class="component-section__desc">

      How these components work together to build real UI patterns from the presales template.

    </p>



    <div class="variant-group">

      <div class="variant-group__label">Fix Block (was separate component)</div>

      <div class="card card--accent" style="display: flex; gap: var(--space-4); align-items: flex-start;">

        <span class="indicator indicator--lg indicator--critical" style="margin-top: 2px;"></span>

        <div class="stack stack--sm" style="flex: 1;">

          <p style="font-size: var(--text-sm);">

            <span class="label label--inline">Problem:</span>

            Manual paperwork processing requires 17.5m per patient, leading to high labor costs.

          </p>

          <p style="font-size: var(--text-sm);">

            <span class="label label--inline label--accent">Fix:</span>

            Automate the data bridge between Jotform and Athenahealth to sync patient data instantly.

          </p>

          <p style="font-size: var(--text-sm);">

            <span class="label label--inline label--healthy">Impact:</span>

            Recover ~<span class="badge badge--code">$4,492/month</span>. Eliminates manual data transcription.

          </p>

          <div class="flex flex--wrap flex--gap-sm" style="margin-top: var(--space-2);">

            <span class="badge badge--caps">Low Effort</span>

            <span class="badge badge--caps badge--accent">High Impact</span>

            <span class="badge badge--caps">7-14 Days</span>

          </div>

        </div>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Stat Grid (Financial Summary)</div>

      <div class="grid grid--4">

        <div class="stat stat--bordered stat--highlight">

          <div class="stat__value stat__value--healthy">$161,700<small>/yr</small></div>

          <div class="stat__label">Hard Savings</div>

          <div class="stat__meta">

            <span class="badge badge--code badge--sm">= $13,475 × 12</span>

          </div>

        </div>

        <div class="stat stat--bordered stat--warning">

          <div class="stat__value stat__value--warning">$360,000<small>/yr</small></div>

          <div class="stat__label">Modeled Opportunity</div>

        </div>

        <div class="stat stat--bordered">

          <div class="stat__value stat__value--accent">$521,700<small>/yr</small></div>

          <div class="stat__label">Total Value</div>

        </div>

        <div class="stat stat--bordered stat--healthy stat--highlight">

          <div class="stat__value stat__value--healthy">1853%</div>

          <div class="stat__label">ROI Coverage</div>

        </div>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Scorecard Row</div>

      <div class="card">

        <div class="flex flex--between" style="align-items: flex-start;">

          <div style="flex: 1;">

            <div style="font-family: var(--font-display); font-weight: 700; font-size: var(--text-sm); margin-bottom: var(--space-1);">Patient No-Show Rate</div>

            <div class="flex flex--gap-sm" style="margin-bottom: var(--space-2);">

              <div class="stat stat--sm">

                <div class="stat__value" style="font-size: var(--text-base);">18%</div>

                <div class="stat__label">Current</div>

              </div>

              <div class="stat stat--sm stat--highlight stat--healthy">

                <div class="stat__value stat__value--healthy" style="font-size: var(--text-base);">5%</div>

                <div class="stat__label">Target</div>

              </div>

            </div>

            <p style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.4;">

              The <span class="badge badge--code badge--sm">18%</span> no-show rate diminishes clinic throughput and results in unrecoverable provider time.

            </p>

          </div>

          <span class="indicator indicator--xl indicator--critical"></span>

        </div>

      </div>

    </div>



    <div class="variant-group">

      <div class="variant-group__label">Service Tier Cards</div>

      <div class="grid grid--3">

        <div class="card card--interactive">

          <div class="flex flex--between" style="margin-bottom: var(--space-3);">

            <span class="label">Build & Transfer</span>

            <span style="font-family: var(--font-display); font-weight: 700;">$0<small style="font-weight: 500; color: var(--text-muted);">/mo</small></span>

          </div>

          <p style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-3);">You own it, you run it</p>

          <div class="stack stack--sm">

            <span style="font-size: var(--text-xs);">• Complete n8n workflow export</span>

            <span style="font-size: var(--text-xs);">• Full documentation package</span>

            <span style="font-size: var(--text-xs);">• 14-day acceptance QA period</span>

          </div>

        </div>

        <div class="card card--elevated card--interactive" style="border: 2px solid var(--color-healthy);">

          <div class="flex flex--between" style="margin-bottom: var(--space-3);">

            <span class="label label--healthy">Build & Operate</span>

            <span style="font-family: var(--font-display); font-weight: 700; color: var(--color-healthy);">$497<small style="font-weight: 500; color: var(--text-muted);">/mo</small></span>

          </div>

          <p style="font-size: var(--text-xs); color: var(--color-healthy); margin-bottom: var(--space-3);">Recommended • We manage everything</p>

          <div class="stack stack--sm">

            <span style="font-size: var(--text-xs);">• Wranngle-managed hosting</span>

            <span style="font-size: var(--text-xs);">• Bug fixes & small changes included</span>

            <span style="font-size: var(--text-xs);">• 24/7 monitoring & alerting</span>

          </div>

        </div>

        <div class="card card--interactive" style="border-style: dashed; border-color: var(--sunset-300);">

          <div class="flex flex--between" style="margin-bottom: var(--space-3);">

            <span class="label label--accent">Build, Operate & Scale</span>

            <span style="font-family: var(--font-display); font-weight: 700; color: var(--sunset-500);">$5,000<small style="font-weight: 500; color: var(--text-muted);">/mo</small></span>

          </div>

          <p style="font-size: var(--text-xs); color: var(--sunset-500); margin-bottom: var(--space-3);">Your AI department on demand</p>

          <div class="stack stack--sm">

            <span style="font-size: var(--text-xs);">• Everything in Build & Operate</span>

            <span style="font-size: var(--text-xs);">• Dedicated AI consultant</span>

            <span style="font-size: var(--text-xs);">• Unlimited workflow changes</span>

          </div>

        </div>

      </div>

    </div>



  </section>





  <!-- ═══════════════════════════════════════════════════════════════════════

       SUMMARY

       ═══════════════════════════════════════════════════════════════════════ -->

  <section class="component-section" style="background: linear-gradient(135deg, var(--night-900) 0%, var(--night-950) 100%); color: var(--sand-50);">

    <h2 class="component-section__title" style="color: var(--sand-50);">Consolidation Summary</h2>

    <p class="component-section__desc" style="color: var(--night-300); border-color: var(--night-700);">

      6 pattern families reduced to 6 unified components with consistent design tokens.

    </p>



    <div class="grid grid--3">

      <div style="padding: var(--space-4); background: var(--night-800); border-radius: var(--radius-lg);">

        <div style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800; color: var(--sunset-400);">~190</div>

        <div style="font-size: var(--text-sm); color: var(--night-300);">Lines of CSS saved</div>

      </div>

      <div style="padding: var(--space-4); background: var(--night-800); border-radius: var(--radius-lg);">

        <div style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800; color: var(--sunset-400);">29 → 6</div>

        <div style="font-size: var(--text-sm); color: var(--night-300);">Component classes</div>

      </div>

      <div style="padding: var(--space-4); background: var(--night-800); border-radius: var(--radius-lg);">

        <div style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800; color: var(--sunset-400);">100%</div>

        <div style="font-size: var(--text-sm); color: var(--night-300);">Visual consistency</div>

      </div>

    </div>



    <div style="margin-top: var(--space-6); padding: var(--space-4); background: var(--night-800); border-radius: var(--radius-lg); border-left: 4px solid var(--sunset-500);">

      <div style="font-size: var(--text-sm); color: var(--sand-100); line-height: 1.6;">

        <strong style="color: var(--sunset-400);">What changed:</strong> The redundant pattern families (accent cards, stat displays, micro labels, status indicators, badges, section containers) are now unified under <code style="background: var(--night-700); padding: 0.1em 0.3em; border-radius: 3px;">.card</code>, <code style="background: var(--night-700); padding: 0.1em 0.3em; border-radius: 3px;">.stat</code>, <code style="background: var(--night-700); padding: 0.1em 0.3em; border-radius: 3px;">.label</code>, <code style="background: var(--night-700); padding: 0.1em 0.3em; border-radius: 3px;">.indicator</code>, and <code style="background: var(--night-700); padding: 0.1em 0.3em; border-radius: 3px;">.badge</code> with semantic modifiers. One vocabulary, infinite combinations.

      </div>

    </div>

  </section>



</div>



</body>

</html>



Previous instructions:

attempting top consolodate these specific components into one, do a pure HTML CSS showcase of these new components, but design EVEN MORE BEAUTIFULLY AND SLEEK AND SHARP. Make extensive use of the visual frontend features and the wranngle design philosophy.



"# Expanded Frontend Design Vocabulary

This is a wonderful collection of visual concepts! Let me expand each into broader categories with related terms, techniques, and effects you can explore.

Surface & Material Treatments

Gloss branches into a whole spectrum of surface reflectivity. You have sheen (a subtle, directional shine), lacquer (that wet, candy-coated look), chrome and polished metal effects, and specular highlights (the bright spots where light hits most directly). On the opposite end, you'll find matte and satin finishes, which absorb rather than reflect light. Consider also anisotropic reflections, where the shine stretches in one direction like brushed aluminum.Glass has become its own design movement. Glassmorphism uses frosted, translucent panels with blur effects and subtle borders. Related concepts include frosted glass (heavily blurred background), clear glass (minimal blur, high transparency), acrylic (Microsoft's Fluent Design term for similar effects), translucency versus transparency (partial versus full see-through), and backdrop blur (the CSS property that makes this possible). You can layer multiple glass panels for depth stacking.Grainy texture connects to noise (random pixel variation), film grain (organic, photographic quality), dithering (patterned noise for color transitions), stippling (dot-based texture), and halftone (vintage print-style dots). Beyond grain, textures include paper, fabric, concrete, marble, wood grain, leather, woven, knit, canvas, and parchment. There's also displacement mapping and bump mapping for faux 3D texture.

Light & Luminosity Effects

Glow expands into inner glow (light emanating inward from edges), outer glow (light radiating outward), bloom (overexposed light bleed), soft glow versus hard glow, pulsing glow (animated), and ambient glow (environmental lighting). Related are halos, auras, and light leaks (those dreamy, accidental-looking light streaks).Fluorescence and Phosphorescence belong to a family of luminous effects. Fluorescence feels electric and immediate, while phosphorescence has that lingering, afterglow quality. Add to these luminescence (general light emission), bioluminescence (organic, deep-sea inspired), neon (sharp, saturated tube-light aesthetic), blacklight effects (UV-reactive look), and electroluminescence (that tech-panel glow). Also consider backlit elements, rim lighting (edge-lit silhouettes), volumetric light (visible light beams), and caustics (light patterns refracted through water or glass).Pearlescence is part of the iridescent family. Related effects include iridescence (color-shifting based on viewing angle), opalescence (milky, fire-opal shimmer), holographic (rainbow diffraction patterns), oil-slick or chromatic effects, aurora gradients (Northern Lights inspired), soap bubble coloring, and dichroic (two-toned color shift). These create that coveted "living surface" feeling.

Color & Gradient Techniques

Gradient is a vast category. Types include linear (straight line transition), radial (circular emanation), conic or angular (sweeping around a point), mesh gradients (complex, multi-point blending), and freeform gradients. Techniques include gradient mapping (applying gradients to grayscale), duotone (two-color gradient overlay), tritone, gradient borders, gradient text, and animated gradients. Consider easing in gradients (non-linear color distribution), banding (unwanted harsh steps) versus smooth transitions, and gradient masks.Technicolor bordering suggests vibrant, multi-hued edge treatments. Related concepts include rainbow borders, prismatic edges, color-cycling borders (animated hue rotation), multi-stop gradient borders, offset color shadows (chromatic aberration style), split-tone edges, and anaglyph effects (that red-blue 3D movie look). Also vaporwave and synthwave color palettes, retrowave, Y2K aesthetic, and maximalist color approaches.

Borders, Edges & Lines

Dotted versus solid bordering opens up dashed (longer segments), double borders, groove and ridge (3D-effect borders), inset and outset, wavy borders, scalloped edges, zigzag, hand-drawn or sketchy lines, and animated borders (marching ants, flowing dashes). Consider border radius variations: pill shapes, squircles (super-ellipses), organic blobs, asymmetric rounding, and notched corners. There's also hairline (ultra-thin), chunky or bold borders, tapered lines, and variable-width strokes.

Edge treatments include beveled (angled cuts), chamfered, soft edges (feathered, anti-aliased), hard edges (crisp, pixel-perfect), torn or ripped edges, burned edges, fade-out edges, and masked or clipped edges.

Shadow & Depth

Shadow encompasses drop shadow (offset), box shadow, inner shadow (inset), text shadow, long shadow (extended, flat-design style), layered shadows (multiple shadows for realism), soft shadow (high blur) versus hard shadow (crisp), colored shadows (matching or contrasting), ambient shadows (surrounding glow), and contact shadows (darkening where objects meet). Advanced: raytraced shadows, ambient occlusion (subtle corner darkening), and self-shadowing.Negative space connects to white space, breathing room, margins and padding, gutters, visual rest, implied shapes (shapes formed by absence), figure-ground relationships, knockout text (text revealing background), and counterforms. Mastering negative space involves understanding density, crowding, isolation, floating elements, and spatial hierarchy.

Composition & Rhythm

Consistency and Uniformity are foundational principles. Related concepts include design tokens (standardized values), spacing systems (4px, 8px grids), type scales, color systems, component libraries, pattern consistency, behavioral consistency, visual rhythm (regular versus varied intervals), repetition, pattern, and motif.

Expand into balance (symmetrical, asymmetrical, radial), visual weight, hierarchy (size, color, position), proximity (grouping related elements), alignment (edge, center, baseline), contrast (creating distinction), unity (cohesion), variety (preventing monotony), proportion, scale, dominance, focal points, and flow or reading paths.

Bonus: Motion & Interaction

Many of these effects come alive with motion: shimmer animations, parallax scrolling, hover state transitions, micro-interactions, loading skeletons, morphing shapes, spring physics, easing curves, staggered animations, scroll-triggered effects, and cursor-following elements.

Would you like me to dive deeper into any particular category, or perhaps create some code examples demonstrating specific effects?"

Design philosophies:

My company is going to be called Wranngle Systems LLC. Or just Wranngle. An AI services company.

I'm picturing roughly a tan and purple / brown theme, but that might be boring and I technically need the color sheme to be irrestiable for making money to attract clients whatever. Picturing ultra subtle cutesy lasso desert cactus cowboy imagery,

It's going to be only straight "Wranngle" . I want a lasso shape subtly incorporated in the logo, maybe a G or L, with a nuanced flowy style font, but not cursive. Thinking the orangish color on gradient tan background for light mode, orange on gradient purple for dark mode while following the color pallete. .

🟢 Ready



Executive Summary

"Wranngle is a AI consultancy dedicated to saving people's most valuable resource: Time. We operate as a counterbalance to the chaotic and often reckless AI innovation space, providing rigorous, ethically grounded automation architectures. Unlike generalist agencies or cheap freelancers who prioritize speed over safety, Wranngle focuses on 'taming wild AI.' We minimize risk through strict governance and structured auditing, ensuring everyone can harness the prosperity of automation without the exposure to data leaks or operational fragility."

🟢 Ready

Company Description

"Wranngle was founded to bridge the gap between 'messy innovation' and 'enterprise reliability.' The firm operates on a 'Privacy-First' and 'Zero Lock-in' philosophy. Our mission is to tame the inherent risks of AI—hallucinations, security vulnerabilities, and uncontrolled costs—by applying engineering rigor to workflows and AI Agents. We serve as the Architect, not just the Builder."

🟢 Ready

Market Analysis

"Our competitive landscape shifts as we scale:

Immediate (Months 0-6): We compete against Low-Cost Freelancers (Upwork) who deliver 'spaghetti code' without documentation. We win on reliability and safety.

Mid-Term (Months 6-12): We compete against DIY Founders attempting to bootstrap automation. We win on complexity handling and time-savings.

Long-Term (Year 2+): We compete against Big Agencies and Bloated MSPs (Managed Service Providers) who are slow to adapt to AI under the guise of moderation. We win on agility and specialized AI Ops + cybersecurity expertise."

🟢 Ready

4. Products & Services

"We utilize a tiered 'Phase' delivery model:

Phase 1: The AI Process Audit ($100). A diagnostic deep-dive into a single business process to identify 'Revenue Bleed.' Includes a questionnaire, virtual consultation, and one revision. This is our 'Foot in the Door.'

Phase 2: Stabilize (Fixed Price + Maintenance). The construction and standardization of the specific automation identified in the Audit. Includes a comprehensive transparent project plan and proposal. Includes a recurring support agreement to maintain that single process.

Phase 3: Scale ($5,000/mo Retainer for SMBs). A fractional CAIO (Chief AI Officer) service. Comprehensive consulting, development, and strategic roadmapping for the entire organization.

Phase 4: Enterprise. [Placeholder for Custom Compliance/SLA Offerings]"

🟢 Ready

5. Financial Analysis

"Wranngle Systems operates on a 'Lean & Liquid' financial model designed to withstand early-stage volatility without external capital.

Monthly Overhead (Burn Rate): ~$1,000/mo (Covers Insurance, Cloud Infrastructure, Software Licenses, and Legal Compliance).

Break-Even Point: 10 Audits per month covers 100% of operational overhead.

Profit Centers: Net profit is generated exclusively from Phase 2 (Fixed Price) and Phase 3 (Retainer) contracts."

{

"violet": {

"50": "#fdf1f5",

"100": "#f9dce5",

"200": "#f2b6c6",

"300": "#ea8aa6",

"400": "#dd6186",

"500": "#cf3c69",

"600": "#b92a56",

"700": "#972144",

"800": "#741a36",

"900": "#561329",

"950": "#2d0914"

},

"sunset": {

"50": "#fff3e7",

"100": "#ffe0bf",

"200": "#ffc179",

"300": "#ff9e33",

"400": "#ff7f00",

"500": "#ff5f00",

"600": "#ef4b00",

"700": "#c73a00",

"800": "#9f3000",

"900": "#7d2700",

"950": "#431300"

},

"sand": {

"50": "#fcfaf5",

"100": "#f6f1e7",

"200": "#ebdfc8",

"300": "#dac39f",

"400": "#c2a677",

"500": "#ab8c5b",

"600": "#957850",

"700": "#7a6343",

"800": "#625137",

"900": "#4f412d",

"950": "#292218"

},

"night": {

"50": "#f2f0f3",

"100": "#e4e1e7",

"200": "#cbc7d3",

"300": "#aaa4b8",

"400": "#847d9a",

"500": "#6a6380",

"600": "#57516a",

"700": "#464055",

"800": "#393444",

"900": "#201e28",

"950": "#12111a"

}

}

{

  "design_rationale": "Shifting to the solitary wordmark 'Wranngle', the design strategy focuses on integrating the western theme with high-end tech subtlety. The double-story lowercase 'g' is the ideal vehicle for the lasso concept; its natural descending loop is elongated and swept into a dynamic, non-cursive curve that implies a thrown rope capturing data, without becoming a literal cartoon. The typography will be a custom-drawn humanist sans-serif, prioritizing fluid strokes and soft terminals that feel approachable ('cutesy' undertone) while maintaining the structural integrity required for B2B credibility. The color application follows the specific request: a vibrant Sunset orange logo pop against sophisticated gradient backgrounds representing desert light transitions.",

  "color_semantic_mapping": {

    "primary_button": "#ff5f00",

    "secondary_button": "#dd6186",

    "background_main": "#fcfaf5",

    "background_card": "#ffffff",

    "text_primary": "#12111a",

    "text_muted": "#6a6380",

    "accent_border": "#f2b6c6"

  },

  "style_guidelines": {

    "shape_language": "Organic fluidity mixed with geometric precision. The 'lasso' element in the 'g' should use Bezier curves that suggest tension and movement, avoiding perfect circles in favor of dynamic ovals.",

    "texture_usage": "Logo finish should be sleek and matte. Backgrounds will utilize ultra-smooth, subtle gradients to create depth without distraction, mimicking atmospheric desert light.",

    "typography_mood": "Custom Humanist Sans-serif. It must balance high readability with distinct personality—flowing, open apertures, and softened terminals. Definitely not cursive, but possessed of a calligraphic energy."

  },

  "image_prompts": [

    "A custom wordmark logo for 'Wranngle' presented in light mode. The typography is a fluid, custom humanist sans-serif, definitely not cursive, with soft terminals. The lowercase 'g' features an extended, sweeping descender loop that subtly curves back on itself to form an abstract lasso shape. The entire wordmark is rendered in a solid Sunset-500 orange (#ff5f00). The background is a smooth, elegant gradient transitioning vertically from Sand-50 (#fcfaf5) down to Sand-200 (#ebdfc8). Clean, modern studio lighting. 8k --v 6.0",

    "The 'Wranngle' custom wordmark logo in dark mode application. The fluid, lasso-integrated 'g' typography is rendered in a glowing Sunset-400 orange (#ff7f00) with a subtle inner luminescence. The background is a rich, deep gradient transitioning from Violet-900 (#561329) at the top down into Night-950 (#12111a) at the bottom, evoking a desert twilight. High-tech, sophisticated finish. --v 6.0",

    "A close-up macro shot of the 'Wranngle' logo, specifically focusing on the stylized 'g' with the subtle lasso loop. The orange Sunset-500 color material looks like high-quality, matte-finish polymer subtly embedded into a textured Sand-100 cardstock surface. The lighting highlights the fluid curves of the custom font. B2B brand collateral feel. --v 6.0"

  ],

  "css_variables": {

    "light_theme": "--bg-main: linear-gradient(to bottom, #fcfaf5, #ebdfc8); --bg-surface: #ffffff; --text-primary: #12111a; --text-secondary: #6a6380; --brand-logo: #ff5f00; --action-primary: #ff5f00; --action-hover: #c73a00; --border-subtle: #dac39f;",

    "dark_theme": "--bg-main: linear-gradient(to bottom, #561329, #12111a); --bg-surface: #201e28; --text-primary: #fcfaf5; --text-secondary: #aaa4b8; --brand-logo: #ff7f00; --action-primary: #ff7f00; --action-hover: #ff9e33; --border-subtle: #464055;"

  }

}

<SystemRole> You are a Senior Visual Identity Architect and UI UX Strategist specializing in B2B SaaS and AI sectors Your expertise lies in balancing high trust corporate aesthetics with distinct personable branding to maximize client conversion and revenue generation </SystemRole>

<Context> Brand Name Wranngle Systems LLC Industry AI Services and Automation Visual Theme Ultra subtle cutesy lasso desert cactus cowboy integrated with clean modern tech minimalism Key Objective Create an irresistible commercial aesthetic that builds trust while maintaining a unique personality </Context>

<TaskInstructions> Analyze the provided ColorData to assign semantic roles for Background Surface Primary Action and Text Develop a specific logic for applying the cowboy aesthetic subtly meaning abstract geometric interpretations of lassos ropes or cacti shapes rather than literal clip art Ensure the design communicates reliability for high value enterprise contracts Generate three distinct text to image prompts optimized for Midjourney v6 that visualize a website hero section using these colors and themes Define CSS variable mappings for a dark mode and light mode interface utilizing the exact hex codes provided Output must be strictly industry agnostic and extensible across B2B use cases </TaskInstructions>

```

## Appendix B: Enhanced Components showcase (verbatim)

Source: recovered from `unified-presales-report` git history (now archived).
Title: "Wranngle Design System — Enhanced Components"

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wranngle Design System — Enhanced Components</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
  <style>
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WRANNGLE DESIGN SYSTEM v2 — ENHANCED COMPONENTS
 * Lasso Geometry • Grainy Textures • Visual Pop
 * ═══════════════════════════════════════════════════════════════════════════
 */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════════════════ */

:root {
  /* ─── Wranngle Color Palette ─── */
  --violet-50: #fdf1f5;
  --violet-100: #f9dce5;
  --violet-200: #f2b6c6;
  --violet-300: #ea8aa6;
  --violet-400: #dd6186;
  --violet-500: #cf3c69;
  --violet-600: #b92a56;
  --violet-700: #972144;
  --violet-800: #741a36;
  --violet-900: #561329;
  --violet-950: #2d0914;

  --sunset-50: #fff3e7;
  --sunset-100: #ffe0bf;
  --sunset-200: #ffc179;
  --sunset-300: #ff9e33;
  --sunset-400: #ff7f00;
  --sunset-500: #ff5f00;
  --sunset-600: #ef4b00;
  --sunset-700: #c73a00;
  --sunset-800: #9f3000;
  --sunset-900: #7d2700;
  --sunset-950: #431300;

  --sand-50: #fcfaf5;
  --sand-100: #f6f1e7;
  --sand-200: #ebdfc8;
  --sand-300: #dac39f;
  --sand-400: #c2a677;
  --sand-500: #ab8c5b;
  --sand-600: #957850;
  --sand-700: #7a6343;
  --sand-800: #625137;
  --sand-900: #4f412d;
  --sand-950: #292218;

  --night-50: #f2f0f3;
  --night-100: #e4e1e7;
  --night-200: #cbc7d3;
  --night-300: #aaa4b8;
  --night-400: #847d9a;
  --night-500: #6a6380;
  --night-600: #57516a;
  --night-700: #464055;
  --night-800: #393444;
  --night-900: #201e28;
  --night-950: #12111a;

  /* ─── Semantic Colors ─── */
  --color-critical: var(--violet-500);
  --color-warning: var(--sunset-300);
  --color-healthy: #5D8C61;
  --color-healthy-dark: #3d6341;
  --color-info: #3b82f6;
  
  --color-action: var(--sunset-500);
  --color-action-hover: var(--sunset-400);
  --color-action-glow: rgba(255, 95, 0, 0.4);

  /* ─── Surfaces ─── */
  --surface-page: var(--sand-50);
  --surface-card: #ffffff;
  --surface-elevated: #ffffff;
  --surface-muted: var(--sand-100);
  --surface-glass: rgba(255, 255, 255, 0.75);

  /* ─── Text ─── */
  --text-primary: var(--night-950);
  --text-secondary: var(--night-500);
  --text-muted: var(--night-400);
  --text-inverse: var(--sand-50);

  /* ─── Borders ─── */
  --border-subtle: var(--sand-200);
  --border-default: var(--sand-300);
  --border-strong: var(--sand-400);

  /* ─── Spacing ─── */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;

  /* ─── Typography ─── */
  --font-display: 'Outfit', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;

  --text-xs: 0.6875rem;
  --text-sm: 0.75rem;
  --text-base: 0.875rem;
  --text-lg: 1rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
  --text-4xl: 2.5rem;

  /* ─── Lasso Radii (Signature asymmetric curves) ─── */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-pill: 9999px;
  --radius-lasso: 24px 4px 24px 4px; /* Organic tension curve */
  --radius-lasso-alt: 4px 24px 4px 24px; /* Reversed for variety */

  /* ─── Shadows ─── */
  --shadow-xs: 0 1px 2px rgba(18, 17, 26, 0.05);
  --shadow-sm: 0 2px 6px rgba(18, 17, 26, 0.06), 0 1px 3px rgba(18, 17, 26, 0.04);
  --shadow-md: 0 6px 16px rgba(18, 17, 26, 0.08), 0 2px 6px rgba(18, 17, 26, 0.05);
  --shadow-lg: 0 12px 32px rgba(18, 17, 26, 0.1), 0 4px 12px rgba(18, 17, 26, 0.06);
  --shadow-xl: 0 20px 48px rgba(18, 17, 26, 0.14), 0 8px 20px rgba(18, 17, 26, 0.08);
  --shadow-glow-orange: 0 8px 32px rgba(255, 95, 0, 0.35), 0 4px 12px rgba(255, 95, 0, 0.2);
  --shadow-glow-violet: 0 8px 32px rgba(207, 60, 105, 0.3), 0 4px 12px rgba(207, 60, 105, 0.15);
  --shadow-glow-healthy: 0 8px 32px rgba(93, 140, 97, 0.3), 0 4px 12px rgba(93, 140, 97, 0.15);
  --shadow-inner: inset 0 2px 6px rgba(18, 17, 26, 0.08);
  --shadow-inner-deep: inset 0 4px 12px rgba(18, 17, 26, 0.12);

  /* ─── Transitions ─── */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;

  /* ─── Noise/Grain Filter ─── */
  --grain-opacity: 0.4;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SVG NOISE FILTER (For grainy textures)
   ═══════════════════════════════════════════════════════════════════════════ */

.noise-filter {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

/* ═══════════════════════════════════════════════════════════════════════════
   BASE STYLES
   ═══════════════════════════════════════════════════════════════════════════ */

html { 
  font-size: 16px; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, var(--sunset-100) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 80% 100%, var(--violet-100) 0%, transparent 40%),
    linear-gradient(180deg, var(--sand-50) 0%, var(--sand-100) 60%, var(--sand-200) 100%);
  color: var(--text-primary);
  line-height: 1.5;
  min-height: 100vh;
  padding: var(--space-8);
}


/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT 1: UNIFIED CARD (.card)
   Features: Lasso geometry, grainy texture overlay, accent peek
   ═══════════════════════════════════════════════════════════════════════════ */

.card {
  position: relative;
  background: var(--surface-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lasso);
  padding: var(--space-5) var(--space-6);
  
  box-shadow: var(--shadow-md);
  
  transition: 
    box-shadow var(--duration-normal) var(--ease-out),
    transform var(--duration-normal) var(--ease-spring),
    border-color var(--duration-fast) var(--ease-out);
  
  overflow: hidden;
}

/* Grainy texture overlay */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  border-radius: inherit;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
}

/* ─── Accent Variant (Left border with peek + glow) ─── */
.card--accent {
  border-left: 5px solid var(--sunset-500);
  background: 
    linear-gradient(135deg, var(--surface-card) 0%, var(--sunset-50) 60%, var(--sunset-100) 100%);
  box-shadow: 
    var(--shadow-md),
    inset 4px 0 12px -4px rgba(255, 95, 0, 0.15);
}

.card--accent:hover {
  box-shadow: 
    var(--shadow-glow-orange),
    inset 4px 0 16px -4px rgba(255, 95, 0, 0.25);
}

/* ─── Color Variants ─── */
.card--critical {
  border-left-color: var(--violet-500);
  background: 
    linear-gradient(135deg, var(--surface-card) 0%, var(--violet-50) 60%, var(--violet-100) 100%);
  box-shadow: 
    var(--shadow-md),
    inset 4px 0 12px -4px rgba(207, 60, 105, 0.15);
}

.card--critical:hover {
  box-shadow: 
    var(--shadow-glow-violet),
    inset 4px 0 16px -4px rgba(207, 60, 105, 0.25);
}

.card--warning {
  border-left-color: var(--sunset-300);
  background: 
    linear-gradient(135deg, var(--surface-card) 0%, var(--sunset-50) 60%, var(--sunset-100) 100%);
}

.card--healthy {
  border-left-color: var(--color-healthy);
  background: 
    linear-gradient(135deg, var(--surface-card) 0%, #ecfdf5 60%, #d1fae5 100%);
  box-shadow: 
    var(--shadow-md),
    inset 4px 0 12px -4px rgba(93, 140, 97, 0.15);
}

.card--healthy:hover {
  box-shadow: 
    var(--shadow-glow-healthy),
    inset 4px 0 16px -4px rgba(93, 140, 97, 0.25);
}

/* ─── Glass Variant ─── */
.card--glass {
  background: var(--surface-glass);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 
    var(--shadow-lg),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
}

/* ─── Elevated Variant ─── */
.card--elevated {
  box-shadow: var(--shadow-xl);
  border-color: transparent;
}

.card--elevated:hover {
  box-shadow: 
    0 24px 56px rgba(18, 17, 26, 0.16),
    0 12px 24px rgba(18, 17, 26, 0.1);
  transform: translateY(-4px);
}

/* ─── Inset Variant ─── */
.card--inset {
  background: 
    linear-gradient(135deg, var(--sand-100) 0%, var(--sand-50) 100%);
  box-shadow: var(--shadow-inner-deep);
  border-color: transparent;
}

.card--inset:hover {
  box-shadow: var(--shadow-inner-deep);
  transform: none;
}

/* ─── Size Variants ─── */
.card--sm { padding: var(--space-3) var(--space-4); }
.card--lg { padding: var(--space-8) var(--space-10); }

/* ─── Interactive Variant ─── */
.card--interactive {
  cursor: pointer;
}

.card--interactive:hover {
  border-color: var(--sunset-300);
}

.card--interactive:active {
  transform: translateY(-1px);
}


/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT 2: UNIFIED STAT (.stat)
   Features: Lasso geometry, mandatory math pill slot, gradient backgrounds
   ═══════════════════════════════════════════════════════════════════════════ */

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-5);
  min-height: 7rem;
  
  background: 
    linear-gradient(145deg, var(--surface-card) 0%, var(--sand-100) 100%);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lasso-alt);
  
  box-shadow: var(--shadow-md);
  
  transition: all var(--duration-normal) var(--ease-spring);
  position: relative;
  overflow: hidden;
}

/* Grainy texture */
.stat::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.025;
  pointer-events: none;
}

.stat:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px) scale(1.01);
}

/* ─── Value ─── */
.stat__value {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 800;
  line-height: 1.1;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  position: relative;
}

.stat__value--accent { 
  background: linear-gradient(135deg, var(--sunset-500) 0%, var(--sunset-600) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat__value--critical { 
  background: linear-gradient(135deg, var(--violet-500) 0%, var(--violet-700) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat__value--warning { 
  background: linear-gradient(135deg, var(--sunset-300) 0%, var(--sunset-500) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat__value--healthy { 
  background: linear-gradient(135deg, var(--color-healthy) 0%, var(--color-healthy-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat__value small {
  font-size: 0.45em;
  font-weight: 600;
  opacity: 0.8;
  margin-left: 0.1em;
}

/* ─── Label ─── */
.stat__label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: var(--space-2);
}

/* ─── Math (MANDATORY - explains the calculation) ─── */
.stat__math {
  margin-top: var(--space-3);
}

/* ─── Size Variants ─── */
.stat--sm {
  padding: var(--space-3) var(--space-4);
  min-height: auto;
}
.stat--sm .stat__value { font-size: var(--text-lg); }
.stat--sm .stat__label { font-size: 0.5625rem; }
.stat--sm .stat__math { margin-top: var(--space-2); }

.stat--lg {
  padding: var(--space-8);
  min-height: 9rem;
}
.stat--lg .stat__value { font-size: var(--text-3xl); }

/* ─── Bordered Variants ─── */
.stat--bordered {
  border-left: 4px solid var(--sunset-500);
  border-radius: var(--radius-lasso);
}

.stat--bordered.stat--critical { 
  border-left-color: var(--violet-500); 
  background: linear-gradient(145deg, var(--surface-card) 0%, var(--violet-50) 100%);
}

.stat--bordered.stat--warning { 
  border-left-color: var(--sunset-300); 
  background: linear-gradient(145deg, var(--surface-card) 0%, var(--sunset-50) 100%);
}

.stat--bordered.stat--healthy { 
  border-left-color: var(--color-healthy); 
  background: linear-gradient(145deg, var(--surface-card) 0%, #ecfdf5 100%);
}

/* ─── Highlight Variant ─── */
.stat--highlight {
  background: 
    linear-gradient(145deg, var(--sunset-50) 0%, var(--sunset-100) 60%, var(--sunset-200) 100%);
  border-color: var(--sunset-200);
  box-shadow: 
    var(--shadow-md),
    0 0 0 1px var(--sunset-200);
}

.stat--highlight:hover {
  box-shadow: var(--shadow-glow-orange);
}

.stat--highlight.stat--critical {
  background: 
    linear-gradient(145deg, var(--violet-50) 0%, var(--violet-100) 60%, var(--violet-200) 100%);
  border-color: var(--violet-200);
}

.stat--highlight.stat--healthy {
  background: 
    linear-gradient(145deg, #ecfdf5 0%, #d1fae5 60%, #a7f3d0 100%);
  border-color: #a7f3d0;
}

.stat--highlight.stat--healthy:hover {
  box-shadow: var(--shadow-glow-healthy);
}


/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT 3: UNIFIED LABEL (.label)
   ═══════════════════════════════════════════════════════════════════════════ */

.label {
  display: block;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.3;
}

.label--accent { color: var(--sunset-500); }
.label--critical { color: var(--violet-500); }
.label--warning { color: var(--sunset-400); }
.label--healthy { color: var(--color-healthy); }
.label--muted { color: var(--text-muted); }

.label--sm { font-size: 0.5625rem; }
.label--lg { font-size: var(--text-sm); }

.label--inline {
  display: inline;
  margin-right: var(--space-1);
}


/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT 4: UNIFIED INDICATOR (.indicator)
   Features: Gradient fills, glow halos, pulse animation
   ═══════════════════════════════════════════════════════════════════════════ */

.indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  
  background: linear-gradient(135deg, var(--night-200) 0%, var(--night-400) 100%);
  box-shadow: 
    inset 0 2px 4px rgba(255, 255, 255, 0.3),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2);
}

.indicator--critical { 
  background: linear-gradient(135deg, var(--violet-400) 0%, var(--violet-600) 100%);
  box-shadow: 
    inset 0 2px 4px rgba(255, 255, 255, 0.25),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2),
    0 0 12px rgba(207, 60, 105, 0.5),
    0 0 4px rgba(207, 60, 105, 0.8);
}

.indicator--warning { 
  background: linear-gradient(135deg, var(--sunset-300) 0%, var(--sunset-500) 100%);
  box-shadow: 
    inset 0 2px 4px rgba(255, 255, 255, 0.3),
    inset 0 -2px 4px rgba(0, 0, 0, 0.15),
    0 0 12px rgba(255, 158, 51, 0.5),
    0 0 4px rgba(255, 158, 51, 0.8);
}

.indicator--healthy { 
  background: linear-gradient(135deg, #6ee7b7 0%, #059669 100%);
  box-shadow: 
    inset 0 2px 4px rgba(255, 255, 255, 0.3),
    inset 0 -2px 4px rgba(0, 0, 0, 0.15),
    0 0 12px rgba(5, 150, 105, 0.5),
    0 0 4px rgba(5, 150, 105, 0.8);
}

.indicator--info { 
  background: linear-gradient(135deg, #60a5fa 0%, #2563eb 100%);
  box-shadow: 
    inset 0 2px 4px rgba(255, 255, 255, 0.3),
    inset 0 -2px 4px rgba(0, 0, 0, 0.15),
    0 0 12px rgba(37, 99, 235, 0.5),
    0 0 4px rgba(37, 99, 235, 0.8);
}

/* Size Variants */
.indicator--sm { width: 10px; height: 10px; }
.indicator--md { width: 14px; height: 14px; }
.indicator--lg { width: 18px; height: 18px; }
.indicator--xl { width: 26px; height: 26px; }

/* Pulse Animation */
.indicator--pulse {
  animation: indicator-pulse 2s ease-in-out infinite;
}

@keyframes indicator-pulse {
  0%, 100% { 
    opacity: 1; 
    transform: scale(1);
    filter: brightness(1);
  }
  50% { 
    opacity: 0.85; 
    transform: scale(1.15);
    filter: brightness(1.2);
  }
}


/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT 5: UNIFIED BADGE (.badge)
   Features: Dark left peek, grainy gradient texture, refined shadows
   ═══════════════════════════════════════════════════════════════════════════ */

.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 0.25rem 0.625rem 0.25rem 0.5rem;
  
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  
  /* Grainy gradient background */
  background: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
    linear-gradient(135deg, var(--sand-100) 0%, var(--sand-200) 100%);
  background-blend-mode: overlay;
  
  color: var(--text-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  
  /* Dark left peek */
  border-left: 3px solid var(--sand-400);
  
  box-shadow: 
    var(--shadow-xs),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  
  transition: all var(--duration-fast) var(--ease-out);
  position: relative;
}

/* ─── Semantic Variants (with darker peek) ─── */
.badge--critical {
  background: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
    linear-gradient(135deg, var(--violet-100) 0%, var(--violet-200) 100%);
  background-blend-mode: overlay;
  color: var(--violet-700);
  border-color: var(--violet-200);
  border-left-color: var(--violet-700);
}

.badge--warning {
  background: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
    linear-gradient(135deg, var(--sunset-100) 0%, var(--sunset-200) 100%);
  background-blend-mode: overlay;
  color: var(--sunset-800);
  border-color: var(--sunset-200);
  border-left-color: var(--sunset-700);
}

.badge--healthy {
  background: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
    linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  background-blend-mode: overlay;
  color: #065f46;
  border-color: #a7f3d0;
  border-left-color: #047857;
}

.badge--info {
  background: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
    linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  background-blend-mode: overlay;
  color: #1e40af;
  border-color: #bfdbfe;
  border-left-color: #1d4ed8;
}

.badge--accent {
  background: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
    linear-gradient(135deg, var(--sunset-100) 0%, var(--sunset-200) 100%);
  background-blend-mode: overlay;
  color: var(--sunset-700);
  border-color: var(--sunset-200);
  border-left-color: var(--sunset-600);
}

/* ─── Code/Math Variant ─── */
.badge--code {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  background: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
    linear-gradient(135deg, var(--sand-50) 0%, var(--sand-100) 100%);
  background-blend-mode: overlay;
  border-style: dotted;
  border-left-style: solid; /* Solid peek, dotted elsewhere */
  border-radius: var(--radius-sm);
  border-left-color: var(--night-400);
  color: var(--night-600);
}

/* ─── Uppercase Variant ─── */
.badge--caps {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 700;
  font-size: 0.5625rem;
}

/* ─── Size Variants ─── */
.badge--sm {
  padding: 0.1875rem 0.5rem 0.1875rem 0.375rem;
  font-size: 0.5625rem;
}

.badge--lg {
  padding: 0.375rem 0.875rem 0.375rem 0.75rem;
  font-size: var(--text-sm);
}

/* ─── Solid Variant ─── */
.badge--solid {
  background: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
    linear-gradient(135deg, var(--night-700) 0%, var(--night-900) 100%);
  background-blend-mode: overlay;
  color: var(--sand-50);
  border-color: transparent;
  border-left-color: var(--night-950);
}

.badge--solid.badge--critical {
  background: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
    linear-gradient(135deg, var(--violet-500) 0%, var(--violet-700) 100%);
  background-blend-mode: overlay;
  color: white;
  border-left-color: var(--violet-900);
}

.badge--solid.badge--warning {
  background: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
    linear-gradient(135deg, var(--sunset-400) 0%, var(--sunset-600) 100%);
  background-blend-mode: overlay;
  color: white;
  border-left-color: var(--sunset-800);
}

.badge--solid.badge--healthy {
  background: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
    linear-gradient(135deg, #059669 0%, #047857 100%);
  background-blend-mode: overlay;
  color: white;
  border-left-color: #064e3b;
}

/* ─── Tech Stack Badges ─── */
.badge--workflow { 
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"), linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  background-blend-mode: overlay;
  color: #92400e; 
  border-color: #fde68a;
  border-left-color: #b45309;
}

.badge--ai { 
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"), linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%);
  background-blend-mode: overlay;
  color: #86198f; 
  border-color: #f5d0fe;
  border-left-color: #a21caf;
}

.badge--database { 
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"), linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  background-blend-mode: overlay;
  color: #065f46; 
  border-color: #a7f3d0;
  border-left-color: #047857;
}

.badge--communication { 
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"), linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
  background-blend-mode: overlay;
  color: #9d174d; 
  border-color: #fbcfe8;
  border-left-color: #be185d;
}

.badge--integration { 
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"), linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  background-blend-mode: overlay;
  color: #3730a3; 
  border-color: #c7d2fe;
  border-left-color: #4338ca;
}

.badge--api { 
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"), linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  background-blend-mode: overlay;
  color: #1e40af; 
  border-color: #bfdbfe;
  border-left-color: #1d4ed8;
}


/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT 6: UNIFIED BUTTON (.btn)
   Features: All variants have linear gradients, glow effects
   ═══════════════════════════════════════════════════════════════════════════ */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  
  padding: 0.75rem 1.5rem;
  
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-decoration: none;
  white-space: nowrap;
  
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  
  transition: all var(--duration-normal) var(--ease-spring);
  position: relative;
  overflow: hidden;
}

/* Shine effect overlay */
.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

/* ─── Primary ─── */
.btn--primary {
  background: linear-gradient(135deg, var(--sunset-400) 0%, var(--sunset-500) 50%, var(--sunset-600) 100%);
  color: white;
  box-shadow: 
    0 4px 16px rgba(255, 95, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    inset 0 -2px 0 rgba(0, 0, 0, 0.1);
}

.btn--primary:hover {
  background: linear-gradient(135deg, var(--sunset-300) 0%, var(--sunset-400) 50%, var(--sunset-500) 100%);
  box-shadow: 
    0 8px 32px rgba(255, 95, 0, 0.45),
    0 4px 12px rgba(255, 95, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

.btn--primary:active {
  transform: translateY(-1px);
  box-shadow: 
    0 4px 16px rgba(255, 95, 0, 0.3);
}

/* ─── Secondary (Violet) ─── */
.btn--secondary {
  background: linear-gradient(135deg, var(--violet-400) 0%, var(--violet-500) 50%, var(--violet-600) 100%);
  color: white;
  box-shadow: 
    0 4px 16px rgba(207, 60, 105, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -2px 0 rgba(0, 0, 0, 0.1);
}

.btn--secondary:hover {
  background: linear-gradient(135deg, var(--violet-300) 0%, var(--violet-400) 50%, var(--violet-500) 100%);
  box-shadow: 
    0 8px 32px rgba(207, 60, 105, 0.4),
    0 4px 12px rgba(207, 60, 105, 0.25);
  transform: translateY(-3px);
}

/* ─── Ghost ─── */
.btn--ghost {
  background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.5) 100%);
  color: var(--text-secondary);
  border: 2px solid var(--border-default);
  box-shadow: var(--shadow-sm);
}

.btn--ghost:hover {
  background: linear-gradient(135deg, var(--sand-100) 0%, var(--sand-200) 100%);
  border-color: var(--sunset-300);
  color: var(--sunset-600);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* ─── Healthy ─── */
.btn--healthy {
  background: linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%);
  color: white;
  box-shadow: 
    0 4px 16px rgba(5, 150, 105, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.btn--healthy:hover {
  box-shadow: 
    0 8px 32px rgba(5, 150, 105, 0.45),
    0 4px 12px rgba(5, 150, 105, 0.3);
  transform: translateY(-3px);
}

/* ─── Size Variants ─── */
.btn--sm {
  padding: 0.5rem 1rem;
  font-size: var(--text-xs);
}

.btn--lg {
  padding: 1rem 2rem;
  font-size: var(--text-base);
  border-radius: var(--radius-xl);
}

.btn--xl {
  padding: 1.25rem 2.5rem;
  font-size: var(--text-lg);
  border-radius: var(--radius-2xl);
}


/* ═══════════════════════════════════════════════════════════════════════════
   SERVICE TIER CARDS (Special treatment)
   Features: Varied heights, dramatic shadows, border treatments
   ═══════════════════════════════════════════════════════════════════════════ */

.tier-card {
  position: relative;
  padding: var(--space-6);
  border-radius: var(--radius-lasso);
  transition: all var(--duration-normal) var(--ease-spring);
  overflow: hidden;
}

/* Grain overlay */
.tier-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}

/* ─── Basic Tier ─── */
.tier-card--basic {
  background: 
    linear-gradient(145deg, var(--surface-card) 0%, var(--sand-100) 100%);
  border: 2px dashed var(--border-default);
  box-shadow: var(--shadow-md);
  min-height: 280px;
}

.tier-card--basic:hover {
  border-color: var(--sand-400);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

/* ─── Recommended Tier (STANDOUT) ─── */
.tier-card--recommended {
  background: 
    linear-gradient(145deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%);
  border: 3px solid var(--color-healthy);
  box-shadow: 
    var(--shadow-xl),
    0 0 0 4px rgba(93, 140, 97, 0.1),
    0 12px 40px rgba(93, 140, 97, 0.25);
  min-height: 320px;
  transform: scale(1.02);
  z-index: 10;
}

.tier-card--recommended::after {
  content: '★ RECOMMENDED';
  position: absolute;
  top: -1px;
  right: var(--space-4);
  background: linear-gradient(135deg, var(--color-healthy) 0%, var(--color-healthy-dark) 100%);
  color: white;
  font-family: var(--font-display);
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.375rem 0.75rem;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  box-shadow: 0 4px 12px rgba(93, 140, 97, 0.3);
}

.tier-card--recommended:hover {
  box-shadow: 
    0 24px 56px rgba(93, 140, 97, 0.3),
    0 0 0 4px rgba(93, 140, 97, 0.15),
    0 16px 48px rgba(93, 140, 97, 0.2);
  transform: scale(1.04) translateY(-4px);
}

/* ─── Premium Tier ─── */
.tier-card--premium {
  background: 
    linear-gradient(145deg, var(--sunset-50) 0%, var(--sunset-100) 50%, var(--sunset-200) 100%);
  border: 3px solid var(--sunset-400);
  border-style: solid;
  box-shadow: 
    var(--shadow-lg),
    0 0 0 1px var(--sunset-200),
    0 8px 32px rgba(255, 95, 0, 0.2);
  min-height: 300px;
}

.tier-card--premium::after {
  content: '⚡ SCALE';
  position: absolute;
  top: -1px;
  right: var(--space-4);
  background: linear-gradient(135deg, var(--sunset-500) 0%, var(--sunset-700) 100%);
  color: white;
  font-family: var(--font-display);
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.375rem 0.75rem;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  box-shadow: 0 4px 12px rgba(255, 95, 0, 0.3);
}

.tier-card--premium:hover {
  box-shadow: 
    var(--shadow-glow-orange),
    0 0 0 2px var(--sunset-300);
  transform: translateY(-6px);
}

/* Tier content elements */
.tier-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.tier-card__name {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.tier-card__price {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 800;
}

.tier-card__price small {
  font-size: 0.5em;
  font-weight: 500;
  opacity: 0.7;
}

.tier-card__desc {
  font-size: var(--text-xs);
  color: var(--text-muted);
  margin-bottom: var(--space-4);
}

.tier-card__features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tier-card__features li {
  font-size: var(--text-xs);
  padding: var(--space-1) 0;
  padding-left: var(--space-4);
  position: relative;
}

.tier-card__features li::before {
  content: '→';
  position: absolute;
  left: 0;
  font-weight: 700;
}


/* ═══════════════════════════════════════════════════════════════════════════
   LAYOUT UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

.grid { display: grid; gap: var(--space-4); }
.grid--2 { grid-template-columns: repeat(2, 1fr); }
.grid--3 { grid-template-columns: repeat(3, 1fr); }
.grid--4 { grid-template-columns: repeat(4, 1fr); }

.flex { display: flex; }
.flex--wrap { flex-wrap: wrap; }
.flex--center { align-items: center; justify-content: center; }
.flex--between { justify-content: space-between; }
.flex--gap-sm { gap: var(--space-2); }
.flex--gap-md { gap: var(--space-4); }

.stack { display: flex; flex-direction: column; gap: var(--space-3); }
.stack--sm { gap: var(--space-2); }
.stack--lg { gap: var(--space-6); }


/* ═══════════════════════════════════════════════════════════════════════════
   SHOWCASE STYLING
   ═══════════════════════════════════════════════════════════════════════════ */

.showcase {
  max-width: 1200px;
  margin: 0 auto;
}

.showcase__header {
  text-align: center;
  margin-bottom: var(--space-12);
  padding: var(--space-10);
  background: 
    linear-gradient(145deg, var(--surface-card) 0%, var(--sand-100) 100%);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-subtle);
  position: relative;
  overflow: hidden;
}

/* Decorative gradient lasso swirl */
.showcase__header::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -10%;
  width: 50%;
  height: 160%;
  background: 
    radial-gradient(ellipse at center, var(--sunset-200) 0%, transparent 70%);
  opacity: 0.5;
  transform: rotate(-20deg);
  pointer-events: none;
}

.showcase__header::after {
  content: '';
  position: absolute;
  bottom: -40%;
  left: -10%;
  width: 40%;
  height: 140%;
  background: 
    radial-gradient(ellipse at center, var(--violet-200) 0%, transparent 70%);
  opacity: 0.4;
  transform: rotate(15deg);
  pointer-events: none;
}

.showcase__logo {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 800;
  background: linear-gradient(135deg, var(--sunset-500) 0%, var(--sunset-600) 50%, var(--violet-500) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-2);
  position: relative;
  letter-spacing: -0.02em;
}

.showcase__subtitle {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  color: var(--text-secondary);
  position: relative;
}

.component-section {
  background: var(--surface-card);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  margin-bottom: var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-subtle);
  position: relative;
  overflow: hidden;
}

/* Subtle grain */
.component-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.015;
  pointer-events: none;
}

.component-section__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  position: relative;
}

.component-section__title::before {
  content: '';
  width: 5px;
  height: 1.5em;
  background: linear-gradient(180deg, var(--sunset-400) 0%, var(--sunset-600) 100%);
  border-radius: var(--radius-pill);
}

.component-section__desc {
  font-size: var(--text-base);
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--sand-200);
  position: relative;
}

.component-section__desc code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: var(--sand-100);
  padding: 0.15em 0.5em;
  border-radius: var(--radius-sm);
  color: var(--violet-600);
  border: 1px solid var(--sand-200);
}

.variant-group {
  margin-bottom: var(--space-8);
  position: relative;
}

.variant-group__label {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-4);
}
  </style>
</head>
<body>

<div class="showcase">

  <!-- ═══════════════════════════════════════════════════════════════════════
       HEADER
       ═══════════════════════════════════════════════════════════════════════ -->
  <header class="showcase__header">
    <h1 class="showcase__logo">Wranngle Design System</h1>
    <p class="showcase__subtitle">Enhanced Components — Lasso Geometry • Grainy Textures • Visual Pop</p>
  </header>


  <!-- ═══════════════════════════════════════════════════════════════════════
       COMPONENT 1: CARD
       ═══════════════════════════════════════════════════════════════════════ -->
  <section class="component-section">
    <h2 class="component-section__title">Card Component</h2>
    <p class="component-section__desc">
      <strong>Features:</strong> Lasso geometry <code>border-radius: 24px 4px 24px 4px</code>, grainy texture overlay, accent glow on hover
    </p>

    <div class="variant-group">
      <div class="variant-group__label">Base + Accent Variants</div>
      <div class="grid grid--3" style="margin-bottom: var(--space-4);">
        <div class="card">
          <div class="label label--muted" style="margin-bottom: var(--space-2);">Default Card</div>
          <p style="font-size: var(--text-sm); color: var(--text-secondary);">Clean surface with lasso-curved corners and subtle grain texture.</p>
        </div>
        <div class="card card--accent">
          <div class="label label--accent" style="margin-bottom: var(--space-2);">Accent Card</div>
          <p style="font-size: var(--text-sm); color: var(--text-secondary);">Warm gradient with glowing accent border. Hovers with orange halo.</p>
        </div>
        <div class="card card--elevated">
          <div class="label label--muted" style="margin-bottom: var(--space-2);">Elevated Card</div>
          <p style="font-size: var(--text-sm); color: var(--text-secondary);">Dramatic shadow stack for maximum prominence.</p>
        </div>
      </div>
    </div>

    <div class="variant-group">
      <div class="variant-group__label">Semantic Color Variants (with glow)</div>
      <div class="grid grid--4">
        <div class="card card--accent">
          <div class="label label--accent" style="margin-bottom: var(--space-1);">Action</div>
          <p style="font-size: var(--text-xs); color: var(--text-muted);">Sunset glow</p>
        </div>
        <div class="card card--accent card--critical">
          <div class="label label--critical" style="margin-bottom: var(--space-1);">Critical</div>
          <p style="font-size: var(--text-xs); color: var(--text-muted);">Violet glow</p>
        </div>
        <div class="card card--accent card--warning">
          <div class="label label--warning" style="margin-bottom: var(--space-1);">Warning</div>
          <p style="font-size: var(--text-xs); color: var(--text-muted);">Amber warmth</p>
        </div>
        <div class="card card--accent card--healthy">
          <div class="label label--healthy" style="margin-bottom: var(--space-1);">Healthy</div>
          <p style="font-size: var(--text-xs); color: var(--text-muted);">Green glow</p>
        </div>
      </div>
    </div>

    <div class="variant-group">
      <div class="variant-group__label">Special Variants</div>
      <div class="grid grid--2">
        <div class="card card--glass">
          <div class="label" style="margin-bottom: var(--space-2);">Glass Card</div>
          <p style="font-size: var(--text-sm); color: var(--text-secondary);">Frosted blur with inner light edge. Ethereal, modern presence.</p>
        </div>
        <div class="card card--inset">
          <div class="label" style="margin-bottom: var(--space-2);">Inset Card</div>
          <p style="font-size: var(--text-sm); color: var(--text-secondary);">Pressed-in appearance with inverted gradient. For grouping content.</p>
        </div>
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════════
       COMPONENT 2: STAT (with MANDATORY math pills)
       ═══════════════════════════════════════════════════════════════════════ -->
  <section class="component-section">
    <h2 class="component-section__title">Stat Component</h2>
    <p class="component-section__desc">
      <strong>Features:</strong> Alt-lasso geometry, gradient text values, <strong>mandatory math pill</strong> explaining the calculation
    </p>

    <div class="variant-group">
      <div class="variant-group__label">Stats with Mandatory Math Pills</div>
      <div class="grid grid--4">
        <div class="stat">
          <div class="stat__value stat__value--accent">$28,152</div>
          <div class="stat__label">Client Price</div>
          <div class="stat__math">
            <span class="badge badge--code">= 180h × $156.40/h</span>
          </div>
        </div>
        <div class="stat">
          <div class="stat__value">180<small>hrs</small></div>
          <div class="stat__label">Total Hours</div>
          <div class="stat__math">
            <span class="badge badge--code">= base × 1.15 buffer</span>
          </div>
        </div>
        <div class="stat">
          <div class="stat__value stat__value--healthy">9<small>wks</small></div>
          <div class="stat__label">Duration</div>
          <div class="stat__math">
            <span class="badge badge--code">= 180h ÷ 20h/wk</span>
          </div>
        </div>
        <div class="stat">
          <div class="stat__value stat__value--critical">65%</div>
          <div class="stat__label">Margin</div>
          <div class="stat__math">
            <span class="badge badge--code">= (price − cost) ÷ price</span>
          </div>
        </div>
      </div>
    </div>

    <div class="variant-group">
      <div class="variant-group__label">Bordered + Highlighted Variants</div>
      <div class="grid grid--4">
        <div class="stat stat--bordered stat--highlight">
          <div class="stat__value stat__value--accent">1853%</div>
          <div class="stat__label">ROI Coverage</div>
          <div class="stat__math">
            <span class="badge badge--code">= $521K ÷ $28K × 100</span>
          </div>
        </div>
        <div class="stat stat--bordered stat--critical stat--highlight">
          <div class="stat__value stat__value--critical">$13,475<small>/mo</small></div>
          <div class="stat__label">Monthly Bleed</div>
          <div class="stat__math">
            <span class="badge badge--code">= 75 × 22 × 17.5m × $28</span>
          </div>
        </div>
        <div class="stat stat--bordered stat--warning">
          <div class="stat__value stat__value--warning">7<small>/10</small></div>
          <div class="stat__label">Risk Score</div>
          <div class="stat__math">
            <span class="badge badge--code">= complexity × integrations</span>
          </div>
        </div>
        <div class="stat stat--bordered stat--healthy stat--highlight">
          <div class="stat__value stat__value--healthy">3<small>wks</small></div>
          <div class="stat__label">Payback Period</div>
          <div class="stat__math">
            <span class="badge badge--code">= $28K ÷ $43K/mo</span>
          </div>
        </div>
      </div>
    </div>

    <div class="variant-group">
      <div class="variant-group__label">Size Variants</div>
      <div class="flex flex--gap-md" style="align-items: flex-end;">
        <div class="stat stat--sm" style="min-width: 100px;">
          <div class="stat__value">18%</div>
          <div class="stat__label">Small</div>
          <div class="stat__math">
            <span class="badge badge--code badge--sm">= x ÷ y</span>
          </div>
        </div>
        <div class="stat" style="min-width: 140px;">
          <div class="stat__value stat__value--accent">$521K</div>
          <div class="stat__label">Default</div>
          <div class="stat__math">
            <span class="badge badge--code">= $161K + $360K</span>
          </div>
        </div>
        <div class="stat stat--lg stat--highlight" style="min-width: 200px;">
          <div class="stat__value stat__value--accent">$161,700<small>/yr</small></div>
          <div class="stat__label">Large + Highlight</div>
          <div class="stat__math">
            <span class="badge badge--code">= $13,475 × 12mo</span>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════════
       COMPONENT 3: INDICATOR
       ═══════════════════════════════════════════════════════════════════════ -->
  <section class="component-section">
    <h2 class="component-section__title">Indicator Component</h2>
    <p class="component-section__desc">
      <strong>Features:</strong> Gradient fills, inner/outer glow halos, pulsing animation for live status
    </p>

    <div class="variant-group">
      <div class="variant-group__label">Status Colors (with glow halos)</div>
      <div class="flex flex--wrap flex--gap-md">
        <div class="flex flex--gap-sm" style="align-items: center;">
          <span class="indicator"></span>
          <span style="font-size: var(--text-sm);">Neutral</span>
        </div>
        <div class="flex flex--gap-sm" style="align-items: center;">
          <span class="indicator indicator--critical"></span>
          <span style="font-size: var(--text-sm);">Critical</span>
        </div>
        <div class="flex flex--gap-sm" style="align-items: center;">
          <span class="indicator indicator--warning"></span>
          <span style="font-size: var(--text-sm);">Warning</span>
        </div>
        <div class="flex flex--gap-sm" style="align-items: center;">
          <span class="indicator indicator--healthy"></span>
          <span style="font-size: var(--text-sm);">Healthy</span>
        </div>
        <div class="flex flex--gap-sm" style="align-items: center;">
          <span class="indicator indicator--info"></span>
          <span style="font-size: var(--text-sm);">Info</span>
        </div>
      </div>
    </div>

    <div class="variant-group">
      <div class="variant-group__label">Size Variants</div>
      <div class="flex flex--wrap flex--gap-md" style="align-items: center;">
        <div class="flex flex--gap-sm" style="align-items: center;">
          <span class="indicator indicator--sm indicator--critical"></span>
          <span style="font-size: var(--text-xs);">Small</span>
        </div>
        <div class="flex flex--gap-sm" style="align-items: center;">
          <span class="indicator indicator--md indicator--warning"></span>
          <span style="font-size: var(--text-xs);">Medium</span>
        </div>
        <div class="flex flex--gap-sm" style="align-items: center;">
          <span class="indicator indicator--lg indicator--healthy"></span>
          <span style="font-size: var(--text-xs);">Large</span>
        </div>
        <div class="flex flex--gap-sm" style="align-items: center;">
          <span class="indicator indicator--xl indicator--info"></span>
          <span style="font-size: var(--text-xs);">XL</span>
        </div>
      </div>
    </div>

    <div class="variant-group">
      <div class="variant-group__label">Animated Pulse (Live Status)</div>
      <div class="flex flex--wrap flex--gap-md" style="align-items: center;">
        <div class="flex flex--gap-sm" style="align-items: center;">
          <span class="indicator indicator--lg indicator--healthy indicator--pulse"></span>
          <span style="font-size: var(--text-sm);">System Online</span>
        </div>
        <div class="flex flex--gap-sm" style="align-items: center;">
          <span class="indicator indicator--lg indicator--critical indicator--pulse"></span>
          <span style="font-size: var(--text-sm);">Alert Active</span>
        </div>
        <div class="flex flex--gap-sm" style="align-items: center;">
          <span class="indicator indicator--lg indicator--warning indicator--pulse"></span>
          <span style="font-size: var(--text-sm);">Processing</span>
        </div>
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════════
       COMPONENT 4: BADGE (with dark peek + grainy gradient)
       ═══════════════════════════════════════════════════════════════════════ -->
  <section class="component-section">
    <h2 class="component-section__title">Badge Component</h2>
    <p class="component-section__desc">
      <strong>Features:</strong> Dark left "peek" border, grainy linear gradient texture, refined shadows
    </p>

    <div class="variant-group">
      <div class="variant-group__label">Semantic Variants (notice the dark left peek)</div>
      <div class="flex flex--wrap flex--gap-sm">
        <span class="badge">Default</span>
        <span class="badge badge--accent">Accent</span>
        <span class="badge badge--critical">Critical</span>
        <span class="badge badge--warning">Warning</span>
        <span class="badge badge--healthy">Healthy</span>
        <span class="badge badge--info">Info</span>
      </div>
    </div>

    <div class="variant-group">
      <div class="variant-group__label">Solid Variants (High Contrast)</div>
      <div class="flex flex--wrap flex--gap-sm">
        <span class="badge badge--solid">Default</span>
        <span class="badge badge--solid badge--critical">Critical</span>
        <span class="badge badge--solid badge--warning">Warning</span>
        <span class="badge badge--solid badge--healthy">Healthy</span>
      </div>
    </div>

    <div class="variant-group">
      <div class="variant-group__label">Code/Math Badges</div>
      <div class="flex flex--wrap flex--gap-sm">
        <span class="badge badge--code">= $13,475/mo × 12</span>
        <span class="badge badge--code">180 hrs × $50/hr</span>
        <span class="badge badge--code">ROI: 1853%</span>
        <span class="badge badge--code">= price ÷ cost × 100</span>
      </div>
    </div>

    <div class="variant-group">
      <div class="variant-group__label">Uppercase / Caps Variants</div>
      <div class="flex flex--wrap flex--gap-sm">
        <span class="badge badge--caps">Low Effort</span>
        <span class="badge badge--caps badge--accent">High Impact</span>
        <span class="badge badge--caps badge--warning">7-14 Days</span>
        <span class="badge badge--caps badge--healthy badge--solid">Complete</span>
      </div>
    </div>

    <div class="variant-group">
      <div class="variant-group__label">Tech Stack Badges</div>
      <div class="flex flex--wrap flex--gap-sm">
        <span class="badge badge--workflow">n8n Workflow</span>
        <span class="badge badge--ai">Production LLM</span>
        <span class="badge badge--database">PostgreSQL</span>
        <span class="badge badge--communication">SMS Gateway</span>
        <span class="badge badge--integration">OAuth 2.0</span>
        <span class="badge badge--api">REST API</span>
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════════
       COMPONENT 5: BUTTON (all with linear gradients)
       ═══════════════════════════════════════════════════════════════════════ -->
  <section class="component-section">
    <h2 class="component-section__title">Button Component</h2>
    <p class="component-section__desc">
      <strong>Features:</strong> All variants use linear gradients, glow shadows, shine sweep on hover
    </p>

    <div class="variant-group">
      <div class="variant-group__label">Primary Variants</div>
      <div class="flex flex--wrap flex--gap-md" style="align-items: center;">
        <button class="btn btn--primary">Primary Action</button>
        <button class="btn btn--secondary">Secondary</button>
        <button class="btn btn--healthy">Success</button>
        <button class="btn btn--ghost">Ghost</button>
      </div>
    </div>

    <div class="variant-group">
      <div class="variant-group__label">Size Variants</div>
      <div class="flex flex--wrap flex--gap-md" style="align-items: center;">
        <button class="btn btn--primary btn--sm">Small</button>
        <button class="btn btn--primary">Default</button>
        <button class="btn btn--primary btn--lg">Large</button>
        <button class="btn btn--primary btn--xl">Extra Large</button>
      </div>
    </div>

    <div class="variant-group">
      <div class="variant-group__label">With Arrows (CTA Style)</div>
      <div class="flex flex--wrap flex--gap-md">
        <button class="btn btn--primary btn--lg">Review Solution →</button>
        <button class="btn btn--healthy btn--lg">Approve & Start →</button>
        <button class="btn btn--ghost">← Back to Proposal</button>
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════════
       COMPONENT 6: SERVICE TIER CARDS (Overhauled)
       ═══════════════════════════════════════════════════════════════════════ -->
  <section class="component-section">
    <h2 class="component-section__title">Service Tier Cards</h2>
    <p class="component-section__desc">
      <strong>Features:</strong> Varied heights, dramatic shadows, dashed vs solid borders, floating badges, glowing hovers
    </p>

    <div class="variant-group">
      <div class="variant-group__label">The Three Tiers</div>
      <div class="grid grid--3" style="align-items: center;">
        <!-- Basic Tier -->
        <div class="tier-card tier-card--basic">
          <div class="tier-card__header">
            <span class="tier-card__name" style="color: var(--text-secondary);">Build & Transfer</span>
            <span class="tier-card__price">$0<small>/mo</small></span>
          </div>
          <p class="tier-card__desc">You own it, you run it. Complete handoff.</p>
          <ul class="tier-card__features">
            <li>Complete n8n workflow export</li>
            <li>Full documentation package</li>
            <li>14-day acceptance QA period</li>
            <li>Self-hosted infrastructure</li>
            <li style="color: var(--text-muted);">Future support: $250/hr ad-hoc</li>
          </ul>
          <div style="margin-top: var(--space-6);">
            <button class="btn btn--ghost" style="width: 100%;">Select Plan</button>
          </div>
        </div>

        <!-- Recommended Tier (STANDOUT) -->
        <div class="tier-card tier-card--recommended">
          <div class="tier-card__header">
            <span class="tier-card__name" style="color: var(--color-healthy);">Build & Operate</span>
            <span class="tier-card__price" style="color: var(--color-healthy);">$497<small>/mo</small></span>
          </div>
          <p class="tier-card__desc" style="color: var(--color-healthy-dark);">We manage everything. You focus on your business.</p>
          <ul class="tier-card__features" style="color: var(--color-healthy-dark);">
            <li style="color: var(--color-healthy-dark);">Wranngle-managed hosting</li>
            <li style="color: var(--color-healthy-dark);">Bug fixes & small changes included</li>
            <li style="color: var(--color-healthy-dark);">API updates & security patches</li>
            <li style="color: var(--color-healthy-dark);">24/7 monitoring & alerting</li>
            <li style="color: var(--color-healthy-dark);">4-hour critical issue SLA</li>
            <li style="color: var(--color-healthy-dark);">Quarterly optimization reviews</li>
          </ul>
          <div style="margin-top: var(--space-6);">
            <button class="btn btn--healthy btn--lg" style="width: 100%;">Get Started →</button>
          </div>
        </div>

        <!-- Premium Tier -->
        <div class="tier-card tier-card--premium">
          <div class="tier-card__header">
            <span class="tier-card__name" style="color: var(--sunset-700);">Build, Operate & Scale</span>
            <span class="tier-card__price" style="color: var(--sunset-600);">$5,000<small>/mo</small></span>
          </div>
          <p class="tier-card__desc" style="color: var(--sunset-700);">Your AI department on demand. Unlimited everything.</p>
          <ul class="tier-card__features" style="color: var(--sunset-800);">
            <li style="color: var(--sunset-800);">Everything in Build & Operate</li>
            <li style="color: var(--sunset-800);">Dedicated AI consultant</li>
            <li style="color: var(--sunset-800);">Weekly 30-min strategy calls</li>
            <li style="color: var(--sunset-800);">Unlimited workflow changes</li>
            <li style="color: var(--sunset-800);">Unlimited team training</li>
            <li style="color: var(--sunset-800);">2-hour priority SLA</li>
          </ul>
          <div style="margin-top: var(--space-6);">
            <button class="btn btn--primary btn--lg" style="width: 100%;">Contact Sales →</button>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════════
       COMPOSITE EXAMPLE
       ═══════════════════════════════════════════════════════════════════════ -->
  <section class="component-section">
    <h2 class="component-section__title">Composite Example</h2>
    <p class="component-section__desc">
      Real-world patterns built from the unified component vocabulary
    </p>

    <div class="variant-group">
      <div class="variant-group__label">Fix Block Pattern</div>
      <div class="card card--accent" style="display: flex; gap: var(--space-4); align-items: flex-start;">
        <span class="indicator indicator--xl indicator--critical" style="margin-top: 2px;"></span>
        <div class="stack stack--sm" style="flex: 1;">
          <p style="font-size: var(--text-sm);">
            <span class="label label--inline">Problem:</span>
            Manual paperwork processing requires 17.5m per patient, leading to high labor costs.
          </p>
          <p style="font-size: var(--text-sm);">
            <span class="label label--inline label--accent">Fix:</span>
            Automate the data bridge between Jotform and Athenahealth to sync patient data instantly.
          </p>
          <p style="font-size: var(--text-sm);">
            <span class="label label--inline label--healthy">Impact:</span>
            Recover ~<span class="badge badge--code">$4,492/month</span> by eliminating manual transcription.
          </p>
          <div class="flex flex--wrap flex--gap-sm" style="margin-top: var(--space-3);">
            <span class="badge badge--caps">Low Effort</span>
            <span class="badge badge--caps badge--accent">High Impact</span>
            <span class="badge badge--caps">7-14 Days</span>
          </div>
        </div>
      </div>
    </div>

    <div class="variant-group">
      <div class="variant-group__label">Financial Summary Grid</div>
      <div class="grid grid--4">
        <div class="stat stat--bordered stat--highlight">
          <div class="stat__value stat__value--healthy">$161,700<small>/yr</small></div>
          <div class="stat__label">Hard Savings</div>
          <div class="stat__math">
            <span class="badge badge--code badge--sm">= $13,475 × 12</span>
          </div>
        </div>
        <div class="stat stat--bordered stat--warning">
          <div class="stat__value stat__value--warning">$360,000<small>/yr</small></div>
          <div class="stat__label">Modeled Opportunity</div>
          <div class="stat__math">
            <span class="badge badge--code badge--sm">= 20 × 30 × 1% × $5K</span>
          </div>
        </div>
        <div class="stat stat--bordered">
          <div class="stat__value stat__value--accent">$521,700<small>/yr</small></div>
          <div class="stat__label">Total Value</div>
          <div class="stat__math">
            <span class="badge badge--code badge--sm">= savings + opportunity</span>
          </div>
        </div>
        <div class="stat stat--bordered stat--healthy stat--highlight">
          <div class="stat__value stat__value--healthy">1853%</div>
          <div class="stat__label">ROI Coverage</div>
          <div class="stat__math">
            <span class="badge badge--code badge--sm">= $521K ÷ $28K</span>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════════════════
       SUMMARY
       ═══════════════════════════════════════════════════════════════════════ -->
  <section class="component-section" style="background: linear-gradient(145deg, var(--night-900) 0%, var(--night-950) 100%); color: var(--sand-50);">
    <h2 class="component-section__title" style="color: var(--sand-50);">What's Enhanced</h2>
    <p class="component-section__desc" style="color: var(--night-300); border-color: var(--night-700);">
      From the baseline to this version — everything is more tactile, more dimensional, more Wranngle.
    </p>

    <div class="grid grid--3">
      <div style="padding: var(--space-5); background: linear-gradient(145deg, var(--night-800) 0%, var(--night-900) 100%); border-radius: var(--radius-lasso); border-left: 4px solid var(--sunset-500);">
        <div style="font-family: var(--font-display); font-size: var(--text-sm); font-weight: 700; color: var(--sunset-400); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-2);">Lasso Geometry</div>
        <div style="font-size: var(--text-sm); color: var(--night-200);">Asymmetric <code style="background: var(--night-700); padding: 0.1em 0.3em; border-radius: 3px; font-size: 0.9em;">24px 4px 24px 4px</code> curves suggest rope tension</div>
      </div>
      <div style="padding: var(--space-5); background: linear-gradient(145deg, var(--night-800) 0%, var(--night-900) 100%); border-radius: var(--radius-lasso); border-left: 4px solid var(--violet-500);">
        <div style="font-family: var(--font-display); font-size: var(--text-sm); font-weight: 700; color: var(--violet-400); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-2);">Grainy Textures</div>
        <div style="font-size: var(--text-sm); color: var(--night-200);">SVG noise overlay on cards, stats, and badges for tactile paper feel</div>
      </div>
      <div style="padding: var(--space-5); background: linear-gradient(145deg, var(--night-800) 0%, var(--night-900) 100%); border-radius: var(--radius-lasso); border-left: 4px solid var(--color-healthy);">
        <div style="font-family: var(--font-display); font-size: var(--text-sm); font-weight: 700; color: #6ee7b7; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-2);">The "Peek" Edge</div>
        <div style="font-size: var(--text-sm); color: var(--night-200);">Darker left border on all badges creates dimensional pop</div>
      </div>
    </div>

    <div class="grid grid--3" style="margin-top: var(--space-4);">
      <div style="padding: var(--space-5); background: linear-gradient(145deg, var(--night-800) 0%, var(--night-900) 100%); border-radius: var(--radius-lasso-alt); border-left: 4px solid var(--sunset-300);">
        <div style="font-family: var(--font-display); font-size: var(--text-sm); font-weight: 700; color: var(--sunset-300); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-2);">Mandatory Math</div>
        <div style="font-size: var(--text-sm); color: var(--night-200);">Every stat requires a calculation pill — engineering transparency</div>
      </div>
      <div style="padding: var(--space-5); background: linear-gradient(145deg, var(--night-800) 0%, var(--night-900) 100%); border-radius: var(--radius-lasso-alt); border-left: 4px solid var(--sunset-400);">
        <div style="font-family: var(--font-display); font-size: var(--text-sm); font-weight: 700; color: var(--sunset-400); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-2);">Gradient Buttons</div>
        <div style="font-size: var(--text-sm); color: var(--night-200);">All buttons use multi-stop gradients with glow shadows</div>
      </div>
      <div style="padding: var(--space-5); background: linear-gradient(145deg, var(--night-800) 0%, var(--night-900) 100%); border-radius: var(--radius-lasso-alt); border-left: 4px solid var(--violet-400);">
        <div style="font-family: var(--font-display); font-size: var(--text-sm); font-weight: 700; color: var(--violet-400); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-2);">Tier Overhaul</div>
        <div style="font-size: var(--text-sm); color: var(--night-200);">Service cards now have varied heights, floating badges, deep glows</div>
      </div>
    </div>
  </section>

</div>

</body>
</html>```
